import { toLower } from "lodash";
import { Monster } from "../templates/monster";

const fs = window.require("fs");
const path = window.require("path");
const app = window.require('electron')

export const translateMonsters = (monsters) => {
  let translatedMons = [];
  monsters.forEach((monster) => {
    let translatedMonster = new Monster();
    if (monster.img) {
      translatedMonster.img = monster.img;
    }
    translatedMonster.name = monster.name;
    translatedMonster.index = toLower(monster.name);
    translatedMonster.size = monster.size;
    translatedMonster.type = monster.type;
    translatedMonster.subtype = monster.subtype;
    translatedMonster.alignment = monster.alignment;
    translatedMonster.armor_class = monster.armor_class;
    translatedMonster.hit_points = monster.hit_points;
    translatedMonster.hit_dice = monster.hit_dice;
    if (monster.speed.walk) {
      translatedMonster.speed = translatedMonster.speed.concat(
        monster.speed.walk + ", "
      );
    }
    if (monster.speed.fly) {
      translatedMonster.speed = translatedMonster.speed.concat(
        "fly " + monster.speed.fly + ", "
      );
    }
    if (monster.speed.climb) {
      translatedMonster.speed = translatedMonster.speed.concat(
        "climb " + monster.speed.climb + ", "
      );
    }
    if (monster.speed.swim) {
      translatedMonster.speed = translatedMonster.speed.concat(
        "swim " + monster.speed.swim + ", "
      );
    }
    if (monster.speed.burrow) {
      translatedMonster.speed = translatedMonster.speed.concat(
        "burrow " + monster.speed.burrow
      );
    }
    translatedMonster.stats = {};
    if (monster.strength) translatedMonster.stats.strength = monster.strength;
    if (monster.dexterity)
      translatedMonster.stats.dexterity = monster.dexterity;
    if (monster.constitution)
      translatedMonster.stats.constitution = monster.constitution;
    if (monster.intelligence)
      translatedMonster.stats.intelligence = monster.intelligence;
    if (monster.wisdom) translatedMonster.stats.wisdom = monster.wisdom;
    if (monster.charisma) translatedMonster.stats.charisma = monster.charisma;
    if (monster.saving_throws)
      translatedMonster.saving_throws = monster.saving_throws;
    translatedMonster.proficiencies = [];
    translatedMonster.saving_throws = [];
    monster.proficiencies.forEach((element) => {
      if (element.proficiency) {
        if (element.proficiency.name.includes("Saving Throw:")) {
          translatedMonster.saving_throws.push(
            element.proficiency.name.replace("Saving Throw: ", "")
          );
        } else {
          translatedMonster.proficiencies.push({
            name: element.proficiency.name.substring(element.proficiency.name.indexOf(':') + 1),
            value: element.value,
          });
        }
      }
    });
    translatedMonster.damage_resistances = monster.damage_resistances;
    translatedMonster.damage_immunities = monster.damage_immunities;
    translatedMonster.damage_vulnerabilities = monster.damage_vulnerabilities;
    translatedMonster.condition_immunities = monster.condition_immunities;
    translatedMonster.senses = "";
    Object.entries(monster.senses).forEach((element) => {
      translatedMonster.senses = translatedMonster.senses.concat(
        element[0].replace("_", " ") + " " + element[1] + ", "
      );
    });
    if (monster.languages.length > 0)
      translatedMonster.languages = monster.languages;
    translatedMonster.challenge_rating = monster.challenge_rating;
    translatedMonster.xp = monster.xp;
    translatedMonster.special_abilities = [];
    if (monster.special_abilities) {
      monster.special_abilities.forEach((element) => {
        if (element.name === "Spellcasting") {
          translatedMonster.spell_casting = {};
          translatedMonster.spell_casting.spells = [];
          translatedMonster.spell_casting.slots = [];
          element.spellcasting.spells.forEach((spell) => {
            translatedMonster.spell_casting.spells.push({
              name: spell.name,
              level: spell.level,
              url: spell.url,
            });
          });
          Object.values(element.spellcasting.slots).forEach((slot) => {
            let tempArray = [];
            for (let i = 0; i < slot; i++) {
              tempArray.push("X");
            }
            translatedMonster.spell_casting.slots.push(tempArray);
          });
        }
        translatedMonster.special_abilities.push({
          name: element.name,
          desc: element.desc,
        });
      });
    }
    translatedMonster.actions = [];
    if (monster.actions) {
      monster.actions.forEach((element) => {
        translatedMonster.actions.push({
          name: element.name,
          desc: element.desc,
        });
      });
    }
    translatedMonster.reactions = [];
    if (monster.reactions) {
      monster.reactions.forEach((element) => {
        translatedMonster.reactions.push({
          name: element.name,
          desc: element.desc,
        });
      });
    }
    if (monster.legendary_actions) {
      translatedMonster.legendary_actions = {};
      translatedMonster.legendary_actions.actions_per_turn = ["X", "X", "X"];
      translatedMonster.legendary_actions.actions = [];
      if (monster.legendary_actions.actions) {
        translatedMonster.legendary_actions.actions =
          monster.legendary_actions.actions;
      } else {
        monster.legendary_actions.forEach((element) => {
          translatedMonster.legendary_actions.actions.push({
            name: element.name,
            desc: element.desc,
          });
        });
      }
    }

    if (monster.lair_actions) {
      translatedMonster.lair_actions = [];
      monster.lair_actions.forEach((element) => {
        translatedMonster.lair_actions.push({
          name: element.name,
          desc: element.desc,
        });
      });
    }
    translatedMons.push(translatedMonster);
  });
  return translatedMons;
};

export function monsterFileExists() {
  try {
    let filePath = "monsters.json";
    return fs.existsSync(filePath);
  } catch (error) {
    console.error(error);
  }
}

export function readMonsterFile() {
  try {
    let filePath = "monsters.json";
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

export function writeMonsterFile(translatedMonster) {
  try {
    let filePath = "monsters.json";
    fs.writeFileSync(filePath, JSON.stringify(translatedMonster));
  } catch (e) {
    console.error(e.message);
  }
}
