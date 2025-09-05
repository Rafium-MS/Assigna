import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import type { Designacao, Saida, Territorio } from '../types';
import ReportsTable from './ReportsTable';

function formatBR(iso:string){
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yy = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
}

export default function ReportsPage(){
  const [todas, setTodas] = useState<Designacao[]>([]);
  const [filtradas, setFiltradas] = useState<Designacao[]>([]);
  const [saidas, setSaidas] = useState<Saida[]>([]);
  const [territorios, setTerritorios] = useState<Territorio[]>([]);
  const [fSaida, setFSaida] = useState<string>('');         // nome da saída
  const [fTerr, setFTerr] = useState<string>('');           // descrição do território
  const [dataIni, setDataIni] = useState<string>('');       // YYYY-MM-DD
  const [dataFim, setDataFim] = useState<string>('');       // YYYY-MM-DD
  const periodoHuman = useMemo(()=>{
    if (!dataIni && !dataFim) return 'Completo';
    const ini = dataIni ? formatBR(dataIni) : '';
    const fim = dataFim ? formatBR(dataFim) : '';
    return `${ini} - ${fim}`.trim();
  }, [dataIni, dataFim]);

  useEffect(()=>{ // carregar dados e filtros
    (async ()=>{
      const [ds, ss, ts] = await Promise.all([
        api.designacoes.listar(),
        api.saidas.listar(),
        api.territorios.listar()
      ]);
      setTodas(ds); setFiltradas(ds);
      setSaidas(ss); setTerritorios(ts);
    })();
  }, []);

  function aplicarFiltros(){
    let base = [...todas];
    if (fSaida) base = base.filter(d => d.saida === fSaida);
    if (fTerr)  base = base.filter(d => d.territorio === fTerr);
    if (dataIni) base = base.filter(d => new Date(d.data_designacao) >= new Date(dataIni));
    if (dataFim) base = base.filter(d => new Date(d.data_devolucao) <= new Date(dataFim));
    setFiltradas(base);
  }

  async function exportarRelatorio(){
    // igual ao seu relatorios.js: aplica filtros e manda para pdf.gerarRelatorio. :contentReference[oaicite:6]{index=6}
    let base = [...todas];
    if (fSaida) base = base.filter(d => d.saida === fSaida);
    if (fTerr)  base = base.filter(d => d.territorio === fTerr);
    if (dataIni) base = base.filter(d => new Date(d.data_designacao) >= new Date(dataIni));
    if (dataFim) base = base.filter(d => new Date(d.data_devolucao) <= new Date(dataFim));

    const dados = base.map(item => ({
      territorio: item.territorio,
      saida: item.saida,
      dia: item.dia_semana,
      designacao: formatBR(item.data_designacao),
      devolucao:  formatBR(item.data_devolucao),
    }));

    await api.pdf.gerarRelatorio(dados, periodoHuman);
    // aqui você já mostra toast no main; mantive simples
    alert('PDF gerado (Relatório).');
  }

  async function exportarPDFSimples(){
    // mapeia seu gerarPDF() atual (pdf.gerar('Relatorio')). :contentReference[oaicite:7]{index=7}
    await api.pdf.gerar('Relatorio');
    alert('PDF simples gerado.');
  }

  function gerarFormularioS13(){
    // mesma lógica do seu gerarFormularioS13: agrupa por território e abre janela/print. :contentReference[oaicite:8]{index=8}
    const agrupado: Record<string, {data_designacao:string; data_devolucao:string; saida:string}[]> = {};
    filtradas.forEach(d=>{
      const k = d.territorio;
      (agrupado[k] ||= []).push({
        data_designacao: formatBR(d.data_designacao),
        data_devolucao:  formatBR(d.data_devolucao),
        saida: `${d.saida} (${d.dia_semana})`
      });
    });

    // monta HTML enxuto (mantendo seu layout de tabela)
    let html = `
      <html><head><title>Formulário S-13_T</title>
      <style>
        body { font-family: Arial; padding: 40px; }
        h1 { text-align: center; }
        table { border-collapse: collapse; width: 100%; margin-top: 30px; }
        td, th { border: 1px solid #333; padding: 6px; text-align: center; font-size: 12px; }
      </style></head><body>
      <h1>REGISTRO DE DESIGNAÇÃO DE TERRITÓRIO</h1>
      <table>
        <tr>
          <th>Terr. n.º</th><th>Última data concluída</th>
          <th>Data Designação 1</th><th>Data Conclusão 1</th>
          <th>Data Designação 2</th><th>Data Conclusão 2</th>
          <th>Data Designação 3</th><th>Data Conclusão 3</th>
          <th>Data Designação 4</th><th>Data Conclusão 4</th>
        </tr>`;

    Object.entries(agrupado).forEach(([territorio, regs])=>{
      const ult = regs[regs.length - 1]?.data_devolucao || '';
      const cols = regs.slice(-4).flatMap(r => [r.data_designacao, r.data_devolucao]);
      while (cols.length < 8) cols.push('');
      html += `<tr><td>${territorio}</td><td>${ult}</td>${cols.map(c=>`<td>${c}</td>`).join('')}</tr>`;
    });

    html += `</table></body></html>`;

    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
  }

  return (
    <div className="wrap">
      <h1>📊 Relatórios</h1>

      <div className="card">
        <h2>🔍 Filtros</h2>
        <div className="row" style={{gap:8, flexWrap:'wrap'}}>
          <label>Saída:
            <select value={fSaida} onChange={e=>setFSaida(e.target.value)}>
              <option value="">Todas</option>
              {saidas.map(s=><option key={s.id} value={s.nome}>{s.nome} ({s.dia_semana})</option>)}
            </select>
          </label>

          <label>Território:
            <select value={fTerr} onChange={e=>setFTerr(e.target.value)}>
              <option value="">Todos</option>
              {territorios.map(t=><option key={t.id} value={t.descricao}>{t.descricao}</option>)}
            </select>
          </label>

          <label>Início:
            <input type="date" value={dataIni} onChange={e=>setDataIni(e.target.value)} />
          </label>

          <label>Fim:
            <input type="date" value={dataFim} onChange={e=>setDataFim(e.target.value)} />
          </label>

          <button onClick={aplicarFiltros}>Filtrar</button>
        </div>
      </div>

      <ReportsTable data={filtradas} />

      <div className="card">
        <h2>📤 Exportar</h2>
        <div className="row" style={{gap:8, flexWrap:'wrap'}}>
          <button onClick={exportarRelatorio}>Exportar Relatório em PDF</button>
          <button onClick={exportarPDFSimples}>Exportar como PDF Simples</button>
          <button onClick={gerarFormularioS13}>Gerar Formulário S-13_T (Impressão)</button>
        </div>
      </div>
    </div>
  );
}
