import { SimpleGame, TriggerPhase } from "../../types";
import { Caracs, Action } from "../Action";
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
import { loadActionMonster } from "../actionLib";

export const move: AbilityTrigger = (
  g: SimpleGame,
  avatarId: string,
  targetCellId: string,
  caracs: Caracs
) => {
  console.log("Try to move");
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
  const monster = initMonsterAvatar(monsterId, targetId, caracs);
  const monsterAdded = addMonster(g, monster);
  const monsterPositionned = setCellAvatar(
    monsterAdded,
    targetId,
    "M" + getMonsterCounter(monsterAdded).toString()
  );
  const newAction = loadActionMonster(g, monsterId, "CircularAttack");
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
  return actionAdded;
  /*
  const monsterSummoned = summon(g, "BasicMonster", avatarId, targetId, caracs);
  return monsterSummoned;
  */
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
      // return enchant;
      console.log("Enchant To do");
      return (g: SimpleGame) => g;
    case TriggerName.refreshAction:
      return refreshAction;
    case TriggerName.circularAttack:
      return circularAttack;
    default:
      console.log(triggerName + " not supported");
      return (g: SimpleGame) => g;
  }
}
