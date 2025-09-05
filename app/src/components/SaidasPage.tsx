import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Saida } from '../types';
import SaidasTable from './SaidasTable';
import HistoricoSaida from './HistoricoSaida';

const DIAS = ['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado','Domingo'];

export default function SaidasPage(){
  const [saidas, setSaidas] = useState<Saida[]>([]);
  const [nome, setNome] = useState('');
  const [dia, setDia] = useState('');
  const [editId, setEditId] = useState<number|null>(null);
  const [loading, setLoading] = useState(false);

  async function carregar(){ setSaidas(await api.saidas.listar()); }
  useEffect(()=>{ carregar(); }, []);

  function resetForm(){ setNome(''); setDia(''); setEditId(null); }

  async function add(){
    if (!nome || !dia) { alert('Preencha todos os campos.'); return; }
    setLoading(true);
    try{
      await api.saidas.adicionar(nome, dia);
      alert('Saída adicionada!');
      resetForm(); await carregar();
    } finally { setLoading(false); }
  }

  async function salvar(){
    if (!editId || !nome || !dia) { alert('Preencha todos os campos.'); return; }
    setLoading(true);
    try{
      await api.saidas.editar(editId, nome, dia);
      alert('Saída atualizada!');
      resetForm(); await carregar();
    } finally { setLoading(false); }
  }

  async function onEditar(id:number){
    const item = saidas.find(s=>s.id===id);
    if (!item) { alert('Saída não encontrada.'); return; }
    setEditId(item.id); setNome(item.nome); setDia(item.dia_semana);
  }

  async function onDeletar(id:number){
    if (!confirm('Deseja realmente excluir esta saída?')) return;
    await api.saidas.deletar(id);
    alert('Saída excluída!'); await carregar();
  }

  async function importarCSV(){
    const { canceled, filePaths } = await api.app.abrirDialogoCSV();
    if (!canceled && filePaths?.length){
      await api.saidas.importarCSV(filePaths[0]);
      alert('Importação concluída!'); await carregar();
    }
  }

  async function exportarCSV(){
    const r = await api.saidas.exportarCSV();
    alert(r && !r.canceled ? 'Exportação concluída!' : 'Exportação cancelada.');
  }

  return (
    <div className="wrap">
      <h1>Gerenciar Saídas de Campo</h1>

      <div className="card">
        <h2>Cadastro de Saídas</h2>
        <div className="row" style={{gap:8, flexWrap:'wrap'}}>
          <input placeholder="Nome da Saída" value={nome} onChange={e=>setNome(e.target.value)} />
          <select value={dia} onChange={e=>setDia(e.target.value)}>
            <option value="">Dia da semana</option>
            {DIAS.map(d=><option key={d} value={d}>{d}</option>)}
          </select>
          {editId
            ? (<>
                 <button disabled={loading} onClick={salvar}>Salvar Alterações</button>
                 <button onClick={resetForm}>Cancelar</button>
               </>)
            : (<button disabled={loading} onClick={add}>Adicionar</button>)
          }
        </div>
      </div>

      <SaidasTable data={saidas} onEditar={onEditar} onDeletar={onDeletar} />

      <div className="card">
        <h2>Exportar / Importar</h2>
        <div className="row" style={{gap:8, flexWrap:'wrap'}}>
          <button onClick={exportarCSV}>Exportar Saídas em CSV</button>
          <button onClick={importarCSV}>Importar CSV</button>
        </div>
      </div>

      <HistoricoSaida />
    </div>
  );
}
