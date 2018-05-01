/*
import { Skill, Power, CheckTarget, Enchantment, Spell } from "./type";
import { SimpleGame, GameContext } from "../types";
import { getPlayerCaracs, getEquipmentPlayerCaracs } from "../state/getters";
import { PowerLib } from "./powerLib";
import { addInfoMessage } from "../state/setters";
import { diminishChargeSpell } from "../state/gameLogic";
import { Caracs } from "../action/Action";
*/
/* ****************************** Power API *********************** */
// Used to get all added caracs of a power.
/*
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
// Workflow : AddCaracts, setInfo, diminish charge if any, Trigger power.
// TODO : Switch from ctx.currentPlayer to playerId (should'nt depend on the gameContext)
// TODO : Improve handle of caracs based on the type of action (for spell, skill&equipment caracs should'nt be added)
export function triggerPower(
  action: Skill | Enchantment | Spell,
  g: SimpleGame,
  ctx: GameContext,
  targetId: string
): SimpleGame {
  const caracsWithPower = getAddedCaracs(
    getPlayerCaracs(g, ctx.currentPlayer),
    action.caracs
  );
  const caracsWithEquipments = getAddedCaracs(
    getEquipmentPlayerCaracs(g, ctx.currentPlayer),
    caracsWithPower
  );
  const infoMessage: string = action.powerName + " is trigerred on " + targetId;
  const withInfo: SimpleGame = addInfoMessage(g, infoMessage);
  const chargeDimished = (<Spell>action).charge
    ? diminishChargeSpell(withInfo, ctx.currentPlayer, action.abilityCategory)
    : withInfo;
  return loadPower(action.powerName)(
    chargeDimished,
    ctx,
    targetId,
    caracsWithEquipments
  );
}
/*
// Used to check if a target (cellId) is a valid targer for a power (aka powerName)
export function checkTarget(
  skill: Skill,
  g: SimpleGame,
  ctx: GameContext,
  targetId: string
): boolean {
  // Need a better implementation of addedCaracs.
  let caracs = getAddedCaracs(
    getPlayerCaracs(g, ctx.currentPlayer),
    skill.caracs
  );
  caracs = getAddedCaracs(
    caracs,
    getEquipmentPlayerCaracs(g, ctx.currentPlayer)
  );
  return loadCheckTarget(skill.powerName)(g, ctx, targetId, caracs);
}
*/
/* ***************** Technical functions for API ************************* */
// Factories for power related functions.
/*
// Power factory
export function loadPower(powerName: string): Power {
  return PowerLib[powerName].power;
}

// CheckTarget factory
function loadCheckTarget(powerName: string): CheckTarget {
  return PowerLib[powerName].check;
}
*/
