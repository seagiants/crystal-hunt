import { SkillTemplate } from "../skill/Skill";
// import { MapDef } from "../map/mapDefinitions";

/* Types from boardgame.io */
// FIXME shoud live in a .d.ts
export interface SimpleGame {
  cells: Array<number>;
  playersContext: PlayersContextType;
  players0Position: string;
  players1Position: string;
  map: object;
}

export interface GameContext {
  currentPlayer: string;
  phase: string;
  gameover?: string;
}

export interface Moves {
  activateCell(cellXY: number[]): object;
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
  skills: Array<SkillTemplate>;
  selectedSkill: SkillTemplate | null;
}

// Skill related object definitions.
