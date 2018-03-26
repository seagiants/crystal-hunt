import { SimpleGame } from "../types";
import { Skill, Caracs } from "../action/type";
import { SkillName } from "../action/skillLib";
import { Cell, Avatar } from "../map/type";
import { CellTypeName } from "../map/Cell";

export function getSelectedSkillName(
  g: SimpleGame,
  playerId: string
): SkillName {
  return g.playersContext[playerId].selectedSkill!;
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

export function getHealth(g: SimpleGame, playerId: string): number {
  return g.playersContext[playerId].caracs.healthCurrent;
}

export function getAvatar(g: SimpleGame, avatarId: string): Avatar {
  return g.avatars.filter(avatar => avatar.id === avatarId)[0];
}

export function getAvatarPosition(g: SimpleGame, avatarId: string): string {
  return getAvatar(g, avatarId).position;
}

export function getPlayerCaracs(g: SimpleGame, playerId: string): Caracs {
  return getAvatar(g, playerId).caracs;
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
