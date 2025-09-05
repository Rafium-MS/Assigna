import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Territorio, Endereco } from '../types';
import TerritoriosTable from './TerritoriosTable';
import HistoricoTerritorio from './HistoricoTerritorio';

export default function TerritoriosPage(){
  const [lista, setLista] = useState<Territorio[]>([]);
  const [descricao, setDescricao] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [lat, setLat] = useState<string>('');
  const [lon, setLon] = useState<string>('');
  const [edit, setEdit] = useState<Territorio|null>(null);

  async function carregar(){ setLista(await api.territorios.listar()); }
  useEffect(()=>{ carregar(); }, []);

  function resetForm(){
    setDescricao(''); setRua(''); setNumero(''); setLat(''); setLon(''); setEdit(null);
  }

  async function adicionarOuSalvar(){
    if (!descricao.trim()){ alert('Preencha a descrição.'); return; }
    const endereco:Endereco[] = rua ? [{ rua, numero }] : [];
    const nlat = lat.trim()==='' ? null : Number(lat);
    const nlon = lon.trim()==='' ? null : Number(lon);

    if (edit){
      await api.territorios.editar(edit.id, descricao.trim(), isNaN(nlat as any)?null:nlat, isNaN(nlon as any)?null:nlon, endereco);
      alert('Território atualizado!');
    } else {
      await api.territorios.adicionar(descricao.trim(), isNaN(nlat as any)?null:nlat, isNaN(nlon as any)?null:nlon, endereco);
      alert('Território adicionado!');
    }
    resetForm(); await carregar();
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
    if (!confirm('Tem certeza que deseja excluir este território?')) return;
    await api.territorios.deletar(id);
    alert('Território excluído!');
    await carregar();
  }

  async function importarCSV(){
    const { canceled, filePaths } = await api.app.abrirDialogoCSV();
    if (!canceled && filePaths?.length){
      await api.territorios.importarCSV(filePaths[0]);
      alert('Importação concluída!');
      await carregar();
    }
  }

  async function exportarCSV(){
    const r = await api.territorios.exportarCSV();
    alert(r && !r.canceled ? 'Exportação concluída!' : 'Exportação cancelada.');
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
