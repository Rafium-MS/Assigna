import type { Saida } from '../../../models';

type Props = {
  data: Saida[];
  onEditar: (id:number)=>void;
  onDeletar: (id:number)=>void;
};

export default function SaidasTable({ data, onEditar, onDeletar }: Props){
  return (
    <div className="card">
      <h2>Lista de Saídas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <caption className="sr-only">Tabela de Saídas</caption>
          <thead className="bg-gray-100 text-gray-700 hidden sm:table-header-group">
            <tr>
              <th scope="col" className="px-4 py-2 text-left font-medium">ID</th>
              <th scope="col" className="px-4 py-2 text-left font-medium">Nome</th>
              <th scope="col" className="px-4 py-2 text-left font-medium">Dia</th>
              <th scope="col" className="px-4 py-2 text-left font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map(s=>(
              <tr key={s.id} className="block sm:table-row border border-gray-200 rounded mb-2 sm:border-0 sm:rounded-none">
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">ID</span>
                  {s.id}
                </td>
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">Nome</span>
                  {s.nome}
                </td>
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">Dia</span>
                  {s.dia_semana}
                </td>
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">Ações</span>
                  <div className="space-x-2">
                    <button onClick={()=>onEditar(s.id)}>Editar</button>
                    <button onClick={()=>onDeletar(s.id)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length===0 && (
              <tr className="block sm:table-row">
                <td colSpan={4} className="px-2 py-2 sm:px-4 sm:py-2">Nenhuma saída cadastrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
