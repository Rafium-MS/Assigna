import { ipcRenderer } from 'electron';

export const saidas = {
  listar: () => ipcRenderer.invoke('saidas:listar'),
  adicionar: (nome: string, dia: string) =>
    ipcRenderer.invoke('saidas:adicionar', nome, dia),
  editar: (id: number, nome: string, dia: string) =>
    ipcRenderer.invoke('saidas:editar', id, nome, dia),
  deletar: (id: number) => ipcRenderer.invoke('saidas:deletar', id),
  importarCSV: (filePath: string) =>
    ipcRenderer.invoke('saidas:importarCSV', filePath),
  exportarCSV: () => ipcRenderer.invoke('saidas:exportarCSV'),
};

