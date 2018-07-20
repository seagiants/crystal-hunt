import { TriggerPhase } from "../types";
import { MonsterName } from "../avatar/monsterLib";

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
  cardType: ActionTypeName;
  /** Used to retrieve the reducer ability function. */
  abilityId: string;
  /** Caracs to customize ability, as attackValue, drawCount,... */
  abilityCaracs: Caracs;
  /** Upgraded caracs when on crystallized */
  crystallizedCaracs?: Caracs;
  /** Used to identify if actionCount should be increased. */
  isFinal?: boolean;
  /** Used for spell use count. */
  charge?: number;
  /** Used for enchantment trigger phase. */
  triggerPhase?: TriggerPhase;
  /** Used to identify the upgrade name (cardName) */
  upgradeName?: string;
  /** Used for summon ability */
  summonTarget?: MonsterName;
}

export enum AutoTargetKey {
  Self = "Self"
}
export interface Action extends ActionTemplate {
  /** Actions are identified to store or retrieve the trigger. */
  id: string;
  /** Id of the the owner of the action. */
  avatarId: string;
  /** For specific action as enchant and equip, it's an "auto-target" field */
  autoTarget?: AutoTargetKey | string;
}

/** Correspond to key/value pairs for game elements (player, monster, skill, spell) caracteristics.
 * Caracteristics are tagged name assiociated with some game logic.
 */
export interface Caracs {
  [caracName: string]: number | string;
}

export type ActionLib = { [key in string]: ActionTemplate };

export enum ActionTypeName {
  Spell = "Spell",
  Equipment = "Equipment",
  Enchantment = "Enchantment"
}

export enum ActionTileStatus {
  Clicked = "Clicked",
  Exhausted = "Exhausted",
  Available = "Avalaible"
}

export type ActionsFlow = { [key in ActionCategoryName]: ActionFlow };

export interface ActionFlow {
  actionCategory: ActionCategoryName;
  status: ActionTileStatus;
  exhaustCounter: number;
}
