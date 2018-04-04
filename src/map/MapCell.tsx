import { toKey, cssClass } from "./Cell";
import * as React from "react";
import { Moves, SimpleGame, GameContext } from "../types";
import { getCellType, getAvatar } from "../state/getters";
import { Avatar } from "./type";

function renderAvatar(g: SimpleGame, x: number, y: number) {
  const avatarId = g.map[toKey(x, y)].avatar;
  return avatarId !== null ? (
    <text x={x * 40 + 10} y={y * 40 + 30} fill="white">
      <title>{getAvatarDescription(getAvatar(g, avatarId))}</title>
      {g.map[toKey(x, y)].avatar}
    </text>
  ) : null;
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

const MapCell = (props: {
  G: SimpleGame;
  ctx: GameContext;
  x: number;
  y: number;
  isClickable: boolean;
  moves: Moves;
}) => {
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

export default MapCell;
