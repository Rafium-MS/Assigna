import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useConfirm } from '../components/feedback/ConfirmDialog';
import { Card, Button, ImagePicker, Input, Label } from '../components/ui';
import { useTerritorios } from '../hooks/useTerritorios';
import type { Territorio } from '../types/territorio';

const territorySchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  imagem: z.string().optional(),
});

type TerritoryForm = z.infer<typeof territorySchema>;

const pageSize = 5;

const TerritoriesPage: React.FC = () => {
  const { territorios, addTerritorio, removeTerritorio, updateTerritorio } = useTerritorios();
  const confirm = useConfirm();

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
      <Card title={editingId ? 'Editar Território' : 'Cadastrar Território'}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-3">
          <div className="grid gap-1">
            <Label>Nome</Label>
            <Input {...register('nome')} placeholder="Ex.: Território 12 – Centro" />
            {errors.nome && <p className="text-sm text-red-600">{errors.nome.message}</p>}
          </div>
          <div className="grid gap-1 md:col-span-2">
            <Label>Imagem (opcional)</Label>
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
                className="bg-neutral-100"
              >
                Cancelar
              </Button>
            )}
            <Button type="submit" className="bg-black text-white">
              {editingId ? 'Atualizar' : 'Salvar Território'}
            </Button>
          </div>
        </form>
      </Card>

      <Card
        title={`Territórios (${filtered.length})`}
        actions={
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Buscar..."
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
              Com imagem
            </label>
          </div>
        }
      >
        {filtered.length === 0 ? (
          <p className="text-neutral-500">Nenhum território cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Nome</th>
                  <th>Imagem</th>
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
                        '—'
                      )}
                    </td>
                    <td className="py-2 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button onClick={() => startEdit(territorio)} className="bg-neutral-100">
                          Editar
                        </Button>
                        <Button
                          onClick={async () => {
                            if (await confirm('Excluir território?')) {
                              await removeTerritorio(territorio.id);
                            }
                          }}
                          className="bg-red-50 text-red-700"
                        >
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-neutral-500">Página {page} de {pageCount}</span>
              <div className="flex gap-2">
                <Button type="button" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
                  Anterior
                </Button>
                <Button
                  type="button"
                  disabled={page === pageCount}
                  onClick={() => setPage((value) => value + 1)}
                >
                  Próxima
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
