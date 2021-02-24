import { ajax } from "rxjs/ajax";

export const loadConditions = () => {
  return ajax.getJSON("https://www.dnd5eapi.co/api/conditions");
};

export const loadConditionData = (conditionIndex) => {
  return ajax.getJSON("https://www.dnd5eapi.co/api/conditions/" + conditionIndex);
}
