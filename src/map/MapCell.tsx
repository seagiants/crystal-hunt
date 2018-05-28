import { toKey, CellTypeName } from "./Cell";
import * as React from "react";
import { SimpleGame } from "../types";
import { getCellType, getCrystallized, getAvatar } from "../state/getters";
import { MapCellProps, PathMatrix } from "./types";
import { AvatarTypeName } from "../avatar/Avatar";

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
    const avatar = getAvatar(g, avatarId);
    const computedPoints = `${x * 40 + 20},${y * 40 + 2} ${x * 40 + 2},${y *
      40 +
      38} ${x * 40 + 38},${y * 40 + 38}`;
    const text =
      avatar.type === AvatarTypeName.Player
        ? avatarId
        : avatar.caracs.healthCurrent;
    const textColor = avatar.type === AvatarTypeName.Player ? "black" : "red";
    return (
      <g>
        <polygon points={computedPoints} fill={getAvatarColor(avatarId)} />
        <text x={x * 40 + 15} y={y * 40 + 35} fill={textColor}>
          {text}
        </text>
      </g>
    );
  } else {
    return null;
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

const clickHandler = (e: React.MouseEvent<SVGElement>, props: MapCellProps) => {
  if (props.isClickable) {
    e.preventDefault();
    props.moves.activateCell([props.x, props.y]);
  } else {
    e.preventDefault();
  }
};

// ----- Cell component ----- //
const MapCell = (props: MapCellProps) => {
  return (
    <g key={toKey(props.x, props.y)}>
      <rect
        onClick={e => clickHandler(e, props)}
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
        props.G.pathMatrix,
        props.ctx.currentPlayer
      )}
    </g>
  );
};

export default MapCell;
