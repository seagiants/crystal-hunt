import { Skill, SkillCategory } from "./type";
import { Card } from "../cards/types";

export enum SkillName {
  Move = "Move",
  Crystallize = "Crystallize",
  Attack = "Attack",
  Draw = "Draw"
}

export enum SkillCategoryName {
  Dexterity = "Dexterity",
  Intelligence = "Intelligence",
  Wisdom = "Wisdom",
  Strength = "Strength"
}

export enum ActionType {
  Spell = "Spell",
  Skill = "Skill",
  Equipment = "Equipment",
  Enchantment = "Enchantment"
}

export enum TriggerPhase {
  TurnStart = "TurnStart",
  TurnEnd = "TurnEnd"
}

export const CardLib: { [key: string]: Card } = {
  Sword: {
    name: "Sword",
    type: ActionType.Equipment,
    skillCategory: SkillCategoryName.Strength,
    isTargetRequired: true,
    upgradeName: "SwordOfPower",
    caracs: {
      attackValue: 1
    },
    symbol: 2,
    powerName: "Attack"
  },
  CrystalAffinity: {
    name: "CrystalAffinity",
    type: ActionType.Enchantment,
    skillCategory: SkillCategoryName.Wisdom,
    isTargetRequired: false,
    trigger: TriggerPhase.TurnEnd,
    caracs: {
      healValue: 1
    },
    symbol: 3,
    powerName: "HealSelfOnCrystalized"
  },
  SummonMonster: {
    name: "SummonMonster",
    type: ActionType.Spell,
    skillCategory: SkillCategoryName.Strength,
    isTargetRequired: true,
    charge: 2,
    caracs: {
      attackValue: 3
    },
    symbol: 4,
    powerName: "Summon"
  },
  GoldenShoes: {
    name: "GoldenShoes",
    type: ActionType.Enchantment,
    skillCategory: SkillCategoryName.Dexterity,
    isTargetRequired: false,
    trigger: TriggerPhase.TurnEnd,
    caracs: {},
    symbol: 3,
    powerName: "Crystallize"
  },
  Fireball: {
    name: "Fireball",
    type: ActionType.Spell,
    skillCategory: SkillCategoryName.Strength,
    isTargetRequired: true,
    charge: 2,
    caracs: {
      attackValue: 1,
      attackRange: 5
    },
    symbol: 4,
    powerName: "Attack"
  },
  SevenLeagueBoots: {
    name: "SevenLeagueBoots",
    type: ActionType.Equipment,
    skillCategory: SkillCategoryName.Dexterity,
    isTargetRequired: true,
    caracs: {
      moveRange: 2
    },
    symbol: 2,
    powerName: "Move"
  },
  MentalExplosion: {
    name: "MentalExplosion",
    type: ActionType.Spell,
    skillCategory: SkillCategoryName.Intelligence,
    isTargetRequired: false,
    caracs: {
      charge: 2
    },
    symbol: 2,
    powerName: "DoubleDraw"
  },
  SetATrickyTrap: {
    name: "SetATrickyTrap",
    type: ActionType.Spell,
    skillCategory: SkillCategoryName.Dexterity,
    isTargetRequired: true,
    caracs: {
      charge: 1
    },
    symbol: 2,
    powerName: "TrapACell"
  },
  CrystalFiiiiiz: {
    name: "CrystalFiiiiiz",
    type: ActionType.Enchantment,
    skillCategory: SkillCategoryName.Wisdom,
    isTargetRequired: false,
    trigger: TriggerPhase.TurnEnd,
    caracs: {},
    symbol: 2,
    powerName: "RefreshActionOnCrystal"
  }
};

export const UpgradeLib: { [key: string]: Card } = {
  SwordOfPower: {
    name: "SwordOfPower",
    type: ActionType.Equipment,
    skillCategory: SkillCategoryName.Strength,
    isTargetRequired: true,
    upgradeName: "SwordOfPower",
    caracs: {
      attackValue: 3
    },
    symbol: 2,
    powerName: "Attack"
  }
};

export const BasicSkillLib: { [key in SkillName]: Skill } = {
  Move: {
    name: SkillName.Move,
    skillCategory: SkillCategoryName.Dexterity,
    symbol: 1,
    isTargetRequired: true,
    powerName: "Move",
    caracs: {
      moveRange: 0
    }
  },
  Crystallize: {
    name: SkillName.Crystallize,
    skillCategory: SkillCategoryName.Wisdom,
    symbol: 2,
    isTargetRequired: false,
    powerName: "Crystallize",
    caracs: {
      quantity: 1
    }
  },
  Attack: {
    name: SkillName.Attack,
    skillCategory: SkillCategoryName.Strength,
    symbol: 3,
    isTargetRequired: true,
    powerName: "Attack",
    caracs: {
      attackValue: 0
    }
  },
  Draw: {
    name: SkillName.Draw,
    skillCategory: SkillCategoryName.Intelligence,
    symbol: 3,
    isTargetRequired: false,
    powerName: "Draw",
    caracs: {
      drawCards: 3
    }
  }
};

export const SkillCategoryLib: { [key in SkillCategoryName]: SkillCategory } = {
  Dexterity: {
    name: SkillCategoryName.Dexterity,
    color: "#009933",
    clickedColor: "#66ff66",
    exhaustedColor: "gray"
  },
  Intelligence: {
    name: SkillCategoryName.Intelligence,
    color: "#0000ff",
    clickedColor: "#3399ff",
    exhaustedColor: "gray"
  },
  Wisdom: {
    name: SkillCategoryName.Wisdom,
    color: "#ffff00",
    clickedColor: "#ffff99",
    exhaustedColor: "gray"
  },
  Strength: {
    name: SkillCategoryName.Strength,
    color: "#ff0005",
    clickedColor: "#ff5050",
    exhaustedColor: "gray"
  }
};
