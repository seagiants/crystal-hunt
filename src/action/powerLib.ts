import { Power, CheckTarget, Caracs, AttackCaracs, MoveCaracs } from "./type";
import { SimpleGame, GameContext } from "../types";
import { setCellCrystallize, setAvatarPosition } from "../state/setters";
import {
  getAvatarOnCell,
  getAvatarPosition,
  getCrystallized
} from "../state/getters";
import { damage, heal, summon, triggerTrap } from "../state/gameLogic";
import { findPath, toCoord, toKey } from "../map/Cell";
import { drawEach } from "../cards/gameLogic";

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
      const trapsTriggered = path.reduce(
        (tempG, currCell) =>
          triggerTrap(g, ctx.currentPlayer, toKey(currCell[0], currCell[1])),
        { ...g }
      );
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
      if (g.pathMatrix !== null) {
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
      console.log(avatar !== null && avatar.toString() !== ctx.currentPlayer);
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
    power: (g: SimpleGame, ctx: GameContext) => {
      // const cardsAdded = drawCards(g, ctx.currentPlayer);
      const cardsDrawed = drawEach(g, ctx.currentPlayer);
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
  }
};
