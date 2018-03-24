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
import { setPlayerPosition, setCellCrystallize, setHealth } from "../state/setters";
import { getPlayerPosition, getAvatarOnCell } from "../state/getters";

// This is dictionnaries, aka each key is mapped on skillName.
export const SkillPowerDic: SkillPowerDicType = {
  Move: (g: SimpleGame, ctx: GameContext, xy: number[]): SimpleGame => {
    const [x, y] = xy;
    const key = Cell.toKey(x, y);
    let newG = setPlayerPosition(g, ctx.currentPlayer, key);
    console.log("Try to move");
    return newG;
  },
  Cristallize: (g: SimpleGame, ctx: GameContext) => {
    const playerCell = getPlayerPosition(g, ctx.currentPlayer);
    const crystallizedCell: SimpleGame = setCellCrystallize(
      g,
      playerCell,
      true
    );
    return crystallizedCell;
  },
  Attack: (g: SimpleGame, ctx: GameContext, xy: number[]) => {
    const avatar = getAvatarOnCell(g, xy[0], xy[1]);
    return avatar > -1 ? setHealth(g, avatar, -1) : g;
  }
};

export enum SkillName {
  Move = "Move",
  Cristallize = "Cristallize",
  Attack = "Attack"
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
    symbol: 1,
    isTargetRequired: true,
    powerName: "Move",
    caracs: {
      speed: 1
    }
  },
  Cristallize: {
    name: SkillName.Cristallize,
    skillCategory: SkillCategoryName.Wisdom,
    symbol: 2,
    isTargetRequired: false,
    powerName: "Cristallize",
    caracs: {
      quantity: 1
    }
  },
  Attack: {
    name: SkillName.Attack,
    skillCategory: SkillCategoryName.Strength,
    symbol: 3,
    isTargetRequired: true,
    powerName: "Attack",
    caracs: {
      attackValue: 1
    }
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

export function getSkillPower(powerName: string): SkillPower {
  return SkillPowerDic[powerName];
}

export function getSkillJSON(skillName: string): SkillJSON {
  return SkillDic[skillName];
}

export function getSkillCategory(
  skillCategoryName: SkillCategoryName
): SkillCategory {
  return SkillCategoryDic[skillCategoryName];
}
