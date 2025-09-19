import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useConfirm } from '../components/feedback/ConfirmDialog';
import { Card, Button, ImagePicker, Input, Label } from '../components/ui';
import { useTerritorios } from '../hooks/useTerritorios';
import type { Territorio } from '../types/territorio';

const territorySchema = z.object({
  nome: z.string().min(1, 'territories.validation.nameRequired'),
  imagem: z.string().optional(),
});

type TerritoryForm = z.infer<typeof territorySchema>;

const pageSize = 5;

const TerritoriesPage: React.FC = () => {
  const { territorios, addTerritorio, removeTerritorio, updateTerritorio } = useTerritorios();
  const confirm = useConfirm();
  const { t } = useTranslation();

  const { register, handleSubmit, reset, setValue, watch, formState } = useForm<TerritoryForm>({
    resolver: zodResolver(territorySchema),
    defaultValues: { nome: '', imagem: undefined },
  });
  const { errors } = formState;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [onlyWithImage, setOnlyWithImage] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = territorios.filter(
    (territorio) =>
      territorio.nome.toLowerCase().includes(search.toLowerCase()) &&
      (!onlyWithImage || Boolean(territorio.imagem || territorio.imageUrl)),
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const onSubmit = async (data: TerritoryForm) => {
    if (editingId) {
      await updateTerritorio(editingId, data);
    } else {
      await addTerritorio(data);
    }
    reset();
    setEditingId(null);
  };

  const startEdit = (territorio: Territorio) => {
    setEditingId(territorio.id);
    reset({ nome: territorio.nome, imagem: territorio.imagem ?? territorio.imageUrl });
  };

  return (
    <div className="grid gap-4">
      <Card title={t(editingId ? 'territories.editTerritory' : 'territories.createTerritory')}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-3">
          <div className="grid gap-1">
            <Label>{t('territories.name')}</Label>
            <Input {...register('nome')} placeholder={t('territories.namePlaceholder')} />
            {errors.nome?.message && <p className="text-sm text-red-600">{t(errors.nome.message)}</p>}
          </div>
          <div className="grid gap-1 md:col-span-2">
            <Label>{t('territories.optionalImage')}</Label>
            <ImagePicker value={watch('imagem')} onChange={(value) => setValue('imagem', value)} compress />
          </div>
          <div className="md:col-span-3 flex justify-end gap-2">
            {editingId && (
              <Button
                type="button"
                onClick={() => {
                  reset();
                  setEditingId(null);
                }}
                className="bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700"
              >
                {t('common.cancel')}
              </Button>
            )}
            <Button type="submit" className="bg-black text-white">
              {editingId ? t('common.update') : t('territories.saveTerritory')}
            </Button>
          </div>
        </form>
      </Card>

      <Card
        title={t('territories.territoriesWithCount', { count: filtered.length })}
        actions={
          <div className="flex gap-2 items-center">
            <Input
              placeholder={t('territories.searchPlaceholder')}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="max-w-xs"
            />
            <label className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={onlyWithImage}
                onChange={(event) => {
                  setOnlyWithImage(event.target.checked);
                  setPage(1);
                }}
              />
              {t('territories.withImage')}
            </label>
          </div>
        }
      >
        {filtered.length === 0 ? (
          <p className="text-neutral-500">{t('territories.noTerritories')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">{t('territories.name')}</th>
                  <th>{t('territories.image')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((territorio) => (
                  <tr key={territorio.id} className="border-b last:border-0">
                    <td className="py-2">{territorio.nome}</td>
                    <td>
                      {territorio.imagem || territorio.imageUrl ? (
                        <img
                          src={territorio.imagem || territorio.imageUrl}
                          alt={territorio.nome}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ) : (
                        t('territories.noImagePlaceholder')
                      )}
                    </td>
                    <td className="py-2 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={() => startEdit(territorio)}
                          className="bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700"
                        >
                          {t('common.edit')}
                        </Button>
                        <Button
                          onClick={async () => {
                            if (await confirm(t('territories.confirmDelete'))) {
                              await removeTerritorio(territorio.id);
                            }
                          }}
                          className="bg-red-50 text-red-700"
                        >
                          {t('common.delete')}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-neutral-500">{t('territories.pageInfo', { page, pageCount })}</span>
              <div className="flex gap-2">
                <Button type="button" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
                  {t('common.previous')}
                </Button>
                <Button
                  type="button"
                  disabled={page === pageCount}
                  onClick={() => setPage((value) => value + 1)}
                >
                  {t('common.next')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TerritoriesPage;
