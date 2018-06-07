import { SimpleGame, TriggerPhase } from "../../types";
import { Caracs, CardTypeName, ActionCategoryName } from "../Action";
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
  getMonsterCounter,
  getAvatar
} from "../../state/getters";
import { checkTraps, damage, refreshAction } from "../../state/gameLogic";
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
  setActions,
  initAction
} from "../actionStateHandling";
import { setNewAction } from "../actionLogic";
import { drawCard } from "../../cards/cardLogic";
import { initMonsterAvatar } from "../../avatar/Avatar";
import { getBehindCell } from "../../map/mapLogic";
import { Card } from "../../cards/Card";
import { generateMonsterId } from "../../avatar/monsterLogic";
import { MonsterName } from "../../avatar/monsterLib";

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

export const poison: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: AttackCaracs
) => {
  // const avatar = getAvatarOnCell(g, targetId);
  return getAvatar(g, targetId) !== null || getAvatar(g, targetId) !== undefined
    ? damage(g, targetId, caracs.poisonValue)
    : g;
};

export const poisonning: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: Caracs
) => {
  const cardPoisonning: Card = {
    name: "Poison",
    cardType: CardTypeName.Enchantment,
    abilityCategory: ActionCategoryName.Strength,
    triggerPhase: TriggerPhase.TurnStart,
    isFinal: false,
    description: "Feels a bit sick...",
    autoTarget: targetId,
    abilityCaracs: {
      poisonValue: caracs.poisonValue
    },
    abilityId: "Poison"
  };
  const action = initAction(
    cardPoisonning,
    avatarId,
    `${cardPoisonning.abilityCategory}${avatarId}${targetId}`
  );
  const newActions = setNewAction(getAllActions(g, avatarId), action, avatarId);
  return setActions(g, avatarId, newActions);
};

export const poisonAttack: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: AttackCaracs
) => {
  const targetAvatarId = getAvatarOnCell(g, targetId);
  if (targetAvatarId === null) {
    return g;
  }
  const damaged = damage(g, targetAvatarId, caracs.poisonValue);
  // Check if target still alive before poisonning
  if (getAvatarOnCell(damaged, targetId) === null) {
    return damaged;
  }
  return poisonning(damaged, avatarId, targetAvatarId, caracs);
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
  const monsterType: string =
    caracs.monsterType !== undefined
      ? (caracs.monsterType as string)
      : MonsterName.BasicMonster;
  const monsterId = generateMonsterId(g);
  const monster = initMonsterAvatar(monsterId, targetId, monsterType);
  const monsterAdded = addMonster(g, monster);
  const monsterPositionned = setCellAvatar(
    monsterAdded,
    targetId,
    "M" + getMonsterCounter(monsterAdded).toString()
  );
  return monsterPositionned;
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
    case TriggerName.poisonAttack:
      return poisonAttack;
    case TriggerName.poison:
      return poison;
    default:
      console.log(triggerName + " not supported");
      return (g: SimpleGame) => g;
  }
}
