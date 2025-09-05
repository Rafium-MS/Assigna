import { useEffect, useState } from 'react';
import { api } from '../../../app/src/services/api';
import type { Saida, HistoricoSaida } from '../../../app/src/types';

function formatBR(iso:string){
  const [y,m,d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export default function HistoricoSaida(){
  const [saidas, setSaidas] = useState<Saida[]>([]);
  const [saidaId, setSaidaId] = useState<number|''>('');
  const [linhas, setLinhas] = useState<HistoricoSaida[]>([]);

  useEffect(() => { (async ()=>{
    const ss = await api.saidas.listar();
    setSaidas(ss);
    if (ss[0]) setSaidaId(ss[0].id);
  })(); }, []);

  async function carregar(){
    if (!saidaId) return;
    const h = await api.designacoes.historicoSaida(Number(saidaId));
    setLinhas(h);
  }

  return (
    <div className="card">
      <h2>Histórico da Saída</h2>
      <div className="row" style={{gap:8}}>
        <label>Selecionar Saída:&nbsp;
          <select value={saidaId||''} onChange={e=>setSaidaId(Number(e.target.value)||'')}>
            {saidas.map(s=><option key={s.id} value={s.id}>{s.nome} ({s.dia_semana})</option>)}
          </select>
        </label>
        <button onClick={carregar}>Ver Histórico</button>
      </div>
      <table>
        <thead>
          <tr><th>Território</th><th>Designação</th><th>Devolução</th></tr>
        </thead>
        <tbody>
          {linhas.map((h,i)=>(
            <tr key={i}>
              <td>{h.territorio}</td>
              <td>{formatBR(h.data_designacao)}</td>
              <td>{formatBR(h.data_devolucao)}</td>
            </tr>
          ))}
          {linhas.length===0 && <tr><td colSpan={3}>—</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
