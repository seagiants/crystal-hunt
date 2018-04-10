import { SimpleGame } from "../types";
import { getAvatarPosition, getMonsterCounter, getActionFlow } from "./getters";
import { SkillCategoryName } from "../action/skillLib";
import { Avatar } from "../map/types";
import { ActionFlow } from "../action/type";

export function setSelectedAction(
  G: SimpleGame,
  categoryName: SkillCategoryName | null,
  playerId: string
): SimpleGame {
  return {
    ...G,
    selectedAction: categoryName
  };
}

// TODO : Refactor, too much game logic for a setter
export function setAvatarPosition(
  g: SimpleGame,
  avatarId: string,
  newPosition: string
): SimpleGame {
  const oldPosition: string = getAvatarPosition(g, avatarId);
  return {
    ...g,
    // Setting the new player position
    avatars: g.avatars.map(
      avatar =>
        avatar.id === avatarId
          ? { ...avatar, position: newPosition }
          : { ...avatar }
    ),
    map: {
      ...g.map,
      // Updating the origin cell
      [oldPosition]: {
        ...g.map[oldPosition],
        avatar: null
      },
      // Updating the target cell
      [newPosition]: {
        ...g.map[newPosition],
        avatar: avatarId
      }
    }
  };
}

// TODO : Improve the id handling.
export function addMonster(g: SimpleGame, avatar: Avatar): SimpleGame {
  const id = getMonsterCounter(g) + 1;
  return {
    ...g,
    monsterCounter: id,
    avatars: [...g.avatars, { ...avatar, id: "M" + id.toString() }]
  };
}

export function setCellAvatar(
  g: SimpleGame,
  cellId: string,
  avatarId: string
): SimpleGame {
  return {
    ...g,
    map: { ...g.map, [cellId]: { ...g.map[cellId], avatar: avatarId } }
  };
}

export function setCellCrystallize(
  g: SimpleGame,
  cellId: string,
  isCrystallized: boolean
) {
  let temp = { ...g };
  temp.map[cellId].isCrystallized = isCrystallized;
  return temp;
}

export function setEndTurn(g: SimpleGame, value: boolean): SimpleGame {
  return { ...g, endTurn: value };
}

export function setHealth(
  g: SimpleGame,
  id: string,
  value: number
): SimpleGame {
  let newState = {
    ...g,
    avatars: g.avatars.map(avatar => {
      return avatar.id === id
        ? {
            ...avatar,
            caracs: {
              ...avatar.caracs,
              healthCurrent: value
            }
          }
        : { ...avatar };
    })
  };
  return newState;
}

export function addInfoMessage(g: SimpleGame, message: string): SimpleGame {
  return { ...g, infoMessages: [...g.infoMessages, message] };
}

export function setActionFlow(
  g: SimpleGame,
  playerId: string,
  category: SkillCategoryName,
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

export function setExhaustCounter(
  g: SimpleGame,
  playerId: string,
  category: SkillCategoryName,
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
  category: SkillCategoryName,
  addedValue: number
): SimpleGame {
  return setExhaustCounter(
    g,
    playerId,
    category,
    getActionFlow(g, playerId, category).exhaustCounter + addedValue
  );
}
