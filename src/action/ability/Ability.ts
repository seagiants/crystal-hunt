import { SimpleGame } from "../../types";
import {
  Caracs,
  ActionCategoryName,
  ActionCategory
} from "../../action/Action";
import { ActionCategoryLib } from "../actionLib";

/** Giving the ability id, used to retrieve ability functions (as reducer or checker) and describes ability workFlow */
export interface Ability {
  id: string;
  isTargetRequired: boolean; // Used to handle the triggerAbility workflow.
  abilityType: AbilityTypeName; // Magical/Physical, used to retrieve the corresponding caracs when triggering ability.
}

export enum AbilityTypeName {
  Magical = "Magical",
  Physical = "Physical"
}

export type AbilityReducer = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: Caracs
) => SimpleGame;

export type AbilityChecker = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: Caracs
) => boolean;

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

/** Loading an ability from lib based on its name. */
export function loadActionCategory(
  abilityCategoryName: ActionCategoryName
): ActionCategory {
  return ActionCategoryLib[abilityCategoryName];
}
