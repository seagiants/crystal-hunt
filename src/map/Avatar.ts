import { Avatar } from "./types";
import { Caracs } from "../action/Action";

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
      attackValue: 1,
      attackRange: 1,
      moveRange: 1,
      drawNumber: 3
    }
  };
}

// TODO : Improve the init monster mechanism (if no caracs provided, only some, all,...).
export function initMonsterAvatar(
  id: string,
  position: string,
  caracs?: Caracs
): Avatar {
  const healthCurrent =
    caracs !== undefined && caracs.healthCurrent !== undefined
      ? caracs.healthCurrent
      : 2;
  const attackValue =
    caracs !== undefined && caracs.attackValue !== undefined
      ? caracs.attackValue
      : 2;
  return {
    id: id,
    type: AvatarTypeName.Monster,
    position: position,
    caracs: {
      healthCurrent: healthCurrent,
      attackValue: attackValue
    }
  };
}
/*
// First implem' with monster attacks every player next to it.
export function triggerMonsterSkill(
  g: SimpleGame,
  ctx: GameContext,
  monsterId: string
): SimpleGame {
  console.log(
    "Monster " +
      monsterId +
      " is triggering on player " +
      ctx.currentPlayer +
      " turn."
  );
  const currentMonsterPosition: string = getAvatarPosition(g, monsterId);
  const xy = currentMonsterPosition.split("x");
  const caracs = getAvatar(g, monsterId).caracs;
  // TODO : Make it in a cleaner way
  let neighbourCell: Array<string> = [];
  neighbourCell.push(toKey(parseInt(xy[0], 10), parseInt(xy[1], 10) + 1));
  neighbourCell.push(toKey(parseInt(xy[0], 10), parseInt(xy[1], 10) - 1));
  neighbourCell.push(toKey(parseInt(xy[0], 10) + 1, parseInt(xy[1], 10)));
  neighbourCell.push(toKey(parseInt(xy[0], 10) - 1, parseInt(xy[1], 10)));
  const monsterTriggered = neighbourCell.reduce(
    (prevG, currCellId) => {
      if (
        getCell(prevG, currCellId) !== undefined &&
        getAvatarOnCell(prevG, currCellId) !== null
      ) {
        console.log("Monster " + monsterId + " is attacking " + currCellId);
        return loadPower("Attack")(prevG, ctx, currCellId, caracs);
      } else {
        return prevG;
      }
    },
    { ...g }
  );
  return monsterTriggered;
}
*/
