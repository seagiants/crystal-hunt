import { Caracs } from "../../action/Action";
import { SimpleGame } from "../../types";
import { loadAbilityChecker, loadAbilityReducer } from "./Ability";

/** Used to trigger an ability. */
export function triggerAbility(
  g: SimpleGame,
  avatarId: string,
  abilityId: string,
  targetId: string,
  caracs: Caracs
): SimpleGame {
  return loadAbilityReducer(abilityId)(g, avatarId, targetId, caracs);
}

/** Used to check if a target (cellId,...) is a valid target for an ability. */
export function checkAbilityTarget(
  g: SimpleGame,
  avatarId: string,
  abilityId: string,
  targetId: string,
  caracs: Caracs
): boolean {
  return loadAbilityChecker(abilityId)(g, avatarId, targetId, caracs);
}
