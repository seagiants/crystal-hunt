import { AbilityChecker, MoveCaracs, CheckName } from "./Ability";
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

// Finding a path with target cell free
export const checkMovePath: AbilityChecker = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: MoveCaracs
): boolean => {
  if (g.pathMatrix !== null && getAvatarOnCell(g, targetId) === null) {
    const path = findPath(
      g.pathMatrix,
      toCoord(getAvatarPosition(g, avatarId)),
      toCoord(targetId)
    );
    // Path contains starting position.
    return path.length !== 0 && path.length <= caracs.moveRange + 1;
  } else {
    return false;
  }
};

// Finding a path with target cell occupied
export const checkAttackPath: AbilityChecker = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: MoveCaracs
): boolean => {
  if (g.pathMatrix !== null && getAvatarOnCell(g, targetId) !== null) {
    const path = findPath(
      g.pathMatrix,
      toCoord(getAvatarPosition(g, avatarId)),
      toCoord(targetId)
    );
    // Path contains starting position.
    return path.length !== 0 && path.length <= caracs.attackRange + 1;
  } else {
    return false;
  }
};

// Finding path without checking target (could be free or occupied)
export const checkPushPath: AbilityChecker = (
  g: SimpleGame,
  avatarId: string,
  targetId: string,
  caracs: MoveCaracs
): boolean => {
  if (g.pathMatrix !== null) {
    const path = findPath(
      g.pathMatrix,
      toCoord(getAvatarPosition(g, avatarId)),
      toCoord(targetId)
    );
    // Path contains starting position.
    return path.length !== 0 && path.length <= caracs.moveRange + 1;
  } else {
    return false;
  }
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
    default:
      console.log(
        "Ability Checker : " + checkName + " not plugged or implemented"
      );
      return () => true;
  }
}
