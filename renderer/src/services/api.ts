import type { Designacao, Territorio, Saida, HistoricoSaida } from '../../../models';

declare global {
  interface Window {
    api: any;
  }
}

export const api = {
  designacoes: {
    listar: async (): Promise<Designacao[]> => window.api.designacoes.listar(),
    adicionar: (territorioId:number, saidaId:number, d1:string, d2:string) =>
      window.api.designacoes.adicionar(territorioId, saidaId, d1, d2),
    editar: (id:number, territorioId:number, saidaId:number, d1:string, d2:string) =>
      window.api.designacoes.editar(id, territorioId, saidaId, d1, d2),
    deletar: (id:number) => window.api.designacoes.deletar(id),
    importarCSV: (filePath:string) => window.api.designacoes.importarCSV(filePath),
    exportarCSV: () => window.api.designacoes.exportarCSV(),
    historicoTerritorio: (id:number) => window.api.designacoes.historicoTerritorio(id),
    historicoSaida: (id:number) => window.api.designacoes.historicoSaida(id),
  },
  territorios: {
    listar:      async ():Promise<Territorio[]> => window.api.territorios.listar(),
    adicionar:   (...args:any[]) => window.api.territorios.adicionar(...args),
    editar:      (...args:any[]) => window.api.territorios.editar(...args),
    deletar:     (id:number) => window.api.territorios.deletar(id),
    importarCSV: (filePath:string) => window.api.territorios.importarCSV(filePath),
    exportarCSV: () => window.api.territorios.exportarCSV(),
    agruparProximos: (raioKm=1) => window.api.territorios.agruparProximos(raioKm),
  },
  saidas: {
    listar:      async ():Promise<Saida[]> => window.api.saidas.listar(),
    adicionar:   (nome:string, dia:string) => window.api.saidas.adicionar(nome, dia),
    editar:      (id:number, nome:string, dia:string) => window.api.saidas.editar(id, nome, dia),
    deletar:     (id:number) => window.api.saidas.deletar(id),
    importarCSV: (filePath:string) => window.api.saidas.importarCSV(filePath),
    exportarCSV: () => window.api.saidas.exportarCSV(),
  },
  app: {
    abrirDialogoCSV: () => window.api.app.abrirDialogoCSV(),
  },
pdf: {
    gerarRelatorio: (dados:any[], periodo:string) => window.api.pdf.gerarRelatorio(dados, periodo),
    gerar: (titulo:string) => window.api.pdf.gerar(titulo),
  },
  visitas: {
    listar:   (...args:any[]) => window.api.visitas.listar(...args),
    contagens:(...args:any[]) => window.api.visitas.contagens(...args),
    registrar:(...args:any[]) => window.api.visitas.registrar(...args),
  }
};
