import { SkillCategoryName } from "./skillLib";
import { SimpleGame, GameContext } from "../types";

/*
Model for Action implementation.
  * Power : functions that transform the state based on caracs and target.
  * Caracs : key/value objects used to customize power effect.
  * Skill : objects that associates power with specific caracs.
  * SkillCategory : Category name associated with a color.
*/

export interface Power {
  (
    G: SimpleGame,
    ctx: GameContext,
    targetId: string,
    powerCaracs: Caracs
  ): SimpleGame;
}

// Correspond to key/value pairs for game elements (player, monster, skill, spell) caracteristics.
// Caracteristics are tagged name assiociated with some game logic.
export interface Caracs {
  [caracName: string]: number;
}

export interface SkillCategory {
  name: SkillCategoryName;
  color: string;
}

export interface Skill {
  name: string;
  skillCategory: SkillCategoryName;
  symbol: number;
  isTargetRequired: boolean;
  caracs: Caracs;
  powerName: string;
}

export interface AttackCaracs extends Caracs {
  // Used to determine the attack damage.
  attackValue: number;
  [caracName: string]: number;
}

export interface CheckTarget {
  (
    G: SimpleGame,
    ctx: GameContext,
    targetId: string,
    powerCaracs: Caracs
  ): boolean;
}
