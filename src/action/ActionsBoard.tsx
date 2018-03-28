import * as React from "react";
import { getColor } from "./Skill";
import { TilesBoardProps, ActionTileProps } from "../types";
import { SkillCategoryLib, SkillCategoryName } from "./skillLib";
import { getEquipment, getSkillByCat } from "../state/getters";

export const ActionTile = (props: ActionTileProps) => {
  return (
    <svg width="130" height="130">
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
      <text x="10" y="50">
        {props.skill.name}
      </text>
    </svg>
  );
};

export const ActionsBoard = (props: TilesBoardProps) => {
  // Render ActionTiles by Category, one for each CategoryName.      
  return (
    <div>
      {Object.keys(SkillCategoryLib).map(
        (skillCategoryName: SkillCategoryName, idx: number) => {
          return (
            <ActionTile
              key={`ActionTile${idx}${props.playerId}`}
              activateSkill={props.moves.activateSkill}
              endTurn={props.events.endTurn}              
              category={skillCategoryName}
              skill={getSkillByCat(props.G, props.playerId, skillCategoryName)}
              equipment={getEquipment(
                props.G,
                props.playerId,
                skillCategoryName
              )}
            />
          );
        }
      )}
    </div>
  );
};
