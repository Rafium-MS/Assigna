import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Saida } from '../../../models';
import SaidasTable from './SaidasTable';
import HistoricoSaida from './HistoricoSaida';
import { useToast } from './ui/toast';
import { useConfirm } from './ui/confirm-dialog';

const DIAS = ['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado','Domingo'];

export default function SaidasPage(){
  const [saidas, setSaidas] = useState<Saida[]>([]);
  const [nome, setNome] = useState('');
  const [dia, setDia] = useState('');
  const [editId, setEditId] = useState<number|null>(null);
  const [loading, setLoading] = useState(false);
  const { toast, dismiss } = useToast();
  const confirm = useConfirm();

  async function carregar(){ setSaidas(await api.saidas.listar()); }
  useEffect(()=>{ carregar(); }, []);

  function resetForm(){ setNome(''); setDia(''); setEditId(null); }

  async function add(){
    if (!nome || !dia) { toast('Preencha todos os campos.', 'error'); return; }
    setLoading(true);
    const t = toast('Adicionando saída...', 'loading');
    try{
      await api.saidas.adicionar(nome, dia);
      toast('Saída adicionada!', 'success');
      resetForm(); await carregar();
    } catch(err:any){
      toast(`Erro ao adicionar: ${err.message||err}`, 'error');
    } finally { dismiss(t); setLoading(false); }
  }

  async function salvar(){
    if (!editId || !nome || !dia) { toast('Preencha todos os campos.', 'error'); return; }
    setLoading(true);
    const t = toast('Salvando...', 'loading');
    try{
      await api.saidas.editar(editId, nome, dia);
      toast('Saída atualizada!', 'success');
      resetForm(); await carregar();
    } catch(err:any){
      toast(`Erro ao atualizar: ${err.message||err}`, 'error');
    } finally { dismiss(t); setLoading(false); }
  }

  async function onEditar(id:number){
    const item = saidas.find(s=>s.id===id);
    if (!item) { toast('Saída não encontrada.', 'error'); return; }
    setEditId(item.id); setNome(item.nome); setDia(item.dia_semana);
  }

  async function onDeletar(id:number){
    const ok = await confirm({ title: 'Excluir saída?', description: 'Esta ação não pode ser desfeita.' });
    if (!ok) return;
    const t = toast('Excluindo...', 'loading');
    try{
      await api.saidas.deletar(id);
      toast('Saída excluída!', 'success');
      await carregar();
    } catch(err:any){
      toast(`Erro ao excluir: ${err.message||err}`, 'error');
    } finally { dismiss(t); }
  }

  async function importarCSV(){
    const { canceled, filePaths } = await api.app.abrirDialogoCSV();
    if (!canceled && filePaths?.length){
      const t = toast('Importando...', 'loading');
      try{
        await api.saidas.importarCSV(filePaths[0]);
        toast('Importação concluída!', 'success');
        await carregar();
      } catch(err:any){
        toast(`Erro na importação: ${err.message||err}`, 'error');
      } finally { dismiss(t); }
    }
  }

  async function exportarCSV(){
    const t = toast('Exportando...', 'loading');
    try{
      const r = await api.saidas.exportarCSV();
      toast(r && !r.canceled ? 'Exportação concluída!' : 'Exportação cancelada.', r && !r.canceled ? 'success' : 'error');
    } catch(err:any){
      toast(`Erro na exportação: ${err.message||err}`, 'error');
    } finally { dismiss(t); }
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
