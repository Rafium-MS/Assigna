const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('./models/db');
const logger = require('./logger');
const { execFile } = require('child_process');
const { parse } = require('csv-parse/sync');
const cron = require('node-cron');
const { agrupar } = require('./utils/geocluster');
const loadTerritories = require('./utils/loadTerritories');
let autoBackupInterval = null;
let scraperInterval = null;
let checkCronJob = null;


// Capture global errors
process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.stack || err.message}`);
});

process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
});

////////////////////////////////////
// 🔧 Desabilita aceleração de hardware
////////////////////////////////////
app.disableHardwareAcceleration();

////////////////////////////////////
// 🪟 Criar a janela principal
////////////////////////////////////
function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile('views/index.html');
}

////////////////////////////////////
// 🚀 Inicialização
////////////////////////////////////
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

////////////////////////////////////
// ❌ Fecha app quando todas janelas são fechadas (exceto no Mac)
////////////////////////////////////
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

////////////////////////////////////
// 🔒 Fecha o banco ao sair
////////////////////////////////////
app.on('before-quit', () => {
    db.close();
});

////////////////////////////////////
// 🛑 Comando para fechar via preload (botão no menu)
////////////////////////////////////
ipcMain.handle('app:fechar', () => {
    app.quit();
});

const territoriosController = require('./controllers/territoriosController');
const saidasController = require('./controllers/saidasController');
const designacoesController = require('./controllers/designacoesController');
const visitasController = require('./controllers/visitasController');
const logsController = require('./controllers/logsController');
territoriosController.register(ipcMain);
saidasController.register(ipcMain);
designacoesController.register(ipcMain);
visitasController.register(ipcMain);
logsController.register(ipcMain);

////////////////////////////////////
// 💾 Backup do Banco de Dados
////////////////////////////////////
async function backupDB() {
    const { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath: 'db-backup.sqlite',
        filters: [{ name: 'SQLite DB', extensions: ['sqlite'] }]
    });
    if (canceled || !filePath) return { canceled: true };
    const src = path.join(__dirname, 'db.sqlite');
    fs.copyFileSync(src, filePath);
    logger.info(`Backup salvo em ${filePath}`);
    return { canceled: false, filePath };
}

ipcMain.handle('app:backupDB', backupDB);

function autoBackupToFolder() {
    try {
        const dir = path.join(__dirname, 'Backup');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        const stamp = new Date().toISOString().replace(/[:.]/g, '-');
        const dest = path.join(dir, `db_${stamp}.sqlite`);
        fs.copyFileSync(path.join(__dirname, 'db.sqlite'), dest);
        logger.info(`Auto-backup salvo em ${dest}`);
    } catch (err) {
        logger.error(`Erro no auto-backup: ${err.message}`);
    }
}

function scheduleAutoBackup(enable) {
    if (autoBackupInterval) {
        autoBackupInterval.stop();
        autoBackupInterval = null;
    }
    if (enable) {
        autoBackupInterval = cron.schedule('0 3 * * 0', autoBackupToFolder);
        logger.info('Backup automático agendado.');
    } else {
        logger.info('Backup automático desativado.');
    }
}

ipcMain.handle('app:scheduleAutoBackup', (event, enable) => {
    scheduleAutoBackup(enable);
});

////////////////////////////////////
// 🤖 Scraper Automático
////////////////////////////////////
function runScraper() {
    return new Promise((resolve, reject) => {
        const script = path.join(__dirname, 'scripts', 'scrapeTerritorios.js');
        execFile('node', [script], { env: { ...process.env, SAVE_TO_DB: 'true' } }, (err) => {
            if (err) {
                logger.error(`Erro ao executar scraper: ${err.message}`);
                reject(err);
            } else {
                logger.info('Scraper executado com sucesso');
                resolve(true);
            }
        });
    });
}

ipcMain.handle('app:runScraper', runScraper);

function scheduleScraper(enable) {
    if (scraperInterval) {
        scraperInterval.stop();
        scraperInterval = null;
    }
    if (enable) {
        scraperInterval = cron.schedule('0 4 * * *', () => {
            runScraper().catch(() => {});
        });
        logger.info('Scraper automático agendado.');
    } else {
        logger.info('Scraper automático desativado.');
    }
}

////////////////////////////////////
// 🔔 Verificação de Designações
////////////////////////////////////
function checkDesignacoes() {
    const hoje = new Date();
    const limite = new Date();
    limite.setDate(hoje.getDate() + 2);
    db.all(`
        SELECT d.territorio_id, d.data_devolucao
        FROM designacoes d

        WHERE date(d.data_devolucao) BETWEEN date(?) AND date(?)
    `, [hoje.toISOString().split('T')[0], limite.toISOString().split('T')[0]], (err, rows) => {
        if (err) return logger.error(`Erro ao verificar designações: ${err.message}`);
        rows.forEach(r => logger.info(`Designação próxima do vencimento: Território ${r.territorio_id} em ${r.data_devolucao}`));    });
}

function startDesignacaoCheck() {
    if (checkCronJob) {
        checkCronJob.stop();
    }
    checkCronJob = cron.schedule('0 */6 * * *', checkDesignacoes);
}

startDesignacaoCheck();
