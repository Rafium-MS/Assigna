import type { Designacao } from '../../../models';

type Props = {
  data: Designacao[];
  ordenarPor: (k:any)=>void;
  sortKey: string;
  asc: boolean;
  onEditar: (id:number)=>void;
  onDeletar: (id:number)=>void;
};

function th(label:string, key:string, sortKey:string, asc:boolean, ordenarPor:(k:any)=>void) {
  return (
    <th
      scope="col"
      className="px-4 py-2 text-left font-medium cursor-pointer"
      onClick={()=>ordenarPor(key)}
    >
      {label} {sortKey===key ? (asc?'⬆':'⬇') : '⬍'}
    </th>
  );
}

function formatBR(iso:string){ const [y,m,d]=iso.split('-'); return `${d}/${m}/${y}`; }

export default function DesignacaoTable({data, ordenarPor, sortKey, asc, onEditar, onDeletar}:Props){
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <caption className="sr-only">Tabela de Designações</caption>
        <thead className="bg-gray-100 text-gray-700 hidden sm:table-header-group">
          <tr>
            {th('ID','id',sortKey,asc,ordenarPor)}
            {th('Território','territorio',sortKey,asc,ordenarPor)}
            {th('Saída','saida',sortKey,asc,ordenarPor)}
            {th('Dia','dia_semana',sortKey,asc,ordenarPor)}
            {th('Designação','data_designacao',sortKey,asc,ordenarPor)}
            {th('Devolução','data_devolucao',sortKey,asc,ordenarPor)}
            <th scope="col" className="px-4 py-2 text-left font-medium">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map(item=>(
            <tr key={item.id} className="block sm:table-row border border-gray-200 rounded mb-2 sm:border-0 sm:rounded-none">
              <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                <span className="font-semibold sm:hidden">ID</span>
                {item.id}
              </td>
              <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                <span className="font-semibold sm:hidden">Território</span>
                {item.territorio}
              </td>
              <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                <span className="font-semibold sm:hidden">Saída</span>
                {item.saida}
              </td>
              <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                <span className="font-semibold sm:hidden">Dia</span>
                {item.dia_semana}
              </td>
              <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                <span className="font-semibold sm:hidden">Designação</span>
                {formatBR(item.data_designacao)}
              </td>
              <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                <span className="font-semibold sm:hidden">Devolução</span>
                {formatBR(item.data_devolucao)}
              </td>
              <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                <span className="font-semibold sm:hidden">Ações</span>
                <div className="space-x-2">
                  <button onClick={()=>onEditar(item.id)}>Editar</button>
                  <button onClick={()=>onDeletar(item.id)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
