import {
  SkillCategoryName,
  CardLib,
  SkillCategoryLib,
  ActionType,
  UpgradeLib
} from "../action/skillLib";
import { SkillCategory, Equipment, Enchantment, Spell } from "../action/type";
import { Card, Decks } from "./types";

// Loaders for JSON data

// Loader for Card
export function loadCard(cardName: string): Card {
  return CardLib[cardName];
}

export function loadUpgrade(card: Card): Card {
  return UpgradeLib[card.upgradeName!];
}

export function loadCards(skillCategory: SkillCategoryName): Array<Card> {
  const test = Object.keys(CardLib).reduce(
    (temp, prop) =>
      CardLib[prop].skillCategory === skillCategory
        ? [...temp, CardLib[prop]]
        : temp,
    []
  );
  return test;
}

export function loadDecks(): Decks {
  return {
    Dexterity: loadCards(SkillCategoryName.Dexterity),
    Intelligence: loadCards(SkillCategoryName.Intelligence),
    Wisdom: loadCards(SkillCategoryName.Wisdom),
    Strength: loadCards(SkillCategoryName.Strength)
  };
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
