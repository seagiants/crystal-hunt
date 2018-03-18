import {
  Skill,
  SkillCategory,
  SkillCategoryName,
  SimpleGame,
  SkillName,
  SkillPowerDicType
} from "../types";

export const SkillCategoryLib: Array<SkillCategory> = [
  {
    name: SkillCategoryName.Dexterity,
    color: "green"
  }
];

export function getSkillCategory(
  skillCategoryName: SkillCategoryName
): SkillCategory {
  return SkillCategoryLib.filter(
    (skillCategory: SkillCategory) => skillCategory.name === skillCategoryName
  )[0];
}

const SkillLib: Array<Skill> = [
  {
    name: SkillName.Move,
    skillCategory: SkillCategoryName.Dexterity,
    symbol: 1
  }
];

// This is a dictionnary, aka each key is mapped on skillName.
const SkillPowerDic: SkillPowerDicType = {
  Move: (g: SimpleGame): SimpleGame => {
    console.log("Try to move");
    return g;
  }
};

export function getSkillPower(skillName: string) {
  return SkillPowerDic[skillName];
}

export function getSkill(skillName: string): Skill {
  return SkillLib.filter((skill: Skill) => skill.name === skillName)[0];
}

export function getSkillColor(skill: Skill): string {
  return getSkillCategory(skill.skillCategory).color;
}
