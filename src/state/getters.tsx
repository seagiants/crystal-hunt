import { SimpleGame } from "../types";
import { SkillJSON } from "../skill/Skill";
import { SkillName } from "../skill/skillLib";

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
