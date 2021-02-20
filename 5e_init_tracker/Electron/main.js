const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const Store = require("./store.js");

let mainWindow;

const { ipcMain } = require("electron");
ipcMain.on("new-window", (event, arg) => {
  newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
      },
  });
  newWindow.loadURL(
    isDev
      ? "http://localhost:3000/#/monster/"+arg
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  newWindow.removeMenu();
  newWindow.setAlwaysOnTop(true);
});

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: "user-preferences",
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 600 },
  },
});

function createWindow() {
  let { width, height } = store.get("windowBounds");
  let maximized = store.get("maximized");

  mainWindow = new BrowserWindow({
    width,
    height,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

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
    ? "http://localhost:3000/#/home"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);
  //mainWindow.removeMenu();
  mainWindow.once("ready-to-show", () => {
    if (maximized) {
      mainWindow.maximize();
    }
    mainWindow.show();
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.on("ready", createWindow);
