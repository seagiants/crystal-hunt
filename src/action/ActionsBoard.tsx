import * as React from "react";
import { getColor } from "./Skill";
import { TilesBoardProps, ActionTileProps } from "../types";
import { SkillCategoryLib, SkillCategoryName } from "./skillLib";
import { getEquipment, getSkillByCat, getActionStatus } from "../state/getters";
import { ActionTileStatus } from "./type";

const style = {
  flexGrow: 1,
  flexShrink: 2
};

const clickHandler = (e: React.MouseEvent<SVGElement>, props: ActionTileProps) => {
  console.dir(e);
  console.dir(props);
  if (getActionStatus(props.g, props.playerID, props.category) !== ActionTileStatus.Exhausted) {
    e.preventDefault();
    props.activateAction(props.skill.skillCategory);
  } else {
    e.preventDefault();
  }  
};

// ----- Components
export const ActionTile = (props: ActionTileProps) => {
  return (
    <svg width="130" height="130">
      <rect
        width="100"
        height="100"
        style={{
          fill: getColor(
            props.skill,
            getActionStatus(props.g, props.playerID, props.category)
          )
        }}
        stroke="black"
        onClick={e => clickHandler(e, props)}
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
    <div style={style}>
      {Object.keys(SkillCategoryLib).map(
        (skillCategoryName: SkillCategoryName, idx: number) => {
          return (
            <ActionTile
              key={`ActionTile${idx}${props.playerId}`}
              g={props.G}
              activateAction={props.moves.activateAction}
              endTurn={props.events.endTurn}
              category={skillCategoryName}
              playerID={props.playerId}
              skill={getSkillByCat(props.G, props.playerId, skillCategoryName)}
              equipment={getEquipment(
                props.G,
                props.playerId,
                skillCategoryName
              )}
              status={getActionStatus(
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
