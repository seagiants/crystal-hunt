import { SkillCategoryName, BasicSkillLib, SkillCategoryLib } from "./skillLib";
import { Skill, SkillCategory, ActionTileStatus } from "./type";
import { Card } from "../cards/types";

// Loaders for JSON data

// Loader for Skill
export function loadSkill(skillName: string): Skill {
  return BasicSkillLib[skillName];
}

// Loader for SkillCategory
export function loadSkillCategory(
  skillCategoryName: SkillCategoryName
): SkillCategory {
  return SkillCategoryLib[skillCategoryName];
}

// Used to get the color of a Skill
export function getColor(
  element: Skill | Card,
  status?: ActionTileStatus
): string {
  const skillCat = loadSkillCategory(element.skillCategory);
  switch (status) {
    case undefined:
      return skillCat.color;
    case ActionTileStatus.Avalaible:
      return skillCat.color;
    case ActionTileStatus.Clicked:
      return skillCat.clickedColor;
    case ActionTileStatus.Exhausted:
      return skillCat.exhaustedColor;
    default:
      return skillCat.color;
  }
}

export function getBasicSkill(category: SkillCategoryName): Skill {
  let basicSkill: Skill;
  Object.keys(BasicSkillLib).forEach((skillName: string) => {
    const currSkill: Skill = BasicSkillLib[skillName];
    if (currSkill.skillCategory === category) {
      basicSkill = { ...currSkill };
    }
  });
  return basicSkill!;
}
