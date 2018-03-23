import { SimpleGame } from "../types";
import { SkillTemplate } from "../skill/Skill";

export function getSelectedSkillName(
  g: SimpleGame,
  playerId: string
): SkillTemplate {
  return g.playersContext[playerId].selectedSkill!;
}

export function getSkill(
  g: SimpleGame,
  playerId: string,
  skillName: string
): SkillTemplate {
  return g.playersContext[playerId].skills.filter(
    skill => skill.name === skillName
  )[0];
}
