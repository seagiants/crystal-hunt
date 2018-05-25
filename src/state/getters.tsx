import { SimpleGame } from "../types";
import { Cell } from "../map/types";
import { CellTypeName } from "../map/Cell";
import { Card } from "../cards/Card";
import { Caracs, ActionCategoryName, Action } from "../action/Action";
import { ActionCategoryLib } from "../action/actionLib";
import { AvatarTypeName, Avatar } from "../avatar/Avatar";

export function getSelectedActionCategory(
  g: SimpleGame,
  playerId: string
): ActionCategoryName | null {
  return g.selectedAction;
}

export function getCategory(action: Action): ActionCategoryName {
  return action.abilityCategory;
}
/*
export function getSkill(
  g: SimpleGame,
  playerId: string,
  skillName: string
): Skill {
  return g.playersContext[playerId].skills.filter(
    skill => skill.name === skillName
  )[0];
}
*/
/*
export function getSkillByCat(
  g: SimpleGame,
  playerId: string,
  abilityCategoryName: string
): Skill {
  return g.playersContext[playerId].skills.filter(
    skill => skill.abilityCategory === abilityCategoryName
  )[0];
}
*/
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

export function getMonsters(g: SimpleGame): Array<Avatar> {
  return g.avatars.filter(current => current.type === AvatarTypeName.Monster);
}

export function getMonsterCounter(g: SimpleGame): number {
  return g.monsterCounter;
}

export function getPlayerCaracs(g: SimpleGame, playerId: string): Caracs {
  return getAvatar(g, playerId).caracs;
}

export function hasUpgrade(card: Card): boolean {
  return card.upgradeName !== undefined;
}
/*
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
*/
// TODO : Should be Cell method, or Cell class is useless.
export function getAvatarOnCell(g: SimpleGame, cellId: string): string | null {
  return g.map[cellId].avatar;
}

export function getCell(g: SimpleGame, cellId: string): Cell {
  return g.map[cellId];
}

export function getBlackCrystalCellId(g: SimpleGame): string {
  return g.blackCrystalCellId;
}

export function getCellType(g: SimpleGame, cellId: string): CellTypeName {
  return g.map[cellId].type;
}

export function getCrystallized(g: SimpleGame, cellId: string): boolean {
  return g.map[cellId].isCrystallized;
}

export function isTrapped(g: SimpleGame, cellId: string): boolean {
  return g.map[cellId].trap;
}

export function getInfos(g: SimpleGame): Array<String> {
  return g.infoMessages;
}

export function getCategories(): Array<ActionCategoryName> {
  return Object.keys(ActionCategoryLib).map(cat => ActionCategoryName[cat]);
}
