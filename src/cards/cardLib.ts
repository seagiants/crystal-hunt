import { ActionCategoryName, CardTypeName, Action } from "../action/Action";
import { CardLibrairy } from "./Card";
import { SimpleGame, TriggerPhase } from "../types";
import { initAction } from "../action/actionStateHandling";

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
    isFinal: false,
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
