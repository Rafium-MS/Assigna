import type { Saida } from '../../../app/src/types';

type Props = {
  data: Saida[];
  onEditar: (id:number)=>void;
  onDeletar: (id:number)=>void;
};

export default function SaidasTable({ data, onEditar, onDeletar }: Props){
  return (
    <div className="card">
      <h2>Lista de Saídas</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Dia</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {data.map(s=>(
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.nome}</td>
              <td>{s.dia_semana}</td>
              <td>
                <button onClick={()=>onEditar(s.id)}>Editar</button>
                <button onClick={()=>onDeletar(s.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {data.length===0 && <tr><td colSpan={4}>Nenhuma saída cadastrada.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
