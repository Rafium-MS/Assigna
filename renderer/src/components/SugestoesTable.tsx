import { useMemo } from 'react';
import type { Saida, Territorio } from '../../../models';

export type Sugestao = {
  saida: Saida;
  territorios: Territorio[];
};

type Props = {
  sugestoes: Sugestao[];
  dataDesignacao: string;
  dataDevolucao: string;
  aplicandoId?: string | null;          // para desabilitar botão durante ação
  onAplicar: (saidaId:number, territorioId:number)=>void;
};

export default function SugestoesTable({
  sugestoes, dataDesignacao, dataDevolucao, aplicandoId, onAplicar
}: Props) {
  const temSugestoes = useMemo(() => sugestoes?.some(s => s.territorios.length>0), [sugestoes]);

  return (
    <div className="card">
      <h2>Sugestões Geradas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <caption className="sr-only">Tabela de Sugestões</caption>
          <thead className="bg-gray-100 text-gray-700 hidden sm:table-header-group">
            <tr>
              <th scope="col" className="px-4 py-2 text-left font-medium">Saída</th>
              <th scope="col" className="px-4 py-2 text-left font-medium">Territórios Sugeridos</th>
              <th scope="col" className="px-4 py-2 text-left font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sugestoes.map(item => {
              const selectId = `sel-${item.saida.id}`;
              const aplicando = aplicandoId === String(item.saida.id);
              return (
                <tr key={item.saida.id} className="block sm:table-row border border-gray-200 rounded mb-2 sm:border-0 sm:rounded-none">
                  <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                    <span className="font-semibold sm:hidden">Saída</span>
                    {item.saida.nome} ({item.saida.dia_semana})
                  </td>
                  <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                    <span className="font-semibold sm:hidden">Territórios Sugeridos</span>
                    {item.territorios.length ? (
                      <select id={selectId} defaultValue={item.territorios[0].id}>
                        {item.territorios.map(t => (
                          <option key={t.id} value={t.id}>{t.descricao}</option>
                        ))}
                      </select>
                    ) : (
                      <span>Nenhum disponível</span>
                    )}
                  </td>
                  <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                    <span className="font-semibold sm:hidden">Ações</span>
                    <div>
                      <button
                        disabled={!item.territorios.length || aplicando}
                        onClick={() => {
                          const el = document.getElementById(selectId) as HTMLSelectElement | null;
                          const territorioId = Number(el?.value);
                          onAplicar(item.saida.id, territorioId);
                        }}
                      >
                        {aplicando ? 'Aplicando...' : 'Aplicar Sugestão'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {!sugestoes.length && (
              <tr className="block sm:table-row">
                <td colSpan={3} className="px-2 py-2 sm:px-4 sm:py-2">Gere sugestões informando o período.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {sugestoes.length>0 && !temSugestoes && (
        <p style={{marginTop:8}}>Nenhum território disponível para nenhuma saída neste período.</p>
      )}
    </div>
  );
}
