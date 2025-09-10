import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Territorio, Endereco } from '../../../models';
import TerritoriosTable from './TerritoriosTable';
import HistoricoTerritorio from './HistoricoTerritorio';
import { useToast } from './ui/toast';
import { useConfirm } from './ui/confirm-dialog';

export default function TerritoriosPage(){
  const [lista, setLista] = useState<Territorio[]>([]);
  const [descricao, setDescricao] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [lat, setLat] = useState<string>('');
  const [lon, setLon] = useState<string>('');
  const [edit, setEdit] = useState<Territorio|null>(null);
  const { toast, dismiss } = useToast();
  const confirm = useConfirm();

  async function carregar(){ setLista(await api.territorios.listar()); }
  useEffect(()=>{ carregar(); }, []);

  function resetForm(){
    setDescricao(''); setRua(''); setNumero(''); setLat(''); setLon(''); setEdit(null);
  }

  async function adicionarOuSalvar(){
    if (!descricao.trim()){ toast('Preencha a descrição.', 'error'); return; }
    const endereco:Endereco[] = rua ? [{ rua, numero }] : [];
    const nlat = lat.trim()==='' ? null : Number(lat);
    const nlon = lon.trim()==='' ? null : Number(lon);
    const t = toast(edit ? 'Atualizando...' : 'Adicionando...', 'loading');
    try{
      if (edit){
        await api.territorios.editar(edit.id, descricao.trim(), isNaN(nlat as any)?null:nlat, isNaN(nlon as any)?null:nlon, endereco);
        toast('Território atualizado!', 'success');
      } else {
        await api.territorios.adicionar(descricao.trim(), isNaN(nlat as any)?null:nlat, isNaN(nlon as any)?null:nlon, endereco);
        toast('Território adicionado!', 'success');
      }
      resetForm(); await carregar();
    } catch(err:any){
      toast(`Erro: ${err.message||err}`, 'error');
    } finally { dismiss(t); }
  }

  function onEditar(t:Territorio){
    setEdit(t);
    setDescricao(t.descricao);
    setRua(t.enderecos?.[0]?.rua || '');
    setNumero(t.enderecos?.[0]?.numero || '');
    setLat(t.latitude?.toString() || '');
    setLon(t.longitude?.toString() || '');
  }

  async function onDeletar(id:number){
    const ok = await confirm({ title: 'Excluir território?', description: 'Esta ação não pode ser desfeita.' });
    if (!ok) return;
    const t = toast('Excluindo...', 'loading');
    try{
      await api.territorios.deletar(id);
      toast('Território excluído!', 'success');
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
        await api.territorios.importarCSV(filePaths[0]);
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
      const r = await api.territorios.exportarCSV();
      toast(r && !r.canceled ? 'Exportação concluída!' : 'Exportação cancelada.', r && !r.canceled ? 'success' : 'error');
    } catch(err:any){
      toast(`Erro na exportação: ${err.message||err}`, 'error');
    } finally { dismiss(t); }
  }

  return (
    <div className="wrap">
      <h1>Gerenciar Territórios</h1>

      <div className="card">
        <h2>Cadastro de Territórios</h2>
        <div className="row" style={{gap:8, flexWrap:'wrap'}}>
          <input placeholder="Ex: 1" value={descricao} onChange={e=>setDescricao(e.target.value)} />
          <button onClick={adicionarOuSalvar}>{edit ? 'Salvar Alterações' : 'Adicionar'}</button>
          {edit && <button onClick={resetForm}>Cancelar</button>}
        </div>
      </div>

      <TerritoriosTable data={lista} onEditar={onEditar} onDeletar={onDeletar} />

      <div className="card">
        <h2>Exportar / Importar</h2>
        <div className="row" style={{gap:8, flexWrap:'wrap'}}>
          <button onClick={exportarCSV}><span className="material-icons">file_upload</span> Exportar Territórios em CSV</button>
          <button onClick={importarCSV}><span className="material-icons">file_download</span> Importar CSV</button>
        </div>
      </div>

      <HistoricoTerritorio />
    </div>
  );
}
