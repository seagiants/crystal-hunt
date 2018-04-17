import { MapDef, initCell } from "./mapDefinitions";
import { CellTypeName, toKey } from "./Cell";

type MapStruct = Array<Array<string>>;

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
const parseStruct = (struct: MapStruct) => {
  let cells = {};
  struct.forEach((row, i) => {
    row.forEach((el, j) => {
      const c = parseCell(el);
      if (c !== null) {
        cells[toKey(i, j)] = c;
      }
    });
  });
  return cells;
};

/* Create a mapDefinition from a map struct */
export const mapMaker = (mapStruct: MapStruct): MapDef => {
  const y = mapStruct.length;
  const x = mapStruct[0].length;
  const cells = parseStruct(mapStruct);
  return {
    xMax: x,
    yMax: y,
    cells: cells
  };
};
