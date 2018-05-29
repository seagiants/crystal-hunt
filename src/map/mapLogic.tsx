import { SimpleGame } from "../types";
import { toCoord, toKey, toPathMatrix } from "./Cell";
import { CheckName } from "../action/ability/Ability";

export const getBehindCell = (
  g: SimpleGame,
  sourceId: string,
  targetId: string
): string | null => {
  const sourceCoord = toCoord(sourceId);
  const targetCoord = toCoord(targetId);
  let behindId: string;
  // Push along x-axis
  if (sourceCoord[0] === targetCoord[0]) {
    behindId = toKey(
      targetCoord[0],
      sourceCoord[1] > targetCoord[1] ? targetCoord[1] - 1 : targetCoord[1] + 1
    );
    // Push along y-axis
  } else {
    behindId = toKey(
      sourceCoord[0] > targetCoord[0] ? targetCoord[0] - 1 : targetCoord[0] + 1,
      targetCoord[1]
    );
  }
  return g.map[behindId] !== undefined ? behindId : null;
};

// Used to recalculate pathMatrix based on checkName
export function setNewPathMatrix(
  g: SimpleGame,
  checkPath: CheckName
): SimpleGame {
  switch (checkPath) {
    case CheckName.checkMovePath:
      return { ...g, pathMatrix: toPathMatrix(g, false) };
    case CheckName.checkAttackPath:
      return { ...g, pathMatrix: toPathMatrix(g, false) };
    case CheckName.checkFlyingPath:
      return { ...g, pathMatrix: toPathMatrix(g, true) };
    case CheckName.checkPushPath:
      return { ...g, pathMatrix: toPathMatrix(g, false) };
    default:
      return g;
  }
}
