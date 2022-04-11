import { indexOf, toLower } from "lodash";
import { Monster } from "../templates/monster";
import { isElectron } from "./ElectronHelper";
import { loadSpellData, loadSpells } from "../../services/SpellService";
import { Observable, map, pipe, forkJoin } from "rxjs";

let fs;
let path;
if (isElectron()) {
  fs = window.require("fs");
  path = window.require("path");
  const app = window.require("electron");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function retrieveSpells() {
  return loadSpells().pipe(
    map((spells) => {
      let tasks = [];
      spells.results.forEach((spell) => {
        tasks.push(loadSpellData(spell.index));
      });
      return forkJoin(...[tasks]);
    })
  );
}

export const newTranslateMonsters = (monsters, spells) => {
  let translatedMons = [];
  let map = new Map();
  retrieveSpells().subscribe((result) => {
    result.subscribe((spells) => {
      monsters.monsterList.forEach((monster) => {
        let tempMonster = new Monster();
        let typeArr = monster.type.split(",");
        let sourceArr = typeArr.pop().trim().split(" ");
        sourceArr.forEach((source, index) => {
          sourceArr[index] = capitalizeFirstLetter(source);
        });
        tempMonster.source = sourceArr.join(" ");
        if (monster.img) {
          tempMonster.img = monster.img;
        }
        tempMonster.name = monster.name;
        console.log(monster.name);
        tempMonster.index = toLower(monster.name);
        switch (monster.size) {
          case "L":
            tempMonster.size = "Large";
            break;
          case "T":
            tempMonster.size = "Tiny";
            break;
          case "S":
            tempMonster.size = "Small";
            break;
          case "H":
            tempMonster.size = "Huge";
            break;
          case "G":
            tempMonster.size = "Gargantuan";
            break;
          case "M":
            tempMonster.size = "Medium";
            break;
        }
        typeArr = typeArr[0].split(" ");
        tempMonster.type = typeArr[0];
        if (typeArr[1]) {
          typeArr[1] = typeArr[1].replace(/[()]/g, "");
          tempMonster.subtype = typeArr[1].split(",");
        }
        tempMonster.alignment = monster.alignment;
        tempMonster.armor_class = monster.ac;
        if (monster.name == "Avatar of Death") {
          tempMonster.hit_points =
            "half the hit point maximum of its summoner multiplied by its proficiency bonus";
          tempMonster.hit_dice_count = "";
          tempMonster.hit_die = "";
        } else {
          let tempHp = monster.hp.split(" ");
          tempMonster.hit_points = tempHp[0];
          if (tempHp[1]) {
            let tempDice = tempHp[1].replace(/[()]/g, "");
            tempMonster.hit_dice_count = tempDice.substring(
              0,
              tempDice.indexOf("d")
            );
            if (tempDice.includes("+")) {
              tempMonster.hit_die = tempDice.substring(
                tempDice.indexOf("d"),
                tempDice.indexOf("+")
              );
            } else {
              tempMonster.hit_die = tempDice.substring(tempDice.indexOf("d"));
            }
          }
        }

        tempMonster.speed = monster.speed;

        tempMonster.stats = {};
        if (monster.str) tempMonster.stats.strength = monster.str;
        if (monster.dex) tempMonster.stats.dexterity = monster.dex;
        if (monster.con) tempMonster.stats.constitution = monster.con;
        if (monster.int) tempMonster.stats.intelligence = monster.int;
        if (monster.wis) tempMonster.stats.wisdom = monster.wis;
        if (monster.cha) tempMonster.stats.charisma = monster.cha;
        if (monster.save)
          tempMonster.saving_throws = monster.save
            .replace(/[0-9+]/g, "")
            .split(",");
        tempMonster.proficiencies = [];
        tempMonster.saving_throws = [];
        if (monster.skill) {
          let tempSkillArr = [];
          if (Array.isArray(monster.skill)) {
            tempSkillArr = monster.skill;
          } else {
            tempSkillArr = monster.skill.split(",");
          }
          tempSkillArr.forEach((skill) => {
            let tempSkill = skill.trim().split(" ");
            tempMonster.proficiencies.push({
              name: tempSkill[0],
              value: tempSkill[1].replace(/[+]/g, ""),
            });
          });
        }

        // monster.proficiencies.forEach((element) => {
        //     if (element.proficiency) {
        //         if (element.proficiency.name.includes("Saving Throw:")) {
        //             tempMonster.saving_throws.push(
        //                 element.proficiency.name.replace("Saving Throw: ", "")
        //             );
        //         } else {
        //             tempMonster.proficiencies.push({
        //                 name: element.proficiency.name.substring(element.proficiency.name.indexOf(':') + 1),
        //                 value: element.value,
        //             });
        //         }
        //     }
        // });
        if (monster.resist)
          tempMonster.damage_resistances = monster.resist.split(",");
        if (monster.immune)
          tempMonster.damage_immunities = monster.immune.split(",");
        if (monster.vulnerable)
          tempMonster.damage_vulnerabilities = monster.vulnerable.split(",");
        if (monster.conditionImmune)
          tempMonster.condition_immunities = monster.conditionImmune.split(",");
        if (monster.senses) tempMonster.senses = monster.senses;
        // Object.entries(monster.senses).forEach((element, index) => {
        //     if (Object.entries(monster.senses).length === index + 1) {
        //         tempMonster.senses = tempMonster.senses.concat(
        //             element[0].replace("_", " ") + " " + element[1]
        //         );
        //     } else {
        //         tempMonster.senses = tempMonster.senses.concat(
        //             element[0].replace("_", " ") + " " + element[1] + ", "
        //         );
        //     }
        // });
        if (monster.languages && monster.languages.length > 0)
          tempMonster.languages = monster.languages;
        tempMonster.challenge_rating = monster.cr;
        if (monster.xp) tempMonster.xp = monster.xp;
        tempMonster.special_abilities = [];
        if (monster.trait) {
          if (Array.isArray(monster.trait)) {
            monster.trait.forEach((element) => {
              tempMonster.special_abilities.push({
                name: element.name,
                desc: element.text,
              });
            });
          } else {
            tempMonster.special_abilities.push({
              name: monster.trait.name,
              desc: monster.trait.text,
            });
          }
        }
        if (monster.spells) {
          monster.spells.split(",").forEach((spell) => {
            spell = spell.trim().replace(/\s+/g, "-").toLowerCase();
            let tempSpell = spells.find((element) => element.index == spell);
            if (tempSpell) {
              tempMonster.spell_casting.spells.push({
                name: tempSpell.name,
                level: tempSpell.level,
                url: tempSpell.url,
              });
            }
          });
          tempMonster.spell_casting.spells =
            tempMonster.spell_casting.spells.sort((a, b) =>
              a.level > b.level ? 1 : b.level > a.level ? -1 : 0
            );
        }

        tempMonster.actions = [];
        if (monster.action) {
          if (Array.isArray(monster.action)) {
            monster.action.forEach((element) => {
              tempMonster.actions.push({
                name: element.name,
                desc: element.text,
              });
            });
          } else {
            tempMonster.actions.push({
              name: monster.action.name,
              desc: monster.action.text,
            });
          }
        }
        tempMonster.reactions = [];
        if (monster.reaction) {
          if (Array.isArray(monster.reaction)) {
            monster.reaction.forEach((element) => {
              tempMonster.reactions.push({
                name: element.name,
                desc: element.text,
              });
            });
          } else {
            tempMonster.reactions.push({
              name: monster.reaction.name,
              desc: monster.reaction.text,
            });
          }
        }
        if (monster.legendary) {
          tempMonster.legendary_actions = {};
          tempMonster.legendary_actions.actions = [];
          if (Array.isArray(monster.legendary)) {
            if (monster.legendary.actions) {
              tempMonster.legendary_actions.actions =
                monster.legendary_actions.actions;
            } else {
              monster.legendary.forEach((element) => {
                tempMonster.legendary_actions.actions.push({
                  name: element.name,
                  desc: element.text,
                });
              });
            }
          } else {
            tempMonster.legendary_actions.actions.push({
              name: monster.legendary.name,
              desc: monster.legendary.text,
            });
          }
        }

        let tempMonArr = [];
        if (map.get(tempMonster.source)) {
          tempMonArr = map.get(tempMonster.source);
        }
        tempMonArr.push(tempMonster);
        map.set(tempMonster.source, tempMonArr);
      });
      newWriteMonsterFile(map);
    });
  });
};

export function newMonsterFileExists() {
  try {
    let filePath = "monsterList.json";
    if (isElectron()) {
      return fs.existsSync(filePath);
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export function newReadMonsterFile() {
  try {
    let filePath = "monsterList.json";
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

export function newWriteMonsterFile(monsterMap) {
  try {
    if (isElectron()) {
      monsterMap.forEach((value, key) => {
        fs.writeFileSync(key + ".book", JSON.stringify(value));
      });
    }
  } catch (e) {
    console.error(e.message);
  }
}
