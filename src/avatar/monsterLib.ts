import { BasicCaracs } from "./Avatar";

export enum MonsterName {
  Spider = "Spider",
  BasicMonster = "BasicMonster"
}

export interface MonsterTemplate extends BasicCaracs {}

export type MonsterLibType = { [key in MonsterName]: MonsterTemplate };

export const MonsterLib: MonsterLibType = {
  Spider: {
    healthInit: 1,
    healthCurrent: 1,
    attackValue: 1,
    attackRange: 1,
    moveRange: 0
  },
  BasicMonster: {
    healthInit: 2,
    healthCurrent: 2,
    attackValue: 2,
    attackRange: 1,
    moveRange: 0
  }
};
