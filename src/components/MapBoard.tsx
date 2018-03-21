import * as React from "react";

class Cell {
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

class Map {
  layout: object;

  constructor(mapLayoutDefinition: object) {
    this.layout = mapLayoutDefinition;
  }
}

const mapDef = {
  "0x0": new Cell("room").addPlayerAvatar(0),
  "1x0": new Cell("room"),
  "1x1": new Cell("room", true),
  "1x2": new Cell("room"),
  "2x2": new Cell("room")
};

const toKey = (x: number, y: number) => `${x}x${y}`;

const simpleMap = new Map(mapDef);

const MapBoard = (props: object) => {
  const xys = Object.keys(simpleMap.layout)
    .map(xy => xy.split("x"))
    .map(xy => xy.map(z => parseInt(z, 10)));
  return (
    <div>
      <svg
        width="200"
        height="200"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        {xys.map(([x, y]) => (
          <g key={toKey(x, y)}>
            <rect
              onClick={e => {
                e.preventDefault();
                console.dir(simpleMap.layout[toKey(x, y)]);
              }}
              className="tile"
              x={x * 40}
              y={y * 40}
              width="40"
              height="40"
              rx="10"
              ry="10"
            />
            {simpleMap.layout[toKey(x, y)].avatar === 0 ? (
              <text x={x * 40 + 10} y={y * 40 + 30} fill="yellow">
                P
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default MapBoard;
