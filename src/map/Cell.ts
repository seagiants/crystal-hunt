import { SimpleGame, GameContext, Moves, Events } from "../types";
import { getCellType, getCrystallized } from "../state/getters";

export enum CellType {
  RoomCell = "RoomCell",
  CrystalCell = "CrystalCell",
  BlackCrystalCell = "BlackCrystalCell"
}

export interface CellJSON {
  type: CellType;
  monster: boolean;
  treasure: boolean;
  avatar: number;
  isCrystallized: boolean;
}

export class Cell implements CellJSON {
  type: CellType;
  monster: boolean;
  treasure: boolean;
  avatar: number;
  isCrystallized: boolean;

  static toKey(x: number, y: number) {
    return `${x}x${y}`;
  }

  static isClickable(
    g: SimpleGame,
    ctx: GameContext,
    x: number,
    y: number
  ): boolean {
    return g.map[Cell.toKey(x, y)].avatar.toString() !== ctx.currentPlayer;
  }

  static cssClass(g: SimpleGame, ctx: GameContext, x: number, y: number, isClickable: boolean) {
    const clickableClass: string = isClickable
      ? "CellClickable "
      : "CellNotClickable ";
    const typeClass: string = getCrystallized(g, Cell.toKey(x, y))
      ? "CrystallizedCell "
      : getCellType(g, Cell.toKey(x, y));
    return clickableClass + typeClass;
  }

  constructor(
    type: CellType,
    monster: boolean = false,
    treasure: boolean = false,
    playerAvatar: number = -1,
    isCrystallized: boolean = false
  ) {
    this.type = type;
    this.monster = monster;
    this.treasure = treasure;
    this.avatar = playerAvatar;
    this.isCrystallized = isCrystallized;
  }

  addPlayerAvatar(playerID: number) {
    return new Cell(this.type, this.monster, this.treasure, playerID);
  }

  deletePlayerAvatar(playerID: number) {
    return new Cell(this.type, this.monster, this.treasure, -1);
  }

  toJSON() {
    return {
      type: this.type,
      monster: this.monster,
      treasure: this.treasure,
      avatar: this.avatar,
      isCrystallized: this.isCrystallized
    };
  }
}
// TODO Delete class Map implementation
/*
export class Map {
  layout: object;
  player0Position: string;
  player1Position: string;

  static toKey(x: number, y: number) {
    return `${x}x${y}`;
  }

  playerMove(xy: number[], playerID: string) {
    const [x, y] = xy;
    const key = Map.toKey(x, y);
    // Delete old cell position
    if (playerID === "0") {
      this.layout[this.player0Position] = this.layout[
        this.player0Position
      ].deletePlayerAvatar(0);
      this.player0Position = key;
    }
    if (playerID === "1") {
      this.layout[this.player1Position] = this.layout[
        this.player1Position
      ].deletePlayerAvatar(1);
      this.player1Position = key;
    }
    // Update cell
    this.layout[key] = new Cell("room").addPlayerAvatar(parseInt(playerID, 10));
    return {
      player0Position: this.player0Position,
      player1Position: this.player1Position,
      ...this.layout
    };
  }

  constructor(mapLayoutDefinition: MapDef) {
    let { player0Position, player1Position, ...map } = mapLayoutDefinition;
    // this.player0Position = mapLayoutDefinition.player0Position!;
    // this.player1Position = mapLayoutDefinition.player1Position!;
    let o = {};
    for (let k of Object.keys(map)) {
      let { type, monster, treasure, avatar } = map[k];
      o[k] = new Cell(type, monster, treasure, avatar);
    }
    this.layout = o;
  }
}
*/

export interface MapBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}
