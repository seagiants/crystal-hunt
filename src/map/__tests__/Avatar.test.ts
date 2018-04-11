import { initPlayerAvatar } from "../Avatar";

describe("initPlayerAvatar", () => {
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
      attackRange: 1,
      moveRange: 1
    };
    expect(avatar.caracs).toEqual(initCaracs);
  });
});
