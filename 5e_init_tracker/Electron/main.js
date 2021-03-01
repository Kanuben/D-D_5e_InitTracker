const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const Store = require("./store.js");

let mainWindow;
let newWindow;


const { ipcMain } = require("electron");
ipcMain.on("new-window", (event, window, arg) => {
  if(window === "monster"){
    let deploymentURL = `file://${path.join(
      __dirname,
      "../build/index.html#monster"
    )}`;
    deploymentURL = deploymentURL + "/" + arg;
    newWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    newWindow.setBackgroundColor("#303030");
    newWindow.loadURL(
      isDev
        ? "http://localhost:3000/#/monster/" + arg
        : deploymentURL
    );
    //newWindow.removeMenu();
    newWindow.setAlwaysOnTop(true);
  } else if(window === "condition"){
    let deploymentURL = `file://${path.join(
      __dirname,
      "../build/index.html#condition"
    )}`;
    deploymentURL = deploymentURL + "/" + arg;
    newWindow = new BrowserWindow({
      width: 600,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    newWindow.setBackgroundColor("#303030");
    newWindow.loadURL(
      isDev
        ? "http://localhost:3000/#/condition/" + arg
        : deploymentURL
    );
    //newWindow.removeMenu();
    newWindow.setAlwaysOnTop(true);
  }else if(window === "spell"){
    let deploymentURL = `file://${path.join(
      __dirname,
      "../build/index.html#spell"
    )}`;
    deploymentURL = deploymentURL + "/" + arg;
    newWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    newWindow.setBackgroundColor("#303030");
    newWindow.loadURL(
      isDev
        ? "http://localhost:3000/#/spell/" + arg
        : deploymentURL
    );
    //newWindow.removeMenu();
    newWindow.setAlwaysOnTop(true);
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
    ? "http://localhost:3000/"
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
