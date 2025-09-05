const Saida = require('../models/Saida');

function register(ipcMain) {
  ipcMain.handle('saidas:listar', () => Saida.listar());
  ipcMain.handle('saidas:adicionar', (event, nome, dia) => Saida.adicionar(nome, dia));
  ipcMain.handle('saidas:deletar', (event, id) => Saida.deletar(id));
  ipcMain.handle('saidas:editar', (event, id, nome, dia) => Saida.editar(id, nome, dia));
  ipcMain.handle('saidas:importarCSV', (event, filePath) => Saida.importarCSV(filePath));
  ipcMain.handle('saidas:exportarCSV', () => Saida.exportarCSV());
}

module.exports = { register };
