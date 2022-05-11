const electron = require("electron");
const { Menu, ipcMain } = electron;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const Usuario = require('./db/usuario');


let mainWindow;

function createMainWindow() {

    var splashWindow = new BrowserWindow({
        width: 500,
        height: 300,
        frame: false,
        alwaysOnTop: true
    });

    splashWindow.loadURL(`file://${path.join(__dirname, "/splash.html")}`);
    splashWindow.center();
    // setTimeout(function () { },
    //     2000
    // );

    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        show: false,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: true, // turn off remote
            preload: path.join(__dirname, "preload.js") // use a preload script
        }
    });
    mainWindow.loadURL(isDev ? "http://localhost:3000" :
        `file://${path.join(__dirname, "/../build/index.html")}`);


    mainWindow.on("closed", () => (mainWindow = null));
    //Menu.setApplicationMenu(null);
    //mainWindow.webContents.openDevTools();

    // setTimeout(function () {
    //     splashWindow.close();
    //     mainWindow.show();
    // }, 5000);

    mainWindow.webContents.once('did-finish-load', function () {
        mainWindow.show();
        splashWindow.close();
    });
}

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
    // find('name', 'cross-env', true)
    //     .then(function (list) {
    //         console.log(list);
    //         // if (list[0] != null) {
    //         //     process.kill(list[0].pid, 'SIGHUP');
    //         // }
    //     });
    if (process.platform !== "darwin") {
        app.exit(0)
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});


ipcMain.on("toMain", (event, args) => {
    console.log(args);
    if (args.funcao === "login")
        doLogin(args.usuario, args.senha);

    if (args.funcao === "exit")
        app.exit(0);
});

function doLogin(usuario, senha) {
    Usuario.validaLogin(usuario, senha).then(resposta => {
        if (resposta)
            mainWindow.webContents.send("fromMain", true)
        else
            mainWindow.webContents.send("fromMain", false);
    });
}

