import { Skill, Caracs } from "../action/type";
import { SkillName } from "../action/skillLib";
import { MapDef } from "../map/mapDefinitions";
import { Avatar } from "../map/type";

/* Types from boardgame.io */
// FIXME shoud live in a .d.ts
export interface SimpleGame {  
  playersContext: PlayersContextType;
  avatars: Array<Avatar>;
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
  skill: Skill;
  activateSkill(skill: string): object;
  endTurn(): object;
}

// PlayerContext definitions.
type PlayersContextType = { [index: string]: PlayerContext };

export interface PlayerCaracs extends Caracs {
  healthCurrent: number;
  healthInit: number;
  attackValue: number;
}

export interface PlayerContext {
  playerID: string;
  skills: Array<Skill>;
  selectedSkill: SkillName | null;
  caracs: PlayerCaracs;
}

// Skill related object definitions.
