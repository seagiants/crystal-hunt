import { CellTypeName } from "./Cell";
import { Cell } from "./type";

export interface MapDef {
  [propName: string]: Cell;
}

function initCell(cellType: CellTypeName): Cell {
  return {
    type: cellType,
    monster: false,
    treasure: false,
    avatar: -1,
    isCrystallized: false
  };
}

export const basicMap: MapDef = {
  "0x0": { ...initCell(CellTypeName.RoomCell), avatar: 0 },
  "1x0": initCell(CellTypeName.RoomCell),
  "1x1": initCell(CellTypeName.BlackCrystalCell),
  "1x2": initCell(CellTypeName.RoomCell),
  "2x2": { ...initCell(CellTypeName.RoomCell), avatar: 1 }
};
