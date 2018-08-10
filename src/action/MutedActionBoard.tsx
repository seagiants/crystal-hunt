import * as React from "react";
import { TilesBoardProps } from "../types";
import { Action, ActionCategoryName } from "./Action";
import { getActiveAction } from "../action/actionLogic";
import { ActionCategoryLib } from "./actionLib";

const style = {
  width: "10%"
};

interface MutedActionTileProps {
  action: Action;
}

const MutedActionTile = (props: MutedActionTileProps) => {
  return props.action !== undefined ? (
    <svg width="130" height="130">
      <rect
        width="100"
        height="100"
        style={{
          fill: "grey"
        }}
        stroke="black"
      />
      <text x="10" y="50">
        {props.action.name}
      </text>
    </svg>
  ) : null;
};

const MutedActionsBoard = (props: TilesBoardProps) => {
  // Render ActionTiles by Category, one for each CategoryName.
  return (
    <div style={style}>
      {Object.keys(ActionCategoryLib).map(
        (abilityCategoryName: ActionCategoryName, idx: number) => {
          return (
            <MutedActionTile
              key={`ActionTile${idx}${props.playerId}`}
              action={getActiveAction(
                props.G,
                props.playerId,
                abilityCategoryName
              )}
            />
          );
        }
      )}
    </div>
  );
};

export default MutedActionsBoard;
