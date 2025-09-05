import type { Designacao, Territorio, Saida, HistoricoSaida } from '../types';

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
    listar:      async ():Promise<Territorio[]> => w.territorios.listar(),
    adicionar:   (descricao:string, ) =>
                   w.territorios.adicionar(descricao),
    editar:      (id:number, descricao:string, ) =>
                   w.territorios.editar(id, descricao),
    deletar:     (id:number) => w.territorios.deletar(id),
    importarCSV: (filePath:string) => w.territorios.importarCSV(filePath),
    exportarCSV: () => w.territorios.exportarCSV(),
    agruparProximos: (raioKm=1) => w.territorios.agruparProximos(raioKm),
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
    gerarRelatorio: (dados:any[], periodo:string) => w.pdf.gerarRelatorio(dados, periodo),
    gerar: (titulo:string) => w.pdf.gerar(titulo),
  }
};
