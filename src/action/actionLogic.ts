import {
  getAllActions,
  getAvatarCaracs,
  setActionCharge,
  upActionCount,
  setActionStatus
} from "./actionStateHandling";
import { SimpleGame, TriggerPhase } from "../types";
import { Action, CardTypeName, Caracs, ActionCategoryName } from "./Action";
import { addInfoMessage } from "../state/setters";
import { ActionTileStatus } from "../old/type";
import { triggerAbility, checkAbilityTarget } from "./ability/abilityLogic";
import { loadActionCategory } from "./ability/Ability";
import { loadAbility } from "./ability/abilityLib";

// Used to get the color of a Skill
export function getActionColor(
  element: Action,
  status?: ActionTileStatus
): string {
  const cat = loadActionCategory(element.abilityCategory);
  switch (status) {
    case undefined:
      return cat.color;
    case ActionTileStatus.Avalaible:
      return cat.color;
    case ActionTileStatus.Clicked:
      return cat.clickedColor;
    case ActionTileStatus.Exhausted:
      return cat.exhaustedColor;
    default:
      return cat.color;
  }
}

/** Retrieve all actions of a player based on their category (Str, Intell,...) */
function getCatActions(
  g: SimpleGame,
  playerId: string,
  categoryName: ActionCategoryName
): Array<Action> {
  return getAllActions(g, playerId).filter(
    current => current.abilityCategory === categoryName
  );
}

/** Retrieve all actions of a player
 *  based on their category (Str, Intell,...)
 *  and their type (Spell, Enchantment,...)
 */
function getTypedActions(
  g: SimpleGame,
  playerId: string,
  categoryName: ActionCategoryName,
  cardType: CardTypeName
) {
  return getCatActions(g, playerId, categoryName).filter(
    current => current.cardType === cardType
  );
}

/** Active Action is the spell one if any, if not it's the equipment one. */
export function getActiveAction(
  g: SimpleGame,
  playerId: string,
  categoryName: ActionCategoryName
): Action {
  const spells = getTypedActions(g, playerId, categoryName, CardTypeName.Spell);
  return spells.length > 0
    ? spells[0]
    : getTypedActions(g, playerId, categoryName, CardTypeName.Equipment)[0];
}

/** Add a new Action to a playerContext.
 * If spell or equipment for the player (aka not monster's one),
 * it will remplace same type of action, if enchantment, just add.
 */
export function setNewAction(
  actions: Array<Action>,
  action: Action,
  playerId: string
): Array<Action> {
  if (
    action.avatarId !== playerId ||
    action.cardType === CardTypeName.Enchantment
  ) {
    return [...actions, action];
  } else {
    const withoutOldAction = actions.filter(
      currentAction =>
        currentAction.abilityCategory !== action.abilityCategory ||
        currentAction.cardType !== action.cardType
    );
    return [...withoutOldAction, action];
  }
}

export function autoTriggerActions(
  g: SimpleGame,
  playerId: string,
  trigger: TriggerPhase
): SimpleGame {
  // In auto triggering, default target is player.
  const targetId = playerId;
  const actionsToTrigger = getAllActions(g, playerId).filter(
    current => current.trigger === trigger
  );
  const actionsTriggered = actionsToTrigger.reduce(
    (tempG, current) => triggerAction(tempG, current, playerId, targetId),
    { ...g }
  );
  return actionsTriggered;
}

/** Triggering an action and returning the modified state
 * Workflow :
 *  - If needed, retrieving autoTarget, based on action
 *  - Retrieving caracs, based on action and playerId
 *  - Displaying an info message based on action and target
 *  - If needed, diminshe charge counter.
 */
export function triggerAction(
  g: SimpleGame,
  action: Action,
  avatarId: string,
  targetId?: string
): SimpleGame {
  // Retrieving target, if no target then auto target, one of both should be not undefined (how to ensure it ???)
  const _targetId = targetId !== undefined ? targetId : action.autoTarget;
  // Log message if no target.
  if (_targetId === undefined) {
    console.log("No target for " + action.name + " on avatar " + avatarId);
  }
  // Retrieving caracs.
  const actionCaracs = getActionCaracs(g, avatarId, action);
  // Displaying InfoMessage
  const infoMessage: string = action.name + " is trigerred on " + targetId;
  const withInfo: SimpleGame = addInfoMessage(g, infoMessage);
  // Diminishing charge
  const chargeDiminished =
    action.charge !== undefined
      ? setActionCharge(withInfo, avatarId, action.id, action.charge - 1)
      : withInfo;
  // Trigger ability
  return triggerAbility(
    chargeDiminished,
    avatarId,
    action.abilityId,
    _targetId!,
    actionCaracs
  );
}

/** Checking an action target and returning true or false based on target validity.
 * Workflow :
 *  - Retrieving caracs, based on action and playerId
 *  - Checking target based on ability id.
 */
export function checkActionTarget(
  g: SimpleGame,
  avatarId: string,
  action: Action,
  targetId: string
): boolean {
  // Retrieving caracs.
  const actionCaracs = getActionCaracs(g, avatarId, action);
  // Trigger ability
  return checkAbilityTarget(
    g,
    avatarId,
    action.abilityId,
    targetId,
    actionCaracs
  );
}

/** Is an action requiring a target. */
export function isTargetRequired(action: Action): boolean {
  return loadAbility(action.abilityId).isTargetRequired;
}

export function autoTarget(action: Action): string | undefined {
  return action.autoTarget;
}

// Finalizing an Action : Up action Counter, set Action Tile to exhausted, clean saved Action
/*
export function finalizeAction(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName
): SimpleGame {
  // Up Action counter if action is final
  const actionCounted = upActionCount(g);
  // Exhaust used Action
  const actionExhausted = setActionStatus(
    actionCounted,
    playerId,
    category,
    ActionTileStatus.Exhausted
  );
  // Clean saved action
  return setSelectedAction(actionExhausted, null, playerId);
}
*/

export function exhaustAction(g: SimpleGame, playerId: string, action: Action) {
  const exhaustActionTile = setActionStatus(
    g,
    playerId,
    action.abilityCategory,
    ActionTileStatus.Exhausted
  );
  // Up Action counter if action is final
  const actionCounted =
    action.isFinal !== false
      ? upActionCount(exhaustActionTile)
      : exhaustActionTile;
  return actionCounted;
}
/** Retrieve caracs used in an action Trigger */
export function getActionCaracs(
  g: SimpleGame,
  avatarId: string,
  action: Action
) {
  const avatarCaracs = getAvatarCaracs(g, avatarId);
  const actionCaracs = action.abilityCaracs;
  return addCaracs(avatarCaracs, actionCaracs);
}

/** Used to add caracs
 * caracs' props are summed based on key name.
 */
export function addCaracs(caracs1: Caracs, caracs2: Caracs): Caracs {
  let newCaracs: Caracs = { ...caracs1 };
  Object.keys(caracs2).forEach(carac => {
    newCaracs[carac] !== undefined
      ? (newCaracs[carac] = newCaracs[carac] + caracs2[carac])
      : (newCaracs[carac] = caracs2[carac]);
  });
  return newCaracs;
}
