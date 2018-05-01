import { CellTypeName } from "./Cell";
import { AvatarTypeName } from "./Avatar";
import { SimpleGame, GameContext, Moves, Events } from "../types";
import { Caracs } from "../action/Action";

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

export interface Avatar {
  id: string;
  type: AvatarTypeName;
  position: string;
  caracs: Caracs;
}

type RowPathMatrix = Array<number>;
export type PathMatrix = Array<RowPathMatrix>;
