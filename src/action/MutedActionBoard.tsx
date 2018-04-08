import * as React from "react";
import { Skill } from "./type";
import { TilesBoardProps } from "../types";
import { SkillCategoryLib, SkillCategoryName } from "./skillLib";
import { getSkillByCat } from "../state/getters";

const style = {
  flexGrow: 1,
  flexShrink: 2
};

interface MutedActionTileProps {
  skill: Skill;
}

const MutedActionTile = (props: MutedActionTileProps) => {
  return (
    <svg width="130" height="130">
      <rect
        width="100"
        height="100"
        style={{
          fill: "grey"
        }}
        stroke="black"
      />
      <text x="10" y="50">
        {props.skill.name}
      </text>
    </svg>
  );
};

const MutedActionsBoard = (props: TilesBoardProps) => {
  // Render ActionTiles by Category, one for each CategoryName.
  return (
    <div style={style}>
      {Object.keys(SkillCategoryLib).map(
        (skillCategoryName: SkillCategoryName, idx: number) => {
          return (
            <MutedActionTile
              key={`ActionTile${idx}${props.playerId}`}
              skill={getSkillByCat(props.G, props.playerId, skillCategoryName)}
            />
          );
        }
      )}
    </div>
  );
};

export default MutedActionsBoard;
