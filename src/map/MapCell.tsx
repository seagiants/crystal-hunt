import { toKey, cssClass, findPath } from "./Cell";
import * as React from "react";
import { SimpleGame, CellProps } from "../types";
import { getCellType, getAvatar } from "../state/getters";
import { Avatar, PathMatrix } from "./type";

const MapCell = (props: CellProps) => {
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
      {renderAvatar(props.G, props.x, props.y, props.pathMatrix)}
    </g>
  );
};

function renderAvatar(g: SimpleGame, x: number, y: number, matrix: PathMatrix) {
  const avatarId = g.map[toKey(x, y)].avatar;
  const path = findPath(matrix, [0, 0], [x, y]);
  console.log(x + ":" + y);
  console.log(path);
  return avatarId !== null ? (
    <text x={x * 40 + 10} y={y * 40 + 30} fill="white">
      <title>{getAvatarDescription(getAvatar(g, avatarId))}</title>
      {g.map[toKey(x, y)].avatar}
    </text>
  ) : (
    <text x={x * 40 + 10} y={y * 40 + 30} fill="blue">
      <title>{`${x}:${y}`}</title>
      {path.length - 1}
    </text>
  );
}

function getAvatarDescription(avatar: Avatar): string {
  switch (avatar.type) {
    case "Monster":
      return (
        "There's a monster there with " +
        avatar.caracs.healthCurrent +
        "HP ! Run you fool !"
      );
    case "Player":
      return "A fool";
    default:
      return "";
  }
}

export default MapCell;
