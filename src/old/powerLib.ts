/* 
import {
  Power,
  CheckTarget,
  AttackCaracs,
  MoveCaracs,
  Skill,
  DrawCaracs
} from "./type";
import { SimpleGame, GameContext } from "../types";
import {
  setCellCrystallize,
  setAvatarPosition,
  setIsTrapped
} from "../state/setters";
import {
  getAvatarOnCell,
  getAvatarPosition,
  getCrystallized,
  getCategories,
  hasUpgrade
} from "../state/getters";
import {
  damage,
  heal,
  summon,
  checkTraps,
  refreshAction
} from "../state/gameLogic";
import { findPath, toCoord } from "../map/Cell";
import { drawEach, draw } from "../cards/cardLogic";
import {
  loadCard,
  loadUpgrade,
  loadEquipment,
  loadEnchantment
} from "../cards/Card";
import { getBasicSkill } from "./Skill";
import { ActionCategoryName } from "./skillLib";
import { Caracs } from "../action/Action";

export const PowerLib: {
  [key in string]: { power: Power; check: CheckTarget }
} = {
  Move: {
    power: (g: SimpleGame, ctx: GameContext, targetId: string): SimpleGame => {
      console.log("Try to move");
      const path = findPath(
        g.pathMatrix,
        toCoord(getAvatarPosition(g, ctx.currentPlayer)),
        toCoord(targetId)
      );
      // Trigger traps on the way.
      const trapsTriggered = checkTraps(g, ctx.currentPlayer, path);
      // Move the avatar.
      const playerMoved = setAvatarPosition(
        trapsTriggered,
        ctx.currentPlayer,
        targetId
      );
      return playerMoved;
    },
    check: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: MoveCaracs
    ): boolean => {
      if (g.pathMatrix !== null && getAvatarOnCell(g, targetId) === null) {
        const path = findPath(
          g.pathMatrix,
          toCoord(getAvatarPosition(g, ctx.currentPlayer)),
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
    power: (g: SimpleGame, ctx: GameContext) => {
      const playerCell = getAvatarPosition(g, ctx.currentPlayer);
      const crystallizedCell: SimpleGame = setCellCrystallize(
        g,
        playerCell,
        true
      );
      return crystallizedCell;
    },
    check: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ): boolean => {
      return true;
    }
  },
  Attack: {
    // Diminish caracs.healthInit target based on caracs.attackValue
    power: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: AttackCaracs
    ) => {
      const avatar = getAvatarOnCell(g, targetId);
      return avatar !== null ? damage(g, avatar, caracs.attackValue) : g;
    },
    // Check if there's an avatar on cell and it's not the current player's one.
    check: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ): boolean => {
      const avatar = getAvatarOnCell(g, targetId);
      const path = findPath(
        g.pathMatrix,
        toCoord(getAvatarPosition(g, ctx.currentPlayer)),
        toCoord(targetId)
      );
      return (
        avatar !== null &&
        avatar.toString() !== ctx.currentPlayer &&
        path.length !== 0 &&
        path.length < caracs.attackRange + 2
      );
    }
  },
  CircularAttack: {
    power: (g: SimpleGame) => g,
    check: (g: SimpleGame) => true
  },
  Draw: {
    power: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: DrawCaracs
    ) => {
      // const cardsAdded = drawCards(g, ctx.currentPlayer);
      const cardsDrawed = draw(g, ctx.currentPlayer, caracs.drawNumber);
      return cardsDrawed;
    },
    check: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ): boolean => true
  },
  Heal: {
    // Restore health to an avatar.
    power: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ) => {
      return heal(g, targetId, caracs.healValue);
    },
    // Todo, check that we got a corresponding avatar to heal (getAvatar(g,targetId)!==undefined or null ?)
    check: (g: SimpleGame, ctx: GameContext, targetId: string) => true
  },
  // TODO: Refactor to use only one Heal power with more param/carac ?
  HealSelf: {
    // Restore health to the current player.
    power: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ) => {
      return heal(g, ctx.currentPlayer, caracs.healValue);
    },
    check: () => true
  },
  // TODO : Implement conditions for enchantments,
  // or checkTargetNamed functions to be able to mix power & checkTarget in card ?
  HealSelfOnCrystalized: {
    // Restore Health to the current player if he's on a crystalized cell.
    power: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ) => {
      const avatarPosition = getAvatarPosition(g, ctx.currentPlayer);
      return getCrystallized(g, avatarPosition)
        ? heal(g, ctx.currentPlayer, caracs.healValue)
        : g;
    },
    check: () => true
  },
  Summon: {
    power: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ) => {
      const monsterSummoned = summon(g, "BasicMonster", targetId, caracs);
      return monsterSummoned;
    },
    check: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ) => {
      return getAvatarOnCell(g, targetId) === null;
    }
  },
  // TODO : Refactor, should be a custom Draw power.
  DoubleDraw: {
    power: (g: SimpleGame, ctx: GameContext) => {
      // const cardsAdded = drawCards(g, ctx.currentPlayer);
      const cardsDrawed = drawEach(g, ctx.currentPlayer);
      const cardsDrawed2 = drawEach(cardsDrawed, ctx.currentPlayer);
      return cardsDrawed2;
    },
    check: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ): boolean => true
  },
  TrapACell: {
    power: (g: SimpleGame, ctx: GameContext, targetId: string) => {
      return setIsTrapped(g, targetId, true);
    },
    check: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ) => {
      return getAvatarOnCell(g, targetId) === null ? true : false;
    }
  },
  RefreshActionOnCrystal: {
    power: (g: SimpleGame, ctx: GameContext, targetId: string) => {
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
    check: (g: SimpleGame, ctx: GameContext, targetId) => true
  },
  // TODO : Refactor using correct setter/getter, need a refactor of Skills & PlayersContext state handling first.
  // TODO: Make it plugs on categorized prop (aka equipmentStrengthPlayer, or equipmentDexterityPlayer)
  Equip: {
    power: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      powerCaracs: Caracs
    ) => {
      const cardName = getSkillByCat(g, ctx.currentPlayer, targetId).toEquip!;
      const card = loadCard(cardName);
      // Equipment condition to upgrade is being on crystallized when equipped.
      const isUpgraded =
        getCrystallized(g, getAvatarPosition(g, ctx.currentPlayer)) &&
        hasUpgrade(card);
      const loadedCard = isUpgraded ? loadUpgrade(card) : card;
      const equipped = {
        ...g,
        [`equipmentPlayer${ctx.currentPlayer}`]: loadEquipment(loadedCard)
      };
      const basicSkills: Array<Skill> = equipped.playersContext[
        ctx.currentPlayer
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
          [ctx.currentPlayer]: {
            ...equipped.playersContext[ctx.currentPlayer],
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
      ctx: GameContext,
      targetId: string,
      powerCaracs: Caracs
    ) => {
      const cardName = getSkillByCat(g, ctx.currentPlayer, targetId).toEquip!;
      const card = loadCard(cardName);
      const enchanted = {
        ...g,
        [`enchantmentPlayer${ctx.currentPlayer}`]: loadEnchantment(card)
      };
      const basicSkills: Array<Skill> = enchanted.playersContext[
        ctx.currentPlayer
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
          [ctx.currentPlayer]: {
            ...enchanted.playersContext[ctx.currentPlayer],
            skills: basicSkills
          }
        }
      };
      return basicSkillreturned;
    },
    check: () => true
  }
};
*/
