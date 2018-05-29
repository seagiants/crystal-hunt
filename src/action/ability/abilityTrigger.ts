import { SimpleGame } from "../../types";
import { Caracs } from "../Action";
import {
  AbilityTrigger,
  AttackCaracs,
  DrawCaracs,
  TriggerName,
  HealCaracs
} from "./Ability";
import { toCoord, findPath, toKey } from "../../map/Cell";
import {
  getAvatarPosition,
  getAvatarOnCell,
  getCell,
  getCrystallized,
  getCategories,
  getHealth,
  getHealthInit,
  getMonsterCounter
} from "../../state/getters";
import {
  checkTraps,
  damage,
  generateMonsterId,
  refreshAction
} from "../../state/gameLogic";
import {
  setAvatarPosition,
  setCellCrystallize,
  setHealth,
  addMonster,
  setCellAvatar,
  setIsTrapped
} from "../../state/setters";
import {
  loadActionFromTemplate,
  getAllActions,
  setActions
} from "../actionStateHandling";
import { setNewAction } from "../actionLogic";
import { drawCard } from "../../cards/cardLogic";
import { initMonsterAvatar } from "../../avatar/Avatar";
import { getBehindCell } from "../../map/mapLogic";

export const move: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetCellId: string,
  caracs: Caracs
) => {
  console.log("Try to move");
  // Refactor Trap workflow... pathMatrix if flying ?...
  const path = findPath(
    g.pathMatrix,
    toCoord(getAvatarPosition(g, avatarId)),
    toCoord(targetCellId)
  );
  // Trigger traps on the way.
  const trapsTriggered = checkTraps(g, avatarId, path);
  // Move the avatar.
  const avatarMoved = setAvatarPosition(trapsTriggered, avatarId, targetCellId);
  return avatarMoved;
};

export const crystalize: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: Caracs
) => {
  const playerCell = getAvatarPosition(g, avatarId);
  const crystallizedCell: SimpleGame = setCellCrystallize(g, playerCell, true);
  return crystallizedCell;
};
export const attack: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: AttackCaracs
) => {
  const avatar = getAvatarOnCell(g, targetId);
  return avatar !== null ? damage(g, avatar, caracs.attackValue) : g;
};

export const circularAttack: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: AttackCaracs
) => {
  const currentMonsterPosition: string = getAvatarPosition(g, avatarId);
  const xy = currentMonsterPosition.split("x");
  // TODO : Make it in a cleaner way
  let neighbourCell: Array<string> = [];
  neighbourCell.push(toKey(parseInt(xy[0], 10), parseInt(xy[1], 10) + 1));
  neighbourCell.push(toKey(parseInt(xy[0], 10), parseInt(xy[1], 10) - 1));
  neighbourCell.push(toKey(parseInt(xy[0], 10) + 1, parseInt(xy[1], 10)));
  neighbourCell.push(toKey(parseInt(xy[0], 10) - 1, parseInt(xy[1], 10)));
  const neighbourCellsAttacked = neighbourCell.reduce(
    (prevG, currCellId) => {
      if (
        getCell(prevG, currCellId) !== undefined &&
        getAvatarOnCell(prevG, currCellId) !== null
      ) {
        console.log("Avatar " + avatarId + " is attacking " + currCellId);
        return attack(prevG, avatarId, currCellId, caracs);
      } else {
        return prevG;
      }
    },
    { ...g }
  );
  return neighbourCellsAttacked;
};

export const draw: AbilityTrigger = (
  g: SimpleGame,
  playerId: string,
  targetId: string,
  caracs: DrawCaracs
) => {
  // const cardsAdded = drawCards(g, avatarId);
  let newG = { ...g };
  if (caracs.drawNumber > 0) {
    for (let i = 0; i < caracs.drawNumber; i++) {
      newG = drawCard(newG, playerId);
    }
  }
  return newG;
};

export const heal: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: HealCaracs
) => {
  const currentHealth = getHealth(g, avatarId);
  const max = getHealthInit(g, avatarId);
  return currentHealth + caracs.healValue < max
    ? setHealth(g, avatarId, currentHealth + caracs.healValue)
    : setHealth(g, avatarId, max);
};

export const summon: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: Caracs
) => {
  const monsterId = generateMonsterId(g, "BasicMonster");
  const monster = initMonsterAvatar(monsterId, targetId);
  const monsterAdded = addMonster(g, monster);
  const monsterPositionned = setCellAvatar(
    monsterAdded,
    targetId,
    "M" + getMonsterCounter(monsterAdded).toString()
  );
  return monsterPositionned;
  /*const newAction = loadActionMonster(g, monsterId, "CircularAttack");
  const newActionWithTrigger: Action = {
    ...newAction,
    triggerPhase: TriggerPhase.TurnEnd
  };
  const newActions = setNewAction(
    getAllActions(g, avatarId),
    newActionWithTrigger,
    avatarId
  );
  const actionAdded = setActions(monsterPositionned, avatarId, newActions);
  return actionAdded;*/
};

export const trapACell: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string
) => {
  return setIsTrapped(g, targetId, true);
};

export const refreshActions: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string
) => {
  // Check if on crystalized.
  // Todo To refactor
  const cellId = getAvatarPosition(g, targetId);
  const isTriggered = getCrystallized(g, cellId);
  // Set exhaustCounter to 0 for each Action if target player onCrystallized.
  if (isTriggered) {
    return getCategories().reduce(
      (prevG, currCat) => refreshAction(prevG, targetId, currCat),
      { ...g }
    );
  } else {
    return g;
  }
};

export const equip: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: Caracs
) => {
  const action = loadActionFromTemplate(g, avatarId, targetId);
  const newActions = setNewAction(getAllActions(g, avatarId), action, avatarId);
  return setActions(g, avatarId, newActions);
};

export const enchant: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: Caracs
) => {
  const action = loadActionFromTemplate(g, avatarId, targetId);
  const newActions = setNewAction(getAllActions(g, avatarId), action, avatarId);
  return setActions(g, avatarId, newActions);
};

/** push
 * - push&damage in a line an avatar, if avatar behind it's damaged
 * - move to the pushedCell if empty
 */
export const push: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: Caracs
) => {
  const avatarToPush = getAvatarOnCell(g, targetId);
  // Checking if an avatar is on targetCell, if not just move.
  if (avatarToPush === undefined || avatarToPush === null) {
    return move(g, avatarId, targetId, caracs);
  }
  // Avatar on target is damaged.
  const avatarDamaged = damage(g, avatarToPush, 1);
  const sourceId = getAvatarPosition(g, avatarId);
  const cellToPush = getBehindCell(g, sourceId, targetId);
  // If no cell to push, ends.
  if (cellToPush === null) {
    return avatarDamaged;
  }
  const avatarOnPush = getAvatarOnCell(avatarDamaged, cellToPush);
  // Checking if avatar on cell behind, if damage avatar behind, if not move pushedAvatar and pusher.
  if (avatarOnPush !== undefined && avatarOnPush !== null) {
    // Avatar behind target is damaged
    const avatarOnPushDamaged = damage(avatarDamaged, avatarOnPush, 1);
    return avatarOnPushDamaged;
    // Move both, pusher and pushed.
  } else {
    const avatarPushed = move(avatarDamaged, avatarToPush, cellToPush, {
      moveRange: 1
    });
    const playerMoved = move(avatarPushed, avatarId, targetId, caracs);
    return playerMoved;
  }
};

export function loadAbilityReducer(triggerName: TriggerName): AbilityTrigger {
  switch (triggerName) {
    case TriggerName.move:
      return move;
    case TriggerName.crystalize:
      return crystalize;
    case TriggerName.attack:
      return attack;
    case TriggerName.draw:
      return draw;
    case TriggerName.heal:
      return heal;
    case TriggerName.summon:
      return summon;
    case TriggerName.trapACell:
      return trapACell;
    case TriggerName.equip:
      return equip;
    case TriggerName.enchant:
      return enchant;
    case TriggerName.refreshAction:
      return refreshAction;
    case TriggerName.circularAttack:
      return circularAttack;
    case TriggerName.push:
      return push;
    default:
      console.log(triggerName + " not supported");
      return (g: SimpleGame) => g;
  }
}
