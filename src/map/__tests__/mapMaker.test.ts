import { mapMaker } from "../mapMaker";

// prettier-ignore
const BASIC_STRUCT = [
    ["R0-", "RM-", "R--"],
    ["R--", "RM-", "R1-"]
];

// prettier-ignore
const STRUCT_WITH_EMPTY = [
    ["R0-", "---"],
    ["---", "R1-"]
];

// prettier-ignore
const STRUCT_WITH_BLACK = [
    ["R0-", "RM-", "R--"],
    ["R--", "B--", "R--"],
    ["R--", "RM-", "R1-"]
];

describe("mapMaker", () => {
  it("should create map with the right keys", () => {
    const basicMapDef = mapMaker(BASIC_STRUCT);
    const keys = Object.keys(basicMapDef.cells);
    expect(keys).toHaveLength(6);
    expect(keys[0]).toEqual("0x0");
    expect(keys[5]).toEqual("1x2");
  });
  it("should handle empty cells", () => {
    const withEmptyMapDef = mapMaker(STRUCT_WITH_EMPTY);
    expect(Object.keys(withEmptyMapDef.cells)).toHaveLength(2);
  });
  it("should create a black crystal cell", () => {
    const withBC = mapMaker(STRUCT_WITH_BLACK);
    const bcCell = withBC.cells["1x1"];
    expect(bcCell.type).toEqual("BlackCrystalCell");
    expect(withBC.blackCrystalCellXY).toEqual("1x1");
  });
});
