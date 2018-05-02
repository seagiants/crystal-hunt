import { loadActionCategory } from "../Ability";
import { ActionCategoryName } from "../../Action";
import { loadAbility } from "../abilityLib";

const CATEGORY_NAME = ActionCategoryName.Dexterity;
const ABILITY_NAME = "Move";

describe("loaders for ability", () => {
  it("loader for Category should correctly retrieve ability category", () => {
    const a = loadActionCategory(CATEGORY_NAME);
    expect(a.name).toEqual("Dexterity");
    expect(a.color).toEqual("#009933");
  });
  it("loader for Ability should correctly retrieve ability", () => {
    const a = loadAbility(ABILITY_NAME);
    expect(a.id).toEqual("Move");
    expect(a.isTargetRequired).toEqual(true);
  });
});
