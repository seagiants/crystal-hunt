import { CardLib } from "./cardLib";
import {
  ActionTemplate,
  CardTypeName,
  ActionCategoryName,
  ActionCategory,
  AutoTargetKey
} from "../action/Action";
import { UpgradeLib } from "../action/ability/abilityLib";
import { ActionCategoryLib } from "../action/actionLib";
import { Class2Name } from "../avatar/Avatar";
import { class2Lib } from "../avatar/class2Lib";

/** Defining Card based upon ActionTemplate,
 * adding a optional charge counter (for spell only ??)
 * optional upgradeName (equipment only ?? Spell ??)
 * optional autoTarget (enchantment only ?? Spell ??)
 */
export interface Card extends ActionTemplate {
  charge?: number;
  upgradeName?: string;
  // Use to determine auto target for enchantments and secondary target for multiple target abilities
  autoTarget?: AutoTargetKey | string;  
  description?: string;
}

export type CardLibrairy = { [key in string]: Card };

// Loader for Card
export function loadCard(cardName: string): Card {
  return CardLib[cardName];
}

export function loadUpgrade(card: Card): ActionTemplate {
  return UpgradeLib[card.upgradeName!];
}

// Using Fisher–Yates Shuffle algorithm (https://bost.ocks.org/mike/shuffle/)
// TODO ?: Could be implemented in a non-mutating way
export function shuffle<T>(array: T[]): T[] {
  var m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

export function loadDeck(class2: Class2Name): Array<Card> {
  const cardsList = class2Lib[class2];
  const reducer = (temp: Array<Card>, prop: string, index: number) => {
    const card = CardLib[prop];
    if (card !== undefined) {
      return [...temp, CardLib[prop]];
    } else {
      console.log("Card " + prop + " can't be loaded");
      return temp;
    }
  };
  const rawDeck = cardsList.reduce(reducer, []);
  return shuffle(rawDeck);
}

// Loader for CardCategory
export function loadCardCategory(
  cardCategoryName: ActionCategoryName
): ActionCategory {
  return ActionCategoryLib[cardCategoryName];
}

// Used to get the color of a Card
export function getCardColor(card: Card): string {
  return loadCardCategory(card.abilityCategory).color;
}

export function getCardType(card: Card): CardTypeName {
  return card.cardType;
}

// A card name follow the pattern ThisIsACard
// We want to extract each word from this.
export const splitCardName = (name: string): string[] => {
  const parts: string[] = [];
  const splitted = name.split("");
  const separators: number[] = [];
  for (let i in splitted) {
    if (splitted[i] === splitted[i].toUpperCase()) {
      separators.push(parseInt(i, 10));
    }
  }
  let pos = 0;
  for (let sep of separators) {
    if (sep !== 0) {
      parts.push(name.substring(pos, sep));
      pos = sep;
    }
    if (separators.indexOf(sep) === separators.length - 1) {
      parts.push(name.substring(sep, splitted.length));
    }
  }
  return parts;
};
