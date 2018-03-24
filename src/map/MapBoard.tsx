import * as React from "react";
import { Cell, MapBoardProps } from "./Cell";

const MapBoard = (props: MapBoardProps) => {
  //  const simpleMap = new Map(props.G.map);
  const xys = Object.keys(props.G.map)
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
          <g key={Cell.toKey(x, y)}>
            <rect
              onClick={e => {
                e.preventDefault();
                props.moves.activateCell([x, y]);
                // props.events.endTurn();
              }}
              className={"Cell " + props.G.map[Cell.toKey(x, y)].type}
              x={x * 40}
              y={y * 40}
              width="40"
              height="40"
              rx="10"
              ry="10"
            />
            {props.G.map[Cell.toKey(x, y)].avatar !== -1 ? (
              <text x={x * 40 + 10} y={y * 40 + 30} fill="white">
                {props.G.map[Cell.toKey(x, y)].avatar}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default MapBoard;
