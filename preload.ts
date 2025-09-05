import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  designacoes: {
    listar: () => ipcRenderer.invoke('designacoes:listar'),
    adicionar: (territorioId:number, saidaId:number, dataDesignacao:string, dataDevolucao:string) =>
      ipcRenderer.invoke('designacoes:adicionar', territorioId, saidaId, dataDesignacao, dataDevolucao),
    editar: (id:number, territorioId:number, saidaId:number, dataDesignacao:string, dataDevolucao:string) =>
      ipcRenderer.invoke('designacoes:editar', id, territorioId, saidaId, dataDesignacao, dataDevolucao),
    deletar: (id:number) => ipcRenderer.invoke('designacoes:deletar', id),
    importarCSV: (filePath:string) => ipcRenderer.invoke('designacoes:importarCSV', filePath),
    exportarCSV: () => ipcRenderer.invoke('designacoes:exportarCSV'),
    historicoTerritorio: (id:number) => ipcRenderer.invoke('designacoes:historicoTerritorio', id),
    historicoSaida: (id:number) => ipcRenderer.invoke('designacoes:historicoSaida', id),
  },
  territorios: {
    listar:        () => ipcRenderer.invoke('territorios:listar'),
    adicionar:     (descricao:string) =>
                     ipcRenderer.invoke('territorios:adicionar', descricao),
    editar:        (id:number, descricao:string,  ) =>
                     ipcRenderer.invoke('territorios:editar', id, descricao),
    deletar:       (id:number) => ipcRenderer.invoke('territorios:deletar', id),
    importarCSV:   (filePath:string) => ipcRenderer.invoke('territorios:importarCSV', filePath),
    exportarCSV:   () => ipcRenderer.invoke('territorios:exportarCSV'),
    carregarJSON:  (filePath:string) => ipcRenderer.invoke('territorios:carregarJSON', filePath),
    agruparProximos: (raioKm?:number) => ipcRenderer.invoke('territorios:agruparProximos', raioKm ?? 1),
  },
  saidas: {
      listar:        () => ipcRenderer.invoke('saidas:listar'),
      adicionar:     (nome:string, dia:string) => ipcRenderer.invoke('saidas:adicionar', nome, dia),
      editar:        (id:number, nome:string, dia:string) => ipcRenderer.invoke('saidas:editar', id, nome, dia),
      deletar:       (id:number) => ipcRenderer.invoke('saidas:deletar', id),
      importarCSV:   (filePath:string) => ipcRenderer.invoke('saidas:importarCSV', filePath),
      exportarCSV:   () => ipcRenderer.invoke('saidas:exportarCSV'),
    },
  app: {
    abrirDialogoCSV: () => ipcRenderer.invoke('app:abrirDialogoCSV'),
  },
  pdf: {
    gerarRelatorio: (dados:any[], periodo:string) => ipcRenderer.invoke('pdf:gerarRelatorio', dados, periodo),
    gerar: (titulo:string) => ipcRenderer.invoke('pdf:gerar', titulo),
  }
});
