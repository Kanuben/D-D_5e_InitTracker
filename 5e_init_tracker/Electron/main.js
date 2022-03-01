const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const isDev = require("electron-is-dev");
const path = require("path");
const Store = require("./store.js");

if (require('electron-squirrel-startup')) return app.quit();

let mainWindow;
let newWindow;

ipcMain.on("new-window", (event, window, arg) => {
  if (window === "monster") {
    let deploymentURL = `file://${path.join(
      __dirname,
      "../build/index.html#monster"
    )}`;
    deploymentURL = deploymentURL + "/" + arg;
    console.debug(store.get("windowBounds").width);
    console.debug(mainWindow.height);
    newWindow = new BrowserWindow({
      width: store.get("windowBounds").width / 2,
      height: store.get("windowBounds").height / 2,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    newWindow.setBackgroundColor("#303030");
    newWindow.loadURL(
      isDev ? "http://localhost:3000/#/monster/" + arg : deploymentURL
    );
    //newWindow.removeMenu();
    //newWindow.setAlwaysOnTop(true);
  } else if (window === "spell") {
    let deploymentURL = `file://${path.join(
      __dirname,
      "../build/index.html#spell"
    )}`;
    deploymentURL = deploymentURL + "/" + arg;
    newWindow = new BrowserWindow({
      width: store.get("windowBounds").width / 2,
      height: store.get("windowBounds").height / 2,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    newWindow.setBackgroundColor("#303030");
    newWindow.loadURL(
      isDev ? "http://localhost:3000/#/spell/" + arg : deploymentURL
    );
    //newWindow.removeMenu();
    //newWindow.setAlwaysOnTop(true);
  }
});

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: "user-preferences",
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 600 },
  },
});

store.set("isDev", isDev);

function createWindow() {
  let { width, height } = store.get("windowBounds");
  let maximized = store.get("maximized");
  

  mainWindow = new BrowserWindow({
    width,
    height,
    show: false,
    icon: path.join(__dirname, '/favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  console.log(path.join(__dirname, 'public/favicon.ico'));

  mainWindow.on("resize", () => {
    let { width, height } = mainWindow.getBounds();
    store.set("windowBounds", { width, height });
  });

  mainWindow.on("maximize", () => {
    let maximized = true;
    store.set("maximized", maximized);
  });

  mainWindow.on("unmaximize", () => {
    let maximized = false;
    store.set("maximized", maximized);
  });

  const startURL = isDev
    ? "http://localhost:3000/"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);
  //mainWindow.removeMenu();
  // ipcMain.handle('dark-mode:toggle', () => {
  //   if (nativeTheme.shouldUseDarkColors) {
  //     nativeTheme.themeSource = 'light'
  //   } else {
  //     nativeTheme.themeSource = 'dark'
  //   }
  //   return nativeTheme.shouldUseDarkColors
  // })

  nativeTheme.themeSource = 'dark'

  mainWindow.once("ready-to-show", () => {
    if (maximized) {
      mainWindow.maximize();
    }
    if (!isDev)
      mainWindow.removeMenu();
    mainWindow.show();
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
