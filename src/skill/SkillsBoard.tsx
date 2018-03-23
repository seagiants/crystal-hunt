import * as React from "react";
import { Skill, SkillTemplate, SkillsBoardProps, SkillProps } from "./Skill";

export const SkillAction = (props: SkillProps) => {
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
      {props.G.playersContext[props.ctx.currentPlayer].skills.map(
        (skill: SkillTemplate, idx: number) => (
          <SkillAction
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
