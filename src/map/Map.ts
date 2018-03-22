import { SimpleGame, GameContext, Moves, Events } from "../types";
import { MapDef } from "./mapDefinitions";

export class Cell {
  type: string; // TODO use a real type
  monster: boolean;
  treasure: boolean;
  avatar: number;

  constructor(
    type: string,
    monster: boolean = false,
    treasure: boolean = false,
    playerAvatar: number = -1
  ) {
    this.type = type;
    this.monster = monster;
    this.treasure = treasure;
    this.avatar = playerAvatar;
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
      avatar: this.avatar
    };
  }
}

export class Map {
  layout: object;
  playerOnePosition: string;
  playerTwoPosition: string;

  static toKey(x: number, y: number) {
    return `${x}x${y}`;
  }

  playerMove(xy: number[], playerID: string) {
    const [x, y] = xy;
    const key = Map.toKey(x, y);
    // Delete old cell position
    if (playerID === "0") {
      this.layout[this.playerOnePosition] = this.layout[
        this.playerOnePosition
      ].deletePlayerAvatar(0);
      this.playerOnePosition = key;
    }
    if (playerID === "1") {
      this.layout[this.playerTwoPosition] = this.layout[
        this.playerTwoPosition
      ].deletePlayerAvatar(1);
      this.playerTwoPosition = key;
    }
    // Update cell
    this.layout[key] = new Cell("room").addPlayerAvatar(parseInt(playerID, 10));
    return {
      playerOnePosition: this.playerOnePosition,
      playerTwoPosition: this.playerTwoPosition,
      ...this.layout
    };
  }

  constructor(mapLayoutDefinition: MapDef) {
    let { playerOnePosition, playerTwoPosition, ...map } = mapLayoutDefinition;
    this.playerOnePosition = <string>playerOnePosition;
    this.playerTwoPosition = <string>playerTwoPosition;
    let o = {};
    for (let k of Object.keys(map)) {
      let { type, monster, treasure, avatar } = map[k];
      o[k] = new Cell(type, monster, treasure, avatar);
    }
    this.layout = o;
  }
}

export interface MapBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}
