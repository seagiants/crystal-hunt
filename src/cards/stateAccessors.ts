import { SimpleGame } from "../types";
import { Card } from "./types";

export function setCards(
  g: SimpleGame,
  playerId: string,
  cards: Array<Card>
): SimpleGame {
  return {
    ...g,
    playersContext: {
      ...g.playersContext,
      [playerId]: {
        ...g.playersContext[playerId],
        cards: cards
      }
    }
  };
}

export function setDeck(
  g: SimpleGame,
  playerId: string,
  deck: Array<Card>
): SimpleGame {
  return {
    ...g,
    [`decksPlayer${playerId}`]: deck
  };
}

export function getCards(g: SimpleGame, playerId: string): Array<Card> {
  return g.playersContext[playerId].cards;
}

export function getCard(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): Card {
  return getCards(g, playerId)[cardIndex];
}

export function getDeck(g: SimpleGame, playerId: string): Array<Card> {
  return g[`decksPlayer${playerId}`];
}
