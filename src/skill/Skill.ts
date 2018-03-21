import { SimpleGame, GameContext, Moves, Events } from "../types";

export interface SkillsBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}

export interface SkillProps {
  G: SimpleGame;
  skill: Skill;
  activateSkill(skill: Skill): object;
  endTurn(): object;
}

export enum SkillCategoryName {
  Dexterity = "Dexterity",
  Intelligence = "Intelligence",
  Wisdom = "Wisdom",
  Strength = "Strength"
}

export enum SkillName {
  Move = "Move"
}

export interface SkillCategory {
  name: SkillCategoryName;
  color: string;
}

export interface Skill {
  name: SkillName;
  skillCategory: SkillCategoryName;
  symbol: number;
}

export interface SkillPower {
  (G: SimpleGame): SimpleGame;
}

export type SkillPowerDicType = {[key in SkillName]: SkillPower };

export type SkillDicType = {[key in SkillName]: Skill};

export type SkillCategoryDicType = {[key in SkillCategoryName]: SkillCategory};