import { TriggerPhase } from "./skillLib";
import { SimpleGame, GameContext } from "../types";
import { Caracs, ActionCategoryName } from "../action/Action";

/*
Model for Action implementation.
  * Power : functions that transform the state based on caracs and target.
  * Caracs : key/value objects used to customize power effect.
  * Skill : objects that associates power with specific caracs.
  * ActionCategory : Category name associated with a color.
*/

export interface Power {
  (
    G: SimpleGame,
    ctx: GameContext,
    targetId: string,
    powerCaracs: Caracs
  ): SimpleGame;
}

// Abstract interface, to group up common props between actions
export interface ACTIONTEMPLATE {
  name: string; // Action name, used to describe the action
  abilityCategory: ActionCategoryName; // Dext,Stren,Intell,Wisd, To be renamed.
  symbol: number;
  caracs: Caracs;
}

// Interface for action with power
export interface TRIGGERINGACTIONTEMPLATE extends ACTIONTEMPLATE {
  isTargetRequired?: boolean;
  trigger?: TriggerPhase;
  powerName: string;
}

export interface Skill extends TRIGGERINGACTIONTEMPLATE {
  isTargetRequired: boolean;
  toEquip?: string;
}

export interface Equipment extends ACTIONTEMPLATE {
  upgradeName?: string;
}

// Enchantment should be auto-trigger power, at start or end of turn, so no targetRequired
export interface Enchantment extends TRIGGERINGACTIONTEMPLATE {
  trigger: TriggerPhase;
}

// Spells are alternative skills, remplacing temporarely (based on charge value) the skill power.
export interface Spell extends TRIGGERINGACTIONTEMPLATE {
  isTargetRequired: boolean;
  charge: number;
}

export interface AttackCaracs extends Caracs {
  // Used to determine the attack damage.
  attackValue: number;
  // Used to determine the attack range.
  attackRange: number;
  [caracName: string]: number;
}

export interface MoveCaracs extends Caracs {
  // Used to determine the movement capacity.
  moveRange: number;
  [caracName: string]: number;
}

export interface HealCaracs extends Caracs {
  // Used to determine the health points to restore.
  healValue: number;
  [caracName: string]: number;
}

export interface DrawCaracs extends Caracs {
  // Used to determine the number of drawn cards.
  drawNumber: number;
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

export enum ActionTileStatus {
  Clicked = "Clicked",
  Exhausted = "Exhausted",
  Avalaible = "Avalaible"
}
/*
export type ActionsFlow = { [key in ActionCategoryName]: ActionFlow };

export interface ActionFlow {
  actionCategory: ActionCategoryName;
  status: ActionTileStatus;
  exhaustCounter: number;
}
*/
