import { toKey, cssClass } from "./Cell";
import * as React from "react";
import { Moves, SimpleGame, GameContext } from "../types";
import { getCellType } from "../state/getters";

const CellMap = (props: {
  G: SimpleGame;
  ctx: GameContext;
  x: number;
  y: number;
  isClickable: boolean;
  moves: Moves;
}) => {
  /*
  console.log("Cell init");
  console.log(props.x + ":" + props.y);
  console.log(props.isClickable);
  */
  return (
    <g key={toKey(props.x, props.y)}>
      <rect
        onClick={
          props.isClickable
            ? e => {
                e.preventDefault();
                props.moves.activateCell([props.x, props.y]);
                // props.events.endTurn();
              }
            : e => {
                e.preventDefault();
              }
        }
        className={cssClass(
          props.G,
          props.ctx,
          props.x,
          props.y,
          props.isClickable
        )}
        x={props.x * 40}
        y={props.y * 40}
        width="40"
        height="40"
        rx="10"
        ry="10"
      >
        {getCellType(props.G, toKey(props.x, props.y)) ===
        "BlackCrystalCell" ? (
          <title>This is the fucking black crystal !!</title>
        ) : null}
        }
      </rect>
      {renderAvatar(props.G, props.x, props.y)}
    </g>
  );
};

function renderAvatar(g: SimpleGame, x: number, y: number) {
  return g.map[toKey(x, y)].avatar !== null ? (
    <text x={x * 40 + 10} y={y * 40 + 30} fill="white">
      {g.map[toKey(x, y)].avatar}
    </text>
  ) : null;
}

export default CellMap;
