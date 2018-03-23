import {
  SkillJSON,
  SkillCategory,
  SkillPower,
  SkillDicType,
  SkillPowerDicType,
  SkillCategoryDicType
} from "./Skill";
import { SimpleGame, GameContext } from "../types";
import { Cell } from "../map/Cell";
import { setPlayerPosition } from "../state/setters";

// This is dictionnaries, aka each key is mapped on skillName.
const SkillPowerDic: SkillPowerDicType = {
  Move: (
    g: SimpleGame,
    ctx: GameContext,
    playerID: string,
    xy: number[]
  ): SimpleGame => {
    const [x, y] = xy;
    const key = Cell.toKey(x, y);
    let newG = setPlayerPosition(g, ctx.currentPlayer, key);
    console.log("Try to move");
    return newG;
  }
};

export enum SkillName {
  Move = "Move"
}

export enum SkillCategoryName {
  Dexterity = "Dexterity",
  Intelligence = "Intelligence",
  Wisdom = "Wisdom",
  Strength = "Strength"
}

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

export function getSkillJSON(skillName: string): SkillJSON {
  return SkillDic[skillName];
}

export function getSkillCategory(
  skillCategoryName: SkillCategoryName
): SkillCategory {
  return SkillCategoryDic[skillCategoryName];
}
