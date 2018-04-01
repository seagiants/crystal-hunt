import { Caracs, Skill, Power, CheckTarget, Enchantment, Spell } from "./type";
import { SimpleGame, GameContext } from "../types";
import { getPlayerCaracs, getEquipmentPlayerCaracs } from "../state/getters";
import { PowerLib } from "./powerLib";

/* ****************************** Power API *********************** */
// Used to get all added caracs of a power.
export function getAddedCaracs(caracs1: Caracs, caracs2: Caracs): Caracs {
  let newCaracs: Caracs = { ...caracs1 };
  Object.keys(caracs2).forEach(carac => {
    newCaracs[carac] !== undefined
      ? (newCaracs[carac] = newCaracs[carac] + caracs2[carac])
      : (newCaracs[carac] = caracs2[carac]);
  });
  return newCaracs;
}

// Used to trigger a power, based on PowerName.
// TODO : Switch from ctx.currentPlayer to playerId (should'nt depend on the gameContext)
export function triggerPower(
  action: Skill | Enchantment | Spell,
  g: SimpleGame,
  ctx: GameContext,
  targetId: string
): SimpleGame {
  const caracsWithSkills = getAddedCaracs(
    getPlayerCaracs(g, ctx.currentPlayer),
    action.caracs
  );
  const caracsWithEquipments = getAddedCaracs(
    getEquipmentPlayerCaracs(g, ctx.currentPlayer),
    caracsWithSkills
  );
  return loadPower(action.powerName)(g, ctx, targetId, caracsWithEquipments);
}

// Used to check if a target (cellId) is a valid targer for a power (aka powerName)
export function checkTarget(
  skill: Skill,
  g: SimpleGame,
  ctx: GameContext,
  targetId: string
): boolean {
  const caracs = getAddedCaracs(
    getPlayerCaracs(g, ctx.currentPlayer),
    skill.caracs
  );
  return loadCheckTarget(skill.powerName)(g, ctx, targetId, caracs);
}

/* ***************** Technical functions for API ************************* */
// Factories for power related functions.

// Power factory
export function loadPower(powerName: string): Power {
  return PowerLib[powerName].power;
}

// CheckTarget factory
function loadCheckTarget(powerName: string): CheckTarget {
  return PowerLib[powerName].check;
}
