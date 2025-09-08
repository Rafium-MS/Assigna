import type { Designacao } from '../../../models';

function formatBR(iso:string){
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yy = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
}

type Props = { data: Designacao[] };

export default function ReportsTable({ data }: Props){
  return (
    <div className="card">
      <h2>📋 Dados do Relatório</h2>
      <table>
        <thead>
          <tr>
            <th>Território</th>
            <th>Saída</th>
            <th>Designação</th>
            <th>Devolução</th>
          </tr>
        </thead>
        <tbody id="relatorio-table">
          {data.length === 0 && (
            <tr><td colSpan={4}>Nenhuma designação encontrada.</td></tr>
          )}
          {data.map((d)=>(
            <tr key={d.id}>
              <td>{d.territorio}</td>
              <td>{d.saida} ({d.dia_semana})</td>
              <td>{formatBR(d.data_designacao)}</td>
              <td>{formatBR(d.data_devolucao)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
