import { CellTypeName } from "./Cell";
import { Cell } from "./types";
import { initPlayerAvatar, initMonsterAvatar, Avatar } from "../avatar/Avatar";

export interface MapDef {
  cells: CellsDef;
  xMax: number;
  yMax: number;
  blackCrystalCellXY: string;
}

export interface CellsDef {
  [propName: string]: Cell;
}

export const initCell = (cellType: CellTypeName): Cell => {
  return {
    type: cellType,
    monster: false,
    trap: false,
    avatar: null,
    isCrystallized: false
  };
};

export const basicMap: MapDef = {
  xMax: 2,
  yMax: 2,
  cells: {
    "0x0": { ...initCell(CellTypeName.RoomCell), avatar: "0" },
    "1x0": { ...initCell(CellTypeName.RoomCell), avatar: "M2" },
    "1x1": initCell(CellTypeName.BlackCrystalCell),
    "1x2": initCell(CellTypeName.RoomCell),
    "2x2": { ...initCell(CellTypeName.RoomCell), avatar: "1" }
  },
  blackCrystalCellXY: "1x1"
};

const _longerMap: MapDef = {
  xMax: 6,
  yMax: 4,
  blackCrystalCellXY: "3x2",
  cells: {
    "0x0": { ...initCell(CellTypeName.RoomCell), avatar: "0" },
    "1x0": initCell(CellTypeName.RoomCell),
    "1x1": initCell(CellTypeName.RoomCell),
    "1x2": initCell(CellTypeName.RoomCell),
    "2x0": { ...initCell(CellTypeName.RoomCell), avatar: "M2" },
    "3x0": initCell(CellTypeName.RoomCell),
    "3x1": { ...initCell(CellTypeName.RoomCell), trap: true },
    "3x2": initCell(CellTypeName.BlackCrystalCell),
    "3x3": { ...initCell(CellTypeName.RoomCell), trap: true },
    "3x4": initCell(CellTypeName.RoomCell),
    "4x4": { ...initCell(CellTypeName.RoomCell), avatar: "M3" },
    "5x4": initCell(CellTypeName.RoomCell),
    "5x3": initCell(CellTypeName.RoomCell),
    "5x2": initCell(CellTypeName.RoomCell),
    "6x4": { ...initCell(CellTypeName.RoomCell), avatar: "1" }
  }
};

// TODO : Improve BlackCrsytalCell handle.
export function initMapSetup(): {
  map: MapDef;
  basicAvatars: Array<Avatar>;
  blackCrystalCellId: string;
} {
  let basicAvatars = [
    initPlayerAvatar("0", "0x0"),
    initPlayerAvatar("1", "6x4"),
    initMonsterAvatar("M2", "2x0"),
    initMonsterAvatar("M3", "4x4")
  ];
  return {
    map: _longerMap,
    basicAvatars: basicAvatars,
    blackCrystalCellId: _longerMap.blackCrystalCellXY
  };
}
