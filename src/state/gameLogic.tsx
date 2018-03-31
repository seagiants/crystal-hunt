import { TriggerPhase } from "../action/skillLib";
import { SimpleGame, GameContext } from "../types";
import {
  getEnchantment,
  getEnchantmentTrigger,
  getHealthInit,
  getHealth
} from "./getters";
import { triggerPower } from "../action/Power";
import { setHealth } from "./setters";

// auto triggering enchantment logic
// TODO : Handle several enchantment triggers
export function triggerEnchantments(
  G: SimpleGame,
  ctx: GameContext,
  playerId: string,
  triggerValue: TriggerPhase
): SimpleGame {
  const enchantment = getEnchantment(G, playerId, "NoCategory");
  const trigger = getEnchantmentTrigger(G, playerId, "NoCategory");
  // Trigger enchantment based on trigger value.
  const enchantmentTriggered: SimpleGame =
    enchantment !== undefined && trigger === TriggerPhase.TurnEnd
      ? triggerPower(
          getEnchantment(G, playerId, "NoCategory"),
          G,
          ctx,
          playerId
        )
      : G;
  return enchantmentTriggered;
}

// Heal key word : Adding value to health, max by healthInit
export function heal(
  g: SimpleGame,
  avatarId: string,
  value: number
): SimpleGame {
  const currentHealth = getHealth(g, avatarId);
  const max = getHealthInit(g, avatarId);
  return currentHealth + value < max
    ? setHealth(g, avatarId, currentHealth + value)
    : setHealth(g, avatarId, max);
}

// Damage key word : substracting value to health, min by 0.
export function damage(
  g: SimpleGame,
  avatarId: string,
  value: number
): SimpleGame {
  const currentHealth = getHealth(g, avatarId);
  return currentHealth - value < 0
    ? setHealth(g, avatarId, 0)
    : setHealth(g, avatarId, currentHealth - value);
}
