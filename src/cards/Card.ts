import {
  SkillCategoryName,
  CardLib,
  SkillCategoryLib,
  ActionType,
  UpgradeLib
} from "../action/skillLib";
import { SkillCategory, Equipment, Enchantment, Spell } from "../action/type";
import { Card } from "./types";

// Loaders for JSON data

// Loader for Card
export function loadCard(cardName: string): Card {
  return CardLib[cardName];
}

export function loadUpgrade(card: Card): Card {
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
/*
export function loadCards(skillCategory: SkillCategoryName): Array<Card> {
  const test = Object.keys(CardLib).reduce(
    (temp, prop) =>
      CardLib[prop].skillCategory === skillCategory
        ? [...temp, CardLib[prop]]
        : temp,
    []
  );
  return shuffle(test);
}

export function loadDecks(): Decks {
  return {
    Dexterity: loadCards(SkillCategoryName.Dexterity),
    Intelligence: loadCards(SkillCategoryName.Intelligence),
    Wisdom: loadCards(SkillCategoryName.Wisdom),
    Strength: loadCards(SkillCategoryName.Strength)
  };
}
*/

export function loadDeck(): Array<Card> {
  const rawDeck = Object.keys(CardLib).reduce(
    (temp, prop) => [...temp, CardLib[prop]],
    []
  );
  return shuffle(rawDeck);
}

// Loader for CardCategory
export function loadCardCategory(
  cardCategoryName: SkillCategoryName
): SkillCategory {
  return SkillCategoryLib[cardCategoryName];
}

// Used to get the color of a Card
export function getColor(card: Card): string {
  return loadCardCategory(card.skillCategory).color;
}

export function getCardType(card: Card): ActionType {
  return card.type;
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

export function loadEquipment(card: Card): Equipment {
  return {
    name: card.name,
    skillCategory: card.skillCategory,
    symbol: card.symbol,
    caracs: card.caracs
  };
}

export function loadSpell(card: Card): Spell {
  return {
    name: card.name,
    skillCategory: card.skillCategory,
    symbol: card.symbol,
    caracs: card.caracs,
    powerName: card.powerName,
    isTargetRequired: card.isTargetRequired!,
    charge: card.charge!
  };
}

export function loadEnchantment(card: Card): Enchantment {
  return {
    name: card.name,
    skillCategory: card.skillCategory,
    symbol: card.symbol,
    caracs: card.caracs,
    powerName: card.powerName,
    trigger: card.trigger!
  };
}
