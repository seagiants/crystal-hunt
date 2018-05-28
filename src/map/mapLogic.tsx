import { SimpleGame } from "../types";
import { toCoord, toKey } from "./Cell";

export const getBehindCell = (
  g: SimpleGame,
  sourceId: string,
  targetId: string
): string | null => {
  const sourceCoord = toCoord(sourceId);
  console.log(sourceCoord);

  const targetCoord = toCoord(targetId);
  console.log(targetCoord);

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
