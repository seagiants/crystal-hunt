import { SimpleGame } from "../types";
import { SkillCategoryName, SkillCategoryLib } from "../action/skillLib";
import { setDeck, setCards, getCards, getDeck } from "../cards/stateAccessors";
import { loadCard } from "./Card";
import { Card } from "./types";

// Draw key words : Replace cards of a player with full new cards.
// TODO : Correctly implements deck mechanism.
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
    // Putting the card at last in the deck.
    let newDeck = deck.slice(1);
    newDeck.push(card);
    const deckUpdated = setDeck(cardDrawed, playerId, category, newDeck);
    return deckUpdated;
  } else {
    console.log("No more cards to draw in " + category + " deck.");
    return g;
  }
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
