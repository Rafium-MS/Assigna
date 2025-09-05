import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../app/src/services/api';
import type { Territorio, HistoricoLinha } from '../../../app/src/types';

function formatBR(iso:string){ if(!iso) return ''; const [y,m,d]=iso.split('-'); return `${d}/${m}/${y}`; }

export default function HistoricoTerritorio(){
  const [territorios, setTerritorios] = useState<Territorio[]>([]);
  const [territorioId, setTerritorioId] = useState<number|''>('');
  const [historico, setHistorico] = useState<HistoricoLinha[]>([]);
  const [dataVisita, setDataVisita] = useState('');
  const [visitas, setVisitas] = useState<{data_visita:string}[]>([]);
  const [percentStr, setPercentStr] = useState('0%');

  useEffect(()=>{ (async ()=>{
    const ts = await api.territorios.listar();
    setTerritorios(ts);
    if(ts[0]) setTerritorioId(ts[0].id);
  })(); }, []);

  const hasId = useMemo(()=> !!territorioId, [territorioId]);

  async function carregarHistorico(){
    if(!hasId) return;
    const hist = await api.designacoes.historicoTerritorio(Number(territorioId));
    setHistorico(hist);

    const vs = await api.visitas.listar(Number(territorioId));
    setVisitas(vs);

    const cont = await api.visitas.contagens();
    const totalVisitas = cont.reduce((acc:any,c:any)=>acc + c.total, 0);
    const registro = cont.find((c:any)=> c.territorio_id === Number(territorioId));
    const totalTerr = registro ? registro.total : 0;
    const percent = totalVisitas ? (totalTerr / totalVisitas) * 100 : 0;
    setPercentStr(`${totalTerr} (${percent.toFixed(1)}%)`);
  }

  async function registrar(){
    if (!hasId || !dataVisita){ alert('Selecione o território e a data.'); return; }
    await api.visitas.registrar(Number(territorioId), dataVisita);
    await carregarHistorico();
    setDataVisita('');
    alert('Visita registrada!');
  }

  return (
    <div className="card">
      <h2>Histórico do Território</h2>
      <div className="row" style={{gap:8, flexWrap:'wrap'}}>
        <label>Selecionar Território:&nbsp;
          <select value={territorioId||''} onChange={e=>setTerritorioId(Number(e.target.value)||'')}>
            {territorios.map(t=><option key={t.id} value={t.id}>{t.descricao}</option>)}
          </select>
        </label>
        <button onClick={carregarHistorico}>Ver Histórico</button>
        <input type="date" value={dataVisita} onChange={e=>setDataVisita(e.target.value)} />
        <button onClick={registrar}>Registrar Visita</button>
        <p id="contagem-visitas">Total de visitas: {percentStr}</p>
      </div>

      <table>
        <thead><tr><th>Saída</th><th>Designação</th><th>Devolução</th></tr></thead>
        <tbody>
          {historico.map((h,i)=>(
            <tr key={i}>
              <td>{h.saida}</td>
              <td>{formatBR(h.data_designacao)}</td>
              <td>{h.data_devolucao ? formatBR(h.data_devolucao) : ''}</td>
            </tr>
          ))}
          {historico.length===0 && <tr><td colSpan={3}>—</td></tr>}
        </tbody>
      </table>

      <h3>Visitas Registradas</h3>
      <ul>{visitas.map((v,i)=><li key={i}>{v.data_visita}</li>)}</ul>
    </div>
  );
}
