import { CellTypeName } from "./Cell";
import { Caracs, Skill } from "../action/type";
import { AvatarTypeName } from "./Avatar";
import { SimpleGame, GameContext, Moves, Events } from "../types";

export interface MapBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}

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
