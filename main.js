require('./register-ts');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Módulos da aplicação
const saidas = require('./services/saidas.ts');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Para protótipos é mais simples; considere usar preload + contextIsolation em produção
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Determina o caminho base relativo a este arquivo. Usar __dirname evita
  // problemas em ambientes onde app.getAppPath() aponta para um diretório que
  // não contém os arquivos estáticos da interface.
  const basePath = __dirname;
  const rendererDist = path.join(basePath, 'renderer', 'dist', 'index.html');
  const rendererHtml = path.join(basePath, 'renderer', 'index.html');
  const legacyIndex = path.join(basePath, 'index.html');

  if (fs.existsSync(rendererDist)) {
    win.loadFile(rendererDist);
  } else if (fs.existsSync(rendererHtml)) {
    win.loadFile(rendererHtml);
  } else if (fs.existsSync(legacyIndex)) {
    win.loadFile(legacyIndex);
  } else {
    const html = `<!doctype html>
      <html lang="pt-br">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'">
        <title>Assigna</title>
        <style>
          body { font-family: system-ui, sans-serif; margin: 2rem; }
          code { background: #f3f3f3; padding: 2px 6px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Assigna</h1>
        <p>Janela Electron criada. Adicione um <code>index.html</code> na raiz para carregar sua UI.</p>
        <p>Canais IPC disponíveis (renderer → main):</p>
        <ul>
          <li><code>saidas:listar</code></li>
          <li><code>saidas:adicionar</code> (nome, dia_semana)</li>
          <li><code>saidas:editar</code> (id, nome, dia_semana)</li>
          <li><code>saidas:deletar</code> (id)</li>
          <li><code>saidas:importarCSV</code> (filePath)</li>
          <li><code>saidas:exportarCSV</code></li>
        </ul>
        <p>Exemplo no renderer: <code>require('electron').ipcRenderer.invoke('saidas:listar')</code></p>
      </body>
      </html>`;
    win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
  }
}

// Handlers IPC para "saidas"
ipcMain.handle('saidas:listar', async () => {
  return await saidas.listar();
});

ipcMain.handle('saidas:adicionar', async (_event, nome, dia_semana) => {
  return await saidas.adicionar(nome, dia_semana);
});

ipcMain.handle('saidas:editar', async (_event, id, nome, dia_semana) => {
  return await saidas.editar(id, nome, dia_semana);
});

ipcMain.handle('saidas:deletar', async (_event, id) => {
  return await saidas.deletar(id);
});

ipcMain.handle('saidas:importarCSV', async (_event, filePath) => {
  return await saidas.importarCSV(filePath);
});

ipcMain.handle('saidas:exportarCSV', async () => {
  return await saidas.exportarCSV();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
