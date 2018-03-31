import { SimpleGame } from "../types";
import { SkillName } from "../action/skillLib";
import { getAvatarPosition } from "./getters";
import {  } from "../action/Card";
import { Card } from "../action/type";

export function setSelectedSkill(
  G: SimpleGame,
  skillName: SkillName | null,
  playerId: string
): SimpleGame {
  return {
    ...G,
    playersContext: {
      ...G.playersContext,
      [playerId]: {
        ...G.playersContext[playerId],
        selectedSkill: skillName
      }
    }
  };
}

export function setAvatarPosition(
  g: SimpleGame,
  avatarId: string,
  newPosition: string
): SimpleGame {
  const oldPosition: string = getAvatarPosition(g, avatarId);
  console.log("oldPosition: " + oldPosition);
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
              healthCurrent:
                value
            }
          }
        : { ...avatar };
    })
  };
  return newState;
}

export function setCards(
  g: SimpleGame,
  playerId: string,
  cards: Array<Card>
): SimpleGame {
  return {
    ...g,
    playersContext: {
      ...g.playersContext,
      [playerId]: {
        ...g.playersContext[playerId],
        cards: cards
      }
    }
  };
}