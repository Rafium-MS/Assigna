import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Territorio } from '../types/territorio';
import type { Street } from '../types/street';
import type { PropertyType } from '../types/property-type';
import type { Address } from '../types/address';
import { db } from '../services/db';
import ImageAnnotator from '../components/ImageAnnotator';

// schema and form types
export const addressSchema = z.object({
  id: z.number().optional(),
  streetId: z.coerce.number(),
  numberStart: z.coerce.number(),
  numberEnd: z.coerce.number(),
  propertyTypeId: z.coerce.number()
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
    await db.addresses.put(data);
    await refreshTerritoryData(territoryId);
    reset();
  };

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
                {streets
                  .filter(s => s.territoryId === territoryId)
                  .map(s => (
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
                {streets
                  .filter(s => s.territoryId === territoryId)
                  .map(s => (
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
                </tr>
              </thead>
              <tbody>
                {addresses.map(a => (
                  <tr key={a.id}>
                    <td>{streets.find(s => s.id === a.streetId)?.name}</td>
                    <td>{a.numberStart}</td>
                    <td>{a.numberEnd}</td>
                    <td>{propertyTypes.find(pt => pt.id === a.propertyTypeId)?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'resumo' && (
          <div>
            <p>
              {t('ruasNumeracoes.summary.totalStreets', { count: streets.length })}
            </p>
            <p>
              {t('ruasNumeracoes.summary.totalAddresses', { count: addresses.length })}
            </p>
            <p>
              {t('ruasNumeracoes.summary.totalPropertyTypes', {
                count: propertyTypes.length
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

