import {
  Skill,
  Caracs,
  Equipment,
  Enchantment,
  Spell
} from "../action/type";
import { SkillName, SkillCategoryName } from "../action/skillLib";
import { CellsDef } from "../map/mapDefinitions";
import { Avatar, PathMatrix } from "../map/types";
import { Decks, Card } from "../cards/types";

/* Types from boardgame.io */
// FIXME shoud live in a .d.ts
export interface SimpleGame {
  playersContext: PlayersContextType;
  selectedAction: SkillCategoryName | null;
  avatars: Array<Avatar>;
  map: CellsDef;
  xMax: number;
  yMax: number;
  endTurn: boolean;
  // Used for monster ids.
  monsterCounter: number;
  // Used to setup easily the map.
  blackCrystalCellId: string;
  // Used for pathFinding
  pathMatrix: PathMatrix;
  // Used to display info to players
  infoMessages: Array<String>;
  // Player's deck props
  decksPlayer0: Decks;
  decksPlayer1: Decks;
  // equipment props
  equipmentPlayer0?: Equipment;
  equipmentPlayer1?: Equipment;
  // enchantment props
  enchantmentPlayer0?: Enchantment;
  enchantmentPlayer1?: Enchantment;
  // spell props
  dexteritySpellPlayer0?: Spell;
  intelligenceSpellPlayer0?: Spell;
  wisdomSpellPlayer0?: Spell;
  strengthSpellPlayer0?: Spell;
  dexteritySpellPlayer1?: Spell;
  intelligenceSpellPlayer1?: Spell;
  wisdomSpellPlayer1?: Spell;
  strengthSpellPlayer1?: Spell;
}

export interface GameContext {
  currentPlayer: string;
  phase: string;
  gameover?: boolean;
}

export interface Moves {
  activateCell(cellXY: number[]): object;
  activateAction(category: SkillCategoryName): object;
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

export interface ActionTileProps {
  skill: Skill;
  equipment: Equipment;
  category: SkillCategoryName;
  playerID: string;
  activateAction(categoryName: string): object;
  endTurn(): object;
}

export interface CardTileProps {
  card: Card;
  index: number;
  playerId: string;
  activateCard(cardIndex: number, playerId: string): object;
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
  cards: Array<Card>;
}

// Skill related object definitions.
