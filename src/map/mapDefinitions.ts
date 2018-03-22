import { Cell } from "./Map";

export interface MapDef {
  playerOnePosition?: string;
  playerTwoPosition?: string;
  // tslint:disable-next-line: no-any
  [propName: string]: any;
}

export const basicMap: MapDef = {
  playerOnePosition: "0x0",
  playerTwoPosition: "2x2",
  "0x0": new Cell("room").addPlayerAvatar(0).toJSON(),
  "1x0": new Cell("room").toJSON(),
  "1x1": new Cell("room", true).toJSON(),
  "1x2": new Cell("room").toJSON(),
  "2x2": new Cell("room").addPlayerAvatar(1).toJSON()
};
