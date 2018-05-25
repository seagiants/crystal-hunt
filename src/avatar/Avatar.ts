import { Caracs } from "../action/Action";

export enum AvatarTypeName {
  Player = "Player",
  Monster = "Monster"
}

export interface Avatar {
  id: string;
  type: AvatarTypeName;
  position: string;
  caracs: Caracs;
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
