import { SimpleGame } from "../types";
import { SkillCategoryName, SkillCategoryLib } from "../action/skillLib";
import { setDeck, setCards, getCards, getDeck } from "../cards/stateAccessors";
import { Card } from "./types";

// Draw the first card of a deck
export function drawCard(g: SimpleGame, playerId: string): SimpleGame {
  let deck: Array<Card> = [...getDeck(g, playerId)];
  if (deck.length > 0) {
    // Draw is just taking the first one
    let card = { ...deck[0] };
    // Building the new set of displayed cards
    let cards = [...getCards(g, playerId)];
    cards.push(card);
    // Setting it
    const cardDrawed = setCards(g, playerId, cards);
    // Removing the card from the deck.
    let newDeck = deck.slice(1);
    const deckUpdated = setDeck(cardDrawed, playerId, newDeck);
    return deckUpdated;
  } else {
    console.log("No more cards to draw");
    return g;
  }
}

// Discard a card based on its hand index and putting it at the end of the corresponding deck.
export function discardCard(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const hand = getCards(g, playerId);
  const card = hand[cardIndex];
  // Put the card at the end of the deck.
  const newDeck: Array<Card> = [...getDeck(g, playerId), card];
  const deckSetted = setDeck(g, playerId, newDeck);
  // Removing it from the hand
  const newHand: Array<Card> = hand.filter(
    (current, index) => index !== cardIndex
  );
  const handUpdated: SimpleGame = setCards(deckSetted, playerId, newHand);
  return handUpdated;
}

// Discard all the cards
export function discardCards(g: SimpleGame, playerId: string): SimpleGame {
  // For each card in hand, discard it.
  const cardsDiscarded = getCards(g, playerId).reduce(
    (newG, card, index) => {
      // Always discarding the first card, as it's reducing.
      return discardCard(newG, playerId, 0);
    },
    { ...g }
  );
  return cardsDiscarded;
}

// Recycling a card, is discarding it and drawing one from the same category deck.
export function recycleCard(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const cardDiscarded = discardCard(g, playerId, cardIndex);
  const cardDrawed = drawCard(cardDiscarded, playerId);
  return cardDrawed;
}

// Draw 1 card per category's deck.
export function drawEach(g: SimpleGame, playerId: string): SimpleGame {
  const cats = Object.keys(SkillCategoryLib);
  const cardsDrawed = cats.reduce(
    (tempG: SimpleGame, category: SkillCategoryName) =>
      drawCard(tempG, playerId),
    g
  );
  return cardsDrawed;
}

export function draw(
  g: SimpleGame,
  playerId: string,
  drawNumber: number
): SimpleGame {
  let newG = { ...g };
  if (drawNumber > 0) {
    for (let i = 0; i < drawNumber; i++) {
      newG = drawCard(newG, playerId);
    }
  }
  return newG;
}
