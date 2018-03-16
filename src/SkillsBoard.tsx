import * as React from "react";
import { SkillProps, SkillsBoardProps } from "./types/index";

export const Skill = (props: SkillProps) => {
  return (
    <svg>
      <rect
        width="100"
        height="100"
        stroke="black"
        onClick={e => {
          e.preventDefault();
          props.activateSkill(props.skill);
          props.endTurn();
        }}
      />
    </svg>
  );
};

export const SkillsBoard = (props: SkillsBoardProps) => {
  return (
    <div>
      {props.G.skills.map((skill: string, idx: number) => (
        <Skill
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
