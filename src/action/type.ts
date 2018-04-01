import { SkillCategoryName, ActionType, TriggerPhase } from "./skillLib";
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

// Abstract interface, to group up common props between actions
export interface ACTIONTEMPLATE {
  name: string; // Action name, used to describe the action
  skillCategory: SkillCategoryName; // Dext,Stren,Intell,Wisd, To be renamed.
  symbol: number;
  caracs: Caracs;
}

export interface Skill extends ACTIONTEMPLATE {
  isTargetRequired: boolean;
  powerName: string;
}

export interface Equipment extends ACTIONTEMPLATE {}

// Enchantment should be auto-trigger power, at start or end of turn, so no targetRequired
export interface Enchantment extends ACTIONTEMPLATE {  
  trigger: TriggerPhase;
  powerName: string;
}

// Spells are alternative skills, remplacing temporarely (based on charge value) the skill power.
export interface Spell extends Skill {
  charge: number;
}

export interface Card extends Skill {
  type: ActionType;
  trigger?: TriggerPhase;
  charge?: number;
}

export interface AttackCaracs extends Caracs {
  // Used to determine the attack damage.
  attackValue: number;
  [caracName: string]: number;
}

export interface HealCaracs extends Caracs {
  // Used to determine the health points to restore.
  healValue: number;
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
