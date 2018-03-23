import { SimpleGame } from "../types";
import { SkillJSON } from "../skill/Skill";
import { SkillName } from "../skill/skillLib";
import { Cell } from "../map/Cell";

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
): SkillJSON {
  return g.playersContext[playerId].skills.filter(
    skill => skill.name === skillName
  )[0];
}

export function getAvatarOnCell(g: SimpleGame, x: number, y: number): number {
  return g.map[Cell.toKey(x, y)].avatar;
}
