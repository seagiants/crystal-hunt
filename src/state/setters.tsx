import { SimpleGame } from "../types";
import { SkillName } from "../skill/skillLib";

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

export function setPlayerPosition(
  g: SimpleGame,
  playerId: string,
  newPosition: string
): SimpleGame {
  const playerIdPosition: string = `player${playerId}Position`;
  console.log("playerIdPosition: " + playerIdPosition);
  const oldPosition: string = g[playerIdPosition];
  console.log("oldPosition: " + oldPosition);
  return {
    ...g,
    // Setting the new player position
    [playerIdPosition]: newPosition,
    map: {
      ...g.map,
      // Updating the origin cell
      [oldPosition]: {
        ...g.map[oldPosition],
        avatar: -1
      },
      // Updating the target cell
      [newPosition]: {
        ...g.map[newPosition],
        avatar: parseInt(playerId, 10)
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
