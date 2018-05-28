import { AbilityChecker, MoveCaracs, CheckName, AttackCaracs } from "./Ability";
import { SimpleGame } from "../../types";
import { getAvatarOnCell, getAvatarPosition } from "../../state/getters";
import { findPath, toCoord } from "../../map/Cell";
import { Caracs } from "../Action";

export const hasAvatar: AbilityChecker = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: MoveCaracs
): boolean => {
  return getAvatarOnCell(g, targetId) !== null;
};

const setMatrixNewValue = (
  matrix: number[][],
  coords: [number, number],
  newValue: 0 | 1
): number[][] => {
  return matrix.map((Xs, yCurrent) => {
    return Xs.map(
      (currentValue, xCurrent) =>
        xCurrent === coords[0] && yCurrent === coords[1]
          ? newValue
          : currentValue
    );
  });
};

// Finding a path with target cell free
export const checkMovePath: AbilityChecker = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: MoveCaracs
): boolean => {
  // Target cell needs to be emtpy.
  if (getAvatarOnCell(g, targetId) !== null) {
    return false;
  }
  // Checking path with default path matrix.
  const path = findPath(
    g.pathMatrix,
    toCoord(getAvatarPosition(g, avatarId)),
    toCoord(targetId)
  );
  // Path contains starting position.
  return path.length !== 0 && path.length <= caracs.moveRange + 1;
};
// TODO : Optimize, pathMatrix is re-calculated for each cell checked...
// Finding a path with target cell occupied
export const checkAttackPath: AbilityChecker = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: AttackCaracs
): boolean => {
  // AttackPath needs a valid target on cell.
  if (getAvatarOnCell(g, targetId) === null) {
    return false;
  }
  // Set target cell not a wall
  const path = findPath(
    setMatrixNewValue(g.pathMatrix, toCoord(targetId), 0),
    toCoord(getAvatarPosition(g, avatarId)),
    toCoord(targetId)
  );
  // Path contains starting position.
  return path.length !== 0 && path.length <= caracs.attackRange + 1;
};

// Finding path without checking target (could be free or occupied)
export const checkPushPath: AbilityChecker = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: MoveCaracs
): boolean => {
  // Set target cell not a wall
  const path = findPath(
    setMatrixNewValue(g.pathMatrix, toCoord(targetId), 0),
    toCoord(getAvatarPosition(g, avatarId)),
    toCoord(targetId)
  );
  // Path contains starting position.
  return path.length !== 0 && path.length <= caracs.moveRange + 1;
};

// Finding path without checking target (could be free or occupied)
export const checkFlyingPath: AbilityChecker = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: MoveCaracs
): boolean => {
  // Target cell needs to be emtpy.
  if (getAvatarOnCell(g, targetId) !== null) {
    return false;
  }
  const path = findPath(
    g.pathMatrix,
    toCoord(getAvatarPosition(g, avatarId)),
    toCoord(targetId)
  );
  // Path contains starting position.
  return path.length !== 0 && path.length <= caracs.moveRange + 1;
};

export const isEmpty: AbilityChecker = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: Caracs
) => {
  return getAvatarOnCell(g, targetId) === null;
};

export function loadAbilityChecker(checkName: CheckName): AbilityChecker {
  switch (checkName) {
    case CheckName.isEmpty:
      return isEmpty;
    case CheckName.hasAvatar:
      return hasAvatar;
    case CheckName.checkMovePath:
      return checkMovePath;
    case CheckName.checkAttackPath:
      return checkAttackPath;
    case CheckName.checkPushPath:
      return checkPushPath;
    case CheckName.checkFlyingPath:
      return checkFlyingPath;
    default:
      console.log(
        "Ability Checker : " + checkName + " not plugged or implemented"
      );
      return () => true;
  }
}
