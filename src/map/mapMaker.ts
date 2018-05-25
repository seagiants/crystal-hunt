import { MapDef, initCell, CellsDef } from "./mapDefinitions";
import { CellTypeName, toKey } from "./Cell";
import { Cell } from "./types";
import {
  initPlayerAvatar,
  initMonsterAvatar,
  Avatar,
  RaceName
} from "../avatar/Avatar";

type MapStruct = Array<Array<string>>;

const EMPTY_CELL: Cell = {
  type: CellTypeName.RoomCell,
  avatar: "",
  monster: false,
  trap: false,
  isCrystallized: false
};

/* Create a cell from its string definition */
const parseCell = (cell: string) => {
  const [room, avatar, trap] = cell.split("");
  let constructedCell = null;
  if (room === "R") {
    constructedCell = initCell(CellTypeName.RoomCell);
  } else if (room === "B") {
    constructedCell = initCell(CellTypeName.BlackCrystalCell);
  }
  if (avatar !== "-") {
    constructedCell = { ...constructedCell, avatar: avatar };
  }
  if (trap === "T") {
    constructedCell = { ...constructedCell, trap: true };
  }
  return constructedCell;
};

/* Parse a map struct and create cells */
const parseStruct = (struct: MapStruct): CellsDef => {
  let cells = {};
  struct.forEach((row, i) => {
    row.forEach((el, j) => {
      const c = parseCell(el);
      if (c !== null) {
        cells[toKey(i, j)] = c;
      }
    });
  });
  // for typescript handling the empty object case
  // FIXME use initCell function
  if (cells === {}) {
    return { xxx: EMPTY_CELL };
  } else {
    return cells;
  }
};

/* Find the x and y of the black crystal cell */
const getBlackCrystalXY = (cells: { string?: Cell }): string => {
  let xy = "";
  for (const key of Object.keys(cells)) {
    if (cells[key].type === CellTypeName.BlackCrystalCell) {
      xy = key;
    }
  }
  return xy;
};

const initAvatarFromCell = (key: string, cell: Cell) => {
  if (cell.avatar === "0") {
    return initPlayerAvatar("0", key, RaceName.Human);
  } else if (cell.avatar === "1") {
    return initPlayerAvatar("1", key, RaceName.Orc);
  } else {
    return initMonsterAvatar("M", key);
  }
};

const createAvatarArray = (cells: { string?: Cell }): Array<Avatar> => {
  const keys = Object.keys(cells);
  const avatars = keys
    .map(key => [key, cells[key]])
    .filter(tuple => tuple[1].avatar !== null)
    .reduce(
      (acc, tuple) => [...acc, initAvatarFromCell(tuple[0], tuple[1])],
      []
    );
  return avatars;
};

/* Create a map definition from a map struct */
export const mapMaker = (mapStruct: MapStruct): MapDef => {
  const y = mapStruct[0].length;
  const x = mapStruct.length;
  const cells = parseStruct(mapStruct);
  return {
    xMax: x,
    yMax: y,
    cells: cells,
    blackCrystalCellXY: getBlackCrystalXY(cells),
    avatars: createAvatarArray(cells)
  };
};
