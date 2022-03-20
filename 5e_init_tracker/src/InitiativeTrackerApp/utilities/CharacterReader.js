import { isElectron } from "./ElectronHelper";

let fs;
let path;

if (isElectron()) {
  fs = window.require("fs");
  path = window.require("path");
  const app = window.require("electron");
} else {
}

export const translateCharacter = (characters) => {};
export function characterFileExists() {
  try {
    let filePath = "characters.json";
    if (isElectron()) {
      return fs.existsSync(filePath);
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export function readCharacterFile() {
  try {
    let filePath = "characters.json";
    if (isElectron()) {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
}

export function writeCharacterFile(translatedMonster) {
  try {
    let filePath = "characters.json";
    if (isElectron()) {
      fs.writeFileSync(filePath, JSON.stringify(translatedMonster));
    }
  } catch (e) {
    console.error(e.message);
  }
}
