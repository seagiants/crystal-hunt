import { toKey, CellTypeName, findPath, toCoord } from "./Cell";
import * as React from "react";
import { SimpleGame } from "../types";
import {
  getCellType,
  getCrystallized,
  getAvatarPosition
} from "../state/getters";
import { MapCellProps, PathMatrix } from "./types";

// ----- Utility functions ----- //
/* const getAvatarDescription = (avatar: Avatar): string => {
  switch (avatar.type) {
    case "Monster":
      return `A monster here with ${
        avatar.caracs.healthCurrent
      } HP! Run, you fool!`;
    case "Player":
      return "A fool";
    default:
      return "";
  }
};
*/

const cssClass = (
  g: SimpleGame,
  x: number,
  y: number,
  isClickable: boolean
) => {
  // [Not]Clickable css class
  const clickableClass: string = isClickable
    ? "CellClickable "
    : "CellNotClickable ";
  // Type Class : Crystallized or CellType
  const typeClass: string = getCrystallized(g, toKey(x, y))
    ? "CrystallizedCell "
    : getCellType(g, toKey(x, y));
  return clickableClass + typeClass;
};

const renderAvatar = (
  g: SimpleGame,
  x: number,
  y: number,
  matrix: PathMatrix,
  playerId: string
) => {
  const avatarId = g.map[toKey(x, y)].avatar;
  const getAvatarColor = (id: string) => {
    if (id === "0") {
      return "purple";
    } else if (id === "1") {
      return "cyan";
    } else {
      return "silver";
    }
  };
  if (avatarId !== null) {
    const computedPoints = `${x * 40 + 20},${y * 40 + 2} ${x * 40 + 2},${y *
      40 +
      38} ${x * 40 + 38},${y * 40 + 38}`;
    return <polygon points={computedPoints} fill={getAvatarColor(avatarId)} />;
  } else {
    return (
      <text x={x * 40 + 10} y={y * 40 + 30} fill="white">
        {findPath(matrix, toCoord(getAvatarPosition(g, playerId)), [x, y])
          .length - 1}
      </text>
    );
  }
};

const blackCrystalText = (G: SimpleGame, x: number, y: number) => {
  if (getCellType(G, toKey(x, y)) === CellTypeName.BlackCrystalCell) {
    return (
      <title>A rare crystal infused with some powerful black magic...</title>
    );
  } else {
    return null;
  }
};

// ----- Cell component ----- //
const MapCell = (props: MapCellProps) => {
  return (
    <g key={toKey(props.x, props.y)}>
      <rect
        onClick={
          props.isClickable
            ? e => {
                e.preventDefault();
                props.moves.activateCell([props.x, props.y]);
              }
            : e => {
                e.preventDefault();
              }
        }
        className={cssClass(props.G, props.x, props.y, props.isClickable)}
        x={props.x * 40}
        y={props.y * 40}
        width="40"
        height="40"
        rx="10"
        ry="10"
      >
        {blackCrystalText(props.G, props.x, props.y)}
        }
      </rect>
      {renderAvatar(
        props.G,
        props.x,
        props.y,
        props.pathMatrix,
        props.ctx.currentPlayer
      )}
    </g>
  );
};

export default MapCell;
