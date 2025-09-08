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
      <table>
        <thead>
          <tr><th>ID</th><th>Descrição</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {data.map(t=>(
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.descricao}</td>
              <td>
                <button onClick={()=>onEditar(t)}><span className="material-icons">edit</span> Editar</button>
                <button onClick={()=>onDeletar(t.id)}><span className="material-icons">delete</span> Excluir</button>
              </td>
            </tr>
          ))}
          {data.length===0 && <tr><td colSpan={6}>Nenhum território cadastrado.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
