import { Avatar } from "./types";
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
import { Caracs } from "../action/type";

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
    skills: [loadSkill("Move"), loadSkill("Crystallize"), loadSkill("Attack")]
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
  let tempState: SimpleGame = { ...g };
  neighbourCell.forEach((cellId: string) => {
    if (
      getCell(g, cellId) !== undefined &&
      getAvatarOnCell(g, cellId) !== null
    ) {
      tempState = loadPower("Attack")(g, ctx, cellId, caracs);
    }
  });
  return tempState;
}
