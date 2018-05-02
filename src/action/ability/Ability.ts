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

/** Loading an ability from lib based on its name. */
export function loadActionCategory(
  abilityCategoryName: ActionCategoryName
): ActionCategory {
  return ActionCategoryLib[abilityCategoryName];
}
