import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BuildingVillage } from '../types/building_village';
import type { Territorio } from '../types/territorio';
import { BuildingVillageRepository } from '../services/repositories/buildings_villages';
import { TerritorioRepository } from '../services/repositories/territorios';
import { Modal } from '../components/layout/Modal';
import { useToast } from '../components/feedback/Toast';
import { useConfirm } from '../components/feedback/ConfirmDialog';

const buildingVillageSchema = z.object({
  id: z.string().optional(),
  territory_id: z.string().min(1, 'Selecione um território'),
  name: z.string().trim().min(1, 'Informe o nome do prédio ou vila'),
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
        message: 'Informe um número válido'
      }
    ),
  modality: z.string().trim().optional(),
  reception_type: z.string().trim().optional(),
  responsible: z.string().trim().optional(),
  assigned_at: z.string().optional(),
  returned_at: z.string().optional(),
  block: z.string().trim().optional(),
  notes: z.string().trim().optional()
});

type BuildingVillageFormValues = z.infer<typeof buildingVillageSchema>;

type Filters = {
  search: string;
  territory: string;
  type: string;
  modality: string;
};

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
  assigned_at: '',
  returned_at: '',
  block: '',
  notes: ''
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BuildingVillageFormValues>({
    resolver: zodResolver(buildingVillageSchema),
    defaultValues: emptyFormValues
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
        toast.error('Não foi possível carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [toast]);

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
            item.notes
          ]
            .filter(Boolean)
            .some((value) => value!.toLowerCase().includes(term));

        const matchesTerritory = filters.territory === 'all' || item.territory_id === filters.territory;
        const matchesType = filters.type === 'all' || item.type === filters.type;
        const matchesModality = filters.modality === 'all' || item.modality === filters.modality;

        return matchesSearch && matchesTerritory && matchesType && matchesModality;
      })
      .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  }, [filters, villages]);

  const handleDelete = async (item: BuildingVillage) => {
    const confirmed = await confirm('Deseja realmente remover este registro?');
    if (!confirmed) return;
    try {
      await BuildingVillageRepository.remove(item.id);
      setVillages((prev) => prev.filter((v) => v.id !== item.id));
      toast.success('Registro removido com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Não foi possível remover o registro');
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
      assigned_at: getDateInputValue(item.assigned_at),
      returned_at: getDateInputValue(item.returned_at),
      block: item.block ?? '',
      notes: item.notes ?? ''
    });
    setIsModalOpen(true);
  };

  const onSubmit = handleSubmit(async (values) => {
    const entity: BuildingVillage = {
      id: values.id ?? editing?.id ?? createId(),
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
      toast.success(editing ? 'Registro atualizado com sucesso' : 'Registro criado com sucesso');
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error('Não foi possível salvar o registro');
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Prédios e Vilas</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Cadastre, filtre e organize informações sobre prédios, vilas e condomínios do território.
          </p>
        </div>
        <button
          type="button"
          onClick={openForCreate}
          className="self-start rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          Novo registro
        </button>
      </div>

      <section className="rounded-2xl border border-black/5 bg-white/70 p-4 shadow backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
        <h2 className="mb-4 text-lg font-semibold">Filtros</h2>
        <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
          <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <span className="mb-1">Buscar</span>
            <input
              type="search"
              value={filters.search}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, search: event.target.value }))
              }
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
              placeholder="Nome, responsável ou endereço"
            />
          </label>
          <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <span className="mb-1">Território</span>
            <select
              value={filters.territory}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, territory: event.target.value }))
              }
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
            >
              <option value="all">Todos</option>
              {territories.map((territory) => (
                <option key={territory.id} value={territory.id}>
                  {territory.nome}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <span className="mb-1">Tipo</span>
            <select
              value={filters.type}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, type: event.target.value }))
              }
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
            >
              <option value="all">Todos</option>
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <span className="mb-1">Modalidade</span>
            <select
              value={filters.modality}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, modality: event.target.value }))
              }
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
            >
              <option value="all">Todas</option>
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
          <h2 className="text-lg font-semibold">Registros</h2>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {filteredVillages.length} encontrado{filteredVillages.length === 1 ? '' : 's'}
          </span>
        </div>
        {loading ? (
          <div className="rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
            Carregando registros...
          </div>
        ) : filteredVillages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
            Nenhum registro encontrado com os filtros aplicados.
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
                      {item.name || 'Sem nome'}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {territoryNameById[item.territory_id] ?? 'Território não informado'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openForEdit(item)}
                      className="rounded-lg border border-black/10 px-2 py-1 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(item)}
                      className="rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-600 shadow-sm transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/50"
                    >
                      Remover
                    </button>
                  </div>
                </header>
                <dl className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {item.address_line && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Endereço</dt>
                      <dd>{item.address_line}</dd>
                    </div>
                  )}
                  {item.number && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Número</dt>
                      <dd>{item.number}</dd>
                    </div>
                  )}
                  {item.type && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Tipo</dt>
                      <dd>{item.type}</dd>
                    </div>
                  )}
                  {item.modality && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Modalidade</dt>
                      <dd>{item.modality}</dd>
                    </div>
                  )}
                  {item.reception_type && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Recepção</dt>
                      <dd>{item.reception_type}</dd>
                    </div>
                  )}
                  {item.residences_count !== null && item.residences_count !== undefined && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Residências</dt>
                      <dd>{item.residences_count}</dd>
                    </div>
                  )}
                  {item.responsible && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Responsável</dt>
                      <dd>{item.responsible}</dd>
                    </div>
                  )}
                  {item.assigned_at && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Designado em</dt>
                      <dd>{formatDate(item.assigned_at)}</dd>
                    </div>
                  )}
                  {item.returned_at && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Devolvido em</dt>
                      <dd>{formatDate(item.returned_at)}</dd>
                    </div>
                  )}
                  {item.block && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Bloco</dt>
                      <dd>{item.block}</dd>
                    </div>
                  )}
                  {item.notes && (
                    <div>
                      <dt className="font-medium text-neutral-500 dark:text-neutral-400">Observações</dt>
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
                {editing ? 'Editar registro' : 'Novo registro'}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Preencha os campos abaixo para {editing ? 'atualizar' : 'cadastrar'} o prédio ou vila.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full border border-black/10 px-2 py-1 text-xs text-neutral-500 transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              Fechar
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">Território *</span>
                <select
                  {...register('territory_id')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                >
                  <option value="">Selecione um território</option>
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
                <span className="mb-1">Nome *</span>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder="Identificação do prédio ou vila"
                />
                {errors.name && <span className="mt-1 text-xs text-red-600">{errors.name.message}</span>}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">Endereço</span>
                <input
                  type="text"
                  {...register('address_line')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder="Rua, avenida ou referência"
                />
                {errors.address_line && (
                  <span className="mt-1 text-xs text-red-600">{errors.address_line.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">Número</span>
                <input
                  type="text"
                  {...register('number')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder="Número do imóvel"
                />
                {errors.number && <span className="mt-1 text-xs text-red-600">{errors.number.message}</span>}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">Tipo</span>
                <input
                  type="text"
                  {...register('type')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder="Prédio, vila, condomínio..."
                />
                {errors.type && <span className="mt-1 text-xs text-red-600">{errors.type.message}</span>}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">Modalidade</span>
                <input
                  type="text"
                  {...register('modality')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder="Condomínio, vila fechada..."
                />
                {errors.modality && <span className="mt-1 text-xs text-red-600">{errors.modality.message}</span>}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">Tipo de recepção</span>
                <input
                  type="text"
                  {...register('reception_type')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder="Portaria, interfone..."
                />
                {errors.reception_type && (
                  <span className="mt-1 text-xs text-red-600">{errors.reception_type.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">Responsável</span>
                <input
                  type="text"
                  {...register('responsible')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder="Nome do síndico, porteiro..."
                />
                {errors.responsible && (
                  <span className="mt-1 text-xs text-red-600">{errors.responsible.message}</span>
                )}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">Quantidade de residências</span>
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
                <span className="mb-1">Bloco</span>
                <input
                  type="text"
                  {...register('block')}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                  placeholder="Identificação do bloco"
                />
                {errors.block && <span className="mt-1 text-xs text-red-600">{errors.block.message}</span>}
              </label>

              <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span className="mb-1">Designado em</span>
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
                <span className="mb-1">Devolvido em</span>
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

            <label className="flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300">
              <span className="mb-1">Observações</span>
              <textarea
                rows={3}
                {...register('notes')}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950"
                placeholder="Detalhes relevantes, horários, instruções de acesso..."
              />
              {errors.notes && <span className="mt-1 text-xs text-red-600">{errors.notes.message}</span>}
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Salvando...' : editing ? 'Atualizar' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

