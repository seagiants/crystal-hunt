import {
  AbilityReducer,
  AbilityChecker,
  Ability,
  AbilityTypeName,
  MoveCaracs,
  AttackCaracs,
  DrawCaracs
} from "./Ability";
import {
  Caracs,
  ActionTemplate,
  CardTypeName,
  ActionCategoryName
} from "../../action/Action";
import { SimpleGame } from "../../types";
import { findPath, toCoord, toKey } from "../../map/Cell";
import {
  getAvatarPosition,
  getAvatarOnCell,
  getCrystallized,
  getCategories,
  getCell
} from "../../state/getters";
import {
  checkTraps,
  damage,
  heal,
  summon,
  refreshAction
} from "../../state/gameLogic";
import {
  setAvatarPosition,
  setCellCrystallize,
  setIsTrapped
} from "../../state/setters";
import { draw } from "../../cards/cardLogic";
import {
  loadActionFromTemplate,
  getAllActions,
  setActions
} from "../actionStateHandling";
import { setNewAction } from "../actionLogic";

export const AbilityLib: {
  [key in string]: {
    ability: Ability;
    power: AbilityReducer;
    check: AbilityChecker;
  }
} = {
  Move: {
    ability: {
      id: "Move",
      isTargetRequired: true,
      abilityType: AbilityTypeName.Physical
    },
    power: (
      g: SimpleGame,
      avatarId: string,
      targetCellId: string,
      caracs: Caracs
    ): SimpleGame => {
      console.log("Try to move");
      const path = findPath(
        g.pathMatrix,
        toCoord(getAvatarPosition(g, avatarId)),
        toCoord(targetCellId)
      );
      // Trigger traps on the way.
      const trapsTriggered = checkTraps(g, avatarId, path);
      // Move the avatar.
      const avatarMoved = setAvatarPosition(
        trapsTriggered,
        avatarId,
        targetCellId
      );
      return avatarMoved;
    },
    check: (
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
    }
  },
  Crystallize: {
    ability: {
      id: "Crystallize",
      isTargetRequired: false,
      abilityType: AbilityTypeName.Magical
    },
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ) => {
      const playerCell = getAvatarPosition(g, avatarId);
      const crystallizedCell: SimpleGame = setCellCrystallize(
        g,
        playerCell,
        true
      );
      return crystallizedCell;
    },
    check: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ): boolean => {
      return true;
    }
  },
  Attack: {
    ability: {
      id: "Attack",
      isTargetRequired: true,
      abilityType: AbilityTypeName.Physical
    },
    // Diminish caracs.healthInit target based on caracs.attackValue
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: AttackCaracs
    ) => {
      const avatar = getAvatarOnCell(g, targetId);
      return avatar !== null ? damage(g, avatar, caracs.attackValue) : g;
    },
    // Check if there's an avatar on cell and it's not the current player's one.
    check: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ): boolean => {
      const avatar = getAvatarOnCell(g, targetId);
      const path = findPath(
        g.pathMatrix,
        toCoord(getAvatarPosition(g, avatarId)),
        toCoord(targetId)
      );
      return (
        avatar !== null &&
        avatar.toString() !== avatarId &&
        path.length !== 0 &&
        path.length < caracs.attackRange + 2
      );
    }
  },
  CircularAttack: {
    ability: {
      id: "CircularAttack",
      isTargetRequired: false,
      abilityType: AbilityTypeName.Physical
    },
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: AttackCaracs
    ) => {
      const currentMonsterPosition: string = getAvatarPosition(g, avatarId);
      const xy = currentMonsterPosition.split("x");
      // TODO : Make it in a cleaner way
      let neighbourCell: Array<string> = [];
      neighbourCell.push(toKey(parseInt(xy[0], 10), parseInt(xy[1], 10) + 1));
      neighbourCell.push(toKey(parseInt(xy[0], 10), parseInt(xy[1], 10) - 1));
      neighbourCell.push(toKey(parseInt(xy[0], 10) + 1, parseInt(xy[1], 10)));
      neighbourCell.push(toKey(parseInt(xy[0], 10) - 1, parseInt(xy[1], 10)));
      const neighbourCellsAttacked = neighbourCell.reduce(
        (prevG, currCellId) => {
          if (
            getCell(prevG, currCellId) !== undefined &&
            getAvatarOnCell(prevG, currCellId) !== null
          ) {
            console.log("Avatar " + avatarId + " is attacking " + currCellId);
            return loadAbilityReducer("Attack")(
              prevG,
              avatarId,
              currCellId,
              caracs
            );
          } else {
            return prevG;
          }
        },
        { ...g }
      );
      return neighbourCellsAttacked;
    },
    check: (g: SimpleGame) => true
  },
  Draw: {
    ability: {
      id: "Draw",
      isTargetRequired: false,
      abilityType: AbilityTypeName.Physical
    },
    power: (
      g: SimpleGame,
      playerId: string,
      targetId: string,
      caracs: DrawCaracs
    ) => {
      // const cardsAdded = drawCards(g, avatarId);
      const cardsDrawed = draw(g, playerId, caracs.drawNumber);
      return cardsDrawed;
    },
    check: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ): boolean => true
  },
  Heal: {
    ability: {
      id: "Heal",
      isTargetRequired: true,
      abilityType: AbilityTypeName.Physical
    },
    // Restore health to an avatar.
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ) => {
      return heal(g, targetId, caracs.healValue);
    },
    // Todo, check that we got a corresponding avatar to heal (getAvatar(g,targetId)!==undefined or null ?)
    check: (g: SimpleGame, avatarId: string, targetId: string) => true
  },
  // TODO: Refactor to use only one Heal power with more param/carac ?
  HealSelf: {
    ability: {
      id: "HealSelf",
      isTargetRequired: false,
      abilityType: AbilityTypeName.Physical
    },
    // Restore health to the current player.
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ) => {
      return heal(g, avatarId, caracs.healValue);
    },
    check: () => true
  },
  // TODO : Implement conditions for enchantments,
  // or checkTargetNamed functions to be able to mix power & checkTarget in card ?
  HealSelfOnCrystalized: {
    ability: {
      id: "HealSelfOnCrystalized",
      isTargetRequired: false,
      abilityType: AbilityTypeName.Physical
    },
    // Restore Health to the current player if he's on a crystalized cell.
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ) => {
      const avatarPosition = getAvatarPosition(g, avatarId);
      return getCrystallized(g, avatarPosition)
        ? heal(g, avatarId, caracs.healValue)
        : g;
    },
    check: () => true
  },
  Summon: {
    ability: {
      id: "Summon",
      isTargetRequired: true,
      abilityType: AbilityTypeName.Magical
    },
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ) => {
      const monsterSummoned = summon(
        g,
        "BasicMonster",
        avatarId,
        targetId,
        caracs
      );
      return monsterSummoned;
    },
    check: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ) => {
      return getAvatarOnCell(g, targetId) === null;
    }
  },
  // TODO : Refactor, should be a custom Draw power.
  DoubleDraw: {
    ability: {
      id: "DoubleDraw",
      isTargetRequired: false,
      abilityType: AbilityTypeName.Physical
    },
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ) => {
      // const cardsAdded = drawCards(g, avatarId);
      const cardsDrawed = draw(
        g,
        avatarId,
        caracs.drawNumber + caracs.drawNumber
      );
      return cardsDrawed;
    },
    check: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ): boolean => true
  },
  TrapACell: {
    ability: {
      id: "TrapACell",
      isTargetRequired: true,
      abilityType: AbilityTypeName.Magical
    },
    power: (g: SimpleGame, avatarId: string, targetId: string) => {
      return setIsTrapped(g, targetId, true);
    },
    check: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ) => {
      return getAvatarOnCell(g, targetId) === null ? true : false;
    }
  },
  RefreshActionOnCrystal: {
    ability: {
      id: "RefreshActionOnCrystal",
      isTargetRequired: true,
      abilityType: AbilityTypeName.Magical
    },
    power: (g: SimpleGame, avatarId: string, targetId: string) => {
      // Check if on crystalized.
      // Todo To refactor
      const cellId = getAvatarPosition(g, targetId);
      const isTriggered = getCrystallized(g, cellId);
      // Set exhaustCounter to 0 for each Action if target player onCrystallized.
      if (isTriggered) {
        return getCategories().reduce(
          (prevG, currCat) => refreshAction(prevG, targetId, currCat),
          { ...g }
        );
      } else {
        return g;
      }
    },
    check: (g: SimpleGame, avatarId: string, targetId) => true
  },
  Equip: {
    ability: {
      id: "Equip",
      isTargetRequired: false,
      abilityType: AbilityTypeName.Physical
    },
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      caracs: Caracs
    ) => {
      const action = loadActionFromTemplate(g, avatarId, targetId);
      const newActions = setNewAction(
        getAllActions(g, avatarId),
        action,
        avatarId
      );
      return setActions(g, avatarId, newActions);
    },
    check: () => true
  }
  // TODO : Refactor using correct setter/getter, need a refactor of Skills & PlayersContext state handling first.
  // TODO: Make it plugs on categorized prop (aka equipmentStrengthPlayer, or equipmentDexterityPlayer)
  /* Equip: {
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      powerCaracs: Caracs
    ) => {
      const cardName = getSkillByCat(g, avatarId, targetId).toEquip!;
      const card = loadCard(cardName);
      // Equipment condition to upgrade is being on crystallized when equipped.
      const isUpgraded =
        getCrystallized(g, getAvatarPosition(g, avatarId)) && hasUpgrade(card);
      const loadedCard = isUpgraded ? loadUpgrade(card) : card;
      const equipped = {
        ...g,
        [`equipmentPlayer${avatarId}`]: loadEquipment(loadedCard)
      };
      const basicSkills: Array<Skill> = equipped.playersContext[
        avatarId
      ].skills.map(
        skill =>
          skill.abilityCategory === card.abilityCategory
            ? getBasicSkill(card.abilityCategory)
            : skill
      );
      const basicSkillreturned: SimpleGame = {
        ...equipped,
        playersContext: {
          ...equipped.playersContext,
          [avatarId]: {
            ...equipped.playersContext[avatarId],
            skills: basicSkills
          }
        }
      };
      return basicSkillreturned;
    },
    check: () => true
  },
  // TODO : Refactor using correct setter/getter, need a refactor of Skills & PlayersContext state handling first.
  // TODO: Make it plugs on categorized prop (aka enchantmentStrengthPlayer, or enchantmentDexterityPlayer)
  Enchant: {
    power: (
      g: SimpleGame,
      avatarId: string,
      targetId: string,
      powerCaracs: Caracs
    ) => {
      const cardName = getSkillByCat(g, avatarId, targetId).toEquip!;
      const card = loadCard(cardName);
      const enchanted = {
        ...g,
        [`enchantmentPlayer${avatarId}`]: loadEnchantment(card)
      };
      const basicSkills: Array<Skill> = enchanted.playersContext[
        avatarId
      ].skills.map(
        skill =>
          skill.abilityCategory === ActionCategoryName.Wisdom
            ? getBasicSkill(ActionCategoryName.Wisdom)
            : skill
      );
      const basicSkillreturned: SimpleGame = {
        ...enchanted,
        playersContext: {
          ...enchanted.playersContext,
          [avatarId]: {
            ...enchanted.playersContext[avatarId],
            skills: basicSkills
          }
        }
      };
      return basicSkillreturned;
    },
    check: () => true
  }*/
};

export const UpgradeLib: { [key: string]: ActionTemplate } = {
  SwordOfPower: {
    name: "SwordOfPower",
    cardType: CardTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    upgradeName: "SwordOfPower",
    abilityCaracs: {
      attackValue: 3
    },
    abilityId: "Attack"
  }
};

export function loadAbility(abilityId: string): Ability {
  return AbilityLib[abilityId].ability;
}

/** Retrieving the ability reducer function corresponding to the ability name/id (same??) */
export function loadAbilityReducer(abilityId: string): AbilityReducer {
  return AbilityLib[abilityId].power;
}

/** Retrieving the ability checker function corresponding to the ability name/id (same??) */
export function loadAbilityChecker(abilityId: string): AbilityChecker {
  return AbilityLib[abilityId].check;
}
