import * as React from "react";
import { Cell, MapBoardProps } from "./Cell";
import { getSelectedSkillName, getSkill } from "../state/getters";
import { SkillName } from "../action/skillLib";
import { checkTarget } from "../action/Power";

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
        Cell.toKey(x, y)
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
            <g key={Cell.toKey(x, y)}>
              <rect
                onClick={
                  isClickable(x, y)
                    ? e => {
                        e.preventDefault();
                        props.moves.activateCell([x, y]);
                        // props.events.endTurn();
                      }
                    : e => {
                        e.preventDefault();
                      }
                }
                className={Cell.cssClass(
                  props.G,
                  props.ctx,
                  x,
                  y,
                  isClickable(x, y)
                )}
                x={x * 40}
                y={y * 40}
                width="40"
                height="40"
                rx="10"
                ry="10"
              />
              {props.G.map[Cell.toKey(x, y)].avatar !== -1 ? (
                <text x={x * 40 + 10} y={y * 40 + 30} fill="white">
                  {props.G.map[Cell.toKey(x, y)].avatar}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default MapBoard;
