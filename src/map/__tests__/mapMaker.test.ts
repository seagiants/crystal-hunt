import { mapMaker } from "../mapMaker";

// prettier-ignore
const BASIC_STRUCT = [
    ["R0-", "RM-", "R--"],
    ["R--", "RM-", "R1-"]
];

describe("mapMaker", () => {
  it("should be create map with the right keys", () => {
    const basicMapDef = mapMaker(BASIC_STRUCT);
    const keys = Object.keys(basicMapDef.cells);
    expect(keys).toHaveLength(6);
    expect(keys[0]).toEqual("0x0");
    expect(keys[5]).toEqual("1x2");
  });
});
