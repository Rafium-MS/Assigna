import { ipcRenderer } from 'electron';

export const pdf = {
  gerarRelatorio: (dados: any[], periodo: string) =>
    ipcRenderer.invoke('pdf:gerarRelatorio', dados, periodo),
  gerar: (titulo: string) => ipcRenderer.invoke('pdf:gerar', titulo),
};

