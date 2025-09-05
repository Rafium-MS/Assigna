const Designacao = require('../models/Designacao');

function register(ipcMain) {
  ipcMain.handle('designacoes:listar', () => Designacao.listar());
  ipcMain.handle('designacoes:adicionar', (event, territorio_id, saida_id, data_designacao, data_devolucao) =>
    Designacao.adicionar(territorio_id, saida_id, data_designacao, data_devolucao)
  );
  ipcMain.handle('designacoes:deletar', (event, id) => Designacao.deletar(id));
  ipcMain.handle('designacoes:editar', (event, id, territorio_id, saida_id, data_designacao, data_devolucao) =>
    Designacao.editar(id, territorio_id, saida_id, data_designacao, data_devolucao)
  );
  ipcMain.handle('designacoes:importarCSV', (event, filePath) => Designacao.importarCSV(filePath));
  ipcMain.handle('designacoes:exportarCSV', () => Designacao.exportarCSV());
  ipcMain.handle('designacoes:historicoTerritorio', (event, id) => Designacao.historicoTerritorio(id));
  ipcMain.handle('designacoes:historicoSaida', (event, id) => Designacao.historicoSaida(id));
}

module.exports = { register };
