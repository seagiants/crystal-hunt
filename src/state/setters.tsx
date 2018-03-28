import { SimpleGame } from "../types";
import { SkillName } from "../action/skillLib";
import { getAvatarPosition, getCard } from "./getters";
import { Avatar } from "../map/type";
import { loadCard, loadEquipment } from "../action/Card";
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
                avatar.caracs.healthCurrent + value > 0
                  ? avatar.caracs.healthCurrent + value
                  : 0
            }
          }
        : { ...avatar };
    })
  };
  return newState;
}

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
  // Clean dead monsters from Avatars.
  const noDeadOnAvatars: SimpleGame = {
    ...notOnCellAnymore,
    avatars: notOnCellAnymore.avatars.filter(
      avatar => avatar.caracs.healthCurrent > 0 || avatar.type === "Player"
    )
  };
  return noDeadOnAvatars;
}

export function drawCards(g: SimpleGame, playerId: string): SimpleGame {
  return setCards(g, playerId, [loadCard("Sword")]);
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

export function plugCard(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const card = getCard(g, playerId, cardIndex);
  return { ...g, [`equipmentPlayer${playerId}`]: loadEquipment(card) };
}
