import { SkillCategoryName, CardLib, SkillCategoryLib } from "./skillLib";
import { Card, SkillCategory, Equipment } from "./type";

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

export function loadEquipment(card: Card): Equipment {
  return {
    name: card.name,
    skillCategory: card.skillCategory,
    symbol: card.symbol,
    caracs: card.caracs
  };
}
