import { SimpleGame, GameContext } from "../types";
import { getCellType, getCrystallized } from "../state/getters";

export enum CellTypeName {
  RoomCell = "RoomCell",
  CrystalCell = "CrystalCell",
  BlackCrystalCell = "BlackCrystalCell"
}

export function toKey(x: number, y: number) {
  return `${x}x${y}`;
}
