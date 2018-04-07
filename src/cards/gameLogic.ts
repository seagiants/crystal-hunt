import { SimpleGame } from "../types";
import { SkillCategoryName, SkillCategoryLib } from "../action/skillLib";
import { setDeck, setCards, getCards, getDeck } from "../cards/stateAccessors";
import { loadCard } from "./Card";
import { Card } from "./types";
import { getCategory } from "../state/getters";

// Draw key words : Replace cards of a player with full new cards.
export function drawCards(g: SimpleGame, playerId: string): SimpleGame {
  return setCards(g, playerId, [
    loadCard("Sword"),
    loadCard("CrystalAffinity"),
    loadCard("SummonMonster"),
    loadCard("GoldenShoes"),
    loadCard("Fireball")
  ]);
}

// Draw the first card of a deck
export function drawCard(
  g: SimpleGame,
  playerId: string,
  category: SkillCategoryName
): SimpleGame {
  let deck: Array<Card> = [...getDeck(g, playerId, category)];
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
    const deckUpdated = setDeck(cardDrawed, playerId, category, newDeck);
    return deckUpdated;
  } else {
    console.log("No more cards to draw in " + category + " deck.");
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
  const category = getCategory(card);
  // Put the card at the end of the deck.
  const newDeck: Array<Card> = [...getDeck(g, playerId, category), card];
  const deckSetted = setDeck(g, playerId, category, newDeck);
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
  const category = getCategory(getCards(g, playerId)[cardIndex]);
  const cardDrawed = drawCard(cardDiscarded, playerId, category);
  return cardDrawed;
}

// Draw 1 card per category's deck.
export function drawEach(g: SimpleGame, playerId: string): SimpleGame {
  const cats = Object.keys(SkillCategoryLib);
  const cardsDrawed = cats.reduce(
    (tempG: SimpleGame, category: SkillCategoryName) =>
      drawCard(tempG, playerId, category),
    g
  );
  return cardsDrawed;
}
