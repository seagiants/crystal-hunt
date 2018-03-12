/* Types from boardgame.io */
// FIXME shoud live in a .d.ts
export interface SimpleGame {
  cells: Array<number>;
}

export interface GameContext {
  currentPlayer: string;
  gameover?: string;
}

export interface Moves {
  activateCell(): object;
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

export interface CellProps {
    G: SimpleGame;
    cell: number;
    idx: number;
    activateCell(index: number): object;
  }