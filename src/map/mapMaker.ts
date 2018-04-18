import { MapDef, initCell, CellsDef } from "./mapDefinitions";
import { CellTypeName, toKey } from "./Cell";
import { Cell } from "./types";

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
  if (cells === {}) {
    return { xxx: EMPTY_CELL };
  } else {
    return cells;
  }
};

const getBlackCrystalXY = (cells: { string?: Cell }): string => {
  let xy = "";
  for (const key of Object.keys(cells)) {
    if (cells[key].type === CellTypeName.BlackCrystalCell) {
      xy = key;
    }
  }
  return xy;
};

/* Create a mapDefinition from a map struct */
export const mapMaker = (mapStruct: MapStruct): MapDef => {
  const y = mapStruct.length;
  const x = mapStruct[0].length;
  const cells = parseStruct(mapStruct);
  return {
    xMax: x,
    yMax: y,
    cells: cells,
    blackCrystalCellXY: getBlackCrystalXY(cells)
  };
};
