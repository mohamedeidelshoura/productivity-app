const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// التعامل مع قراءة وكتابة المهام في ملف JSON
const tasksFile = path.join(__dirname, 'tasks.json');

ipcMain.handle('load-tasks', async () => {
  if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, JSON.stringify([]));
  }
  const tasks = JSON.parse(fs.readFileSync(tasksFile));
  return tasks;
});

ipcMain.handle('save-tasks', async (_, tasks) => {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks));
});
