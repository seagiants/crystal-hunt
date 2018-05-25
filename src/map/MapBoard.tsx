import * as React from "react";
import { toKey } from "./Cell";
import { getSelectedActionCategory } from "../state/getters";
import MapCell from "./MapCell";
import { getActiveAction, checkActionTarget } from "../action/actionLogic";
import { MapBoardProps } from "./types";
import { ActionCategoryName } from "../action/Action";

const style = {
  width: "70%"
};

// ----- Component ----- //
const MapBoard = (props: MapBoardProps) => {
  let isClickable: (x: number, y: number) => boolean;
  const selectedAction: ActionCategoryName | null = getSelectedActionCategory(
    props.G,
    props.ctx.currentPlayer
  );
  if (selectedAction !== null && selectedAction !== undefined) {
    isClickable = (x: number, y: number) =>
      checkActionTarget(
        props.G,
        props.ctx.currentPlayer,
        getActiveAction(props.G, props.ctx.currentPlayer, selectedAction),
        toKey(x, y)
      );
  } else {
    isClickable = (x: number, y: number) => true;
  }
  const xys = Object.keys(props.G.map)
    .map(xy => xy.split("x"))
    .map(xy => xy.map(z => parseInt(z, 10)));
  return (
    <div style={style}>
      <svg
        width="600"
        height="400"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        {xys.map(([x, y]) => {
          return (
            <MapCell
              key={toKey(x, y)}
              G={props.G}
              ctx={props.ctx}
              x={x}
              y={y}
              isClickable={isClickable(x, y)}
              moves={props.moves}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default MapBoard;
