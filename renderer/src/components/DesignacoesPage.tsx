import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import type { Designacao, Territorio, Saida } from '../../../models';
import DesignacaoTable from './DesignacaoTable';
import Pagination from './Pagination';
import { useToast } from './ui/toast';
import { useConfirm } from './ui/confirm-dialog';

type SortKey = keyof Pick<Designacao,'id'|'territorio'|'saida'|'dia_semana'|'data_designacao'|'data_devolucao'>;

const itensPorPagina = 10;

export default function DesignacoesPage() {
  const [designacoes, setDesignacoes] = useState<Designacao[]>([]);
  const [territorios, setTerritorios] = useState<Territorio[]>([]);
  const [saidas, setSaidas] = useState<Saida[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [asc, setAsc] = useState(true);
  const [page, setPage] = useState(1);

  // form
  const [territorioId, setTerritorioId] = useState<number|''>('');
  const [saidaId, setSaidaId] = useState<number|''>('');
  const [dataDesignacao, setDataDesignacao] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [editId, setEditId] = useState<number|null>(null);
  const { toast, dismiss } = useToast();
  const confirm = useConfirm();

  const totalPages = Math.max(1, Math.ceil(designacoes.length / itensPorPagina));
  const start = (page - 1) * itensPorPagina;
  const current = useMemo(() => {
    const sorted = [...designacoes].sort((a,b) => {
      const A = a[sortKey]; const B = b[sortKey];
      if (A < B) return asc ? -1 : 1;
      if (A > B) return asc ? 1 : -1;
      return 0;
    });
    return sorted.slice(start, start + itensPorPagina);
  }, [designacoes, sortKey, asc, page]);

  useEffect(() => {
    (async () => {
      const [ds, ts, ss] = await Promise.all([
        api.designacoes.listar(),  // usa seu IPC existente
        api.territorios.listar(),
        api.saidas.listar()
      ]);
      setDesignacoes(ds);
      setTerritorios(ts);
      setSaidas(ss);
    })();
  }, []);

  function ordenarPor(k: SortKey) {
    if (k === sortKey) setAsc(!asc);
    else { setSortKey(k); setAsc(true); }
  }

  function resetForm() {
    setTerritorioId(''); setSaidaId('');
    setDataDesignacao(''); setDataDevolucao('');
    setEditId(null);
  }

  async function onSubmit() {
    if (!territorioId || !saidaId || !dataDesignacao || !dataDevolucao) {
      toast('Preencha todos os campos.', 'error'); return;
    }
    const t = toast(editId ? 'Atualizando...' : 'Adicionando...', 'loading');
    try {
      if (editId) {
        await api.designacoes.editar(editId, Number(territorioId), Number(saidaId), dataDesignacao, dataDevolucao);
        toast('Designação atualizada!', 'success');
      } else {
        await api.designacoes.adicionar(Number(territorioId), Number(saidaId), dataDesignacao, dataDevolucao);
        toast('Designação adicionada!', 'success');
      }
      const ds = await api.designacoes.listar();
      setDesignacoes(ds);
      resetForm();
    } catch(err:any){
      toast(`Erro: ${err.message||err}`, 'error');
    } finally { dismiss(t); }
  }

  async function onEditar(id:number) {
    const item = designacoes.find(d => d.id === id);
    if (!item) return;
    setEditId(item.id);
    setTerritorioId(item.territorio_id);
    setSaidaId(item.saida_id);
    setDataDesignacao(item.data_designacao);
    setDataDevolucao(item.data_devolucao);
  }

  async function onDeletar(id:number) {
    const ok = await confirm({ title:'Excluir designação?', description:'Esta ação não pode ser desfeita.' });
    if (!ok) return;
    const t = toast('Excluindo...', 'loading');
    try{
      await api.designacoes.deletar(id);
      toast('Designação excluída!', 'success');
      const ds = await api.designacoes.listar();
      setDesignacoes(ds);
    } catch(err:any){
      toast(`Erro ao excluir: ${err.message||err}`, 'error');
    } finally { dismiss(t); }
  }

  async function onImportarCSV() {
    const { canceled, filePaths } = await api.app.abrirDialogoCSV();
    if (!canceled && filePaths?.length) {
      const t = toast('Importando...', 'loading');
      try{
        await api.designacoes.importarCSV(filePaths[0]);
        toast('Importação concluída!', 'success');
        setDesignacoes(await api.designacoes.listar());
      } catch(err:any){
        toast(`Erro na importação: ${err.message||err}`, 'error');
      } finally { dismiss(t); }
    }
  }

  async function onExportarCSV() {
    const t = toast('Exportando...', 'loading');
    try{
      const r = await api.designacoes.exportarCSV();
      toast(r && !r.canceled ? 'Exportação concluída!' : 'Exportação cancelada.', r && !r.canceled ? 'success' : 'error');
    } catch(err:any){
      toast(`Erro na exportação: ${err.message||err}`, 'error');
    } finally { dismiss(t); }
  }

  // geração de texto por período (mesma lógica, agora em React)
  const [filtroInicio, setFiltroInicio] = useState('');
  const [filtroFim, setFiltroFim] = useState('');
  const [texto, setTexto] = useState('');

  function formatBR(iso:string) {
    const [y,m,d] = iso.split('-'); return `${d}/${m}/${y}`;
  }

  function gerarTexto() {
    if (!filtroInicio || !filtroFim) { toast('Selecione o período desejado.', 'error'); return; }
    const filtradas = designacoes.filter(d => d.data_designacao >= filtroInicio && d.data_designacao <= filtroFim);
    if (!filtradas.length) { setTexto(''); toast('Nenhuma designação encontrada no período.', 'error'); return; }
    const linhas = filtradas.map(d =>
      `📍 Território: ${d.territorio}\n🚶 Saída: ${d.saida} (${d.dia_semana})\n📅 De ${formatBR(d.data_designacao)} até ${formatBR(d.data_devolucao)}`
    );
    setTexto(linhas.join('\n---------------------------\n'));
  }

  return (
    <div className="wrap">
      <h1>Gerenciar Designações</h1>

      <section className="card">
        <h2>Nova Designação</h2>
        <div className="grid gap-2">
          <select value={territorioId||''} onChange={e=>setTerritorioId(Number(e.target.value)||'')}>
            <option value="">Selecione o território</option>
            {territorios.map(t=> <option key={t.id} value={t.id}>{t.descricao}</option>)}
          </select>

          <select value={saidaId||''} onChange={e=>setSaidaId(Number(e.target.value)||'')}>
            <option value="">Selecione a saída</option>
            {saidas.map(s=> <option key={s.id} value={s.id}>{s.nome} ({s.dia_semana})</option>)}
          </select>

          <input type="date" value={dataDesignacao} onChange={e=>setDataDesignacao(e.target.value)} />
          <input type="date" value={dataDevolucao} onChange={e=>setDataDevolucao(e.target.value)} />
          <button onClick={onSubmit}>{editId ? 'Salvar Alterações' : 'Designar'}</button>
          {editId && <button onClick={resetForm}>Cancelar edição</button>}
        </div>
      </section>

      <section className="card">
        <h2>Lista de Designações</h2>
        <DesignacaoTable
          data={current}
          ordenarPor={ordenarPor}
          sortKey={sortKey}
          asc={asc}
          onEditar={onEditar}
          onDeletar={onDeletar}
        />
        <Pagination page={page} totalPages={totalPages} onChange={setPage}/>
      </section>

      <section className="card">
        <h2>Exportar / Importar</h2>
        <button onClick={onExportarCSV}>Exportar CSV</button>
        <button onClick={onImportarCSV}>Importar CSV</button>
      </section>

      <section className="card">
        <h2>Gerar Texto das Designações</h2>
        <div className="row gap-2">
          <label>De: <input type="date" value={filtroInicio} onChange={e=>setFiltroInicio(e.target.value)}/></label>
          <label>Até: <input type="date" value={filtroFim} onChange={e=>setFiltroFim(e.target.value)}/></label>
          <button onClick={gerarTexto}>Gerar Texto</button>
        </div>
        <textarea rows={10} value={texto} onChange={e=>setTexto(e.target.value)} style={{width:'100%', marginTop:10}}/>
      </section>
    </div>
  );
}
