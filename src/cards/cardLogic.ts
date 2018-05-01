import { SimpleGame } from "../types";
import {
  setDeck,
  setCards,
  getCards,
  getDeck,
  getCard
} from "../cards/stateAccessors";
import { Card, getCardType } from "./Card";
import { CardTypeName, Action, ActionCategoryName } from "../action/Action";
import {
  loadActionFromTemplate,
  getAllActions,
  setActions,
  toActionId
} from "../action/actionStateHandling";
import { setNewAction } from "../action/actionLogic";

// Plug keyword : Plugging a card is based on its type.
// Spell/Equipment are linked to the corresponding slot of their category.
// Enchantment are linked to the Intelligence Spell slot.
export function plugCard(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  switch (getCardType(getCard(g, playerId, cardIndex))) {
    case CardTypeName.Equipment:
      return plugEquipment(g, playerId, cardIndex);
    case CardTypeName.Enchantment:
      return plugEnchantment(g, playerId, cardIndex);
    case CardTypeName.Spell:
      return plugSpell(g, playerId, cardIndex);
    default:
      return g;
  }
}

/** Pluggin an Enchantment : Creating a specific Enchant Action and plug it as an Intelligence Spell */
export function plugEnchantment(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const card = getCard(g, playerId, cardIndex);
  const Enchant: Action = {
    id: toActionId("Enchant", ActionCategoryName.Intelligence, playerId),
    name: "Enchant",
    cardType: CardTypeName.Spell,
    charge: 1,
    autoTarget: card.name,
    avatarId: playerId,
    abilityCategory: ActionCategoryName.Intelligence,
    abilityCaracs: {},
    abilityId: "Enchant"
  };
  const withEnchantActions = setNewAction(
    getAllActions(g, playerId),
    Enchant,
    playerId
  );
  return setActions(g, playerId, withEnchantActions);
}

/** Plugging an Equipment :
 * Creating a specific Equip Action
 * and plug it as an Equipment for corresponding card's category.
 */
export function plugEquipment(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const card = getCard(g, playerId, cardIndex);
  const Equip: Action = {
    id: toActionId("Equip", card.abilityCategory, playerId),
    name: "Equip",
    abilityCategory: card.abilityCategory,
    avatarId: playerId,
    cardType: CardTypeName.Equipment,
    autoTarget: card.name,
    abilityCaracs: {},
    abilityId: "Equip"
  };
  const withEquipActions = setNewAction(
    getAllActions(g, playerId),
    Equip,
    playerId
  );
  return setActions(g, playerId, withEquipActions);
}

/** Plugging a spell : Just adding it as a new action. */
export function plugSpell(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const card = getCard(g, playerId, cardIndex);
  const action = loadActionFromTemplate(g, playerId, card.name);
  const newActions = setNewAction(getAllActions(g, playerId), action, playerId);
  return setActions(g, playerId, newActions);
}

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
/*
// Draw 1 card per category's deck.
export function drawEach(g: SimpleGame, playerId: string): SimpleGame {
  const cats = Object.keys(ActionCategoryLib);
  const cardsDrawed = cats.reduce(
    (tempG: SimpleGame, category: ActionCategoryName) =>
      drawCard(tempG, playerId),
    g
  );
  return cardsDrawed;
}
*/
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
