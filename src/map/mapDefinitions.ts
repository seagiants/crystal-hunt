import { Cell, CellJSON, CellType } from "./Cell";

export interface MapDef {
  [propName: string]: CellJSON;
}

export const basicMap: MapDef = {
  "0x0": new Cell(CellType.RoomCell).addPlayerAvatar(0).toJSON(),
  "1x0": new Cell(CellType.RoomCell).toJSON(),
  "1x1": new Cell(CellType.CrystalCell, true).toJSON(),
  "1x2": new Cell(CellType.RoomCell).toJSON(),
  "2x2": new Cell(CellType.RoomCell).addPlayerAvatar(1).toJSON()
};
