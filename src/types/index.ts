export interface SimpleGame {
  cells: Array<number>;
}

export interface GameContext {
  currentPlayer: string;
  gameover?: string;
}

export interface CellProps {
  G: SimpleGame;
  cell: number;
  idx: number;
  activateCell(index: number): object;
  endTurn(): object;
}

export interface Moves {
  activateCell(): object;
}

export interface Events {
  endTurn(): object;
}

export interface CBProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}
