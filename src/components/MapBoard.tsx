import * as React from "react";

class Cell {
  type: string; // TODO use a real type
  monster: boolean;
  treasure: boolean;

  constructor(
    type: string,
    monster: boolean = false,
    treasure: boolean = false
  ) {
    this.type = type;
  }
}

class Map {
  layout: object;

  constructor(mapLayoutDefinition: object) {
    this.layout = mapLayoutDefinition;
  }
}

const mapDef = {
  "0x0": new Cell("room"),
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
          <rect
            className="tile"
            key={toKey(x, y)}
            x={x * 40}
            y={y * 40}
            width="40"
            height="40"
            rx="10"
            ry="10"
          />
        ))}
      </svg>
    </div>
  );
};

export default MapBoard;
