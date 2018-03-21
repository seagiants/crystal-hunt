import {
  Skill,
  SkillCategory,
  SkillPower,
  SkillCategoryName,
  SkillName,
  SkillDicType,
  SkillPowerDicType,
  SkillCategoryDicType
} from "./Skill";
import { SimpleGame } from "../types";

// This is dictionnaries, aka each key is mapped on skillName.
const SkillPowerDic: SkillPowerDicType = {
  Move: (g: SimpleGame): SimpleGame => {
    console.log("Try to move");
    return g;
  }
};

const SkillDic: SkillDicType = {
  Move: {
    name: SkillName.Move,
    skillCategory: SkillCategoryName.Dexterity,
    symbol: 1
  }
};

const SkillCategoryDic: SkillCategoryDicType = {
  Dexterity: {
    name: SkillCategoryName.Dexterity,
    color: "green"
  },
  Intelligence: {
    name: SkillCategoryName.Intelligence,
    color: "blue"
  },
  Wisdom: {
    name: SkillCategoryName.Wisdom,
    color: "yellow"
  },
  Strength: {
    name: SkillCategoryName.Strength,
    color: "red"
  }
};

export function getSkillPower(skillName: string): SkillPower {
  return SkillPowerDic[skillName];
}

export function getSkill(skillName: string): Skill {
  return SkillDic[skillName];
}

export function getSkillColor(skill: Skill): string {
  return getSkillCategory(skill.skillCategory).color;
}

export function getSkillCategory(skillCategoryName: SkillCategoryName): SkillCategory {
  return SkillCategoryDic[skillCategoryName];
}