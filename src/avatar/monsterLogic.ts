import { SimpleGame } from "../types";
import { getMonsters, getAvatarPosition } from "../state/getters";
import { Avatar } from "./Avatar";
import { loadActionMonster } from "../action/actionLib";
import { checkActionTarget, triggerAction } from "../action/actionLogic";
import { setNewPathMatrix } from "../map/mapLogic";
import { CheckName } from "../action/ability/Ability";
import { getAllActions, setActions } from "../action/actionStateHandling";

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

export function cleanDeadMonsters(g: SimpleGame): SimpleGame {
  const deadMonsters: Array<Avatar> = g.avatars.filter(avatar => {
    return avatar.type === "Monster" && avatar.caracs.healthCurrent < 1;
  });
  let tempG = { ...g };
  deadMonsters.forEach((avatar: Avatar) => {
    tempG = {
      ...tempG,
      map: {
        ...tempG.map,
        [avatar.position]: {
          ...tempG.map[avatar.position],
          avatar: null
        }
      }
    };
  });
  const notOnCellAnymore = tempG;
  // Clean dead monsters from Avatars.
  const noDeadOnAvatars: SimpleGame = {
    ...notOnCellAnymore,
    avatars: notOnCellAnymore.avatars.filter(
      avatar => avatar.caracs.healthCurrent > 0 || avatar.type === "Player"
    )
  };
  const Ids = deadMonsters.map(current => current.id);
  const reducer = (
    currentG: SimpleGame,
    currentPlayerId: string,
    deadMonsterIds: Array<string>
  ): SimpleGame => {
    const actions = getAllActions(currentG, currentPlayerId).filter(
      currentAction => {
        return (
          deadMonsterIds.indexOf(currentAction.avatarId) < 0 &&
          (currentAction.autoTarget !== undefined
            ? deadMonsterIds.indexOf(currentAction.autoTarget!) < 0
            : true)
        );
      }
    );
    const actionsCleaned = setActions(currentG, currentPlayerId, actions);
    return actionsCleaned;
  };
  const triggerOnDeadsCleaned = Object.keys(g.players).reduce(
    (currentG, currentValue) => reducer(currentG, currentValue, Ids),
    {
      ...noDeadOnAvatars
    }
  );
  return triggerOnDeadsCleaned;
}

export function generateMonsterId(g: SimpleGame, monsterName: string) {
  return `M${g.monsterCounter + 1}`;
}
