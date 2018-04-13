import * as React from "react";
import * as Mousetrap from "mousetrap";
import { getColor } from "./Skill";
import { TilesBoardProps, ActionTileProps } from "../types";
import { SkillCategoryLib, SkillCategoryName } from "./skillLib";
import { getEquipment, getSkillByCat, getActionStatus } from "../state/getters";
import { ActionTileStatus } from "./type";
import { getActiveAction } from "../state/gameLogic";

const style = {
  width: "10%"
};

const actionActivationHandler = (props: ActionTileProps) => {
  if (
    getActionStatus(props.g, props.playerID, props.category) ===
    ActionTileStatus.Avalaible
  ) {
    props.activateAction(props.skill.skillCategory);
  }
};

const clickHandler = (
  e: React.MouseEvent<SVGElement>,
  props: ActionTileProps
) => {
  e.preventDefault();
  actionActivationHandler(props);
};

// ----- Components
export const ActionTile = (props: ActionTileProps) => {
  const shortcut = props.skill.name.substring(0, 1).toLowerCase();
  console.log(shortcut);
  // Binding to keys
  Mousetrap.bind(`a ${shortcut}`, thing => {
    console.log(`shortcut ${shortcut} for action ${props.skill.name}`);
    actionActivationHandler(props);
  });
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
        {getActiveAction(props.g, props.playerID, props.category).name}
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
