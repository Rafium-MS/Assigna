import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button } from '../components/ui';
import { useTerritorios } from '../hooks/useTerritorios';
import { useDesignacoes } from '../hooks/useDesignacoes';
import { useNaoEmCasa } from '../hooks/useNaoEmCasa';
import { db } from '../services/db';
import type { Street } from '../types/street';
import type { Address } from '../types/address';
import type { PropertyType } from '../types/property-type';
import type { NaoEmCasaRegistro } from '../types/nao-em-casa';
import { addDaysToIso, formatIsoDate, todayLocalIso } from '../utils/calendar';

const FOLLOW_UP_DELAY_DAYS = 120;

type AddressCategory = 'residential' | 'commercial' | 'other';

interface TerritoryAddresses {
  streets: Street[];
  addresses: Address[];
}

interface AddressDetails {
  address: Address;
  streetName: string | null;
  propertyTypeName: string | null;
  category: AddressCategory;
}

interface StreetGroup {
  key: string;
  name: string;
  addresses: AddressDetails[];
}

const categorizeProperty = (name: string | null | undefined): AddressCategory => {
  if (!name) {
    return 'other';
  }
  const lower = name.toLowerCase();
  if (lower.includes('comer') || lower.includes('negócio') || lower.includes('business')) {
    return 'commercial';
  }
  if (lower.includes('resi') || lower.includes('casa') || lower.includes('home')) {
    return 'residential';
  }
  return 'other';
};

const formatRangeValues = (start?: number | null, end?: number | null): string => {
  if (start == null && end == null) {
    return '—';
  }
  if (start != null && end != null) {
    return start === end ? String(start) : `${start} – ${end}`;
  }
  const value = start ?? end;
  return value != null ? String(value) : '—';
};

const buildAddressKey = (
  territorioId: string,
  address: Pick<Address, 'id' | 'streetId' | 'numberStart' | 'numberEnd'>,
): string => {
  if (address.id !== undefined) {
    return `id:${address.id}`;
  }
  return `combo:${territorioId}:${address.streetId}:${address.numberStart}:${address.numberEnd}`;
};

const groupDetailsByStreet = (
  details: AddressDetails[],
  unknownStreetLabel: string,
): StreetGroup[] => {
  const groups = new Map<string, StreetGroup>();
  for (const detail of details) {
    const streetId = detail.address.streetId;
    const key =
      streetId != null
        ? `id:${streetId}`
        : `name:${detail.streetName ?? unknownStreetLabel}`;
    const name = detail.streetName ?? unknownStreetLabel;
    const existing = groups.get(key);
    if (existing) {
      existing.addresses.push(detail);
    } else {
      groups.set(key, { key, name, addresses: [detail] });
    }
  }

  const sortedGroups = Array.from(groups.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  );

  sortedGroups.forEach((group) => {
    group.addresses.sort((a, b) => {
      const primaryA = a.address.numberStart ?? a.address.numberEnd ?? Number.POSITIVE_INFINITY;
      const primaryB = b.address.numberStart ?? b.address.numberEnd ?? Number.POSITIVE_INFINITY;
      if (primaryA !== primaryB) {
        return primaryA - primaryB;
      }
      const secondaryA = a.address.numberEnd ?? a.address.numberStart ?? Number.POSITIVE_INFINITY;
      const secondaryB = b.address.numberEnd ?? b.address.numberStart ?? Number.POSITIVE_INFINITY;
      return secondaryA - secondaryB;
    });
  });

  return sortedGroups;
};

const NaoEmCasaPage: React.FC = () => {
  const { territorios } = useTerritorios();
  const { designacoes } = useDesignacoes();
  const { registros, addNaoEmCasa, updateNaoEmCasa } = useNaoEmCasa();
  const { t } = useTranslation();

  const todayIso = useMemo(() => todayLocalIso(), []);
  const confirmConversationLabel = useMemo(
    () => t('naoEmCasa.confirmConversation', { date: formatIsoDate(todayIso) }),
    [t, todayIso],
  );

  const activeDesignacoes = useMemo(
    () =>
      designacoes.filter(
        (designacao) =>
          designacao.dataInicial <= todayIso &&
          designacao.dataFinal >= todayIso &&
          !designacao.devolvido,
      ),
    [designacoes, todayIso],
  );

  const activeTerritoryIds = useMemo(
    () => Array.from(new Set(activeDesignacoes.map((designacao) => designacao.territorioId))),
    [activeDesignacoes],
  );

  const activeTerritories = useMemo(
    () =>
      activeTerritoryIds
        .map((id) => territorios.find((territorio) => territorio.id === id))
        .filter((territorio): territorio is NonNullable<typeof territorio> => territorio !== undefined),
    [activeTerritoryIds, territorios],
  );

  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const propertyTypeMap = useMemo(() => {
    const map = new Map<number, PropertyType>();
    propertyTypes.forEach((type) => {
      if (type.id !== undefined) {
        map.set(type.id, type);
      }
    });
    return map;
  }, [propertyTypes]);

  const [territoryAddresses, setTerritoryAddresses] = useState<Record<string, TerritoryAddresses>>({});

  useEffect(() => {
    let active = true;
    const loadPropertyTypes = async () => {
      const types = await db.propertyTypes.toArray();
      if (!active) return;
      setPropertyTypes(types);
    };
    void loadPropertyTypes();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadAddresses = async () => {
      if (activeTerritoryIds.length === 0) {
        if (!cancelled) {
          setTerritoryAddresses({});
        }
        return;
      }

      const entries = await Promise.all(
        activeTerritoryIds.map(async (territorioId) => {
          const streets = await db.streets.where('territoryId').equals(territorioId).toArray();
          const streetIds = streets
            .map((street) => street.id)
            .filter((id): id is number => id !== undefined);
          const addresses =
            streetIds.length > 0
              ? await db.addresses.where('streetId').anyOf(streetIds).toArray()
              : [];
          return [territorioId, { streets, addresses }] as const;
        }),
      );

      if (cancelled) return;
      setTerritoryAddresses(Object.fromEntries(entries));
    };

    void loadAddresses();

    return () => {
      cancelled = true;
    };
  }, [activeTerritoryIds]);

  const pendingRegistros = useMemo(() => registros.filter((registro) => !registro.completedAt), [registros]);

  const pendingByKey = useMemo(() => {
    const map = new Map<string, NaoEmCasaRegistro>();
    pendingRegistros.forEach((registro) => {
      const key =
        registro.addressId != null
          ? `id:${registro.addressId}`
          : `combo:${registro.territorioId}:${registro.streetId ?? ''}:${registro.numberStart ?? ''}:${
              registro.numberEnd ?? ''
            }`;
      map.set(key, registro);
    });
    return map;
  }, [pendingRegistros]);

  const getAddressDetails = useCallback(
    (territorioId: string): AddressDetails[] => {
      const data = territoryAddresses[territorioId];
      if (!data) return [];
      return data.addresses.map((address) => {
        const street = data.streets.find((item) => item.id === address.streetId);
        const propertyTypeName = propertyTypeMap.get(address.propertyTypeId)?.name ?? null;
        return {
          address,
          streetName: street?.name ?? null,
          propertyTypeName,
          category: categorizeProperty(propertyTypeName),
        };
      });
    },
    [territoryAddresses, propertyTypeMap],
  );

  const handleRecordNotAtHome = useCallback(
    async (
      territorioId: string,
      detail: AddressDetails,
      existingRecord?: NaoEmCasaRegistro | null,
    ) => {
      const followUpAt = addDaysToIso(todayIso, FOLLOW_UP_DELAY_DAYS);
      const { address, streetName, propertyTypeName } = detail;
      if (existingRecord) {
        await updateNaoEmCasa(existingRecord.id, {
          territorioId,
          addressId: address.id ?? null,
          streetId: address.streetId,
          streetName,
          numberStart: address.numberStart,
          numberEnd: address.numberEnd,
          propertyTypeId: address.propertyTypeId,
          propertyTypeName,
          recordedAt: todayIso,
          followUpAt,
          completedAt: null,
          conversationConfirmed: false,
        });
        return;
      }
      await addNaoEmCasa({
        territorioId,
        addressId: address.id ?? null,
        streetId: address.streetId,
        streetName,
        numberStart: address.numberStart,
        numberEnd: address.numberEnd,
        propertyTypeId: address.propertyTypeId,
        propertyTypeName,
        recordedAt: todayIso,
        followUpAt,
        completedAt: null,
        conversationConfirmed: false,
      });
    },
    [addNaoEmCasa, todayIso, updateNaoEmCasa],
  );

  const handleToggleConversation = useCallback(
    async (registro: NaoEmCasaRegistro, confirmed: boolean) => {
      await updateNaoEmCasa(registro.id, { conversationConfirmed: confirmed });
    },
    [updateNaoEmCasa],
  );

  const handleMarkCompleted = useCallback(
    async (registro: NaoEmCasaRegistro) => {
      const completionDate = todayLocalIso();
      await updateNaoEmCasa(registro.id, {
        completedAt: completionDate,
        conversationConfirmed: true,
      });
    },
    [updateNaoEmCasa],
  );

  const pendingFollowUps = useMemo(
    () => [...pendingRegistros].sort((a, b) => a.followUpAt.localeCompare(b.followUpAt)),
    [pendingRegistros],
  );

  const findTerritoryName = useCallback(
    (territorioId: string) => territorios.find((territorio) => territorio.id === territorioId)?.nome ?? territorioId,
    [territorios],
  );

  return (
    <div className="grid gap-4">
      <Card title={t('naoEmCasa.todayAssignments', { count: activeTerritories.length })}>
        {activeTerritories.length === 0 ? (
          <p className="text-neutral-500">{t('naoEmCasa.noAssignments')}</p>
        ) : (
          <div className="grid gap-6">
            {activeTerritories.map((territorio) => {
              const details = getAddressDetails(territorio.id);
              const unknownStreetLabel = t('naoEmCasa.unknownStreet');
              const streets = groupDetailsByStreet(details, unknownStreetLabel);
              return (
                <div key={territorio.id} className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-64">
                      {territorio.imagem || territorio.imageUrl ? (
                        <img
                          src={territorio.imagem || territorio.imageUrl}
                          alt={t('naoEmCasa.miniMapAlt', { name: territorio.nome })}
                          className="w-full rounded-lg border object-cover"
                        />
                      ) : (
                        <div className="h-40 w-full rounded-lg border grid place-items-center text-sm text-neutral-500">
                          {t('naoEmCasa.noImage')}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 overflow-x-auto">
                      <h3 className="text-lg font-semibold mb-2">{territorio.nome}</h3>
                      {details.length === 0 ? (
                        <p className="text-neutral-500">{t('naoEmCasa.noAddresses')}</p>
                      ) : (
                        <div className="grid gap-3">
                          {streets.map((street) => (
                            <details
                              key={street.key}
                              className="rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-700"
                            >
                              <summary className="flex cursor-pointer select-none items-center justify-between gap-2 px-4 py-3 font-medium text-neutral-800 dark:text-neutral-300">
                                <span>{street.name}</span>
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                  {t('naoEmCasa.streetAddresses', { count: street.addresses.length })}
                                </span>
                              </summary>
                              <div className="border-t border-neutral-200 dark:border-neutral-700">
                                {street.addresses.map((detail) => {
                                  const { address } = detail;
                                  const key = buildAddressKey(territorio.id, address);
                                  const pending = pendingByKey.get(key);
                                  const conversationConfirmed = pending?.conversationConfirmed ?? false;
                                  const categoryLabel =
                                    detail.category === 'residential'
                                      ? t('naoEmCasa.residential')
                                      : detail.category === 'commercial'
                                      ? t('naoEmCasa.commercial')
                                      : t('naoEmCasa.other');
                                  const rangeLabel = formatRangeValues(address.numberStart, address.numberEnd);
                                  const disableRecordButton = conversationConfirmed;
                                  return (
                                    <div
                                      key={key}
                                      className="flex flex-col gap-3 border-b border-neutral-200 px-4 py-3 last:border-b-0 dark:border-neutral-700"
                                    >
                                      <div className="flex flex-col gap-1">
                                        <p className="font-medium text-neutral-800 dark:text-neutral-200">
                                          {t('naoEmCasa.addressLabel', {
                                            street: detail.streetName ?? t('naoEmCasa.unknownStreet'),
                                            range: rangeLabel,
                                          })}
                                        </p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                          <span>{detail.propertyTypeName ?? t('naoEmCasa.unknownType')}</span>
                                          <span className="ml-2 text-xs text-neutral-400 dark:text-neutral-300">{categoryLabel}</span>
                                        </p>
                                        {pending && (
                                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                            {t('naoEmCasa.scheduledFor', {
                                              date: formatIsoDate(pending.followUpAt),
                                            })}
                                          </p>
                                        )}
                                        {conversationConfirmed && (
                                          <p className="text-xs font-medium text-green-600 dark:text-green-400">
                                            {t('naoEmCasa.conversationConfirmedLabel')}
                                          </p>
                                        )}
                                      </div>
                                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                        <label
                                          className={`flex items-center gap-2 text-sm ${
                                            pending
                                              ? 'text-neutral-700 dark:text-neutral-300'
                                              : 'text-neutral-400 dark:text-neutral-500'
                                          }`}
                                        >
                                          <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                                            disabled={!pending}
                                            checked={conversationConfirmed}
                                            onChange={(event) =>
                                              pending && handleToggleConversation(pending, event.target.checked)
                                            }
                                          />
                                          {confirmConversationLabel}
                                        </label>
                                        <Button
                                          type="button"
                                          className="bg-blue-600 text-white disabled:cursor-not-allowed disabled:opacity-60"
                                          disabled={disableRecordButton}
                                          onClick={() => handleRecordNotAtHome(territorio.id, detail, pending)}
                                        >
                                          {t('naoEmCasa.recordNotAtHome')}
                                        </Button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </details>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card title={t('naoEmCasa.followUpsTitle', { count: pendingFollowUps.length })}>
        {pendingFollowUps.length === 0 ? (
          <p className="text-neutral-500">{t('naoEmCasa.noFollowUps')}</p>
        ) : (
          <ul className="grid gap-3">
            {pendingFollowUps.map((registro) => {
              const streetName = registro.streetName ?? t('naoEmCasa.unknownStreet');
              const range = formatRangeValues(registro.numberStart ?? null, registro.numberEnd ?? null);
              const propertyTypeLabel = registro.propertyTypeName ?? t('naoEmCasa.unknownType');
              return (
                <li
                  key={registro.id}
                  className="flex flex-col gap-3 rounded-xl border p-3 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex-1">
                    <p className="font-medium">{findTerritoryName(registro.territorioId)}</p>
                    <p className="text-sm text-neutral-600">
                      {t('naoEmCasa.addressLabel', { street: streetName, range })}
                    </p>
                    <p className="text-sm text-neutral-500">{propertyTypeLabel}</p>
                    <p className="text-sm text-neutral-600">
                      {t('naoEmCasa.followUpOn', { date: formatIsoDate(registro.followUpAt) })}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {t('naoEmCasa.recordedOn', { date: formatIsoDate(registro.recordedAt) })}
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleMarkCompleted(registro)}
                    className="bg-green-600 text-white self-start"
                  >
                    {t('naoEmCasa.markCompleted')}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default NaoEmCasaPage;
