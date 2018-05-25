import {
  loadBasicActions,
  getAllActions,
  getActionStatus,
  setActionStatus,
  getActionFlow,
  upActionCount,
  setActions
} from "../actionStateHandling";
import {
  getActionColor,
  exhaustAction,
  triggerAction,
  cleanDeadAction
} from "../actionLogic";
import { setupGame } from "../../Game";
import { ActionCategoryName, ActionTileStatus } from "../Action";
import { getCards } from "../../cards/cardStateHandling";

const PLAYER_ID = "0";
const CATEGORY = ActionCategoryName.Dexterity;

describe("Increasing action count", () => {
  const g = setupGame();
  it("when increased action count should be 1", () => {
    const increased = upActionCount(g);
    expect(increased.actionCount).toEqual(1);
  });
});

describe("loaders & getters for basic actions", () => {
  const a = loadBasicActions(PLAYER_ID);
  it("loader for basic Action should return 4 actions", () => {
    expect(a.length).toEqual(4);
  });
  it("getActionColor should return correct colors based on ActionTileStatus", () => {
    const b = a.filter(action => action.name === "Move")[0];
    const c = getActionColor(b);
    const d = getActionColor(b, ActionTileStatus.Exhausted);
    expect(c).toEqual("#009933");
    expect(d).toEqual("gray");
  });
});

describe("basic action workflow", () => {
  const g = setupGame();
  const as = getAllActions(g, PLAYER_ID);
  const af = getActionFlow(g, PLAYER_ID, CATEGORY);
  it("After setup, should have 4 actions", () => {
    expect(as.length).toEqual(4);
  });
  it("After setup, action Flow shoud have default values", () => {
    expect(af.actionCategory).toEqual(CATEGORY);
    expect(af.exhaustCounter).toEqual(0);
    expect(af.status).toEqual(ActionTileStatus.Avalaible);
  });
  it("After set to Exhausted, new value of status should be exhausted", () => {
    const b = setActionStatus(
      g,
      PLAYER_ID,
      CATEGORY,
      ActionTileStatus.Exhausted
    );
    const c = getActionStatus(b, PLAYER_ID, CATEGORY);
    expect(c).toEqual(ActionTileStatus.Exhausted);
  });
  it("When exhausted, new action status should be exhausted and actionCount increased", () => {
    const action2 = getAllActions(g, PLAYER_ID).filter(
      current => current.abilityCategory === CATEGORY
    )[0];
    const b = exhaustAction(g, PLAYER_ID, action2);
    const c = getActionStatus(b, PLAYER_ID, CATEGORY);
    expect(c).toEqual(ActionTileStatus.Exhausted);
    expect(b.actionCount).toEqual(1);
  });
  it("When action charge < 1, action should be cleaned", () => {
    const action3 = getAllActions(g, PLAYER_ID).map(
      (current, index) => (index === 0 ? { ...current, charge: 0 } : current)
    );
    const gWithDeadAction = setActions(g, PLAYER_ID, action3);
    const gAfterCleaned = cleanDeadAction(gWithDeadAction, PLAYER_ID);
    expect(getAllActions(gAfterCleaned, PLAYER_ID).length).toEqual(3);
  });
});

describe("Action workflow for draw action", () => {
  const g = setupGame();
  const drawAction = getAllActions(g, PLAYER_ID).filter(
    current => current.name === "Draw"
  )[0];
  const newG = triggerAction(g, drawAction, PLAYER_ID);
  it("when triggered draw, player should have cards equal to drawNumber", () => {
    const cards = getCards(newG, PLAYER_ID);
    expect(cards.length).toEqual(3);
  });
  it("when exhausting after draw, action count should'nt be increased", () => {
    const newG2 = exhaustAction(g, PLAYER_ID, drawAction);
    expect(newG2.actionCount).toEqual(0);
  });
});
