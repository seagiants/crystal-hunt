import { splitCardName } from "../Card";
import { setupGame } from "../../Game";
import { getDeck, setCards } from "../cardStateHandling";
import { ActionTypeName } from "../../action/Action";
import { plugCard } from "../cardLogic";
import { getAllActions } from "../../action/actionStateHandling";
import { getActiveAction, triggerAction } from "../../action/actionLogic";

const SOTL_CARD_NAME = "SwordOfThousandLights";
const SWORD_CARD_NAME = "Sword";
const PLAYER_ID = "0";

describe("splitCardName function", () => {
  it("should separate camel case", () => {
    const a = splitCardName(SOTL_CARD_NAME);
    expect(a).toHaveLength(4);
    expect(a[0]).toEqual("Sword");
    expect(a[3]).toEqual("Lights");
  });
  it("should separate a single word", () => {
    const res = splitCardName(SWORD_CARD_NAME);
    expect(res).toHaveLength(1);
    expect(res[0]).toEqual("Sword");
  });
});

describe("card workflow", () => {
  const g = setupGame();
  const deck = getDeck(g, PLAYER_ID);
  const equipment = deck.filter(
    current => current.cardType === ActionTypeName.Equipment
  )[0];
  const newG = setCards(g, PLAYER_ID, [equipment]);
  const newG2 = plugCard(newG, PLAYER_ID, 0);
  it("should have deck after setup", () => {
    expect(deck.length).toBeGreaterThan(0);
  });
  it("should have same action number after plugging an equipment card, and Equip as active action", () => {
    expect(getAllActions(newG2, PLAYER_ID).length).toEqual(4);
    expect(
      getActiveAction(newG2, PLAYER_ID, equipment.abilityCategory).name
    ).toEqual("Equip");
  });
  it("should have same action number after Equip with the new equipped action", () => {
    const newG3 = triggerAction(
      newG2,
      getActiveAction(newG2, PLAYER_ID, equipment.abilityCategory),
      PLAYER_ID
    );
    expect(getAllActions(newG3, PLAYER_ID).length).toEqual(4);
    expect(
      getActiveAction(newG3, PLAYER_ID, equipment.abilityCategory).name
    ).toEqual(equipment.name);
  });
});
