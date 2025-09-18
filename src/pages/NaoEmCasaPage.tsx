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
import { addDaysToIso, formatIsoDate } from '../utils/calendar';

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

const NaoEmCasaPage: React.FC = () => {
  const { territorios } = useTerritorios();
  const { designacoes } = useDesignacoes();
  const { registros, addNaoEmCasa, updateNaoEmCasa } = useNaoEmCasa();
  const { t } = useTranslation();

  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);

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
    async (territorioId: string, detail: AddressDetails) => {
      const followUpAt = addDaysToIso(todayIso, FOLLOW_UP_DELAY_DAYS);
      const { address, streetName, propertyTypeName } = detail;
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
      });
    },
    [addNaoEmCasa, todayIso],
  );

  const handleMarkCompleted = useCallback(
    async (registro: NaoEmCasaRegistro) => {
      const completionDate = new Date().toISOString().slice(0, 10);
      await updateNaoEmCasa(registro.id, { completedAt: completionDate });
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
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left border-b">
                              <th className="py-2">{t('naoEmCasa.table.street')}</th>
                              <th>{t('naoEmCasa.table.numbers')}</th>
                              <th>{t('naoEmCasa.table.type')}</th>
                              <th>{t('naoEmCasa.table.actions')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {details.map((detail) => {
                              const { address } = detail;
                              const key = buildAddressKey(territorio.id, address);
                              const pending = pendingByKey.get(key);
                              const categoryLabel =
                                detail.category === 'residential'
                                  ? t('naoEmCasa.residential')
                                  : detail.category === 'commercial'
                                  ? t('naoEmCasa.commercial')
                                  : t('naoEmCasa.other');
                              return (
                                <tr key={key} className="border-b last:border-0">
                                  <td className="py-2">
                                    {detail.streetName ?? t('naoEmCasa.unknownStreet')}
                                  </td>
                                  <td>{formatRangeValues(address.numberStart, address.numberEnd)}</td>
                                  <td>
                                    <div className="flex flex-col">
                                      <span>{detail.propertyTypeName ?? t('naoEmCasa.unknownType')}</span>
                                      <span className="text-xs text-neutral-500">{categoryLabel}</span>
                                    </div>
                                  </td>
                                  <td className="py-2">
                                    {pending ? (
                                      <span className="text-sm text-neutral-500">
                                        {t('naoEmCasa.scheduledFor', {
                                          date: formatIsoDate(pending.followUpAt),
                                        })}
                                      </span>
                                    ) : (
                                      <Button
                                        type="button"
                                        onClick={() => handleRecordNotAtHome(territorio.id, detail)}
                                        className="bg-blue-600 text-white"
                                      >
                                        {t('naoEmCasa.recordNotAtHome')}
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
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
