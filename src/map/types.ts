import { CellTypeName } from "./Cell";
import { Caracs, Skill } from "../action/type";
import { AvatarTypeName } from "./Avatar";
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
  pathMatrix: PathMatrix;
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
  skills: Array<Skill>;
}

type RowPathMatrix = Array<number>;
export type PathMatrix = Array<RowPathMatrix>;