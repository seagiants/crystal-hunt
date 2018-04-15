import { MapDef, initCell } from "./mapDefinitions";
import { CellTypeName, toKey } from "./Cell";

type MapStruct = Array<Array<string>>;

/* Create a cell from its string definition */
const parseCell = (cell: string) => {
  const [room, avatar, trap] = cell.split("");
  let constructedCell = null;
  if (room === "R") {
    constructedCell = initCell(CellTypeName.RoomCell);
  }
  if (avatar !== "-") {
    constructedCell = { ...constructedCell, avatar: avatar };
  }
  if (trap === "T") {
    constructedCell = { ...constructedCell, trap: true };
  }
  return constructedCell;
};

const parseStruct = (struct: MapStruct) => {
  let cells = {};
  struct.forEach((row, i) => {
    row.forEach((el, j) => {
      const k = toKey(i, j);
      cells[k] = parseCell(el);
    });
  });
  return cells;
};

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
