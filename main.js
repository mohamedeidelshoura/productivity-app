// main.js - Electron Main Process
const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');
});

// Handle notifications
ipcMain.on('show-notification', (event, message) => {
    new Notification({ title: 'Reminder', body: message }).show();
});

// Close when all windows are closed (except MacOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Additional Files:
const fs = require('fs');
const { dialog } = require('electron');

ipcMain.on('save-task', (event, task) => {
    fs.appendFileSync('tasks.json', JSON.stringify(task) + '\n');
    event.reply('task-saved', 'Task saved successfully!');
});

ipcMain.handle('load-tasks', async () => {
    if (!fs.existsSync('tasks.json')) return [];
    const data = fs.readFileSync('tasks.json', 'utf-8');
    return data.split('\n').filter(line => line).map(JSON.parse);
});
