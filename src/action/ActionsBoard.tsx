import * as React from "react";
import { getColor } from "./Skill";
import { ActionsBoardProps, ActionProps } from "../types";
import { Skill } from "./type";

export const PlayerAction = (props: ActionProps) => {
  return (
    <svg>
      <rect
        width="100"
        height="100"
        style={{ fill: getColor(props.skill) }}
        stroke="black"
        onClick={e => {
          e.preventDefault();
          props.activateSkill(props.skill.name);
          // props.endTurn();
        }}
      />
    </svg>
  );
};

export const ActionsBoard = (props: ActionsBoardProps) => {
  return (
    <div>
      {props.G.playersContext[props.ctx.currentPlayer].skills.map(
        (skill: Skill, idx: number) => (
          <PlayerAction
            key={idx}
            activateSkill={props.moves.activateSkill}
            endTurn={props.events.endTurn}
            G={props.G}
            skill={skill}
          />
        )
      )}
    </div>
  );
};
