import { SkillCategoryName, SkillLib, SkillCategoryLib } from "./skillLib";
import { Skill, SkillCategory } from "./type";

// Loaders for JSON data

// Loader for Skill
export function loadSkill(skillName: string): Skill {
  return SkillLib[skillName];
}

// Loader for SkillCategory
export function loadSkillCategory(
  skillCategoryName: SkillCategoryName
): SkillCategory {
  return SkillCategoryLib[skillCategoryName];
}

// Used to get the color of a Skill
export function getColor(skill: Skill): string {
  return loadSkillCategory(skill.skillCategory).color;
}
