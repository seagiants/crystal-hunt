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
}

export class Skill implements SkillJSON {
  name: SkillName;
  skillCategory: SkillCategoryName;
  symbol: number;
  isTargetRequired: boolean;
  constructor(template: SkillJSON) {
    this.name = template.name;
    this.skillCategory = template.skillCategory;
    this.symbol = template.symbol;
    this.isTargetRequired = template.isTargetRequired;
  }
  power(
    g: SimpleGame,
    ctx: GameContext,
    playerId: string,
    target: object
  ): SimpleGame {
    return getSkillPower(this.name)(g, ctx, playerId, target);
  }
  getColor(): string {
    return getSkillCategory(this.skillCategory).color;
  }
  toJSON(): SkillJSON {
    return {
      name: this.name,
      skillCategory: this.skillCategory,
      symbol: this.symbol,
      isTargetRequired: this.isTargetRequired
    };
  }
}

export interface SkillPower {
  (
    G: SimpleGame,
    ctx: GameContext,
    playerId: string,
    target: object
  ): SimpleGame;
}

export type SkillPowerDicType = { [key in SkillName]: SkillPower };

export type SkillDicType = { [key in SkillName]: SkillJSON };

export type SkillCategoryDicType = {
  [key in SkillCategoryName]: SkillCategory
};
