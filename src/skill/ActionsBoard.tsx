import * as React from "react";
import { Skill, SkillJSON } from "./Skill";
import { ActionsBoardProps, ActionProps } from "../types";

export const PlayerAction = (props: ActionProps) => {
  const skill = new Skill(props.skill);
  return (
    <svg>
      <rect
        width="100"
        height="100"
        style={{ fill: skill.getColor() }}
        stroke="black"
        onClick={e => {
          e.preventDefault();
          props.activateSkill(skill.name);
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
        (skill: SkillJSON, idx: number) => (
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
