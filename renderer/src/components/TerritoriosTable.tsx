import type { Territorio, Endereco } from '../../../models';

type Props = {
  data: Territorio[];
  onEditar: (t:Territorio)=>void;
  onDeletar: (id:number)=>void;
};
const EnderecosCell = ({enderecos}:{enderecos:Endereco[]}) => (
  <div>{enderecos.map((e,i)=> <div key={i}>{(e.rua||'')}{e.numero ? ` ${e.numero}`:''}</div>)}</div>
);

export default function TerritoriosTable({ data, onEditar, onDeletar }:Props){
  return (
    <div className="card">
      <h2>Lista de Territórios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <caption className="sr-only">Tabela de Territórios</caption>
          <thead className="bg-gray-100 text-gray-700 hidden sm:table-header-group">
            <tr>
              <th scope="col" className="px-4 py-2 text-left font-medium">ID</th>
              <th scope="col" className="px-4 py-2 text-left font-medium">Descrição</th>
              <th scope="col" className="px-4 py-2 text-left font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map(t=>(
              <tr key={t.id} className="block sm:table-row border border-gray-200 rounded mb-2 sm:border-0 sm:rounded-none">
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">ID</span>
                  {t.id}
                </td>
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">Descrição</span>
                  {t.descricao}
                </td>
                <td className="flex justify-between px-2 py-2 sm:table-cell sm:px-4 sm:py-2">
                  <span className="font-semibold sm:hidden">Ações</span>
                  <div className="space-x-2">
                    <button onClick={()=>onEditar(t)}><span className="material-icons">edit</span> Editar</button>
                    <button onClick={()=>onDeletar(t.id)}><span className="material-icons">delete</span> Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length===0 && (
              <tr className="block sm:table-row">
                <td colSpan={6} className="px-2 py-2 sm:px-4 sm:py-2">Nenhum território cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
