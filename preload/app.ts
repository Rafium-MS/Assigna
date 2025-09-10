import { ipcRenderer } from 'electron';

export const app = {
  abrirDialogoCSV: () => ipcRenderer.invoke('app:abrirDialogoCSV'),
};

