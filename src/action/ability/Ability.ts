import { SimpleGame } from "../../types";
import {
  Caracs,
  ActionCategoryName,
  ActionCategory
} from "../../action/Action";
import { ActionCategoryLib } from "../actionLib";

/** Giving the ability id, used to retrieve ability functions (as reducer or checker) and describes ability workFlow */
export interface Ability {
  abilityType: AbilityTypeName; // Magical/Physical, used to retrieve the corresponding caracs when triggering ability.
  isTargetRequired: false | CheckName;
  trigger: TriggerName;
}

export enum AbilityTypeName {
  Magical = "Magical",
  Physical = "Physical"
}

export enum TriggerName {
  move = "move",
  crystalize = "crystalize",
  attack = "attack",
  draw = "draw",
  heal = "heal",
  summon = "summon",
  trapACell = "trapACell",
  equip = "equip",
  enchant = "enchant",
  refreshAction = "refreshAction",
  circularAttack = "circularAttack",
  push = "push",
  poisonAttack = "poisonAttack",
  poison = "poison"
}

export enum CheckName {
  checkMovePath = "checkMovePath",
  isEmpty = "isEmpty",
  hasAvatar = "hasAvatar",
  checkAttackPath = "checkAttackPath",
  checkPushPath = "checkPushPath",
  checkFlyingPath = "checkFlyingPath"
}

/*
export interface triggerParams {
  g: SimpleGame;
  avatarId: string;
  targetId: string;
  caracs: Caracs;
}
*/

export type AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: Caracs
) => SimpleGame;

/*
export interface checkParams {
  g: SimpleGame;
  avatarId: string;
  targetId: string;
  caracs: Caracs;
}
*/
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
