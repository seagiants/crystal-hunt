import * as React from "react";
import { Skill, SkillsBoardProps, SkillProps } from "../types/index";
import { getSkillColor } from "../librairies/skillLib";

export const SkillAction = (props: SkillProps) => {
  return (
    <svg>
      <rect
        width="100"
        height="100"
        style={{ fill: getSkillColor(props.skill) }}
        stroke="black"
        onClick={e => {
          e.preventDefault();
          props.activateSkill(props.skill);
          // props.endTurn();
        }}
      />
    </svg>
  );
};

export const SkillsBoard = (props: SkillsBoardProps) => {
  return (
    <div>
      {props.G.playersContext[props.ctx.currentPlayer].skills.map((skill: Skill, idx: number) => (
        <SkillAction
          key={idx}
          activateSkill={props.moves.activateSkill}
          endTurn={props.events.endTurn}
          G={props.G}
          skill={skill}
        />
      ))}
    </div>
  );
};
