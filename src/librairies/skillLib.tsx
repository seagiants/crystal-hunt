import { Skill, SkillName, SkillCategory, SkillCategoryName, SimpleGame } from "../types";

export const SkillCategoryLib: Array<SkillCategory> = [
    {
        name: SkillCategoryName.Dexterity,
        color: "green"
    }
];

export function getSkillCategory(skillCategoryName: SkillCategoryName): SkillCategory {
    return SkillCategoryLib.filter((skillCategory: SkillCategory) => skillCategory.name === skillCategoryName)[0];
}

export const SkillLib: Array<Skill> = [
    {
        name: SkillName.Move,
        skillCategory: SkillCategoryName.Dexterity,
        symbol: 1,
        skillPower: (g: SimpleGame): SimpleGame => {
            console.log("Try to move");
            return g;
        }        
    }

];

export function getSkill(skillName: SkillName): Skill {
    return SkillLib.filter((skill: Skill) => skill.name === skillName)[0];
}

export function getSkillColor(skill: Skill): string {
    return getSkillCategory(skill.skillCategory).color;
}