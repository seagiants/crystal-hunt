import {
  getAllActions,
  getAvatarCaracs,
  setActionCharge,
  upActionCount,
  setActionStatus,
  setActions
} from "./actionStateHandling";
import { SimpleGame, TriggerPhase } from "../types";
import {
  Action,
  CardTypeName,
  Caracs,
  ActionCategoryName,
  ActionTileStatus,
  AutoTargetKey
} from "./Action";
import { addInfoMessage } from "../state/setters";
import { loadActionCategory } from "./ability/Ability";
import { loadAbility } from "./ability/abilityLib";
import { loadAbilityReducer } from "./ability/abilityTrigger";
import { loadAbilityChecker } from "./ability/abilityCheck";

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

/**
 * Retrieving a target automatically :
 *  - if any, targetId is returned
 *  - if not, action's autoTargetField is used
 */
export function retrieveTarget(
  g: SimpleGame,
  avatarId: string,
  action: Action,
  targetId?: string
): string {
  if (targetId !== undefined && targetId !== null) {
    return targetId;
  }
  if (action.autoTarget !== undefined && action.autoTarget !== null) {
    // Handling autoTarget key words
    switch (action.autoTarget) {
      case AutoTargetKey.Self:
        return avatarId;
      default:
        return action.autoTarget;
    }
  }
  return avatarId;
}

export function autoTriggerActions(
  g: SimpleGame,
  playerId: string,
  triggerPhase: TriggerPhase
): SimpleGame {
  // In auto triggering, default target is player.
  const actionsToTrigger = getAllActions(g, playerId).filter(
    current => current.triggerPhase === triggerPhase
  );
  const actionsTriggered = actionsToTrigger.reduce(
    (tempG, current) => {
      const targetId = retrieveTarget(tempG, playerId, current);
      return triggerAction(tempG, current, playerId, targetId);
    },
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
  return loadAbilityReducer(loadAbility(action.abilityId).trigger)(
    chargeDiminished,
    avatarId,
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
  const test = loadAbility(action.abilityId).isTargetRequired;
  // Trigger ability
  return test
    ? loadAbilityChecker(test!)(g, avatarId, targetId, actionCaracs)
    : true;
}

/** Is an action requiring a target. */
export function isTargetRequired(action: Action): false | string {
  return loadAbility(action.abilityId).isTargetRequired;
}

export function autoTarget(action: Action): string | undefined {
  return action.autoTarget;
}

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

/** Clean Actions with a charge < 1 */
export function cleanDeadAction(g: SimpleGame, playerId: string): SimpleGame {
  // Clean an action if its charge < 1.
  const actionsCleaned = getAllActions(g, playerId).filter(
    currentAction =>
      currentAction.charge !== undefined ? currentAction.charge > 0 : true
  );
  return setActions(g, playerId, actionsCleaned);
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
