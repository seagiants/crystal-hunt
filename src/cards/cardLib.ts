import {
  ActionCategoryName,
  ActionTypeName,
  Action,
  AutoTargetKey
} from "../action/Action";
import { CardLibrary } from "./Card";
import { SimpleGame, TriggerPhase } from "../types";
import { initAction } from "../action/actionStateHandling";

export const CardLib: CardLibrary = {
  CrystalAffinity: {
    name: "CrystalAffinity",
    abilityCategory: ActionCategoryName.Wisdom,
    cardType: ActionTypeName.Enchantment,
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
    cardType: ActionTypeName.Equipment,
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
    cardType: ActionTypeName.Spell,
    abilityCategory: ActionCategoryName.Strength,
    charge: 2,
    abilityCaracs: {
      attackValue: 3
    },
    abilityId: "Summon"
  },
  SummonSpiderNest: {
    name: "SummonSpiderNest",
    cardType: ActionTypeName.Spell,
    abilityCategory: ActionCategoryName.Strength,
    charge: 2,
    abilityCaracs: {
      attackValue: 3,
      monsterType: "Spider"
    },
    abilityId: "Summon"
  },
  GoldenShoes: {
    name: "GoldenShoes",
    cardType: ActionTypeName.Enchantment,
    abilityCategory: ActionCategoryName.Dexterity,
    triggerPhase: TriggerPhase.TurnEnd,
    description: "For greedy guys who likes yellow cell",
    abilityCaracs: {},
    abilityId: "Crystallize"
  },
  Fireball: {
    name: "Fireball",
    cardType: ActionTypeName.Spell,
    abilityCategory: ActionCategoryName.Strength,
    charge: 2,
    crystallizedCaracs: {
      attackValue: 1,
      attackRange: 10
    },
    abilityCaracs: {
      attackValue: 0,
      attackRange: 5
    },
    description: "Smoked meat anyone ?",
    abilityId: "Attack"
  },
  SevenLeagueBoots: {
    name: "SevenLeagueBoots",
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Dexterity,
    abilityCaracs: {
      moveRange: 1
    },
    abilityId: "Move"
  },
  MentalExplosion: {
    name: "MentalExplosion",
    cardType: ActionTypeName.Spell,
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
    cardType: ActionTypeName.Spell,
    abilityCategory: ActionCategoryName.Dexterity,
    charge: 1,
    abilityCaracs: {},
    abilityId: "TrapACell"
  },
  CrystalFiiiiiz: {
    name: "CrystalFiiiiiz",
    cardType: ActionTypeName.Enchantment,
    abilityCategory: ActionCategoryName.Wisdom,
    triggerPhase: TriggerPhase.TurnEnd,
    abilityCaracs: {},
    abilityId: "RefreshActionOnCrystal"
  },
  Regeneration: {
    name: "Regeneration",
    cardType: ActionTypeName.Enchantment,
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
    cardType: ActionTypeName.Enchantment,
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
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    abilityCaracs: {
      attackValue: 2
    },
    description: "Really not good for the neighboorhood",
    abilityId: "Attack",
    crystallizedAbilityId: "CircularAttack",
    isFinal: true
  },
  HealingPotion: {
    name: "HealingPotion",
    cardType: ActionTypeName.Spell,
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
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Dexterity,
    abilityCaracs: {},
    description: "Some has tried to stay in Giants' way, they had issues...",
    abilityId: "Push"
  },
  NikeRMax: {
    name: "NikeRMax",
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Dexterity,
    description: "Jump, jump, jump !",
    abilityCaracs: {
      moveRange: 1
    },
    abilityId: "Fly"
  },
  GandalfStaff: {
    name: "GandalfStaff",
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    abilityCaracs: {
      attackRange: 1
    },
    description: "Piou, piou.",
    abilityId: "Attack"
  },
  Teleportation: {
    name: "Teleportation",
    cardType: ActionTypeName.Spell,
    abilityCategory: ActionCategoryName.Dexterity,
    charge: 1,
    abilityCaracs: {
      moveRange: 2
    },
    description: "Was there ? Not anymore.",
    abilityId: "Fly"
  },
  Doliprane: {
    name: "Doliprane",
    cardType: ActionTypeName.Spell,
    abilityCategory: ActionCategoryName.Wisdom,
    charge: 2,
    abilityCaracs: {
      healValue: 2
    },
    autoTarget: AutoTargetKey.Self,
    description: "Just need a doliprane ?",
    abilityId: "Heal"
  },
  PoisonnedArrows: {
    name: "PoisonnedArrows",
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    abilityCaracs: {
      attackRange: 1,
      poisonValue: 1
    },
    description: "That's not fair, but hey, who cares ?",
    abilityId: "PoisonAttack"
  },
  FishermansFriend: {
    name: "FishermansFriend",
    cardType: ActionTypeName.Spell,
    abilityCategory: ActionCategoryName.Wisdom,
    charge: 2,
    abilityCaracs: {},
    isFinal: false,
    autoTarget: AutoTargetKey.Self,
    description: "Feels better than doliprane, isn't it ?",
    abilityId: "RefreshPlayer"
  },
  Illusion: {
    name: "Illusion",
    cardType: ActionTypeName.Spell,
    abilityCategory: ActionCategoryName.Wisdom,
    charge: 2,
    abilityCaracs: {},
    autoTarget: AutoTargetKey.Self,
    description: "Not me !",
    abilityId: "Hide"
  },
  FeldonsCane: {
    name: "FeldonsCane",
    cardType: ActionTypeName.Spell,
    abilityCategory: ActionCategoryName.Intelligence,
    charge: 1,
    abilityCaracs: {},
    autoTarget: AutoTargetKey.Self,
    description: "The good ol' days",
    abilityId: "RecycleDeck"
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
