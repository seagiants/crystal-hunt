import { SimpleGame } from "../../types";
import { AbilityLib } from "./abilityLib";
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

export function loadAbility(abilityId: string): Ability {
  return AbilityLib[abilityId].ability;
}

/** Retrieving the ability reducer function corresponding to the ability name/id (same??) */
export function loadAbilityReducer(abilityId: string): AbilityReducer {
  return AbilityLib[abilityId].power;
}

/** Retrieving the ability checker function corresponding to the ability name/id (same??) */
export function loadAbilityChecker(abilityId: string): AbilityChecker {
  return AbilityLib[abilityId].check;
}

/** Loading an ability from lib based on its name. */
export function loadActionCategory(
  abilityCategoryName: ActionCategoryName
): ActionCategory {
  return ActionCategoryLib[abilityCategoryName];
}
