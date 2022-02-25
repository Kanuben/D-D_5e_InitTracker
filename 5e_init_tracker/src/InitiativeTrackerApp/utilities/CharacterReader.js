

const fs = window.require("fs");
const path = window.require("path");
const app = window.require('electron')

export const translateCharacter = (characters) => {
}
export function characterFileExists() {
    try {
        let filePath = "characters.json";
        return fs.existsSync(filePath);
    } catch (error) {
        console.error(error);
    }
}

export function readCharacterFile() {
    try {
        let filePath = "characters.json";
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
}

export function writeCharacterFile(translatedMonster) {
    try {
        let filePath = "characters.json";
        fs.writeFileSync(filePath, JSON.stringify(translatedMonster));
    } catch (e) {
        console.error(e.message);
    }
}