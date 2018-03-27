import { Avatar } from "./type";
import { loadSkill } from "../action/Skill";
import { SimpleGame, GameContext } from "../types";
import {
  getAvatarPosition,
  getAvatarOnCell,
  getAvatar,
  getCell
} from "../state/getters";
import { toKey } from "./Cell";
import { loadPower } from "../action/Power";

export enum AvatarTypeName {
  Player = "Player",
  Monster = "Monster"
}

export function initPlayerAvatar(id: string, position: string): Avatar {
  return {
    id: id,
    type: AvatarTypeName.Player,
    position: position,
    caracs: {
      healthInit: 5,
      healthCurrent: 5,
      attackValue: 1
    },
    skills: [loadSkill("Move"), loadSkill("Cristallize"), loadSkill("Attack")]
  };
}

export function initMonsterAvatar(id: string, position: string): Avatar {
  return {
    id: id,
    type: AvatarTypeName.Monster,
    position: position,
    caracs: {
      healthCurrent: 2,
      attackValue: 2
    },
    skills: [loadSkill("Attack")]
  };
}

// First implem' with monster attacks every player next to it.
export function triggerMonsterSkill(
  g: SimpleGame,
  ctx: GameContext,
  monsterId: string
): SimpleGame {
  const currentMonsterPosition: string = getAvatarPosition(g, monsterId);
  const xy = currentMonsterPosition.split("x");
  const caracs = getAvatar(g, monsterId).caracs;
  // TODO : Make it in a cleaner way
  let neighbourCell: Array<String> = [];
  neighbourCell.push(toKey(parseInt(xy[0], 10), parseInt(xy[1], 10) + 1));
  neighbourCell.push(toKey(parseInt(xy[0], 10), parseInt(xy[1], 10) - 1));
  neighbourCell.push(toKey(parseInt(xy[0], 10) + 1, parseInt(xy[1], 10)));
  neighbourCell.push(toKey(parseInt(xy[0], 10) - 1, parseInt(xy[1], 10)));
  console.log("Neighbours :");
  console.log(neighbourCell);    
  let tempState: SimpleGame = { ...g };
  neighbourCell.forEach((cellId: string) => {
    if (
      getCell(g, cellId) !== undefined &&
      getAvatarOnCell(g, cellId) !== null
    ) {
      tempState = loadPower("Attack")(g, ctx, cellId, caracs);
      console.log(tempState);
      
    }
  });
  console.log("finale");
  console.log(tempState);  
  return tempState;
}
