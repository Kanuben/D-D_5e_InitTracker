import { ajax } from "rxjs/ajax";
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const loadMonsters = () => {
  return ajax.getJSON("https://www.dnd5eapi.co/api/monsters");
};

export const loadMonsterData = (monsterIndex) => {
  return ajax.getJSON("https://www.dnd5eapi.co/api/monsters/" + monsterIndex);
}
