const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const Store = require("./store.js");

let mainWindow;

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

  mainWindow = new BrowserWindow({ width, height, show: false });

  mainWindow.on("resize", () => {
    let { width, height } = mainWindow.getBounds();
    store.set("windowBounds", { width, height });
  });

  mainWindow.on("maximize", () => {
    let maximized = true;
    store.set("maximized", maximized);
  });

  const startURL = isDev
    ? "http://localhost:3000"
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
