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
    treasure: false,
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

export function initMapSetup(): {
  basicMap: MapDef;
  basicAvatars: Array<Avatar>;
} {
  let map = basicMap;
  let basicAvatars = [
    initPlayerAvatar("0", "0x0"),
    initPlayerAvatar("1", "2x2"),
    initMonsterAvatar("M2", "1x0")
  ];
  return {
    basicMap: map,
    basicAvatars: basicAvatars
  };
}
