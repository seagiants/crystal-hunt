import { CellTypeName } from "./Cell";
import { Cell } from "./types";
import { mapMaker } from "./mapMaker";
import { Avatar } from "../avatar/Avatar";

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
/* const firstMapStruct = [
  ["R0-", "R--", "R--", "R--", "R--", "R--", "R--"],
  ["R--", "---", "---", "R--", "---", "---", "---"],
  ["R--", "RM-", "R--", "B--", "R--", "RM-", "R--"],
  ["---", "---", "---", "R--", "---", "---", "R--"],
  ["R--", "R--", "R--", "RM-", "R--", "R--", "R1-"]
];
*/
// prettier-ignore
const bibiMapStruct = [
  ["R0-", "R--", "R--", "R--", "R--", "R--", "R--"],
  ["R--", "---", "---", "---", "---", "---", "---"],
  ["R--", "R--", "R--", "B--", "R--", "R--", "R--"],
  ["---", "---", "---", "---", "---", "---", "R--"],
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
<<<<<<< HEAD
  const firstMapDef = mapMaker(firstMapStruct);
  console.log("map def", firstMapDef);
=======
  const firstMapDef = mapMaker(bibiMapStruct);
>>>>>>> e945d28906b88119c7ef89b915c0cd6fa404e08e
  return {
    map: firstMapDef,
    basicAvatars: firstMapDef.avatars,
    blackCrystalCellId: firstMapDef.blackCrystalCellXY
  };
}
