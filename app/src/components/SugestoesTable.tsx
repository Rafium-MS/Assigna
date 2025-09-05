import { useMemo } from 'react';
import type { Saida, Territorio } from '../types';

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
      <table>
        <thead>
          <tr>
            <th>Saída</th>
            <th>Territórios Sugeridos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sugestoes.map(item => {
            const selectId = `sel-${item.saida.id}`;
            const aplicando = aplicandoId === String(item.saida.id);
            return (
              <tr key={item.saida.id}>
                <td>{item.saida.nome} ({item.saida.dia_semana})</td>
                <td>
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
                <td>
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
                </td>
              </tr>
            );
          })}
          {!sugestoes.length && (
            <tr><td colSpan={3}>Gere sugestões informando o período.</td></tr>
          )}
        </tbody>
      </table>
      {sugestoes.length>0 && !temSugestoes && (
        <p style={{marginTop:8}}>Nenhum território disponível para nenhuma saída neste período.</p>
      )}
    </div>
  );
}
