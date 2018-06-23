import { Ability, AbilityTypeName, TriggerName, CheckName } from "./Ability";
import {
  ActionTemplate,
  CardTypeName,
  ActionCategoryName
} from "../../action/Action";

export const AbilityLib: { [key in string]: Ability } = {
  Move: {
    // id: "Move",
    isTargetRequired: CheckName.checkMovePath,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.move,
    unHidden: true
  },
  Crystalize: {
    // id: "Crystalize",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.crystalize
  },
  Attack: {
    // id: "Attack",
    isTargetRequired: CheckName.checkAttackPath,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.attack,
    unHidden: true
  },
  PoisonAttack: {
    isTargetRequired: CheckName.checkAttackPath,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.poisonAttack,
    unHidden: true
  },
  CircularAttack: {
    // id: "CircularAttack",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.circularAttack,
    unHidden: true
  },
  Draw: {
    // id: "Draw",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.draw
  },
  Heal: {
    // id: "Heal",
    isTargetRequired: CheckName.hasAvatar,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.heal
  },
  Summon: {
    // id: "Summon",
    isTargetRequired: CheckName.isEmpty,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.summon
  },
  TrapACell: {
    // id: "TrapACell",
    isTargetRequired: CheckName.isEmpty,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.trapACell
  },
  RefreshPlayer: {
    // id: "RefreshActionOnCrystal",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.refreshPlayer
  },
  Equip: {
    // id: "Equip",
    isTargetRequired: false,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.equip
  },
  Enchant: {
    isTargetRequired: false,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.enchant
  },
  Push: {
    isTargetRequired: CheckName.checkPushPath,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.push,
    unHidden: true
  },
  Fly: {
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
    isTargetRequired: false,
    abilityType: AbilityTypeName.Magical,
    trigger: TriggerName.hide
  },
  RecycleDeck: {
    isTargetRequired: false,
    abilityType: AbilityTypeName.Physical,
    trigger: TriggerName.recycleDeck
  }
};

export const UpgradeLib: { [key: string]: ActionTemplate } = {
  SwordOfPower: {
    name: "SwordOfPower",
    cardType: CardTypeName.Equipment,
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
