import { TriggerPhase } from "../old/skillLib";
import { ActionTileStatus } from "../old/type";
import { SimpleGame } from "../types";
import { CardLib } from "../cards/cardLib";
import { initAction } from "./actionStateHandling";
import { MonsterActionLib } from "./actionLib";

export enum ActionCategoryName {
  Dexterity = "Dexterity",
  Intelligence = "Intelligence",
  Wisdom = "Wisdom",
  Strength = "Strength"
}

export interface ActionCategory {
  name: ActionCategoryName;
  color: string;
  clickedColor: string;
  exhaustedColor: string;
}

export interface ActionTemplate {
  /** Used to customize action layout. */
  name: string;
  abilityCategory: ActionCategoryName;
  cardType: CardTypeName;
  /** Used to retrieve the reducer ability function. */
  abilityId: string;
  /** Caracs to customize ability, as attackValue, drawCount,... */
  abilityCaracs: Caracs;
  /** Used to identify if actionCount should be increased. */
  isFinal?: boolean;
  /** Used for spell use count. */
  charge?: number;
  /** Used for enchantment trigger phase. */
  trigger?: TriggerPhase;
  /** Used to identify the upgrade name (cardName) */
  upgradeName?: string;
}

export interface Action extends ActionTemplate {
  /** Actions are identified to store or retrieve the trigger. */
  id: string;
  /** Id of the the owner of the action. */
  avatarId: string;
  /** For specific action as enchant and equip, it's an "auto-target" field */
  autoTarget?: string;
}

/** Correspond to key/value pairs for game elements (player, monster, skill, spell) caracteristics.
 * Caracteristics are tagged name assiociated with some game logic.
 */
export interface Caracs {
  [caracName: string]: number;
}

export type ActionLib = { [key in string]: ActionTemplate };

export enum CardTypeName {
  Spell = "Spell",
  Equipment = "Equipment",
  Enchantment = "Enchantment"
}

export type ActionsFlow = { [key in ActionCategoryName]: ActionFlow };

export interface ActionFlow {
  actionCategory: ActionCategoryName;
  status: ActionTileStatus;
  exhaustCounter: number;
}

/** ************** Loaders ************************ */
/** Load Action for a player based on a card's name */
export function loadActionFromTemplate(
  g: SimpleGame,
  avatarId: string,
  cardName: string
): Action {
  const template = CardLib[cardName];
  return initAction(template, avatarId, "default");
}

/** Load monster action based on a actionName and a monsterId. */
export function loadActionMonster(
  g: SimpleGame,
  monsterId: string,
  actionName: string
) {
  const template = MonsterActionLib[actionName];
  return initAction(template, monsterId, "monster");
}
