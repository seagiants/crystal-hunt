import { SimpleGame, GameContext, Moves, Events } from "../types";
import { getSkillPower, SkillName, SkillCategoryName, getSkillCategory } from "./skillLib";

export interface SkillsBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}

export interface SkillProps {
  G: SimpleGame;
  skill: SkillTemplate;
  activateSkill(skill: SkillTemplate): object;
  endTurn(): object;
}

export interface SkillCategory {
  name: SkillCategoryName;
  color: string;
}

export interface SkillTemplate {
  name: SkillName;
  skillCategory: SkillCategoryName;
  symbol: number;
}

export class Skill implements SkillTemplate {
  name: SkillName;
  skillCategory: SkillCategoryName;
  symbol: number;  
  constructor(template: SkillTemplate) {
    this.name = template.name;
    this.skillCategory = template.skillCategory;
    this.symbol = template.symbol;
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
}

export interface SkillPower {
  (
    G: SimpleGame,
    ctx: GameContext,
    playerId: string,
    target?: object
  ): SimpleGame;
}

export type SkillPowerDicType = { [key in SkillName]: SkillPower };

export type SkillDicType = { [key in SkillName]: SkillTemplate };

export type SkillCategoryDicType = {
  [key in SkillCategoryName]: SkillCategory
};
