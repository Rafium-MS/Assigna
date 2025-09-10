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
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <caption className="sr-only">Tabela de Relatório</caption>
          <thead className="bg-gray-100 text-gray-700 hidden sm:table-header-group">
            <tr>
              <th scope="col" className="px-4 py-2 text-left font-medium">Território</th>
              <th scope="col" className="px-4 py-2 text-left font-medium">Saída</th>
              <th scope="col" className="px-4 py-2 text-left font-medium">Designação</th>
              <th scope="col" className="px-4 py-2 text-left font-medium">Devolução</th>
            </tr>
          </thead>
          <tbody id="relatorio-table" className="divide-y divide-gray-200">
            {data.length === 0 && (
              <tr className="block sm:table-row">
                <td colSpan={4} className="px-2 py-2 sm:px-4 sm:py-2">Nenhuma designação encontrada.</td>
              </tr>
            )}
            {data.map((d)=>(
              <tr key={d.id} className="block sm:table-row border border-gray-200 rounded mb-2 sm:border-0 sm:rounded-none">
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">Território</span>
                  {d.territorio}
                </td>
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">Saída</span>
                  {d.saida} ({d.dia_semana})
                </td>
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">Designação</span>
                  {formatBR(d.data_designacao)}
                </td>
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">Devolução</span>
                  {formatBR(d.data_devolucao)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
