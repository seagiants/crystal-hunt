import { SimpleGame, GameContext } from "../types";
import {
  getSkillPower,
  SkillName,
  SkillCategoryName,
  getSkillCategory
} from "./skillLib";

export interface SkillCategory {
  name: SkillCategoryName;
  color: string;
}

export interface SkillJSON {
  name: SkillName;
  skillCategory: SkillCategoryName;
  symbol: number;
  isTargetRequired: boolean;
  modifiers: Modifiers;
}

export class Skill implements SkillJSON {
  name: SkillName;
  skillCategory: SkillCategoryName;
  symbol: number;
  isTargetRequired: boolean;
  modifiers: Modifiers;
  constructor(template: SkillJSON) {
    this.name = template.name;
    this.skillCategory = template.skillCategory;
    this.symbol = template.symbol;
    this.isTargetRequired = template.isTargetRequired;
    this.modifiers = { ...template.modifiers };
  }
  power(g: SimpleGame, ctx: GameContext, target: object): SimpleGame {
    return getSkillPower(this.name)(g, ctx, target, this.modifiers);
  }
  getColor(): string {
    return getSkillCategory(this.skillCategory).color;
  }
  toJSON(): SkillJSON {
    return {
      name: this.name,
      skillCategory: this.skillCategory,
      symbol: this.symbol,
      isTargetRequired: this.isTargetRequired,
      modifiers: { ...this.modifiers }
    };
  }
}
// Correspond to key/value pairs used to modify power effect.
export interface Modifiers {
  [modifierName: string]: number | boolean;
}

export interface SkillPower {
  (
    G: SimpleGame,
    ctx: GameContext,
    target: object,
    powerModifiers: Modifiers
  ): SimpleGame;
}

export type SkillPowerDicType = { [key in SkillName]: SkillPower };

export type SkillDicType = { [key in SkillName]: SkillJSON };

export type SkillCategoryDicType = {
  [key in SkillCategoryName]: SkillCategory
};
