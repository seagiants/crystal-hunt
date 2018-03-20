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
}

export class Map {
    layout: object;

    constructor(mapLayoutDefinition: object) {
        this.layout = mapLayoutDefinition;
    }
}

export interface MapBoardProps {
    G: SimpleGame;
    ctx: GameContext;
    moves: Moves;
    events: Events;
}