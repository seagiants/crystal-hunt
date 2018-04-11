import { splitCardName } from "../Card";

const SOTL_CARD_NAME = "SwordOfThousandLights";
const SWORD_CARD_NAME = "Sword";

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
