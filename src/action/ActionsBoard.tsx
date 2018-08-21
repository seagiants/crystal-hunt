import * as React from "react";
import * as Mousetrap from "mousetrap";

import { TilesBoardProps, SimpleGame } from "../types";
import { getActiveAction, getActionColor } from "../action/actionLogic";
import {
  Action,
  ActionCategoryName,
  ActionTileStatus,
  ActionTypeName
} from "./Action";
import { ActionCategoryLib } from "./actionLib";
import { getActionStatus } from "./actionStateHandling";

const style = {
  width: "10%"
};

export interface ActionTileProps {
  g: SimpleGame;
  action: Action;
  status: ActionTileStatus;
  category: ActionCategoryName;
  playerID: string;
  activateAction(categoryName: string): object;
  endTurn(): object;
}

const actionActivationHandler = (props: ActionTileProps) => {
  if (
    getActionStatus(props.g, props.playerID, props.category) ===
    ActionTileStatus.Available
  ) {
    props.activateAction(props.action.abilityCategory);
  }
};

const clickHandler = (
  e: React.MouseEvent<SVGElement>,
  props: ActionTileProps
) => {
  e.preventDefault();
  actionActivationHandler(props);
};

// ----- Components
export const ActionTile = (props: ActionTileProps) => {
  const shortcut =
    props.action !== undefined
      ? props.action.name.substring(0, 1).toLowerCase()
      : "";
  // console.log(shortcut);
  // Binding to keys
  Mousetrap.bind(`a ${shortcut}`, thing => {
    console.log(`shortcut ${shortcut} for action ${props.action.name}`);
    actionActivationHandler(props);
  });
  return (
    <svg width="130" height="130">
      <rect
        width="100"
        height="100"
        style={{
          fill: getActionColor(
            props.action,
            getActionStatus(props.g, props.playerID, props.category)
          )
        }}
        stroke="black"
        onClick={e => clickHandler(e, props)}
      />
      <text x="10" y="50">
        {props.action.name}
      </text>
      <text x="5" y="70">
        {props.action.cardType === ActionTypeName.Spell
          ? "charge:" + props.action.charge
          : ""}
      </text>
    </svg>
  );
};

export const ActionsBoard = (props: TilesBoardProps) => {
  // Render ActionTiles by Category, one for each CategoryName.
  return (
    <div style={style}>
      {Object.keys(ActionCategoryLib).map(
        (abilityCategoryName: ActionCategoryName, idx: number) => {
          return getActiveAction(
            props.G,
            props.playerId,
            abilityCategoryName
          ) !== undefined ? (
            <ActionTile
              key={`ActionTile${idx}${props.playerId}`}
              g={props.G}
              activateAction={props.moves.activateAction}
              endTurn={props.events.endTurn}
              category={abilityCategoryName}
              playerID={props.playerId}
              action={getActiveAction(
                props.G,
                props.playerId,
                abilityCategoryName
              )}
              status={getActionStatus(
                props.G,
                props.playerId,
                abilityCategoryName
              )}
            />
          ) : null;
        }
      )}
    </div>
  );
};
