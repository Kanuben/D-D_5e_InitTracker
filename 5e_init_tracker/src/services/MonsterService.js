import { ajax } from "rxjs/ajax";

export const loadMonsters = () => {
  return ajax.getJSON("https://www.dnd5eapi.co/api/monsters");
};

export const loadMonsterData = (monsterIndex) => {
  return ajax.getJSON("https://www.dnd5eapi.co/api/monsters/" + monsterIndex);
}
