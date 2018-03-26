import { Power, CheckTarget, Caracs, AttackCaracs } from "./type";
import { SimpleGame, GameContext } from "../types";
import {
  setPlayerPosition,
  setCellCrystallize,
  setHealth
} from "../state/setters";
import { getPlayerPosition, getAvatarOnCell } from "../state/getters";

export const PowerLib: {
  [key in string]: { power: Power; check: CheckTarget }
} = {
  Move: {
    power: (g: SimpleGame, ctx: GameContext, targetId: string): SimpleGame => {
      let newG = setPlayerPosition(g, ctx.currentPlayer, targetId);
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
      const playerCell = getPlayerPosition(g, ctx.currentPlayer);
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
      return avatar > -1 ? setHealth(g, avatar, -caracs.attackValue) : g;
    },
    // Check if there's an avatar on cell and it's not the current player's one.
    check: (
      g: SimpleGame,
      ctx: GameContext,
      targetId: string,
      caracs: Caracs
    ): boolean => {
      const avatar = getAvatarOnCell(g, targetId);
      return avatar !== -1 && avatar.toString() !== ctx.currentPlayer;
    }
  }
};
