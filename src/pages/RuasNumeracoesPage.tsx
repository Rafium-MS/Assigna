import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Territorio } from '../types/territorio';
import type { Street } from '../types/street';
import type { PropertyType } from '../types/property-type';
import { db } from '../services/db';
import { TerritorioRepository } from '../services/repositories/territorios';
import { useToast } from '../components/feedback/Toast';
import { useAuth } from '../hooks/useAuth';
import ImageAnnotator from '../components/ImageAnnotator';

export default function RuasNumeracoesPage(): JSX.Element {
  const { t } = useTranslation();
  const toast = useToast();
  const { currentUser } = useAuth();
  const [territories, setTerritories] = useState<Territorio[]>([]);
  const [streets, setStreets] = useState<Street[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [activeTab, setActiveTab] = useState<'ruas' | 'tipos' | 'resumo'>('ruas');
  const [editingPropertyTypeId, setEditingPropertyTypeId] = useState<number | null>(null);
  const [editingPropertyTypeName, setEditingPropertyTypeName] = useState<string>('');
  const [territoryId, setTerritoryId] = useState<string>('');
  const territoryIdRef = useRef<string>(territoryId);
  const publisherId = currentUser?.id ?? null;

  const territory = useMemo(
    () => territories.find(t => t.id === territoryId),
    [territories, territoryId]
  );

  const territoryStreets = useMemo(
    () => streets.filter(street => street.territoryId === territoryId),
    [streets, territoryId]
  );

  const refreshPropertyTypes = useCallback(async (): Promise<void> => {
    const propertyTypesData = await db.propertyTypes.toArray();
    setPropertyTypes(propertyTypesData);
  }, []);

  const refreshTerritoryData = useCallback(
    async (id: string, publisher: string | null): Promise<void> => {
      if (!id || !publisher) {
        setStreets([]);
        return;
      }

      const matchingTerritory = territories.find(territoryItem => territoryItem.id === id);
      if (!matchingTerritory || matchingTerritory.publisherId !== publisher) {
        setStreets([]);
        return;
      }

      const territoryStreets = await db.streets.where('territoryId').equals(id).toArray();
      if (territoryIdRef.current !== id) {
        return;
      }
      setStreets(territoryStreets);
    },
    [territories]
  );

  useEffect(() => {
    let active = true;

    const load = async (): Promise<void> => {
      try {
        if (!publisherId) {
          if (!active) {
            return;
          }
          setTerritories([]);
          setPropertyTypes([]);
          setStreets([]);
          setTerritoryId('');
          return;
        }

        const [territoriesData, propertyTypesData] = await Promise.all([
          TerritorioRepository.forPublisher(publisherId),
          db.propertyTypes.toArray()
        ]);

        if (!active) {
          return;
        }

        setTerritories(territoriesData);
        setPropertyTypes(propertyTypesData);
        setTerritoryId(currentId => {
          if (
            currentId &&
            territoriesData.some(
              territoryData =>
                territoryData.id === currentId && territoryData.publisherId === publisherId
            )
          ) {
            return currentId;
          }
          return territoriesData[0]?.id ?? '';
        });

        if (territoriesData.length === 0) {
          setStreets([]);
        }
      } catch (error) {
        console.error(error);
        if (!active) {
          return;
        }
        setTerritories([]);
        setPropertyTypes([]);
        setStreets([]);
        setTerritoryId('');
        toast.error(t('ruasNumeracoes.feedback.loadError'));
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [publisherId, t, toast]);

  useEffect(() => {
    territoryIdRef.current = territoryId;
    void refreshTerritoryData(territoryId, publisherId);
  }, [territoryId, refreshTerritoryData, publisherId]);

  const saveStreet = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name'));
    if (!territoryId || !name) return;
    const currentPublisherId = publisherId;
    if (!currentPublisherId || !territory || territory.publisherId !== currentPublisherId) {
      return;
    }
    await db.streets.put({ territoryId, name });
    await refreshTerritoryData(territoryId, currentPublisherId);
    form.reset();
  };

  const cancelEditPropertyType = useCallback((): void => {
    setEditingPropertyTypeId(null);
    setEditingPropertyTypeName('');
  }, []);

  const startEditPropertyType = useCallback((type: PropertyType): void => {
    if (type.id === undefined) {
      return;
    }
    setEditingPropertyTypeId(type.id);
    setEditingPropertyTypeName(type.name);
  }, []);

  const handleCreatePropertyType = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const rawName = formData.get('name');
      const name = typeof rawName === 'string' ? rawName.trim() : '';
      if (!name) {
        return;
      }
      try {
        await db.propertyTypes.put({ name });
        await refreshPropertyTypes();
        form.reset();
        toast.success(t('ruasNumeracoes.feedback.createSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(t('ruasNumeracoes.feedback.saveError'));
      }
    },
    [refreshPropertyTypes, t, toast]
  );

  const handleUpdatePropertyType = useCallback(
    async (): Promise<void> => {
      if (editingPropertyTypeId === null) {
        return;
      }
      const name = editingPropertyTypeName.trim();
      if (!name) {
        return;
      }
      try {
        await db.propertyTypes.put({ id: editingPropertyTypeId, name });
        await refreshPropertyTypes();
        cancelEditPropertyType();
        toast.success(t('ruasNumeracoes.feedback.updateSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(t('ruasNumeracoes.feedback.saveError'));
      }
    },
    [
      cancelEditPropertyType,
      editingPropertyTypeId,
      editingPropertyTypeName,
      refreshPropertyTypes,
      t,
      toast
    ]
  );

  const handleDeletePropertyType = useCallback(
    async (id?: number): Promise<void> => {
      if (id === undefined) {
        return;
      }
      try {
        await db.propertyTypes.delete(id);
        if (editingPropertyTypeId === id) {
          cancelEditPropertyType();
        }
        await refreshPropertyTypes();
        toast.success(t('ruasNumeracoes.feedback.deleteSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(t('ruasNumeracoes.feedback.deleteError'));
      }
    },
    [cancelEditPropertyType, editingPropertyTypeId, refreshPropertyTypes, t, toast]
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="border rounded p-2">
        {territory && (
          <ImageAnnotator imageUrl={territory.imageUrl ?? territory.imagem ?? ''} />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="territory-select" className="text-sm font-medium">
            {t('ruasNumeracoes.territorySelector.label')}
          </label>
          <select
            id="territory-select"
            className="border p-1 w-full"
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
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={activeTab === 'ruas' ? 'font-bold' : ''}
            onClick={() => setActiveTab('ruas')}
          >
            {t('ruasNumeracoes.tabs.streets')}
          </button>
          <button
            type="button"
            className={activeTab === 'tipos' ? 'font-bold' : ''}
            onClick={() => setActiveTab('tipos')}
          >
            {t('ruasNumeracoes.tabs.propertyTypes')}
          </button>
          <button
            type="button"
            className={activeTab === 'resumo' ? 'font-bold' : ''}
            onClick={() => setActiveTab('resumo')}
          >
            {t('ruasNumeracoes.tabs.summary')}
          </button>
        </div>
        {activeTab === 'ruas' && (
          <div>
            <form
              onSubmit={saveStreet}
              className="mb-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end"
            >
              <input
                name="name"
                placeholder={t('ruasNumeracoes.streetsForm.streetNamePlaceholder')}
                className="border p-1 w-full sm:flex-1"
              />
              <button type="submit" className="border px-2 py-1 w-full sm:w-auto">
                {t('common.save')}
              </button>
            </form>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px] text-sm">
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
          </div>
        )}
        {activeTab === 'tipos' && (
          <div>
            <form
              onSubmit={handleCreatePropertyType}
              className="mb-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end"
            >
              <input
                name="name"
                placeholder={t('ruasNumeracoes.propertyTypesForm.namePlaceholder')}
                className="border p-1 w-full sm:flex-1"
              />
              <button type="submit" className="border px-2 py-1 w-full sm:w-auto">
                {t('common.create')}
              </button>
            </form>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left whitespace-nowrap">
                      {t('ruasNumeracoes.propertyTypesTable.name')}
                    </th>
                    <th className="px-2 py-1 text-left whitespace-nowrap">
                      {t('ruasNumeracoes.propertyTypesTable.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {propertyTypes.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="px-2 py-2 text-sm text-gray-500">
                        {t('ruasNumeracoes.propertyTypesTable.empty')}
                      </td>
                    </tr>
                  ) : (
                    propertyTypes.map((pt, index) => {
                      const isEditing = editingPropertyTypeId === pt.id;
                      return (
                        <tr key={pt.id ?? `${pt.name}-${index}`}>
                          <td className="px-2 py-1">
                            {isEditing ? (
                              <input
                                value={editingPropertyTypeName}
                                onChange={event => setEditingPropertyTypeName(event.target.value)}
                                onKeyDown={event => {
                                  if (event.key === 'Enter') {
                                    event.preventDefault();
                                    void handleUpdatePropertyType();
                                  }
                                }}
                                className="w-full border p-1"
                              />
                            ) : (
                              pt.name
                            )}
                          </td>
                          <td className="min-w-[12rem] px-2 py-1">
                            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                              {isEditing ? (
                                <>
                                  <button
                                    type="button"
                                    className="border px-2 py-1 w-full sm:w-auto"
                                    onClick={() => {
                                      void handleUpdatePropertyType();
                                    }}
                                  >
                                    {t('common.save')}
                                  </button>
                                  <button
                                    type="button"
                                    className="border px-2 py-1 w-full sm:w-auto"
                                    onClick={cancelEditPropertyType}
                                  >
                                    {t('common.cancel')}
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="border px-2 py-1 w-full sm:w-auto"
                                    onClick={() => startEditPropertyType(pt)}
                                  >
                                    {t('common.edit')}
                                  </button>
                                  <button
                                    type="button"
                                    className="border px-2 py-1 w-full sm:w-auto"
                                    onClick={() => {
                                      void handleDeletePropertyType(pt.id);
                                    }}
                                  >
                                    {t('common.delete')}
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
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

