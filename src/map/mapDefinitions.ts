import { CellTypeName } from "./Cell";
import { Cell, Avatar } from "./types";
import { mapMaker } from "./mapMaker";

export interface MapDef {
  cells: CellsDef;
  xMax: number;
  yMax: number;
  blackCrystalCellXY: string;
  avatars: Array<Avatar>;
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

// prettier-ignore
const firstMapStruct = [
  ["R0-", "R--", "R--", "R--", "R--", "R--", "R--"],
  ["R--", "---", "---", "R--", "---", "---", "---"],
  ["R--", "R--", "R--", "B--", "R--", "R--", "R--"],
  ["---", "---", "---", "R--", "---", "---", "R--"],
  ["R--", "R--", "R--", "R--", "R--", "R--", "R1-"]
];

// prettier-ignore
const verticalStruct = [
  ["R0-", "---"],
  ["R--", "R--"],
  ["---", "R1-"]
];

console.dir(verticalStruct);

// TODO : Improve BlackCrsytalCell handle.
export function initMapSetup(): {
  map: MapDef;
  basicAvatars: Array<Avatar>;
  blackCrystalCellId: string;
} {
  const firstMapDef = mapMaker(firstMapStruct);
  return {
    map: firstMapDef,
    basicAvatars: firstMapDef.avatars,
    blackCrystalCellId: firstMapDef.blackCrystalCellXY
  };
}
