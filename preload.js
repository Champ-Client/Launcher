const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {

})

contextBridge.exposeInMainWorld('api', {
    launch: (mcVersion) => {
        ipcRenderer.send('launch', mcVersion);
    },
    login: () => {
        ipcRenderer.send('login')
    }
});