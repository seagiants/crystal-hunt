import {
  SkillCategoryName,
  CardLib,
  SkillCategoryLib,
  ActionType
} from "./skillLib";
import { Card, SkillCategory, Equipment, Enchantment, Spell } from "./type";

// Loaders for JSON data

// Loader for Card
export function loadCard(cardName: string): Card {
  return CardLib[cardName];
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
    isTargetRequired: card.isTargetRequired,
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
