// preload.js - Preload script for Electron Renderer Process
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    showNotification: (message) => ipcRenderer.send('show-notification', message),
    saveTask: (task) => ipcRenderer.send('save-task', task),
    loadTasks: () => ipcRenderer.invoke('load-tasks')
});
