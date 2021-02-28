import MonsterTemplate from "../templates/monsterTemplate.json";

const fs = window.require("fs");
const path = window.require("path");


export const translateMonsters = (monsters) => {
  let translatedMonsters = [];
  monsters.forEach((monster) => {
    let translatedMonster = { ...MonsterTemplate };
    if (monster.img) {
      translatedMonster.img = monster.img;
    }
    translatedMonster.name = monster.name;
    translatedMonster.size = monster.size;
    translatedMonster.type = monster.type;
    translatedMonster.subtype = monster.subtype;
    translatedMonster.allignment = monster.allignment;
    translatedMonster.armor_class = monster.armor_class;
    translatedMonster.hit_points = monster.hit_points;
    translatedMonster.speed.fly = monster.speed.fly;
    translatedMonster.speed.swim = monster.speed.swim;
    translatedMonster.speed.walk = monster.speed.walk;
    translatedMonster.speed.climb = monster.speed.climb;
    translatedMonster.speed.burrow = monster.speed.burrow;
    if (monster.strength) translatedMonster.stats.strength = monster.strength;
    if (monster.dexterity)
      translatedMonster.stats.dexterity = monster.dexterity;
    if (monster.constitution)
      translatedMonster.stats.constitution = monster.constitution;
    if (monster.intelligence)
      translatedMonster.stats.intelligence = monster.intelligence;
    if (monster.wisdom) translatedMonster.stats.wisdom = monster.wisdom;
    if (monster.charisma) translatedMonster.stats.charisma = monster.charisma;
    translatedMonster.proficiencies = [];
    monster.proficiencies.forEach((element) => {
      if (element.proficiency) {
        translatedMonster.proficiencies.push({
          name: element.proficiency.name,
          value: element.value,
        });
      }
    });
    translatedMonster.damage_resistances = monster.damage_resistances;
    translatedMonster.damage_immunities = monster.damage_immunities;
    translatedMonster.damage_vulnerabilities = monster.damage_vulnerabilities;
    translatedMonster.condition_immunities = monster.condition_immunities;
    translatedMonster.senses = [];
    Object.entries(monster.senses).forEach((element) => {
      translatedMonster.senses.push({
        name: element[0],
        value: element[1],
      });
    });
    if (monster.languages.length > 0)
      translatedMonster.languages = monster.languages.split(",");
    translatedMonster.challenge_rating = monster.challenge_rating;
    translatedMonster.xp = monster.xp;
    translatedMonster.special_abilities = [];
    if (monster.special_abilities) {
      monster.special_abilities.forEach((element) => {
        if (element.name === "Spellcasting") {
          translatedMonster.spell_casting = {};
          translatedMonster.spell_casting.spells = [];
          translatedMonster.spell_casting.slots= [];
          element.spellcasting.spells.forEach((spell) => {
            translatedMonster.spell_casting.spells.push({
              name: spell.name,
              level: spell.level,
              url: spell.url,
            });
          });
         Object.values(
            element.spellcasting.slots
          ).forEach((slot) => {
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
    translatedMonster.legendary_actions.actions = [];
    if (monster.legendary_actions) {
      if (monster.legendary_actions.actions) {
      } else {
        monster.legendary_actions.forEach((element) => {
          translatedMonster.legendary_actions.actions.push({
            name: element.name,
            desc: element.desc,
          });
        });
      }
    }
    translatedMonster.lair_actions = [];
    if (monster.lair_actions) {
      monster.lair_actions.forEach((element) => {
        translatedMonster.lair_actions.push({
          name: element.name,
          desc: element.desc,
        });
      });
    }
    translatedMonsters.push(translatedMonster);
  });
  return translatedMonsters;
};

export function monsterFileExists() {
  try {
    let filePath = ""
    if(window.isDev){
      filePath = "./src/InitiativeTrackerApp/assets/monsters.json"
    } else{
      filePath = path.join(global.__dirname, "../src/InitiativeTrackerApp/assets/monsters.json")
    }
    return fs.existsSync( filePath);
  } catch (error) {
    console.error(error);
  }
}

export function readMonsterFile() {
  try {
    let filePath = ""
    if(window.isDev){
      filePath = "./src/InitiativeTrackerApp/assets/monsters.json"
    } else{
      filePath = path.join(global.__dirname, "../src/InitiativeTrackerApp/assets/monsters.json")
    }
    const data = fs.readFileSync(
      filePath,
      "utf8"
    );
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

export function writeMonsterFile(translatedMonster) {
  try {
    let filePath = ""
    if(window.isDev){
      filePath = "./src/InitiativeTrackerApp/assets/monsters.json"
    } else{
      filePath = path.join(global.__dirname, "../src/InitiativeTrackerApp/assets/monsters.json")
    }
    fs.writeFileSync(
      filePath,
      JSON.stringify(translatedMonster)
    );
  } catch (e) {
    console.log(e.message);
  }
}


