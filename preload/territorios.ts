import { ipcRenderer } from 'electron';

export const territorios = {
  listar: () => ipcRenderer.invoke('territorios:listar'),
  adicionar: (descricao: string) =>
    ipcRenderer.invoke('territorios:adicionar', descricao),
  editar: (id: number, descricao: string) =>
    ipcRenderer.invoke('territorios:editar', id, descricao),
  deletar: (id: number) => ipcRenderer.invoke('territorios:deletar', id),
  importarCSV: (filePath: string) =>
    ipcRenderer.invoke('territorios:importarCSV', filePath),
  exportarCSV: () => ipcRenderer.invoke('territorios:exportarCSV'),
  carregarJSON: (filePath: string) =>
    ipcRenderer.invoke('territorios:carregarJSON', filePath),
  agruparProximos: (raioKm?: number) =>
    ipcRenderer.invoke('territorios:agruparProximos', raioKm ?? 1),
};

