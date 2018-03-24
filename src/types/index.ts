import { SkillJSON, Caracs } from "../skill/Skill";
import { SkillName } from "../skill/skillLib";
import { MapDef } from "../map/mapDefinitions";

/* Types from boardgame.io */
// FIXME shoud live in a .d.ts
export interface SimpleGame {
  cells: Array<number>;
  playersContext: PlayersContextType;
  players0Position: string;
  players1Position: string;
  map: MapDef;
  endTurn: boolean;
}

export interface GameContext {
  currentPlayer: string;
  phase: string;
  gameover?: boolean;
}

export interface Moves {
  activateCell(cellXY: number[]): object;
  activateSkill(): object;
}

export interface Events {
  endTurn(): object;
}

/* Components props types defintion 
  These are used to type the json props of React componant.
*/

// React abstract componant props interface
export interface ComponentProps {
  G: SimpleGame;
  ctx: GameContext;
}

export interface CellsBoardProps extends ComponentProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}

export interface GameBoardProps extends ComponentProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
  playerID: string;
}

export interface CellProps extends ComponentProps {
  G: SimpleGame;
  cell: number;
  idx: number;
  activateCell(index: number): object;
  endTurn(): object;
}

export interface ActionsBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}

export interface ActionProps {
  G: SimpleGame;
  skill: SkillJSON;
  activateSkill(skill: SkillName): object;
  endTurn(): object;
}

// PlayerContext definitions.
type PlayersContextType = { [index: string]: PlayerContext };

export interface PlayerCaracs extends Caracs {
  healthCurrent: number;
  healthInit: number;
}
export interface PlayerContext {
  playerID: string;
  skills: Array<SkillJSON>;
  selectedSkill: SkillName | null;
  caracs: PlayerCaracs;
}

// Skill related object definitions.
