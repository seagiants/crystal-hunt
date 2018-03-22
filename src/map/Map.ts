import { SimpleGame, GameContext, Moves, Events } from "../types";

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

  static toKey(x: number, y: number) {
    return `${x}x${y}`;
  }

  static playerMove(xy: number[]) {
    // TODO real implementation
    return {
      "0x0": new Cell("room").toJSON(),
      "1x0": new Cell("room").addPlayerAvatar(0).toJSON(),
      "1x1": new Cell("room", true).toJSON(),
      "1x2": new Cell("room").toJSON(),
      "2x2": new Cell("room").toJSON()
    };
  }

  constructor(mapLayoutDefinition: object) {
    let o = {};
    for (let k of Object.keys(mapLayoutDefinition)) {
      let { type, monster, treasure, avatar } = mapLayoutDefinition[k];
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
