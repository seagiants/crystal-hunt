import { SimpleGame } from "../types";
import { getMonsters, getAvatarPosition } from "../state/getters";
import { Avatar } from "./Avatar";
import { loadActionMonster } from "../action/actionLib";
import { checkActionTarget, triggerAction } from "../action/actionLogic";
import { setNewPathMatrix } from "../map/mapLogic";
import { CheckName } from "../action/ability/Ability";

/** Action's monsters are triggered only if current player is a valid target.
 * aka : monsters attack players only at the end of their own turn.
 */
export const triggerMonsters = (
  g: SimpleGame,
  playerId: string
): SimpleGame => {
  const monsters = getMonsters(g);
  const playerPosition = getAvatarPosition(g, playerId);
  const updatedMatrix = setNewPathMatrix(g, CheckName.checkAttackPath);
  const reducer = (tempG: SimpleGame, currentMonster: Avatar): SimpleGame => {
    const currentAction = loadActionMonster(tempG, currentMonster.id, "Attack");
    const currentMonsterId = currentMonster.id;
    if (
      checkActionTarget(
        updatedMatrix,
        currentMonster.id,
        currentAction,
        playerPosition
      )
    ) {
      return triggerAction(
        tempG,
        currentAction,
        currentMonsterId,
        playerPosition
      );
    } else {
      return tempG;
    }
  };
  const monstersTriggered = monsters.reduce(reducer, updatedMatrix);
  return monstersTriggered;
};
