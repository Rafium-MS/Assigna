import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import type { Designacao, Territorio, Saida } from '../types';
import DesignacaoTable from './DesignacaoTable';
import Pagination from './Pagination';

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
      alert('Preencha todos os campos.'); return;
    }
    if (editId) {
      await api.designacoes.editar(editId, Number(territorioId), Number(saidaId), dataDesignacao, dataDevolucao);
      alert('Designação atualizada!');
    } else {
      await api.designacoes.adicionar(Number(territorioId), Number(saidaId), dataDesignacao, dataDevolucao);
      alert('Designação adicionada!');
    }
    const ds = await api.designacoes.listar();
    setDesignacoes(ds);
    resetForm();
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
    if (!confirm('Deseja realmente excluir esta designação?')) return;
    await api.designacoes.deletar(id);
    alert('Designação excluída!');
    const ds = await api.designacoes.listar();
    setDesignacoes(ds);
  }

  async function onImportarCSV() {
    const { canceled, filePaths } = await api.app.abrirDialogoCSV();
    if (!canceled && filePaths?.length) {
      await api.designacoes.importarCSV(filePaths[0]);
      alert('Importação concluída!');
      setDesignacoes(await api.designacoes.listar());
    }
  }

  async function onExportarCSV() {
    const r = await api.designacoes.exportarCSV();
    alert(r && !r.canceled ? 'Exportação concluída!' : 'Exportação cancelada.');
  }

  // geração de texto por período (mesma lógica, agora em React)
  const [filtroInicio, setFiltroInicio] = useState('');
  const [filtroFim, setFiltroFim] = useState('');
  const [texto, setTexto] = useState('');

  function formatBR(iso:string) {
    const [y,m,d] = iso.split('-'); return `${d}/${m}/${y}`;
  }

  function gerarTexto() {
    if (!filtroInicio || !filtroFim) { alert('Selecione o período desejado.'); return; }
    const filtradas = designacoes.filter(d => d.data_designacao >= filtroInicio && d.data_designacao <= filtroFim);
    if (!filtradas.length) { setTexto(''); alert('Nenhuma designação encontrada no período.'); return; }
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
