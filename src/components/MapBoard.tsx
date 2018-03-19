import * as React from "react";

class Cell {
  type: string; // TODO use a real type

  constructor(type: string) {
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
  "0x0": new Cell("room")
};

const simpleMap = new Map(mapDef);

const MapBoard = (props: object) => {
  const xys = Object.keys(simpleMap.layout)
    .map(xy => xy.split("x"))
    .map(xy => xy.map(z => parseInt(z, 10)));
  return (
    <div>
      {xys.map(([x, y]) => (
        <div key={`${x}-${y}`}>
          {x} - {y}
        </div>
      ))}
    </div>
  );
};

export default MapBoard;
