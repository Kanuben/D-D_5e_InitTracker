import { ajax } from "rxjs/ajax";

export const loadSpells = () => {
  return ajax.getJSON("https://www.dnd5eapi.co/api/spells");
};

export const loadSpellData = (spellIndex) => {
  return ajax.getJSON("https://www.dnd5eapi.co/api/spells/" + spellIndex);
}
