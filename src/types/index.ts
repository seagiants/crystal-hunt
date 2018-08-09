import { CellsDef } from "../map/mapDefinitions";
import { PathMatrix } from "../map/types";
import { Caracs, Action, ActionCategoryName } from "../action/Action";
import { ActionsFlow } from "../action/Action";
import { Card } from "../cards/Card";
import { Avatar, KlassName, RaceName } from "../avatar/Avatar";

export enum ReadyState {
  None = "xx",
  Zero = "0x",
  One = "x1",
  Both = "01",
  Finished = ""
}

/* Types from boardgame.io */
// FIXME shoud live in a .d.ts
export interface SimpleGame {
  // Mark if none, one or both player are ready for action
  readyState: ReadyState;
  players: PlayersContextType;
  selectedAction: ActionCategoryName | null;
  avatars: Array<Avatar>;
  map: CellsDef;
  xMax: number;
  yMax: number;
  actionCount: number;
  // Used for monster ids.
  monsterCounter: number;
  // Used to setup easily the map.
  blackCrystalCellId: string;
  // Used for pathFinding
  pathMatrix: PathMatrix;
  // Used to display info to players
  infoMessages: Array<string>;
  // Player's deck props
  decksPlayer0: Array<Card>;
  decksPlayer1: Array<Card>;
}

export interface GameContext {
  currentPlayer: string;
  phase: string;
  gameover?: boolean;
}

export interface Moves {
  setAvatars(playerID: string, klass: KlassName, race: RaceName): object;
  activateCell(cellXY: number[]): object;
  activateAction(category: ActionCategoryName): object;
  activateCard(): object;
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
  isActive: boolean;
}

export interface CellProps extends ComponentProps {
  G: SimpleGame;
  ctx: GameContext;
  x: number;
  y: number;
  isClickable: boolean;
  moves: Moves;
  pathMatrix: PathMatrix;
}

export interface TilesBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
  playerId: string;
}

// PlayerContext definitions.
type PlayersContextType = { [index: string]: PlayerContext };

export interface PlayerCaracs extends Caracs {
  healthCurrent: number;
  healthInit: number;
  attackValue: number;
}

export enum TriggerPhase {
  TurnStart = "TurnStart",
  TurnEnd = "TurnEnd"
}

export interface PlayerContext {
  // Id of the player (currently 0 or 1)
  playerID: string;
  // Actions of the player
  actions: Array<Action>;
  // ActionFlow, which deal with ActionTile workflow (clickable, exhausted, etc.)
  actionFlows: ActionsFlow;
  // Cards in the player deck, hand is a temp extract view of some cards.
  cards: Array<Card>;
  // Cards that have been exhausted.
  graveyard?: Array<Card>;
}
