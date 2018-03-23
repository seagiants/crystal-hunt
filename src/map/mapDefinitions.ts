import { Cell, CellTemplate } from "./Map";

export interface MapDef {
  [propName: string]: CellTemplate;
}

export const basicMap: MapDef = {
  "0x0": new Cell("room").addPlayerAvatar(0).toJSON(),
  "1x0": new Cell("room").toJSON(),
  "1x1": new Cell("room", true).toJSON(),
  "1x2": new Cell("room").toJSON(),
  "2x2": new Cell("room").addPlayerAvatar(1).toJSON()
};
