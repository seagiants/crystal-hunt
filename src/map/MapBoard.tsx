import * as React from "react";
import { toKey } from "./Cell";
import { getSelectedSkillName, getSkill } from "../state/getters";
import { SkillName } from "../action/skillLib";
import { checkTarget } from "../action/Power";
import { SimpleGame, GameContext, Moves, Events } from "../types";
import CellMap from "./MapCell";

export interface MapBoardProps {
  G: SimpleGame;
  ctx: GameContext;
  moves: Moves;
  events: Events;
}

const MapBoard = (props: MapBoardProps) => {
  let isClickable: (x: number, y: number) => boolean;
  const selectedSkill: SkillName | null = getSelectedSkillName(
    props.G,
    props.ctx.currentPlayer
  );
  if (selectedSkill !== null) {
    isClickable = (x: number, y: number) =>
      checkTarget(
        getSkill(props.G, props.ctx.currentPlayer, selectedSkill),
        props.G,
        props.ctx,
        toKey(x, y)
      );
  } else {
    isClickable = (x: number, y: number) => true;
  }
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
        {xys.map(([x, y]) => {
          return (
            <CellMap
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
