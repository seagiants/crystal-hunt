import { SimpleGame } from "../types";
import { SkillName } from "../action/skillLib";
import { getAvatarPosition } from "./getters";
import { Avatar } from "../map/type";

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
    avatars: g.avatars.map(
      avatar =>
        avatar.id === id
          ? {
              ...avatar,
              caracs: {
                ...avatar.caracs,
                healthCurrent: avatar.caracs.healthCurrent + value
              }
            }
          : { ...avatar }
    )
  };
  return newState;
}

export function cleanDeadMonsters(g: SimpleGame): SimpleGame {
  const deadMonsters: Array<Avatar> = g.avatars.filter(
    avatar => avatar.caracs.healthCurrent < 1
  );
  // Clean dead monster position on cell.
  /* const notOnCellAnymore: SimpleGame = 
    deadMonsters.reduce(
    (gTemp, currentMonster): SimpleGame => {
      return {
        ...gTemp,
        map: {
          ...gTemp.map,
          [currentMonster.position]: {
            ...gTemp.map[currentMonster.position],
            avatar: null
          }
        }
      };
    },
    { ...g }
  );
  */
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
      avatar => avatar.caracs.healthCurrent > 0
    )
  };  
  return noDeadOnAvatars;
}
