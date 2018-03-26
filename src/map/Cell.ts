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

export function cssClass(
  g: SimpleGame,
  ctx: GameContext,
  x: number,
  y: number,
  isClickable: boolean
) {
  // [Not]Clickable css class
  const clickableClass: string = isClickable
    ? "CellClickable "
    : "CellNotClickable ";
  // Type Class : Crystallized or CellType
  const typeClass: string = getCrystallized(g, toKey(x, y))
    ? "CrystallizedCell "
    : getCellType(g, toKey(x, y));
  return clickableClass + typeClass;
}
