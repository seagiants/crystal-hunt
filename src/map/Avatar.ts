import { Avatar } from "./type";
import { loadSkill } from "../action/Skill";

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
