import { SimpleGame } from "../types";
import { getAvatar } from "../state/getters";

export function setAvatarHidden(
  g: SimpleGame,
  avatarId: string,
  hidden: boolean = true
): SimpleGame {
  let newState = {
    ...g,
    avatars: g.avatars.map(avatar => {
      return avatar.id === avatarId
        ? {
            ...avatar,
            hidden: hidden
          }
        : avatar;
    })
  };
  return newState;
}

export function isHidden(g: SimpleGame, avatarId: string): boolean {
  const hidden = getAvatar(g, avatarId).hidden;
  return hidden !== undefined ? hidden : false;
}
