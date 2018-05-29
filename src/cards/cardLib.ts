import {
  ActionCategoryName,
  CardTypeName,
  Action,
  AutoTargetKey
} from "../action/Action";
import { CardLibrairy } from "./Card";
import { SimpleGame, TriggerPhase } from "../types";
import { initAction } from "../action/actionStateHandling";

export const CardLib: CardLibrairy = {
  CrystalAffinity: {
    name: "CrystalAffinity",
    abilityCategory: ActionCategoryName.Wisdom,
    cardType: CardTypeName.Enchantment,
    triggerPhase: TriggerPhase.TurnEnd,
    autoTarget: AutoTargetKey.Self,
    description: "Healing you",
    abilityCaracs: {
      healValue: 1
    },
    isFinal: false,
    abilityId: "Heal"
  },
  Sword: {
    name: "Sword",
    cardType: CardTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    upgradeName: "SwordOfPower",
    abilityCaracs: {
      attackValue: 2
    },
    description: "The good ol' sword in your face, still works great.",
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
    triggerPhase: TriggerPhase.TurnEnd,
    description: "For greedy guys who likes yellow cell",
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
    description: "Smoked meat anyone ?",
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
    description: "Drawing all the deck at once feels good",
    isFinal: false,
    abilityCaracs: {
      drawNumber: 3
    },
    abilityId: "Draw"
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
    triggerPhase: TriggerPhase.TurnEnd,
    abilityCaracs: {},
    abilityId: "RefreshActionOnCrystal"
  },
  Regeneration: {
    name: "Regeneration",
    cardType: CardTypeName.Enchantment,
    abilityCategory: ActionCategoryName.Strength,
    triggerPhase: TriggerPhase.TurnEnd,
    description: "Healing you",
    isFinal: false,
    abilityCaracs: {
      healValue: 1
    },
    autoTarget: AutoTargetKey.Self,
    abilityId: "Heal"
  },
  FireAura: {
    name: "FireAura",
    cardType: CardTypeName.Enchantment,
    abilityCategory: ActionCategoryName.Strength,
    triggerPhase: TriggerPhase.TurnEnd,
    isFinal: false,
    description: "Not good for the neighboorhood",
    abilityCaracs: {
      attackValue: 1
    },
    abilityId: "CircularAttack"
  },
  Axe: {
    name: "Axe",
    cardType: CardTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    abilityCaracs: {
      attackValue: 2
    },
    description: "Really not good for the neighboorhood",
    abilityId: "CircularAttack",
    isFinal: true
  },
  HealingPotion: {
    name: "HealingPotion",
    cardType: CardTypeName.Spell,
    abilityCategory: ActionCategoryName.Wisdom,
    charge: 1,
    autoTarget: AutoTargetKey.Self,
    description: "A mars and let's go !",
    abilityCaracs: {
      healValue: 3
    },
    abilityId: "Heal",
    isFinal: true
  },
  ShoesOfTheGiants: {
    name: "ShoesOfTheGiants",
    cardType: CardTypeName.Equipment,
    abilityCategory: ActionCategoryName.Dexterity,
    abilityCaracs: {},
    description: "Some has tried to stay in Giants' way, they had issues...",
    abilityId: "Push"
  },
  NikeRMax: {
    name: "NikeRMax",
    cardType: CardTypeName.Equipment,
    abilityCategory: ActionCategoryName.Dexterity,
    description: "Jump, jump, jump !",
    abilityCaracs: {
      moveRange: 1
    },
    abilityId: "Fly"
  },
  GandalfStaff: {
    name: "GandalfStaff",
    cardType: CardTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    abilityCaracs: {
      attackRange: 1
    },
    description: "Piou, piou.",
    abilityId: "Attack"
  },
  Teleportation: {
    name: "Teleportation",
    cardType: CardTypeName.Spell,
    abilityCategory: ActionCategoryName.Dexterity,
    charge: 1,
    abilityCaracs: {
      moveRange: 2
    },
    description: "I was there ? I'm not anymore.",
    abilityId: "Fly"
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
