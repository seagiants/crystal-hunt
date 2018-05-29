import { Caracs } from "../action/Action";
import { addCaracs } from "../action/actionLogic";
import { raceLib } from "./raceLib";

export enum AvatarTypeName {
  Player = "Player",
  Monster = "Monster"
}

export enum RaceName {
  Human = "Human",
  Orc = "Orc",
  Elve = "Elve",
  Monster = "Monster"
}

export enum Class2Name {
  Warrior = "Warrior",
  Mage = "Mage",
  Assassin = "Assassin",
  Monster = "Monster"
}

export interface Avatar {
  id: string;
  race: RaceName;
  class2: Class2Name;
  type: AvatarTypeName;
  position: string;
  caracs: Caracs;
}

export interface CaracsAvatar extends Caracs {
  healthInit: number;
  healthCurrent: number;
  attackValue: number;
  attackRange: number;
  moveRange: number;
  drawNumber: number;
}

export const defaultCaracs: CaracsAvatar = {
  healthInit: 5,
  healthCurrent: 5,
  attackValue: 1,
  attackRange: 1,
  moveRange: 1,
  drawNumber: 3
};

export function initPlayerAvatar(
  id: string,
  position: string,
  race: RaceName,
  class2: Class2Name
): Avatar {
  return {
    id: id,
    race: race,
    class2: class2,
    type: AvatarTypeName.Player,
    position: position,
    caracs: addCaracs(defaultCaracs, raceLib[race].caracs)
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
  const attackRange =
    caracs !== undefined && caracs.attackRange !== undefined
      ? caracs.attackRange
      : 1;
  const newMonster: Avatar = {
    id: id,
    type: AvatarTypeName.Monster,
    race: RaceName.Monster,
    class2: Class2Name.Monster,
    position: position,
    caracs: {
      healthCurrent: healthCurrent,
      attackValue: attackValue,
      attackRange: attackRange
    }
  };
  console.log(newMonster);
  return newMonster;
}
