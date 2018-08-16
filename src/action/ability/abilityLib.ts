import { Ability, AbilityTypeName, TriggerName, CheckName } from "./Ability";
import {
  ActionTemplate,
  ActionTypeName,
  ActionCategoryName
} from "../../action/Action";

export const AbilityLib: { [key in string]: Ability } = {
  Move: {
    // id: "Move",
    description:
      "Move an avatar, can't pass through walls neither other avatars",
    isTargetRequired: CheckName.checkMovePath,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.move,
    unHidden: true
  },
  Crystalize: {
    // id: "Crystalize",
    description: "Change a cell in a crystallized one.",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.crystalize
  },
  Attack: {
    // id: "Attack",
    description: "Deal an amount of damage to a target",
    isTargetRequired: CheckName.checkAttackPath,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.attack,
    unHidden: true
  },
  PoisonAttack: {
    description:
      "Empoison an avatar, dealing damage at the beginning of each of its turn",
    isTargetRequired: CheckName.checkAttackPath,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.poisonAttack,
    unHidden: true
  },
  CircularAttack: {
    // id: "CircularAttack",
    description: "Dealing damage to all cell around",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.circularAttack,
    unHidden: true
  },
  Draw: {
    // id: "Draw",
    description: "Draw cards to pick",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.draw
  },
  Heal: {
    // id: "Heal",
    description: "Heal HP capped by max HP of the avatar.",
    isTargetRequired: CheckName.hasAvatar,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.heal
  },
  Summon: {
    // id: "Summon",
    description: "Summon a monster on a target cell",
    isTargetRequired: CheckName.isEmpty,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.summon
  },
  TrapACell: {
    // id: "TrapACell",
    description: "Trap a cell",
    isTargetRequired: CheckName.isEmpty,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.trapACell
  },
  RefreshPlayer: {
    // id: "RefreshActionOnCrystal",
    description: "Refresh all action tiles of a player",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.refreshPlayer
  },
  Equip: {
    // id: "Equip",
    description: "Equip an equipment card.",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.equip
  },
  Enchant: {
    description: "Cast an enchantment card making it active",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.enchant
  },
  Push: {
    description:
      "Move an avatar, if another avater is on target cell, it's pushed back.",
    isTargetRequired: CheckName.checkPushPath,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.push,
    unHidden: true
  },
  Fly: {
    description:
      "Move an avatar through other avatars (except for the target cell)",
    isTargetRequired: CheckName.checkFlyingPath,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.move,
    unHidden: true
  },
  Poison: {
    isTargetRequired: CheckName.checkAttackPath,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.poison
  },
  Hide: {
    description: "Making the next attack versus the caster missing.",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.hide
  },
  RecycleDeck: {
    description: "Reinitialize all cards in the deck",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.recycleDeck
  }
};

export const UpgradeLib: { [key: string]: ActionTemplate } = {
  SwordOfPower: {
    name: "SwordOfPower",
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    upgradeName: "SwordOfPower",
    abilityCaracs: {
      attackValue: 3
    },
    abilityId: "Attack"
  }
};

export function loadAbility(abilityId: string): Ability {
  return AbilityLib[abilityId];
}
