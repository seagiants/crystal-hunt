import { SimpleGame } from "../types";
import {
  Skill,
  Caracs,
  Card,
  Equipment,
  Enchantment,
  ACTIONTEMPLATE,
  Spell
} from "../action/type";
import { TriggerPhase, SkillCategoryName } from "../action/skillLib";
import { Cell, Avatar } from "../map/type";
import { CellTypeName } from "../map/Cell";

export function getSelectedActionCategory(
  g: SimpleGame,
  playerId: string
): SkillCategoryName | null {
  return g.selectedAction;
}

export function getCategory(action: ACTIONTEMPLATE): SkillCategoryName {
  return action.skillCategory;
}

export function getSkill(
  g: SimpleGame,
  playerId: string,
  skillName: string
): Skill {
  return g.playersContext[playerId].skills.filter(
    skill => skill.name === skillName
  )[0];
}

export function getSpell(
  g: SimpleGame,
  playerId: string,
  categoryName: SkillCategoryName
): Spell {
  return g[`${categoryName.toLowerCase()}SpellPlayer${playerId}`];
}

export function getSkillByCat(
  g: SimpleGame,
  playerId: string,
  skillCategoryName: string
): Skill {
  return g.playersContext[playerId].skills.filter(
    skill => skill.skillCategory === skillCategoryName
  )[0];
}

export function getHealth(g: SimpleGame, avatarId: string): number {
  return g.avatars.filter(avatar => avatar.id === avatarId)[0].caracs
    .healthCurrent;
}

export function getHealthInit(g: SimpleGame, avatarId: string): number {
  return g.avatars.filter(avatar => avatar.id === avatarId)[0].caracs
    .healthInit;
}

export function getAvatar(g: SimpleGame, avatarId: string): Avatar {
  return g.avatars.filter(avatar => avatar.id === avatarId)[0];
}

export function getAvatarPosition(g: SimpleGame, avatarId: string): string {
  return getAvatar(g, avatarId).position;
}

export function getMonsterCounter(g: SimpleGame): number {
  return g.monsterCounter;
}

export function getPlayerCaracs(g: SimpleGame, playerId: string): Caracs {
  return getAvatar(g, playerId).caracs;
}

export function getEquipment(
  g: SimpleGame,
  playerId: string,
  categoryName: string
): Equipment {
  return g[`equipmentPlayer${playerId}`];
}

export function getEquipmentPlayerCaracs(
  g: SimpleGame,
  playerId: string
): Caracs {
  return g[`equipmentPlayer${playerId}`] !== undefined
    ? g[`equipmentPlayer${playerId}`].caracs
    : {};
}

export function getEnchantment(
  g: SimpleGame,
  playerId: string,
  categoryName: string
): Enchantment {
  return g[`enchantmentPlayer${playerId}`];
}

export function getEnchantmentTrigger(
  g: SimpleGame,
  playerId: string,
  categoryName: string
): TriggerPhase {
  return g[`enchantmentPlayer${playerId}`] !== undefined
    ? g[`enchantmentPlayer${playerId}`].trigger
    : null;
}

// TODO : Should be Cell method, or Cell class is useless.
export function getAvatarOnCell(g: SimpleGame, cellId: string): string | null {
  return g.map[cellId].avatar;
}

export function getCell(g: SimpleGame, cellId: string): Cell {
  return g.map[cellId];
}

export function getCellType(g: SimpleGame, cellId: string): CellTypeName {
  return g.map[cellId].type;
}

export function getCrystallized(g: SimpleGame, cellId: string): boolean {
  return g.map[cellId].isCrystallized;
}

export function getCards(g: SimpleGame, playerId: string): Array<Card> {
  return g.playersContext[playerId].cards;
}

export function getCard(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): Card {
  return getCards(g, playerId)[cardIndex];
}
