import { CellTypeName } from "./Cell";
import { SimpleGame, GameContext, Moves, Events } from "../types";

// ---- Components props interfaces ----- //
export interface MapBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}

export interface MapCellProps {
  G: SimpleGame;
  ctx: GameContext;
  x: number;
  y: number;
  isClickable: boolean;
  moves: Moves;
}

// ----- Map concepts ----- //
export interface Cell {
  type: CellTypeName;
  monster: boolean;
  trap: boolean;
  avatar: string | null;
  isCrystallized: boolean;
}

type RowPathMatrix = Array<number>;
export type PathMatrix = Array<RowPathMatrix>;
