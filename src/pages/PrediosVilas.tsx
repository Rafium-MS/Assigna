import React, { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import {
  LETTER_STATUS_VALUES,
  type BuildingVillage,
  type BuildingVillageLetterHistoryEntry,
  type BuildingVillageLetterStatus
} from '../types/building_village';
import type { Territorio } from '../types/territorio';
import { BuildingVillageRepository } from '../services/repositories/buildings_villages';
import { TerritorioRepository } from '../services/repositories/territorios';
import { Modal } from '../components/layout/Modal';
import { useToast } from '../components/feedback/Toast';
import { useConfirm } from '../components/feedback/ConfirmDialog';

const createBuildingVillageSchema = (t: TFunction) =>
  z.object({
    id: z.string().optional(),
    territory_id: z
      .string()
      .min(1, t('buildingsVillages.validation.selectTerritory')),
    name: z
      .string()
      .trim()
      .min(1, t('buildingsVillages.validation.nameRequired')),
    address_line: z.string().trim().optional(),
    type: z.string().trim().optional(),
    number: z.string().trim().optional(),
    residences_count: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => {
          if (val === undefined || val === '') return true;
          const parsed = Number(val);
          return Number.isInteger(parsed) && parsed >= 0;
        },
        {
          message: t('buildingsVillages.validation.invalidNumber')
        }
      ),
    modality: z.string().trim().optional(),
    reception_type: z.string().trim().optional(),
    responsible: z.string().trim().optional(),
    contact_method: z.string().trim().optional(),
    letter_status: z.enum(LETTER_STATUS_VALUES),
    letter_history: z
      .array(
        z.object({
          id: z.string(),
          status: z.enum(LETTER_STATUS_VALUES),
          sent_at: z.string().optional(),
          notes: z.string().optional()
        })
      )
      .optional(),
    assigned_at: z.string().optional(),
    returned_at: z.string().optional(),
    block: z.string().trim().optional(),
    notes: z.string().trim().optional()
  });

type BuildingVillageFormValues = z.infer<ReturnType<typeof createBuildingVillageSchema>>;

type Filters = {
  search: string;
  territory: string;
  type: string;
  modality: string;
};

const defaultLetterStatus: BuildingVillageLetterStatus = 'not_sent';
const defaultHistoryStatus: BuildingVillageLetterStatus = 'sent';

const emptyFormValues: BuildingVillageFormValues = {
  territory_id: '',
  name: '',
  address_line: '',
  type: '',
  number: '',
  residences_count: '',
  modality: '',
  reception_type: '',
  responsible: '',
  contact_method: '',
  letter_status: defaultLetterStatus,
  letter_history: [],
  assigned_at: '',
  returned_at: '',
  block: '',
  notes: ''
};

const letterStatusTranslationKeys: Record<BuildingVillageLetterStatus, string> = {
  not_sent: 'buildingsVillages.letterStatus.notSent',
  in_progress: 'buildingsVillages.letterStatus.inProgress',
  sent: 'buildingsVillages.letterStatus.sent',
  responded: 'buildingsVillages.letterStatus.responded'
};

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 12);

const formatDate = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString();
};

const getDateInputValue = (value: string | null) => {
  if (!value) return '';
  return value.length > 10 ? value.slice(0, 10) : value;
};

const normalizeText = (value?: string | null) => {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
};

const sortLetterHistory = (
  history: BuildingVillageLetterHistoryEntry[]
): BuildingVillageLetterHistoryEntry[] => {
  return [...history].sort((a, b) => {
    const aDate = a.sent_at ?? '';
    const bDate = b.sent_at ?? '';
    return bDate.localeCompare(aDate);
  });
};

export default function PrediosVilas(): JSX.Element {
  const [villages, setVillages] = useState<BuildingVillage[]>([]);
  const [territories, setTerritories] = useState<Territorio[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    territory: 'all',
    type: 'all',
    modality: 'all'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<BuildingVillage | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const confirm = useConfirm();
  const { t } = useTranslation();

  const schema = useMemo(() => createBuildingVillageSchema(t), [t]);
  const resolver = useMemo(() => zodResolver(schema), [schema]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm<BuildingVillageFormValues>({
    resolver,
    defaultValues: emptyFormValues
  });

  const {
    fields: letterHistoryFields,
    append: appendLetterHistory,
    remove: removeLetterHistory
  } = useFieldArray({
    control,
    name: 'letter_history',
    keyName: 'fieldId'
  });

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        setLoading(true);
        const [allVillages, allTerritories] = await Promise.all([
          BuildingVillageRepository.all(),
          TerritorioRepository.all()
        ]);
        setVillages(allVillages);
        setTerritories(allTerritories);
      } catch (error) {
        console.error(error);
        toast.error(t('buildingsVillages.feedback.loadError'));
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [toast, t]);

  const territoryNameById = useMemo(() => {
    return territories.reduce<Record<string, string>>((acc, territory) => {
      acc[territory.id] = territory.nome;
      return acc;
    }, {});
  }, [territories]);

  const typeOptions = useMemo(() => {
    const values = new Set<string>();
    villages.forEach((item) => {
      if (item.type) values.add(item.type);
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [villages]);

  const modalityOptions = useMemo(() => {
    const values = new Set<string>();
    villages.forEach((item) => {
      if (item.modality) values.add(item.modality);
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [villages]);

  const letterStatusOptions = useMemo(
    () =>
      LETTER_STATUS_VALUES.map((value) => ({
        value,
        label: t(letterStatusTranslationKeys[value])
      })),
    [t]
  );

  const getLetterStatusLabel = (status: BuildingVillageLetterStatus | null | undefined) => {
    if (!status) {
      return t('buildingsVillages.letterStatus.unknown');
    }
    return t(letterStatusTranslationKeys[status]);
  };

  const handleAddLetterHistory = () => {
    appendLetterHistory({
      id: createId(),
      status: defaultHistoryStatus,
      sent_at: '',
      notes: ''
    });
  };

  const filteredVillages = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    return villages
      .filter((item) => {
        const matchesSearch =
          term.length === 0 ||
          [
            item.name,
            item.address_line,
            item.responsible,
            item.block,
            item.notes,
            item.contact_method,
            item.letter_status ? getLetterStatusLabel(item.letter_status) : null,
            ...(Array.isArray(item.letter_history)
              ? item.letter_history.flatMap((entry) => [
                  entry.notes,
                  getLetterStatusLabel(entry.status)
                ])
              : [])
          ]
            .filter(Boolean)
            .some((value) => value!.toLowerCase().includes(term));

        const matchesTerritory = filters.territory === 'all' || item.territory_id === filters.territory;
        const matchesType = filters.type === 'all' || item.type === filters.type;
        const matchesModality = filters.modality === 'all' || item.modality === filters.modality;

        return matchesSearch && matchesTerritory && matchesType && matchesModality;
      })
      .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  }, [filters, villages, t]);

  const handleDelete = async (item: BuildingVillage) => {
    const confirmed = await confirm(t('buildingsVillages.confirmDelete'));
    if (!confirmed) return;
    try {
      await BuildingVillageRepository.remove(item.id);
      setVillages((prev) => prev.filter((v) => v.id !== item.id));
      toast.success(t('buildingsVillages.feedback.deleteSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(t('buildingsVillages.feedback.deleteError'));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    reset({
      ...emptyFormValues,
      territory_id: filters.territory !== 'all' ? filters.territory : ''
    });
  };

  const openForCreate = () => {
    setEditing(null);
    reset({
      ...emptyFormValues,
      territory_id: filters.territory !== 'all' ? filters.territory : ''
    });
    setIsModalOpen(true);
  };

  const openForEdit = (item: BuildingVillage) => {
    setEditing(item);
    reset({
      id: item.id,
      territory_id: item.territory_id,
      name: item.name ?? '',
      address_line: item.address_line ?? '',
      type: item.type ?? '',
      number: item.number ?? '',
      residences_count:
        item.residences_count !== null && item.residences_count !== undefined
          ? String(item.residences_count)
          : '',
      modality: item.modality ?? '',
      reception_type: item.reception_type ?? '',
      responsible: item.responsible ?? '',
      contact_method: item.contact_method ?? '',
      letter_status: item.letter_status ?? defaultLetterStatus,
      letter_history: Array.isArray(item.letter_history)
        ? item.letter_history.map((entry) => ({
            id: entry.id,
            status: entry.status ?? defaultHistoryStatus,
            sent_at: getDateInputValue(entry.sent_at),
            notes: entry.notes ?? ''
          }))
        : [],
      assigned_at: getDateInputValue(item.assigned_at),
      returned_at: getDateInputValue(item.returned_at),
      block: item.block ?? '',
      notes: item.notes ?? ''
    });
    setIsModalOpen(true);
  };

  const onSubmit = handleSubmit(async (values) => {
    const entityId = values.id ?? editing?.id ?? createId();
    const normalizedHistory: BuildingVillageLetterHistoryEntry[] = Array.isArray(
      values.letter_history
    )
      ? values.letter_history
          .map((entry, index) => {
            const rawId = typeof entry.id === 'string' ? entry.id.trim() : '';
            const fallbackId = `${entityId}-letter-${index + 1}`;
            const sentAt = typeof entry.sent_at === 'string' ? entry.sent_at.trim() : '';

            return {
              id: rawId.length > 0 ? rawId : fallbackId,
              status: entry.status,
              sent_at: sentAt.length > 0 ? sentAt : null,
              notes: normalizeText(entry.notes)
            };
          })
          .filter((entry) => entry.sent_at !== null || entry.notes !== null)
      : [];

    const entity: BuildingVillage = {
      id: entityId,
      territory_id: values.territory_id,
      name: values.name.trim(),
      address_line: normalizeText(values.address_line),
      type: normalizeText(values.type),
      number: normalizeText(values.number),
      residences_count:
        values.residences_count && values.residences_count !== ''
          ? Number(values.residences_count)
          : null,
      modality: normalizeText(values.modality),
      reception_type: normalizeText(values.reception_type),
      responsible: normalizeText(values.responsible),
      contact_method: normalizeText(values.contact_method),
      letter_status: values.letter_status ?? null,
      letter_history: normalizedHistory,
      assigned_at: values.assigned_at ? values.assigned_at : null,
      returned_at: values.returned_at ? values.returned_at : null,
      block: normalizeText(values.block),
      notes: normalizeText(values.notes),
      created_at: editing?.created_at ?? null
    };

    if (!entity.created_at) {
      entity.created_at = new Date().toISOString();
    }

    try {
      await BuildingVillageRepository.add(entity);
      setVillages((prev) => {
        const exists = prev.some((item) => item.id === entity.id);
        if (exists) {
          return prev.map((item) => (item.id === entity.id ? entity : item));
        }
        return [entity, ...prev];
      });
      toast.success(
        t(
          editing
            ? 'buildingsVillages.feedback.updateSuccess'
            : 'buildingsVillages.feedback.createSuccess'
        )
      );
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(t('buildingsVillages.feedback.saveError'));
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t('buildingsVillages.title')}</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t('buildingsVillages.subtitle')}
          </p>
        </div>
        <button
          type="button"
          onClick={openForCreate}
          className="self-start rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          {t('buildingsVillages.newRecord')}
        </button>
      </div>

      <section className="rounded-2xl border border-black/5 bg-white/70 p-4 shadow backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
        <h2 className="mb-4 text-lg font-semibold">{t('filters.filters')}</h2>
        <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
          <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <span className="mb-1">{t('buildingsVillages.filters.search')}</span>
            <input
              type="search"
              value={filters.search}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, search: event.target.value }))
              }
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
              placeholder={t('buildingsVillages.filters.searchPlaceholder')}
            />
          </label>
          <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <span className="mb-1">{t('buildingsVillages.filters.territory')}</span>
            <select
              value={filters.territory}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, territory: event.target.value }))
              }
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
            >
              <option value="all">{t('filters.all')}</option>
              {territories.map((territory) => (
                <option key={territory.id} value={territory.id}>
                  {territory.nome}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <span className="mb-1">{t('buildingsVillages.filters.type')}</span>
            <select
              value={filters.type}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, type: event.target.value }))
              }
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
            >
              <option value="all">{t('filters.all')}</option>
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <span className="mb-1">{t('buildingsVillages.filters.modality')}</span>
            <select
              value={filters.modality}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, modality: event.target.value }))
              }
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
            >
              <option value="all">{t('buildingsVillages.filters.allModalities')}</option>
              {modalityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t('buildingsVillages.records.title')}</h2>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {t('buildingsVillages.records.count', { count: filteredVillages.length })}
          </span>
        </div>
        {loading ? (
          <div className="rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
            {t('buildingsVillages.records.loading')}
          </div>
        ) : filteredVillages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
            {t('buildingsVillages.records.empty')}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredVillages.map((item) => (
              <article
                key={item.id}
                className="flex flex-col rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-900/70"
              >
                <header className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.name || t('buildingsVillages.records.noName')}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {territoryNameById[item.territory_id] ?? t('buildingsVillages.records.noTerritory')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openForEdit(item)}
                      className="rounded-lg border border-black/10 px-2 py-1 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    >
                      {t('common.edit')}
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(item)}
                      className="rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-600 shadow-sm transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/50"
                    >
                      {t('common.delete')}
                    </button>
                  </div>
                </header>
                <dl className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {item.address_line && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.address')}</dt>
                      <dd>{item.address_line}</dd>
                    </div>
                  )}
                  {item.number && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.number')}</dt>
                      <dd>{item.number}</dd>
                    </div>
                  )}
                  {item.type && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.type')}</dt>
                      <dd>{item.type}</dd>
                    </div>
                  )}
                  {item.modality && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.modality')}</dt>
                      <dd>{item.modality}</dd>
                    </div>
                  )}
                  {item.reception_type && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.reception')}</dt>
                      <dd>{item.reception_type}</dd>
                    </div>
                  )}
                  {item.residences_count !== null && item.residences_count !== undefined && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.residences')}</dt>
                      <dd>{item.residences_count}</dd>
                    </div>
                  )}
                  {item.responsible && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.responsible')}</dt>
                      <dd>{item.responsible}</dd>
                    </div>
                  )}
                  {item.contact_method && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                        {t('buildingsVillages.fields.contactMethod')}
                      </dt>
                      <dd>{item.contact_method}</dd>
                    </div>
                  )}
                  {item.letter_status && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                        {t('buildingsVillages.fields.letterStatus')}
                      </dt>
                      <dd>{getLetterStatusLabel(item.letter_status)}</dd>
                    </div>
                  )}
                  {item.letter_history.length > 0 && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                        {t('buildingsVillages.fields.letterHistory')}
                      </dt>
                      <dd>
                        <ul className="space-y-1">
                          {sortLetterHistory(item.letter_history).map((entry) => {
                            const info = [
                              entry.sent_at ? formatDate(entry.sent_at) : null,
                              getLetterStatusLabel(entry.status)
                            ]
                              .filter(Boolean)
                              .join(' • ');
                            return (
                              <li key={entry.id} className="rounded-lg bg-neutral-50 px-2 py-1 dark:bg-neutral-800/60">
                                <span className="block text-xs font-medium text-neutral-700 dark:text-neutral-200">
                                  {info}
                                </span>
                                {entry.notes && (
                                  <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                                    {entry.notes}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </dd>
                    </div>
                  )}
                  {item.assigned_at && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.assignedAt')}</dt>
                      <dd>{formatDate(item.assigned_at)}</dd>
                    </div>
                  )}
                  {item.returned_at && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.returnedAt')}</dt>
                      <dd>{formatDate(item.returned_at)}</dd>
                    </div>
                  )}
                  {item.block && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.block')}</dt>
                      <dd>{item.block}</dd>
                    </div>
                  )}
                  {item.notes && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">{t('buildingsVillages.fields.notes')}</dt>
                      <dd className="whitespace-pre-line">{item.notes}</dd>
                    </div>
                  )}
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>

      {isModalOpen && (
        <Modal>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                {t(
                  editing
                    ? 'buildingsVillages.modal.editTitle'
                    : 'buildingsVillages.modal.createTitle'
                )}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t(
                  editing
                    ? 'buildingsVillages.modal.descriptionEdit'
                    : 'buildingsVillages.modal.descriptionCreate'
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full border border-black/10 px-2 py-1 text-xs text-neutral-500 transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              {t('app.close')}
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">
                  {t('buildingsVillages.fields.territory')} *
                </span>
                <select
                  {...register('territory_id')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                >
                  <option value="">{t('buildingsVillages.placeholders.territory')}</option>
                  {territories.map((territory) => (
                    <option key={territory.id} value={territory.id}>
                      {territory.nome}
                    </option>
                  ))}
                </select>
                {errors.territory_id && (
                  <span className="mt-1 text-xs text-red-600">{errors.territory_id.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">
                  {t('buildingsVillages.fields.name')} *
                </span>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder={t('buildingsVillages.placeholders.name')}
                />
                {errors.name && <span className="mt-1 text-xs text-red-600">{errors.name.message}</span>}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.address')}</span>
                <input
                  type="text"
                  {...register('address_line')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder={t('buildingsVillages.placeholders.address')}
                />
                {errors.address_line && (
                  <span className="mt-1 text-xs text-red-600">{errors.address_line.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.number')}</span>
                <input
                  type="text"
                  {...register('number')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder={t('buildingsVillages.placeholders.number')}
                />
                {errors.number && <span className="mt-1 text-xs text-red-600">{errors.number.message}</span>}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.type')}</span>
                <input
                  type="text"
                  {...register('type')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder={t('buildingsVillages.placeholders.type')}
                />
                {errors.type && <span className="mt-1 text-xs text-red-600">{errors.type.message}</span>}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.modality')}</span>
                <input
                  type="text"
                  {...register('modality')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder={t('buildingsVillages.placeholders.modality')}
                />
                {errors.modality && <span className="mt-1 text-xs text-red-600">{errors.modality.message}</span>}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.reception')}</span>
                <input
                  type="text"
                  {...register('reception_type')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder={t('buildingsVillages.placeholders.reception')}
                />
                {errors.reception_type && (
                  <span className="mt-1 text-xs text-red-600">{errors.reception_type.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.responsible')}</span>
                <input
                  type="text"
                  {...register('responsible')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder={t('buildingsVillages.placeholders.responsible')}
                />
                {errors.responsible && (
                  <span className="mt-1 text-xs text-red-600">{errors.responsible.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.contactMethod')}</span>
                <input
                  type="text"
                  {...register('contact_method')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder={t('buildingsVillages.placeholders.contactMethod')}
                />
                {errors.contact_method && (
                  <span className="mt-1 text-xs text-red-600">{errors.contact_method.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.letterStatus')}</span>
                <select
                  {...register('letter_status')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                >
                  {letterStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.letter_status && (
                  <span className="mt-1 text-xs text-red-600">{errors.letter_status.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.residences')}</span>
                <input
                  type="number"
                  min={0}
                  {...register('residences_count')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder="0"
                />
                {errors.residences_count && (
                  <span className="mt-1 text-xs text-red-600">{errors.residences_count.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.block')}</span>
                <input
                  type="text"
                  {...register('block')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder={t('buildingsVillages.placeholders.block')}
                />
                {errors.block && <span className="mt-1 text-xs text-red-600">{errors.block.message}</span>}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.assignedAt')}</span>
                <input
                  type="date"
                  {...register('assigned_at')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                />
                {errors.assigned_at && (
                  <span className="mt-1 text-xs text-red-600">{errors.assigned_at.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">{t('buildingsVillages.fields.returnedAt')}</span>
                <input
                  type="date"
                  {...register('returned_at')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                />
                {errors.returned_at && (
                  <span className="mt-1 text-xs text-red-600">{errors.returned_at.message}</span>
                )}
              </label>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  {t('buildingsVillages.fields.letterHistory')}
                </span>
                <button
                  type="button"
                  onClick={handleAddLetterHistory}
                  className="self-start rounded-lg border border-blue-500 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500/20"
                >
                  {t('buildingsVillages.letterHistory.add')}
                </button>
              </div>

              {letterHistoryFields.length === 0 ? (
                <p className="rounded-xl border border-dashed border-black/10 px-3 py-2 text-xs text-neutral-500 dark:border-white/10 dark:text-neutral-400">
                  {t('buildingsVillages.letterHistory.empty')}
                </p>
              ) : (
                <div className="space-y-3">
                  {letterHistoryFields.map((field, index) => (
                    <div
                      key={field.fieldId}
                      className="space-y-2 rounded-xl border border-black/10 p-3 shadow-sm dark:border-white/10 dark:bg-neutral-950/40"
                    >
                      <input type="hidden" {...register(`letter_history.${index}.id` as const)} />
                      <div className="grid gap-3 sm:grid-cols-3">
                        <label className="flex flex-col text-xs font-medium text-neutral-600 dark:text-neutral-300">
                          <span className="mb-1">{t('buildingsVillages.letterHistory.sentAt')}</span>
                          <input
                            type="date"
                            {...register(`letter_history.${index}.sent_at` as const)}
                            className="w-full rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-900"
                          />
                        </label>
                        <label className="flex flex-col text-xs font-medium text-neutral-600 dark:text-neutral-300">
                          <span className="mb-1">{t('buildingsVillages.letterHistory.status')}</span>
                          <select
                            {...register(`letter_history.${index}.status` as const)}
                            className="w-full rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-900"
                          >
                            {letterStatusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <div className="flex items-end justify-end">
                          <button
                            type="button"
                            onClick={() => removeLetterHistory(index)}
                            className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/40"
                          >
                            {t('buildingsVillages.letterHistory.remove')}
                          </button>
                        </div>
                      </div>
                      <label className="flex flex-col text-xs font-medium text-neutral-600 dark:text-neutral-300">
                        <span className="mb-1">{t('buildingsVillages.letterHistory.notes')}</span>
                        <textarea
                          rows={2}
                          {...register(`letter_history.${index}.notes` as const)}
                          className="w-full rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-900"
                          placeholder={t('buildingsVillages.letterHistory.notesPlaceholder')}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
              <span className="mb-1">{t('buildingsVillages.fields.notes')}</span>
              <textarea
                rows={3}
                {...register('notes')}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                placeholder={t('buildingsVillages.placeholders.notes')}
              />
              {errors.notes && <span className="mt-1 text-xs text-red-600">{errors.notes.message}</span>}
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? t('app.saving')
                  : t(editing ? 'common.update' : 'common.create')}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

