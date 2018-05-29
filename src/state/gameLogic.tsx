import { SimpleGame } from "../types";
import {
  getHealth,
  getBlackCrystalCellId,
  getAvatarOnCell,
  isTrapped,
  getCategories
} from "./getters";
import { setHealth, addInfoMessage } from "./setters";
import { Avatar } from "../avatar/Avatar";
import { toKey } from "../map/Cell";
import {
  setExhaustCounter,
  setActionStatus,
  getActionFlow,
  setActionFlow,
  upExhaustCounter
} from "../action/actionStateHandling";
import {
  ActionFlow,
  ActionCategoryName,
  ActionTileStatus
} from "../action/Action";

/*
// Heal key word : Adding value to health, max by healthInit
export function heal(
  g: SimpleGame,
  avatarId: string,
  value: number
): SimpleGame {
  const currentHealth = getHealth(g, avatarId);
  const max = getHealthInit(g, avatarId);
  return currentHealth + value < max
    ? setHealth(g, avatarId, currentHealth + value)
    : setHealth(g, avatarId, max);
}
*/
// Damage key word : substracting value to health, min by 0.
export function damage(
  g: SimpleGame,
  avatarId: string,
  value: number
): SimpleGame {
  const currentHealth = getHealth(g, avatarId);
  // If health go 0 (or under), return a cleanedMonster state.
  return currentHealth - value <= 0
    ? cleanDeadMonsters(setHealth(g, avatarId, 0))
    : setHealth(g, avatarId, currentHealth - value);
}

// TODO : Refactor, don't access state directly, use setter only
export function cleanDeadMonsters(g: SimpleGame): SimpleGame {
  const deadMonsters: Array<Avatar> = g.avatars.filter(avatar => {
    return avatar.type === "Monster" && avatar.caracs.healthCurrent < 1;
  });
  let tempG = { ...g };
  deadMonsters.forEach((avatar: Avatar) => {
    tempG = {
      ...tempG,
      map: {
        ...tempG.map,
        [avatar.position]: {
          ...tempG.map[avatar.position],
          avatar: null
        }
      }
    };
  });
  const notOnCellAnymore = tempG;
  // Clean action : TODO

  // Clean dead monsters from Avatars.
  const noDeadOnAvatars: SimpleGame = {
    ...notOnCellAnymore,
    avatars: notOnCellAnymore.avatars.filter(
      avatar => avatar.caracs.healthCurrent > 0 || avatar.type === "Player"
    )
  };
  return noDeadOnAvatars;
}

export function generateMonsterId(g: SimpleGame, monsterName: string) {
  return `M${g.monsterCounter + 1}`;
}

// Black Crystal Cell is identified by the BlackCrystalCellId.
export function getBlackCrystalCellAvatarId(g: SimpleGame): string | null {
  return getAvatarOnCell(g, getBlackCrystalCellId(g));
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
    ActionTileStatus.Avalaible
  );
}

// Updating Action Status is :
// switching clicked -> exhausted, exhausted && 0 -> avalaible then diminishing its exhaustCounter
export function updateActionStatus(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName
): SimpleGame {
  const actionFlow: ActionFlow = getActionFlow(g, playerId, category);
  let status: ActionTileStatus;
  switch (actionFlow.status) {
    case ActionTileStatus.Clicked:
      status =
        g.actionCount === 0
          ? ActionTileStatus.Exhausted
          : ActionTileStatus.Avalaible;
      break;
    case ActionTileStatus.Exhausted:
      status =
        actionFlow.exhaustCounter === 0
          ? ActionTileStatus.Avalaible
          : ActionTileStatus.Exhausted;
      break;
    default:
      status = ActionTileStatus.Avalaible;
      break;
  }
  // Diminshing exhausted counter after status check to handle correctly avalaible vs exhausted.
  const exhaustCounter =
    actionFlow.exhaustCounter > 0 ? actionFlow.exhaustCounter - 1 : 0;
  return setActionFlow(g, playerId, category, {
    ...actionFlow,
    status: status,
    exhaustCounter: exhaustCounter
  });
}

// Refreshing all actions Status
export function updateActionsStatus(
  g: SimpleGame,
  playerId: string
): SimpleGame {
  return Object.keys(ActionCategoryName).reduce(
    (tempG, currCat) =>
      updateActionStatus(tempG, playerId, ActionCategoryName[currCat]),
    // refreshAction(tempG, playerId, ActionCategoryName[currCat]),
    { ...g }
  );
}

// Switch the status of the current clicked tile, and restore the status of the previous one
export function setActionClicked(
  g: SimpleGame,
  playerId: string,
  category: ActionCategoryName
): SimpleGame {
  const tempG = getCategories().reduce(
    (prevG, currCat) => {
      const actionFlow = getActionFlow(g, playerId, currCat);
      // If currCat === category (clicked tile) or status = clicked (previous clicked tile) => update
      return currCat === category ||
        actionFlow.status === ActionTileStatus.Clicked
        ? setActionFlow(prevG, playerId, currCat, {
            ...actionFlow,
            status:
              // If Clicked, then Avalaible, nor Clicked (was the clicked one case)
              actionFlow.status === ActionTileStatus.Clicked
                ? ActionTileStatus.Avalaible
                : ActionTileStatus.Clicked
          })
        : prevG;
    },
    { ...g }
  );
  return tempG;
}

// Check if a cell is trapped, if trigger the trapp (exhaust Dext + 3 & info).
export function triggerTrap(
  g: SimpleGame,
  playerId: string,
  cellId: string
): SimpleGame {
  if (isTrapped(g, cellId)) {
    // +3 exhaust to Dexterity
    const trappedPlayer = upExhaustCounter(
      g,
      playerId,
      ActionCategoryName.Dexterity,
      3
    );
    // Add a funky message
    return addInfoMessage(
      trappedPlayer,
      "Player" + playerId + " has been trapped on " + cellId + ", this punk..."
    );
  } else {
    return g;
  }
}

export function checkTraps(
  g: SimpleGame,
  playerId: string,
  path: [number, number][]
) {
  const movePath = path.filter((curr, index) => index !== 0);
  const trapsTriggered = movePath.reduce(
    (tempG, currCell) =>
      triggerTrap(tempG, playerId, toKey(currCell[0], currCell[1])),
    { ...g }
  );
  return trapsTriggered;
}
