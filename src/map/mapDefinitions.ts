import { CellTypeName } from "./Cell";
import { Cell, Avatar } from "./type";
import { initPlayerAvatar, initMonsterAvatar } from "./Avatar";

export interface MapDef {
  [propName: string]: Cell;
}

function initCell(cellType: CellTypeName): Cell {
  return {
    type: cellType,
    monster: false,
    trap: false,
    avatar: null,
    isCrystallized: false
  };
}

export const basicMap: MapDef = {
  "0x0": { ...initCell(CellTypeName.RoomCell), avatar: "0" },
  "1x0": { ...initCell(CellTypeName.RoomCell), avatar: "M2" },
  "1x1": initCell(CellTypeName.BlackCrystalCell),
  "1x2": initCell(CellTypeName.RoomCell),
  "2x2": { ...initCell(CellTypeName.RoomCell), avatar: "1" }
};

const _longerMap: MapDef = {
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
  "4x4": initCell(CellTypeName.RoomCell),
  "5x4": initCell(CellTypeName.RoomCell),
  "5x3": initCell(CellTypeName.RoomCell),
  "5x2": initCell(CellTypeName.RoomCell),
  "6x4": { ...initCell(CellTypeName.RoomCell), avatar: "1" }
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
    initMonsterAvatar("M2", "2x0")
  ];
  return {
    map: _longerMap,
    basicAvatars: basicAvatars,
    blackCrystalCellId: "3x2"
  };
}
