const Territorio = require('./Territorio');

function register(ipcMain) {
  ipcMain.handle('territorios:listar', () => Territorio.listar());
  ipcMain.handle('territorios:adicionar', () =>
    Territorio.adicionar()
  );
  ipcMain.handle('territorios:deletar', (event, id) => Territorio.deletar(id));
  ipcMain.handle('territorios:editar', (event, id) =>
    Territorio.editar(id)
  );
  ipcMain.handle('territorios:importarCSV', (event, filePath) => Territorio.importarCSV(filePath));
  ipcMain.handle('territorios:exportarCSV', () => Territorio.exportarCSV());
  ipcMain.handle('territorios:carregarJSON', (event, filePath) => Territorio.carregarJSON(filePath));
  ipcMain.handle('territorios:agruparProximos', (event, raioKm) => Territorio.agruparProximos(raioKm));
}

module.exports = { register };
