import { indexOf, toLower } from "lodash";
import { Monster } from "../templates/monster";
import { isElectron } from "./ElectronHelper";

let fs;
let path;
if (isElectron()) {
  fs = window.require("fs");
  path = window.require("path");
  const app = window.require('electron')
}


export const translateMonsters = (monsters) => {
  let translatedMons = [];
  monsters.forEach((monster) => {
    let tempMonster = new Monster();
    tempMonster.source = "SRD"
    if (monster.img) {
      tempMonster.img = monster.img;
    }
    tempMonster.name = monster.name;
    tempMonster.index = toLower(monster.name);
    tempMonster.size = monster.size;
    tempMonster.type = monster.type;
    if (monster.subtype)
      tempMonster.subtype = monster.subtype.split(',');
    tempMonster.alignment = monster.alignment;
    tempMonster.armor_class = monster.armor_class;
    tempMonster.hit_points = monster.hit_points;
    tempMonster.hit_dice_count = monster.hit_dice.substring(0, monster.hit_dice.indexOf('d'));
    tempMonster.hit_die = monster.hit_dice.substring(monster.hit_dice.indexOf('d'));

    if (monster.speed.walk) {
      if (monster.speed.fly || monster.speed.climb || monster.speed.swim || monster.speed.burrow) {
        tempMonster.speed = tempMonster.speed.concat(
          monster.speed.walk + ", "
        );
      } else {
        tempMonster.speed = tempMonster.speed.concat(
          monster.speed.walk
        );
      }
    }

    if (monster.speed.fly) {
      if (monster.speed.climb || monster.speed.swim || monster.speed.burrow) {
        tempMonster.speed = tempMonster.speed.concat(
          "fly " + monster.speed.fly + ", "
        );
      } else {
        tempMonster.speed = tempMonster.speed.concat(
          "fly " + monster.speed.fly
        );
      }

    }

    if (monster.speed.climb) {
      if (monster.speed.swim || monster.speed.burrow) {
        tempMonster.speed = tempMonster.speed.concat(
          "climb " + monster.speed.climb + ", "
        );
      } else {
        tempMonster.speed = tempMonster.speed.concat(
          "climb " + monster.speed.climb
        );
      }
    }

    if (monster.speed.swim) {
      if (monster.speed.burrow) {
        tempMonster.speed = tempMonster.speed.concat(
          "swim " + monster.speed.swim + ", "
        );
      } else {
        tempMonster.speed = tempMonster.speed.concat(
          "swim " + monster.speed.swim
        );
      }
    }

    if (monster.speed.burrow) {
      tempMonster.speed = tempMonster.speed.concat(
        "burrow " + monster.speed.burrow
      );
    }

    tempMonster.stats = {};
    if (monster.strength) tempMonster.stats.strength = monster.strength;
    if (monster.dexterity)
      tempMonster.stats.dexterity = monster.dexterity;
    if (monster.constitution)
      tempMonster.stats.constitution = monster.constitution;
    if (monster.intelligence)
      tempMonster.stats.intelligence = monster.intelligence;
    if (monster.wisdom) tempMonster.stats.wisdom = monster.wisdom;
    if (monster.charisma) tempMonster.stats.charisma = monster.charisma;
    if (monster.saving_throws)
      tempMonster.saving_throws = monster.saving_throws;
    tempMonster.proficiencies = [];
    tempMonster.saving_throws = [];
    monster.proficiencies.forEach((element) => {
      if (element.proficiency) {
        if (element.proficiency.name.includes("Saving Throw:")) {
          tempMonster.saving_throws.push(
            element.proficiency.name.replace("Saving Throw: ", "")
          );
        } else {
          tempMonster.proficiencies.push({
            name: element.proficiency.name.substring(element.proficiency.name.indexOf(':') + 1),
            value: element.value,
          });
        }
      }
    });
    tempMonster.damage_resistances = monster.damage_resistances;
    tempMonster.damage_immunities = monster.damage_immunities;
    tempMonster.damage_vulnerabilities = monster.damage_vulnerabilities;
    tempMonster.condition_immunities = monster.condition_immunities.map((immunity) => immunity.name);
    tempMonster.senses = "";
    Object.entries(monster.senses).forEach((element, index) => {
      if (Object.entries(monster.senses).length === index + 1) {
        tempMonster.senses = tempMonster.senses.concat(
          element[0].replace("_", " ") + " " + element[1]
        );
      } else {
        tempMonster.senses = tempMonster.senses.concat(
          element[0].replace("_", " ") + " " + element[1] + ", "
        );
      }
    });
    if (monster.languages.length > 0)
      tempMonster.languages = monster.languages;
    tempMonster.challenge_rating = monster.challenge_rating;
    tempMonster.xp = monster.xp;
    tempMonster.special_abilities = [];
    if (monster.special_abilities) {
      monster.special_abilities.forEach((element) => {
        if (element.name === "Spellcasting") {
          tempMonster.spell_casting = {};
          tempMonster.spell_casting.spells = [];
          tempMonster.spell_casting.slots = [];
          element.spellcasting.spells.forEach((spell) => {
            tempMonster.spell_casting.spells.push({
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
            tempMonster.spell_casting.slots.push(tempArray);
          });
        }
        tempMonster.special_abilities.push({
          name: element.name,
          desc: element.desc,
        });
      });
    }
    tempMonster.actions = [];
    if (monster.actions) {
      monster.actions.forEach((element) => {
        tempMonster.actions.push({
          name: element.name,
          desc: element.desc,
        });
      });
    }
    tempMonster.reactions = [];
    if (monster.reactions) {
      monster.reactions.forEach((element) => {
        tempMonster.reactions.push({
          name: element.name,
          desc: element.desc,
        });
      });
    }
    if (monster.legendary_actions) {
      tempMonster.legendary_actions = {};
      tempMonster.legendary_actions.actions = [];
      if (monster.legendary_actions.actions) {
        tempMonster.legendary_actions.actions =
          monster.legendary_actions.actions;
      } else {
        monster.legendary_actions.forEach((element) => {
          tempMonster.legendary_actions.actions.push({
            name: element.name,
            desc: element.desc,
          });
        });
      }
    }

    if (monster.lair_actions) {
      tempMonster.lair_actions = "";
      // monster.lair_actions.forEach((element) => {
      //   tempMonster.lair_actions.push({
      //     name: element.name,
      //     desc: element.desc,
      //   });
      // });
    }
    translatedMons.push(tempMonster);
  });
  return translatedMons;
};

export function monsterFileExists() {
  try {
    let filePath = "monsters.json";
    if (isElectron()) {
      return fs.existsSync(filePath);
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export function readMonsterFile() {
  try {
    let filePath = "monsters.json";
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

export function writeMonsterFile(tempMonster) {
  try {
    let filePath = "monsters.json";
    if (isElectron()) {
      fs.writeFileSync(filePath, JSON.stringify(tempMonster));
    }
  } catch (e) {
    console.error(e.message);
  }
}
