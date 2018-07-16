import { toKey, CellTypeName } from "./Cell";
import * as React from "react";
import { SimpleGame } from "../types";
import { getCellType, getCrystallized, getAvatar } from "../state/getters";
import { MapCellProps, PathMatrix } from "./types";
import { AvatarTypeName, KlassName } from "../avatar/Avatar";

// ----- Utility functions ----- //
const getAvatarImage = (klass: string) => {
  switch (klass) {
    case KlassName.Mage:
      return "http://pixelartmaker.com/art/14e16d5f73516e6.png";
    case KlassName.Warrior:
      return "http://www.nonadecimal.com/staging/SJW/paladin.png";
    case KlassName.Assassin:
      // tslint:disable-next-line:max-line-length
      return "https://orig00.deviantart.net/ab25/f/2014/330/6/9/pixel_art_raffle_sprite_ezio_from_assassin_s_creed_by_justingamedesign-d87t8nl.png";
    default:
      return "https://us.v-cdn.net/5022341/uploads/editor/ig/c4fkmp1vhsqq.png";
  }
};

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
    computedPoints.toString();
    return (
      <g>
        <text x={x * 40 + 35} y={y * 40} fill={textColor}>
          {text}
        </text>
        <image
          xlinkHref={getAvatarImage(avatar.klass)}
          x={x * 40}
          y={y * 40}
          height="40px"
          width="40px"
        />
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
    <g key={toKey(props.x, props.y)} onClick={e => clickHandler(e, props)}>
      <rect
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
