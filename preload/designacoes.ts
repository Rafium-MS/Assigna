import { ipcRenderer } from 'electron';

export const designacoes = {
  listar: () => ipcRenderer.invoke('designacoes:listar'),
  adicionar: (
    territorioId: number,
    saidaId: number,
    dataDesignacao: string,
    dataDevolucao: string,
  ) =>
    ipcRenderer.invoke(
      'designacoes:adicionar',
      territorioId,
      saidaId,
      dataDesignacao,
      dataDevolucao,
    ),
  editar: (
    id: number,
    territorioId: number,
    saidaId: number,
    dataDesignacao: string,
    dataDevolucao: string,
  ) =>
    ipcRenderer.invoke(
      'designacoes:editar',
      id,
      territorioId,
      saidaId,
      dataDesignacao,
      dataDevolucao,
    ),
  deletar: (id: number) => ipcRenderer.invoke('designacoes:deletar', id),
  importarCSV: (filePath: string) =>
    ipcRenderer.invoke('designacoes:importarCSV', filePath),
  exportarCSV: () => ipcRenderer.invoke('designacoes:exportarCSV'),
  historicoTerritorio: (id: number) =>
    ipcRenderer.invoke('designacoes:historicoTerritorio', id),
  historicoSaida: (id: number) =>
    ipcRenderer.invoke('designacoes:historicoSaida', id),
};

