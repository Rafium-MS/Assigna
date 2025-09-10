import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import type { Designacao, Saida, Territorio } from '../../../models';
import SugestoesTable, { Sugestao } from './SugestoesTable';
import { useToast } from './ui/toast';

const MESES_LIMITE = 5;

export default function SugestoesPage() {
  const [dataDesignacao, setDataDesignacao] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [saidas, setSaidas] = useState<Saida[]>([]);
  const [territorios, setTerritorios] = useState<Territorio[]>([]);
  const [designacoes, setDesignacoes] = useState<Designacao[]>([]);
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [aplicandoId, setAplicandoId] = useState<string|null>(null);
  const { toast, dismiss } = useToast();

  useEffect(() => {
    (async () => {
      const [ss, ts, ds] = await Promise.all([
        api.saidas.listar(),
        api.territorios.listar(),
        api.designacoes.listar(),
      ]);
      setSaidas(ss); setTerritorios(ts); setDesignacoes(ds);
    })();
  }, []);

  const periodoValido = useMemo(() => !!(dataDesignacao && dataDevolucao), [dataDesignacao, dataDevolucao]);

  function conflitoPeriodo(des: Designacao, iniISO: string, fimISO: string) {
    const dataDesig = new Date(des.data_designacao);
    const dataDev   = new Date(des.data_devolucao);
    const novaIni   = new Date(iniISO);
    const novaFim   = new Date(fimISO);
    return (novaIni <= dataDev && novaFim >= dataDesig);
  }

  function mesesEntre(a: Date, b: Date) {
    return (a.getFullYear() - b.getFullYear()) * 12 + (a.getMonth() - b.getMonth());
  }

  function gerar() {
    if (!periodoValido) { toast('Selecione as datas de designação e devolução.', 'error'); return; }

    // Último uso por saida-territorio (data_devolucao mais recente)
    const ultimoUso = new Map<string, Date>();
    for (const des of designacoes) {
      const key = `${des.saida_id}-${des.territorio_id}`;
      const dDevol = new Date(des.data_devolucao);
      const prev = ultimoUso.get(key);
      if (!prev || dDevol > prev) ultimoUso.set(key, dDevol);
    }

    const out: Sugestao[] = [];
    for (const s of saidas) {
      // Territórios não conflitando com o período e respeitando janela de meses
      const disponiveis = territorios.filter(t => {
        // 1) conflito de período com qualquer designação do mesmo território
        const conflita = designacoes.some(des =>
          des.territorio_id === t.id && conflitoPeriodo(des, dataDesignacao, dataDevolucao)
        );
        if (conflita) return false;

        // 2) respeitar meses limite entre mesma saída e mesmo território
        const ultimaDataDev = ultimoUso.get(`${s.id}-${t.id}`);
        if (ultimaDataDev) {
          const proxDesig = new Date(dataDesignacao);
          if (mesesEntre(proxDesig, ultimaDataDev) < MESES_LIMITE) return false;
        }
        return true;
      });

      // Ordenar por “mais tempo sem uso primeiro”
      const ordenados = [...disponiveis].sort((a, b) => {
        const ultA = ultimoUso.get(`${s.id}-${a.id}`);
        const ultB = ultimoUso.get(`${s.id}-${b.id}`);
        const base = new Date(dataDesignacao);
        const diffA = ultA ? (base.getTime() - ultA.getTime()) : Number.POSITIVE_INFINITY;
        const diffB = ultB ? (base.getTime() - ultB.getTime()) : Number.POSITIVE_INFINITY;
        return diffB - diffA; // maior gap primeiro
      });

      out.push({ saida: s, territorios: ordenados });
    }

    setSugestoes(out);
  }

  async function aplicar(saidaId:number, territorioId:number) {
    if (!periodoValido) return;
    const t = toast('Aplicando designação...', 'loading');
    try {
      setAplicandoId(String(saidaId));
      await api.designacoes.adicionar(Number(territorioId), Number(saidaId), dataDesignacao, dataDevolucao);
      const ds = await api.designacoes.listar();
      setDesignacoes(ds);
      gerar();
      toast('Designação aplicada!', 'success');
    } catch (err:any) {
      toast(`Erro ao aplicar: ${err?.message ?? String(err)}`,'error');
    } finally {
      setAplicandoId(null);
      dismiss(t);
    }
  }

  return (
    <div className="wrap">
      <h1> Sugestões de Designações </h1>

      <div className="card">
        <h2>Gerar Sugestões</h2>
        <div className="row" style={{gap:8, alignItems:'center', flexWrap:'wrap'}}>
          <label>Período:</label>
          <input type="date" value={dataDesignacao} onChange={e=>setDataDesignacao(e.target.value)}/>
          <input type="date" value={dataDevolucao} onChange={e=>setDataDevolucao(e.target.value)}/>
          <button onClick={gerar}>Gerar Sugestões</button>
        </div>
      </div>

      <SugestoesTable
        sugestoes={sugestoes}
        dataDesignacao={dataDesignacao}
        dataDevolucao={dataDevolucao}
        aplicandoId={aplicandoId}
        onAplicar={aplicar}
      />
    </div>
  );
}
