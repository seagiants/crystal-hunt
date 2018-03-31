import { Power, CheckTarget, Caracs, AttackCaracs } from "./type";
import { SimpleGame, GameContext } from "../types";
import {
  setCellCrystallize,
  setAvatarPosition
} from "../state/setters";
import {
  getAvatarOnCell,
  getAvatarPosition,
  getCrystallized
} from "../state/getters";
import { damage, heal, drawCards } from "../state/gameLogic";

export const PowerLib: {
  [key in string]: { power: Power; check: CheckTarget }
} = {
  Move: {
    power: (g: SimpleGame, ctx: GameContext, targetId: string): SimpleGame => {
      let newG = setAvatarPosition(g, ctx.currentPlayer, targetId);
      console.log("Try to move");
      return newG;
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
  Cristallize: {
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
      return avatar !== null && avatar.toString() !== ctx.currentPlayer;
    }
  },
  Draw: {
    power: (g: SimpleGame, ctx: GameContext) => {
      const cardsAdded = drawCards(g, ctx.currentPlayer);
      return cardsAdded;
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
  }
};
