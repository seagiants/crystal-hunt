import { SimpleGame } from "../types";
import {
  setPlayerContext,
  getPlayerContext
} from "../action/actionStateHandling";
import { Card } from "./Card";

export function setCards(
  g: SimpleGame,
  playerId: string,
  cards: Array<Card>
): SimpleGame {
  return setPlayerContext(g, playerId, {
    ...getPlayerContext(g, playerId),
    cards: cards
  });
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
  return g.players[playerId].cards;
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
