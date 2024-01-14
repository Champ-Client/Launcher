const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const electron = require('electron')
const ipc = electron.ipcMain

const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

const { Auth } = require("msmc");

let opts = {
    authorization: Authenticator.getAuth("username"),
    root: "./minecraft",
    version: {
        number: "1.14",
        type: "release"
    },
    memory: {
        max: "6G",
        min: "4G"
    }
}
function createWindow () {
    const win = new BrowserWindow({
        width: 1080,
        height: 720,
        title: "Champ Client",
        resizable: false,
        fullscreenable: false,
        autoHideMenuBar: true,
        icon: 'src/Assets/Img/crown.png',
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('src/home.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipc.on('login', (event) => {
    loginMC()
})

ipc.on('launch', (event, mcVersion) => {
    launchMinecraft(mcVersion);
});

async function loginMC() {
    const authManager = new Auth("select_account");
    const xboxManager = await authManager.launch("electron");

    const token = await xboxManager.getMinecraft();

    opts.authorization = token.mclc()
}

function launchMinecraft(mcVersion) {
    opts.version.number = mcVersion
    launcher.launch(opts)
    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));
}