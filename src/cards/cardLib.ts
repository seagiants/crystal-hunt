import { TriggerPhase } from "../old/skillLib";
import { ActionCategoryName, CardTypeName } from "../action/Action";
import { CardLibrairy } from "./Card";

export const CardLib: CardLibrairy = {
  CrystalAffinity: {
    name: "CrystalAffinity",
    abilityCategory: ActionCategoryName.Wisdom,
    cardType: CardTypeName.Enchantment,
    trigger: TriggerPhase.TurnEnd,
    abilityCaracs: {
      healValue: 1
    },
    isFinal: true,
    abilityId: "HealSelfOnCrystalized"
  },
  Sword: {
    name: "Sword",
    cardType: CardTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    upgradeName: "SwordOfPower",
    abilityCaracs: {
      attackValue: 1
    },
    abilityId: "Attack",
    isFinal: true
  },
  SummonMonster: {
    name: "SummonMonster",
    cardType: CardTypeName.Spell,
    abilityCategory: ActionCategoryName.Strength,
    charge: 2,
    abilityCaracs: {
      attackValue: 3
    },
    abilityId: "Summon"
  },
  GoldenShoes: {
    name: "GoldenShoes",
    cardType: CardTypeName.Enchantment,
    abilityCategory: ActionCategoryName.Dexterity,
    trigger: TriggerPhase.TurnEnd,
    abilityCaracs: {},
    abilityId: "Crystallize"
  },
  Fireball: {
    name: "Fireball",
    cardType: CardTypeName.Spell,
    abilityCategory: ActionCategoryName.Strength,
    charge: 2,
    abilityCaracs: {
      attackValue: 1,
      attackRange: 5
    },
    abilityId: "Attack"
  },
  SevenLeagueBoots: {
    name: "SevenLeagueBoots",
    cardType: CardTypeName.Equipment,
    abilityCategory: ActionCategoryName.Dexterity,
    abilityCaracs: {
      moveRange: 2
    },
    abilityId: "Move"
  },
  MentalExplosion: {
    name: "MentalExplosion",
    cardType: CardTypeName.Spell,
    abilityCategory: ActionCategoryName.Intelligence,
    charge: 2,
    abilityCaracs: {},
    abilityId: "DoubleDraw"
  },
  SetATrickyTrap: {
    name: "SetATrickyTrap",
    cardType: CardTypeName.Spell,
    abilityCategory: ActionCategoryName.Dexterity,
    charge: 1,
    abilityCaracs: {},
    abilityId: "TrapACell"
  },
  CrystalFiiiiiz: {
    name: "CrystalFiiiiiz",
    cardType: CardTypeName.Enchantment,
    abilityCategory: ActionCategoryName.Wisdom,
    trigger: TriggerPhase.TurnEnd,
    abilityCaracs: {},
    abilityId: "RefreshActionOnCrystal"
  }
};
