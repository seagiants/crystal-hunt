import { initPlayerAvatar, RaceName, defaultCaracs } from "../Avatar";

/* ---> use describe() for a block of tests,
 for example all tests for a given function */
describe("initPlayerAvatar", () => {
  // --> use it() for specific unit test
  it("should correctly type as player", () => {
    const avatar = initPlayerAvatar("0", "0x0", RaceName.Human);
    expect(avatar.type).toBe("Player");
  });
  it("should return correctly initialized caracs values", () => {
    const avatar = initPlayerAvatar("0", "0x0", RaceName.Human);
    let initCaracs = defaultCaracs;
    initCaracs.drawNumber = 4;
    expect(avatar.caracs).toEqual(initCaracs);
  });
});
