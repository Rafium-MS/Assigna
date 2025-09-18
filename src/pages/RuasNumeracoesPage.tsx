import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Territorio } from '../types/territorio';
import type { Street } from '../types/street';
import type { PropertyType } from '../types/property-type';
import type { Address } from '../types/address';
import { ADDRESS_VISIT_COOLDOWN_MS } from '../constants/addresses';
import { db } from '../services/db';
import ImageAnnotator from '../components/ImageAnnotator';

// schema and form types
export const addressSchema = z.object({
  id: z.number().optional(),
  streetId: z.coerce.number(),
  numberStart: z.coerce.number(),
  numberEnd: z.coerce.number(),
  propertyTypeId: z.coerce.number(),
  lastSuccessfulVisit: z.string().nullable().optional(),
  nextVisitAllowed: z.string().nullable().optional()
});

export type AddressForm = z.infer<typeof addressSchema>;

export default function RuasNumeracoesPage(): JSX.Element {
  const { t } = useTranslation();
  const [territories, setTerritories] = useState<Territorio[]>([]);
  const [streets, setStreets] = useState<Street[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [activeTab, setActiveTab] = useState<'ruas' | 'enderecos' | 'resumo'>('ruas');
  const [territoryId, setTerritoryId] = useState<string>('');
  const territoryIdRef = useRef<string>(territoryId);

  const territory = useMemo(
    () => territories.find(t => t.id === territoryId),
    [territories, territoryId]
  );

  const territoryStreets = useMemo(
    () => streets.filter(street => street.territoryId === territoryId),
    [streets, territoryId]
  );

  const allowedStreetIds = useMemo(() => {
    const ids = new Set<number>();
    for (const street of territoryStreets) {
      if (typeof street.id === 'number') {
        ids.add(street.id);
      }
    }
    return ids;
  }, [territoryStreets]);

  const filteredAddresses = useMemo(
    () => addresses.filter(address => allowedStreetIds.has(address.streetId)),
    [addresses, allowedStreetIds]
  );

  const filteredPropertyTypeCount = useMemo(() => {
    const uniquePropertyTypes = new Set<number>();
    for (const address of filteredAddresses) {
      uniquePropertyTypes.add(address.propertyTypeId);
    }
    return uniquePropertyTypes.size;
  }, [filteredAddresses]);

  const isAddressOnCooldown = useCallback((address: Address): boolean => {
    const nextVisit = address.nextVisitAllowed;
    if (!nextVisit) {
      return false;
    }
    const parsed = new Date(nextVisit);
    return !Number.isNaN(parsed.getTime()) && parsed.getTime() > Date.now();
  }, []);

  const lockedAddresses = useMemo(
    () => filteredAddresses.filter(isAddressOnCooldown),
    [filteredAddresses, isAddressOnCooldown]
  );

  const formatLastVisit = useCallback(
    (value: string | null | undefined): string => {
      if (!value) {
        return t('ruasNumeracoes.addressesTable.neverVisited');
      }
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return t('ruasNumeracoes.addressesTable.neverVisited');
      }
      return date.toLocaleString();
    },
    [t]
  );

  const formatNextVisit = useCallback(
    (value: string | null | undefined): string => {
      if (!value) {
        return t('ruasNumeracoes.addressesTable.cooldownNotScheduled');
      }
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return t('ruasNumeracoes.addressesTable.cooldownNotScheduled');
      }
      return date.toLocaleString();
    },
    [t]
  );

  const refreshTerritoryData = useCallback(
    async (id: string): Promise<void> => {
      if (!id) {
        setStreets([]);
        setAddresses([]);
        return;
      }

      const territoryStreets = await db.streets.where('territoryId').equals(id).toArray();
      if (territoryIdRef.current !== id) {
        return;
      }
      setStreets(territoryStreets);

      const streetIds = territoryStreets
        .map(street => street.id)
        .filter((streetId): streetId is number => streetId !== undefined);

      if (streetIds.length === 0) {
        if (territoryIdRef.current === id) {
          setAddresses([]);
        }
        return;
      }

      const territoryAddresses = await db.addresses
        .where('streetId')
        .anyOf(streetIds)
        .toArray();
      if (territoryIdRef.current !== id) {
        return;
      }
      setAddresses(territoryAddresses);
    },
    []
  );

  useEffect(() => {
    const load = async (): Promise<void> => {
      const [territoriesData, propertyTypesData] = await Promise.all([
        db.territorios.toArray(),
        db.propertyTypes.toArray()
      ]);
      setTerritories(territoriesData);
      setPropertyTypes(propertyTypesData);
      setTerritoryId(currentId => {
        if (currentId && territoriesData.some(territoryData => territoryData.id === currentId)) {
          return currentId;
        }
        return territoriesData[0]?.id ?? '';
      });
    };
    void load();
  }, []);

  useEffect(() => {
    territoryIdRef.current = territoryId;
    void refreshTerritoryData(territoryId);
  }, [territoryId, refreshTerritoryData]);

  // address form
  const {
    register,
    handleSubmit,
    reset
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema)
  });

  const saveAddress = async (data: AddressForm): Promise<void> => {
    await db.addresses.put({
      ...data,
      lastSuccessfulVisit: data.lastSuccessfulVisit ?? null,
      nextVisitAllowed: data.nextVisitAllowed ?? null
    });
    await refreshTerritoryData(territoryId);
    reset();
  };

  const handleMarkSuccessfulVisit = useCallback(
    async (address: Address): Promise<void> => {
      if (address.id === undefined) {
        return;
      }
      const now = new Date();
      const lastSuccessfulVisit = now.toISOString();
      const nextVisitAllowed = new Date(now.getTime() + ADDRESS_VISIT_COOLDOWN_MS).toISOString();

      await db.addresses.put({
        ...address,
        lastSuccessfulVisit,
        nextVisitAllowed
      });

      const currentTerritoryId = territoryIdRef.current ?? '';
      await refreshTerritoryData(currentTerritoryId);
    },
    [refreshTerritoryData]
  );

  const saveStreet = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name'));
    if (!territoryId || !name) return;
    await db.streets.put({ territoryId, name });
    await refreshTerritoryData(territoryId);
    form.reset();
  };

  const focusAddressesTab = (): void => {
    setActiveTab('enderecos');
  };

  const handleAnnotatorAdd = (): void => {
    focusAddressesTab();
  };

  const handleAnnotatorUpdate = (): void => {
    focusAddressesTab();
  };

  const handleAnnotatorDelete = (): void => {
    focusAddressesTab();
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border rounded p-2">
        {territory && (
          <ImageAnnotator
            imageUrl={territory.imageUrl ?? territory.imagem ?? ''}
            onAdd={handleAnnotatorAdd}
            onUpdate={handleAnnotatorUpdate}
            onDelete={handleAnnotatorDelete}
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="territory-select" className="text-sm font-medium">
            {t('ruasNumeracoes.territorySelector.label')}
          </label>
          <select
            id="territory-select"
            className="border p-1"
            value={territoryId}
            onChange={event => setTerritoryId(event.target.value)}
            disabled={territories.length === 0}
          >
            <option value="">{t('ruasNumeracoes.territorySelector.placeholder')}</option>
            {territories.map(option => (
              <option key={option.id} value={option.id}>
                {option.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            className={activeTab === 'ruas' ? 'font-bold' : ''}
            onClick={() => setActiveTab('ruas')}
          >
            {t('ruasNumeracoes.tabs.streets')}
          </button>
          <button
            className={activeTab === 'enderecos' ? 'font-bold' : ''}
            onClick={() => setActiveTab('enderecos')}
          >
            {t('ruasNumeracoes.tabs.addresses')}
          </button>
          <button
            className={activeTab === 'resumo' ? 'font-bold' : ''}
            onClick={() => setActiveTab('resumo')}
          >
            {t('ruasNumeracoes.tabs.summary')}
          </button>
        </div>
        {activeTab === 'ruas' && (
          <div>
            <form onSubmit={saveStreet} className="flex gap-2 mb-2">
              <input
                name="name"
                placeholder={t('ruasNumeracoes.streetsForm.streetNamePlaceholder')}
                className="border p-1"
              />
              <button type="submit" className="border px-2">
                {t('common.save')}
              </button>
            </form>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">
                    {t('ruasNumeracoes.streetsTable.name')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {territoryStreets.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'enderecos' && (
          <div>
            <form onSubmit={handleSubmit(saveAddress)} className="flex gap-2 mb-2">
              <select
                {...register('streetId', { valueAsNumber: true })}
                className="border p-1"
              >
                <option value="">{t('ruasNumeracoes.addressesForm.selectStreet')}</option>
                {territoryStreets.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <select
                {...register('propertyTypeId', { valueAsNumber: true })}
                className="border p-1"
              >
                <option value="">{t('ruasNumeracoes.addressesForm.selectType')}</option>
                {propertyTypes.map(pt => (
                  <option key={pt.id} value={pt.id}>
                    {pt.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder={t('ruasNumeracoes.addressesForm.numberStart')}
                className="border p-1 w-20"
                {...register('numberStart', { valueAsNumber: true })}
              />
              <input
                type="number"
                placeholder={t('ruasNumeracoes.addressesForm.numberEnd')}
                className="border p-1 w-20"
                {...register('numberEnd', { valueAsNumber: true })}
              />
              <button type="submit" className="border px-2">
                {t('common.save')}
              </button>
            </form>
            {lockedAddresses.length > 0 && (
              <div className="mb-2 rounded border border-yellow-400 bg-yellow-50 p-2 text-sm text-yellow-800">
                {t('ruasNumeracoes.addressesTable.cooldownAlert', { count: lockedAddresses.length })}
              </div>
            )}
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">
                    {t('ruasNumeracoes.addressesTable.street')}
                  </th>
                  <th className="text-left">
                    {t('ruasNumeracoes.addressesTable.start')}
                  </th>
                  <th className="text-left">
                    {t('ruasNumeracoes.addressesTable.end')}
                  </th>
                  <th className="text-left">
                    {t('ruasNumeracoes.addressesTable.type')}
                  </th>
                  <th className="text-left">
                    {t('ruasNumeracoes.addressesTable.lastVisit')}
                  </th>
                  <th className="text-left">
                    {t('ruasNumeracoes.addressesTable.nextVisit')}
                  </th>
                  <th className="text-left">
                    {t('ruasNumeracoes.addressesTable.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAddresses.map(a => {
                  const isCooldown = isAddressOnCooldown(a);
                  const cooldownTooltip = isCooldown
                    ? t('ruasNumeracoes.addressesTable.cooldownTooltip', {
                        date: formatNextVisit(a.nextVisitAllowed ?? null)
                      })
                    : undefined;

                  return (
                    <tr key={a.id}>
                      <td>{territoryStreets.find(s => s.id === a.streetId)?.name}</td>
                      <td>{a.numberStart}</td>
                      <td>{a.numberEnd}</td>
                      <td>{propertyTypes.find(pt => pt.id === a.propertyTypeId)?.name}</td>
                      <td>{formatLastVisit(a.lastSuccessfulVisit ?? null)}</td>
                      <td>{formatNextVisit(a.nextVisitAllowed ?? null)}</td>
                      <td>
                        <button
                          type="button"
                          className="border px-2 disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={() => {
                            void handleMarkSuccessfulVisit(a);
                          }}
                          disabled={isCooldown}
                          title={cooldownTooltip}
                        >
                          {t('ruasNumeracoes.addressesTable.markVisit')}
                        </button>
                        {isCooldown && (
                          <p className="mt-1 text-xs text-yellow-700">
                            {t('ruasNumeracoes.addressesTable.cooldownActive', {
                              date: formatNextVisit(a.nextVisitAllowed ?? null)
                            })}
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'resumo' && (
          <div>
            <p>
              {t('ruasNumeracoes.summary.totalStreets', {
                count: territoryStreets.length
              })}
            </p>
            <p>
              {t('ruasNumeracoes.summary.totalAddresses', {
                count: filteredAddresses.length
              })}
            </p>
            <p>
              {t('ruasNumeracoes.summary.totalPropertyTypes', {
                count: filteredPropertyTypeCount
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

