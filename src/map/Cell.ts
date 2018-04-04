import { SimpleGame } from "../types";
import { PathMatrix } from "./types";

export enum CellTypeName {
  RoomCell = "RoomCell",
  CrystalCell = "CrystalCell",
  BlackCrystalCell = "BlackCrystalCell"
}

export function toKey(x: number, y: number) {
  return `${x}x${y}`;
}

export function toCoord(xXy: string): [number, number] {
  const xy = xXy.split("x");
  return [parseInt(xy[0], 10), parseInt(xy[1], 10)];
}

export function toPathMatrix(g: SimpleGame): PathMatrix {
  let tempMatrix = [];
  for (var _i = 0; _i < g.yMax + 1; _i++) {
    let tempRows = [];
    for (var _j = 0; _j < g.xMax + 1; _j++) {
      tempRows.push(g.map[toKey(_j, _i)] !== undefined ? 0 : 1);
    }
    tempMatrix.push(tempRows);
  }
  return tempMatrix;
}

export function findPath(
  matrix: PathMatrix,
  start: [number, number],
  end: [number, number]
): Array<[number, number]> {
  let PF = require("pathfinding");
  let obj = new PF.Grid(matrix);
  let finder = new PF.AStarFinder();
  console.log(start[0] + ":" + start[1] + " to " + end[0] + ":" + end[1]);
  let path = finder.findPath(start[0], start[1], end[0], end[1], obj);
  return path;
}
