import type { Designacao } from '../../../app/src/types';

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
    <th onClick={()=>ordenarPor(key)} style={{cursor:'pointer'}}>
      {label} {sortKey===key ? (asc?'⬆':'⬇') : '⬍'}
    </th>
  );
}

function formatBR(iso:string){ const [y,m,d]=iso.split('-'); return `${d}/${m}/${y}`; }

export default function DesignacaoTable({data, ordenarPor, sortKey, asc, onEditar, onDeletar}:Props){
  return (
    <table>
      <thead>
        <tr>
          {th('ID','id',sortKey,asc,ordenarPor)}
          {th('Território','territorio',sortKey,asc,ordenarPor)}
          {th('Saída','saida',sortKey,asc,ordenarPor)}
          {th('Dia','dia_semana',sortKey,asc,ordenarPor)}
          {th('Designação','data_designacao',sortKey,asc,ordenarPor)}
          {th('Devolução','data_devolucao',sortKey,asc,ordenarPor)}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item=>(
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.territorio}</td>
            <td>{item.saida}</td>
            <td>{item.dia_semana}</td>
            <td>{formatBR(item.data_designacao)}</td>
            <td>{formatBR(item.data_devolucao)}</td>
            <td>
              <button onClick={()=>onEditar(item.id)}>Editar</button>
              <button onClick={()=>onDeletar(item.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
