import { Skill } from "../skill/Skill";

/* Types from boardgame.io */
// FIXME shoud live in a .d.ts
export interface SimpleGame {
  cells: Array<number>;
  playersContext: PlayersContextType;
  map: object;
}

export interface GameContext {
  currentPlayer: string;
  phase: string;
  gameover?: string;
}

export interface Moves {
  activateCell(): object;
  activateSkill(): object;
}

export interface Events {
  endTurn(): object;
}

/* Components props types defintion */
export interface CellsBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}

export interface GameBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
  playerID: string;
}

export interface CellProps {
  G: SimpleGame;
  cell: number;
  idx: number;
  activateCell(index: number): object;
  endTurn(): object;
}
// PlayerContext definitions.
type PlayersContextType = { [index: string]: PlayerContext };

export interface PlayerContext {
  playerID: string;
  skills: Array<Skill>;
  selectedSkill: Skill | null;
}

// Skill related object definitions.
