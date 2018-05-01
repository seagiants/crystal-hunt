import { SimpleGame, PlayerContext } from "../types";
import {
  Action,
  Caracs,
  ActionTemplate,
  CardTypeName,
  ActionCategoryName,
  ActionFlow
} from "./Action";
import { CardLib } from "./../cards/cardLib";
import { getAvatar } from "../state/getters";
import { ActionTileStatus } from "../old/type";
import { BasicActionLib } from "./actionLib";

/** ****************** Loaders ********************************* */

/** Load basic Actions for a player based on a basic action librairy */
export function loadBasicActions(avatarId: string): Array<Action> {
  return Object.keys(BasicActionLib).map(cat => ({
    ...BasicActionLib[cat],
    id: `basic${cat}${avatarId}`,
    avatarId: avatarId,
    status: ActionTileStatus.Avalaible,
    exhaustCounter: 0
  }));
}

/** Load Action for a player based on a card's name */
export function loadActionFromTemplate(
  g: SimpleGame,
  avatarId: string,
  cardName: string
): Action {
  const template = CardLib[cardName];
  return initAction(
    template,
    avatarId,
    `default${template.name}${template.abilityCategory}${avatarId}`
  );
}

/* ************** Getters ********************/

/** Retrieve all actions of a player */
export function getAllActions(g: SimpleGame, playerId: string): Array<Action> {
  return g.players[playerId].actions;
}

/** Retrieve an action based on its id */
export function getAction(
  g: SimpleGame,
  playerId: string,
  actionId: string
): Action {
  return getAllActions(g, playerId).filter(
    current => current.id === actionId
  )[0];
}

/** Retrieve Spell action, should be only one per category */
export function getSpellAction(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName
): Action {
  return getAllActions(g, playerId).filter(
    current =>
      current.abilityCategory === category &&
      current.cardType === CardTypeName.Spell
  )[0];
}

/** Retrieve ability's caracs of an avatar */
export function getAvatarCaracs(g: SimpleGame, avatarId: string): Caracs {
  return getAvatar(g, avatarId).caracs;
}

/** Return the context of a player */
export function getPlayerContext(
  g: SimpleGame,
  playerId: string
): PlayerContext {
  return g.players[playerId];
}

/** Set the context of a player */
export function setPlayerContext(
  g: SimpleGame,
  playerId: string,
  playerContext: PlayerContext
): SimpleGame {
  return { ...g, players: { ...g.players, [playerId]: playerContext } };
}

export function getActionStatus(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName
): ActionTileStatus {
  return getActionFlow(g, playerId, category).status;
}

export function getActionFlow(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName
): ActionFlow {
  return g[`actionsFlowPlayer${playerId}`][category];
}

/** **************     Setters        ************** */

/** Set actions of a player */
export function setActions(
  g: SimpleGame,
  playerId: string,
  actions: Array<Action>
): SimpleGame {
  return setPlayerContext(g, playerId, {
    ...getPlayerContext(g, playerId),
    actions: actions
  });
}

/** Set new value for an action's charge, based on action id. */
export function setActionCharge(
  g: SimpleGame,
  playerId: string,
  actionId: string,
  chargeValue: number
): SimpleGame {
  const actionsChanged = getAllActions(g, playerId).map(
    current =>
      current.id === actionId ? { ...current, charge: chargeValue } : current
  );
  return setActions(g, playerId, actionsChanged);
}

export function setActionFlow(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName,
  actionFlow: ActionFlow
): SimpleGame {
  return {
    ...g,
    [`actionsFlowPlayer${playerId}`]: {
      ...g[`actionsFlowPlayer${playerId}`],
      [category]: actionFlow
    }
  };
}

export function setActionStatus(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName,
  status: ActionTileStatus
): SimpleGame {
  const actionFlow = getActionFlow(g, playerId, category);
  return setActionFlow(g, playerId, category, {
    ...actionFlow,
    status: status
  });
}

export function setExhaustCounter(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName,
  newValue: number
): SimpleGame {
  const actionFlow = getActionFlow(g, playerId, category);
  return setActionFlow(g, playerId, category, {
    ...actionFlow,
    exhaustCounter: newValue
  });
}

export function upExhaustCounter(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName,
  addedValue: number
): SimpleGame {
  return setExhaustCounter(
    g,
    playerId,
    category,
    getActionFlow(g, playerId, category).exhaustCounter + addedValue
  );
}

/** Init an action based on an action template */
export function initAction(
  template: ActionTemplate,
  avatarId: string,
  type?: string
): Action {
  return {
    ...template,
    id: toActionId(template.name, template.abilityCategory, avatarId, type),
    avatarId: avatarId
  };
}

/** Build a string used for action Id. */
export function toActionId(
  name: string,
  category: ActionCategoryName,
  avatarId: string,
  type?: string
): string {
  return `${type ? type : "default"}${category}${name}${avatarId}`;
}

export function upActionCount(g: SimpleGame): SimpleGame {
  return { ...g, actionCount: g.actionCount + 1 };
}

export function resetActionCount(g: SimpleGame): SimpleGame {
  return { ...g, actionCount: 0 };
}
