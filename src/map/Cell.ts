import { SimpleGame } from "../types";
import { PathMatrix } from "./types";
import { getAvatarOnCell } from "../state/getters";

let PF = require("pathfinding");

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

// Build a squared pathMatrix with 0/1, where 0 is a pathable cell, 1 is for cells with not pathable obstacles.
// @flyingOnPath is to tell if avatar are obstacles
// @targetCellId is to tell if obstacles should be ignored on targetCell (default is no)
export function toPathMatrix(
  g: SimpleGame,
  flyingOnPath: boolean = false
): PathMatrix {
  let tempMatrix = [];
  // Return 1 if cell is a 'wall', 0 if not.
  const isWall = (g2: SimpleGame, cellId: string): 0 | 1 => {
    // If cell doesn't exist, equivalent to wall => 1.
    if (g2.map[cellId] === undefined) {
      return 1;
    }
    // If flyingOnPath, doesn't consider obstacles.
    if (flyingOnPath) {
      return 0;
    }
    // If not flyingOnPath, check if cell is Empty, if not is a wall => 1.
    return getAvatarOnCell(g2, cellId) === null ? 0 : 1;
  };
  for (var y = 0; y < g.yMax + 1; y++) {
    let tempRows = [];
    for (var x = 0; x < g.xMax + 1; x++) {
      tempRows.push(isWall(g, toKey(x, y)));
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
  let obj = new PF.Grid(matrix);
  let finder = new PF.AStarFinder();
  let path = finder.findPath(start[0], start[1], end[0], end[1], obj);
  return path;
}
