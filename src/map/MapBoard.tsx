import * as React from "react";
import { Map, MapBoardProps } from "./Map";

const MapBoard = (props: MapBoardProps) => {
  const simpleMap = new Map(props.G.map);
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
          <g key={Map.toKey(x, y)}>
            <rect
              onClick={e => {
                e.preventDefault();
                props.moves.activateCell([x, y]);
                props.events.endTurn();
              }}
              className="tile"
              x={x * 40}
              y={y * 40}
              width="40"
              height="40"
              rx="10"
              ry="10"
            />
            {simpleMap.layout[Map.toKey(x, y)].avatar !== -1 ? (
              <text x={x * 40 + 10} y={y * 40 + 30} fill="yellow">
                {simpleMap.layout[Map.toKey(x, y)].avatar}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default MapBoard;
