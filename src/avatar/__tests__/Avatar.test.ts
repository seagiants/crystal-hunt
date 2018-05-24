import { initPlayerAvatar } from "../Avatar";

/* ---> use describe() for a block of tests,
 for example all tests for a given function */
describe("initPlayerAvatar", () => {
  // --> use it() for specific unit test
  it("should correctly type as player", () => {
    const avatar = initPlayerAvatar("0", "0x0");
    expect(avatar.type).toBe("Player");
  });
  it("should return correctly initialized caracs values", () => {
    const avatar = initPlayerAvatar("0", "0x0");
    const initCaracs = {
      healthInit: 5,
      healthCurrent: 5,
      attackValue: 1,
      drawNumber: 3,
      attackRange: 1,
      moveRange: 1
    };
    expect(avatar.caracs).toEqual(initCaracs);
  });
});
