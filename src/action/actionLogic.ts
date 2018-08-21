import {
  getAllActions,
  getAvatarCaracs,
  setActionCharge,
  upActionCount,
  setActionStatus,
  setActions,
  setExhaustCounter,
  setPlayerContext,
  getPlayerContext
} from "./actionStateHandling";
import { SimpleGame, TriggerPhase } from "../types";
import {
  Action,
  ActionTypeName,
  Caracs,
  ActionCategoryName,
  ActionTileStatus,
  AutoTargetKey
} from "./Action";
import { addInfoMessage } from "../state/setters";
import { loadActionCategory, CheckName, Ability } from "./ability/Ability";
import { loadAbility } from "./ability/abilityLib";
import { loadAbilityReducer } from "./ability/abilityTrigger";
import { loadAbilityChecker } from "./ability/abilityCheck";
import { setAvatarHidden } from "../avatar/avatarStateHandling";
import { getCrystallized, getAvatarPosition } from "../state/getters";
import { loadCard, Card } from "../cards/Card";

// Used to get the color of a Skill
export function getActionColor(
  element: Action,
  status?: ActionTileStatus
): string {
  const cat = loadActionCategory(element.abilityCategory);
  switch (status) {
    case undefined:
      return cat.color;
    case ActionTileStatus.Available:
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
  cardType: ActionTypeName
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
  const spells = getTypedActions(
    g,
    playerId,
    categoryName,
    ActionTypeName.Spell
  );
  return spells.length > 0
    ? spells[0]
    : getTypedActions(g, playerId, categoryName, ActionTypeName.Equipment)[0];
}

/** Return the crystallized ability if player on crystallized cell, basic one if not. */
export function getActionAbility(
  g: SimpleGame,
  playerId: string,
  action: Action
): string {
  return action.crystallizedAbilityId &&
    getCrystallized(g, getAvatarPosition(g, playerId))
    ? action.crystallizedAbilityId
    : action.abilityId;
}

/** Add a new Action to a playerContext.
 * If spell or equipment for the player (aka not monster's one),
 * it will remplace same type of action, if enchantment, just add.
 */
export function setNewAction(
  g: SimpleGame,
  playerId: string,
  action: Action
): SimpleGame {
  if (action.avatarId !== playerId) {
    console.log("Poison ? Or bad case impl ??? To be checked.");
    console.log(action);
    console.log("playerId: " + playerId);
    return setActions(g, playerId, [...getAllActions(g, playerId), action]);
  } else {
    console.log("ReplaceNewAction");
    console.log(playerId);
    console.log(action);
    // Replacing an Action is discarding the current one if any (same type&category), then adding new one.
    const replaceAction = (
      G: SimpleGame,
      PlayerId: string,
      newAction: Action
    ): SimpleGame => {
      // Getting the previous similar action (===cat&type if any)
      const previousAction: Action = getAllActions(G, PlayerId).filter(
        currentAction =>
          currentAction.abilityCategory === newAction.abilityCategory &&
          currentAction.cardType === newAction.cardType
      )[0];
      console.log("previous :");
      console.log(previousAction);
      // Clean actions of the previous action (if any)
      const actionsCleaned: Action[] =
        previousAction !== undefined && previousAction !== null
          ? getAllActions(G, PlayerId).filter(
              currentAction =>
                currentAction.abilityCategory !== newAction.abilityCategory ||
                currentAction.cardType !== newAction.cardType
            )
          : getAllActions(G, PlayerId);
      // Add previous action to graveyard if any.
      const previousActionDiscarded =
        previousAction !== undefined &&
        previousAction !== null &&
        loadCard(previousAction.name) !== null &&
        loadCard(previousAction.name) !== undefined
          ? addToGraveyard(g, PlayerId, loadCard(previousAction.name))
          : G;
      return setActions(previousActionDiscarded, PlayerId, [
        ...actionsCleaned,
        newAction
      ]);
    };
    switch (action.cardType) {
      // Spell : Replace other spell of same category if any.
      // Todo : Redesign spell workflow
      case ActionTypeName.Spell:
        return replaceAction(g, playerId, action);
      // Equipment : Replace other equipment of same category if any.
      case ActionTypeName.Equipment:
        return replaceAction(g, playerId, action);
      // Enchantment : just add the new action at the end of the player's actions.
      case ActionTypeName.Enchantment:
        return setActions(g, playerId, [...getAllActions(g, playerId), action]);
      default:
        console.log("ActionType : " + action.cardType + " not handled.");
        return g;
    }
    const withoutOldAction = getAllActions(g, playerId).filter(
      currentAction =>
        currentAction.abilityCategory !== action.abilityCategory ||
        currentAction.cardType !== action.cardType
    );
    return setActions(g, playerId, [...withoutOldAction, action]);
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
      console.log("triggering " + current.name);
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
  const activeAbilityId = getActionAbility(g, avatarId, action);
  return triggerAbility(
    chargeDiminished,
    activeAbilityId,
    avatarId,
    _targetId!,
    actionCaracs
  );
}

// Trigger ability
// Workflow :
// * ability trigger modifies the state,
// * check if ability modifies the hidden status
export function triggerAbility(
  g: SimpleGame,
  abilityId: string,
  avatarId: string,
  targetId: string,
  abilityCaracs: Caracs
): SimpleGame {
  const ability: Ability = loadAbility(abilityId);
  const abilityTriggered: SimpleGame = loadAbilityReducer(ability.trigger)(
    g,
    avatarId,
    targetId,
    abilityCaracs
  );
  const hiddenHandled =
    ability.unHidden === true
      ? setAvatarHidden(abilityTriggered, avatarId, false)
      : abilityTriggered;
  return hiddenHandled;
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
  const activeAbilityId = getActionAbility(g, avatarId, action);
  const test = loadAbility(activeAbilityId).isTargetRequired;
  // Trigger ability
  return test
    ? loadAbilityChecker(test!)(g, avatarId, targetId, actionCaracs)
    : true;
}

/** Is an action requiring a target. */
export function isTargetRequired(
  g: SimpleGame,
  action: Action,
  avatarId: string
): false | CheckName {
  const activeAbilityId = getActionAbility(g, avatarId, action);
  return action.autoTarget !== undefined
    ? false
    : loadAbility(activeAbilityId).isTargetRequired;
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

// Refreshing Action : Set to Avalaible & exhaustCounter = 0
export function refreshAction(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName
): SimpleGame {
  const refreshExhaustCounter = setExhaustCounter(g, playerId, category, 0);
  return setActionStatus(
    refreshExhaustCounter,
    playerId,
    category,
    ActionTileStatus.Available
  );
}

/** Retrieve caracs used in an action Trigger
 * If on crystallized, add basic and crystallized caracs of the action.
 * Then add avatar caracs.
 */
export function getActionCaracs(
  g: SimpleGame,
  avatarId: string,
  action: Action
) {
  const actionCaracs =
    action.crystallizedCaracs !== undefined &&
    getCrystallized(g, getAvatarPosition(g, avatarId))
      ? addCaracs(action.abilityCaracs, action.crystallizedCaracs)
      : action.abilityCaracs;
  // For Enchantment, Avatar caracs are not added.
  if (action.cardType === ActionTypeName.Enchantment) {
    return actionCaracs;
  }
  // For others, Avatar caracs are retrieved
  const avatarCaracs = getAvatarCaracs(g, avatarId);
  return addCaracs(avatarCaracs, actionCaracs);
}

/** Clean Actions with a charge < 1
 * Adding the corresponding card to the graveyard.
 * Deleting the action from the PlayerContext.
 */
export function cleanDeadAction(g: SimpleGame, playerId: string): SimpleGame {
  // Clean an action if its charge < 1.
  const actionsDiscarded = getAllActions(g, playerId).reduce(
    (currentG, currentAction) =>
      currentAction.charge !== undefined &&
      currentAction.charge === 0 &&
      loadCard(currentAction.name) !== undefined &&
      loadCard(currentAction.name) !== null
        ? addToGraveyard(currentG, playerId, loadCard(currentAction.name))
        : currentG,
    { ...g }
  );
  const cleanedActions = getAllActions(g, playerId).filter(
    currentAction =>
      currentAction.charge !== undefined && currentAction.charge !== null
        ? currentAction.charge > 0
        : true
  );
  return setActions(actionsDiscarded, playerId, cleanedActions);
}

export function addToGraveyard(
  g: SimpleGame,
  playerId: string,
  card: Card
): SimpleGame {
  const context = getPlayerContext(g, playerId);
  const context2 = {
    ...context,
    graveyard:
      context.graveyard !== undefined ? [...context.graveyard, card] : [card]
  };
  return setPlayerContext(g, playerId, context2);
}

/** Used to add caracs
 * caracs' props are summed based on key name.
 * TODO : implement correctly the string case.
 */
export function addCaracs(caracs1: Caracs, caracs2: Caracs): Caracs {
  let newCaracs: Caracs = { ...caracs1 };
  Object.keys(caracs2).forEach(carac => {
    switch (typeof newCaracs[carac]) {
      case "undefined":
        newCaracs[carac] = caracs2[carac];
        break;
      case "number":
        newCaracs[carac] =
          (newCaracs[carac] as number) + (caracs2[carac] as number);
        break;
      default:
        break;
    }
  });
  return newCaracs;
}
