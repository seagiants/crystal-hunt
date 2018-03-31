import { Skill, SkillCategory, Card } from "./type";

export enum SkillName {
  Move = "Move",
  Cristallize = "Cristallize",
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
    caracs: {
      attackValue: 2
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
    powerName: "HealSelf"
  }
};

export const SkillLib: { [key in SkillName]: Skill } = {
  Move: {
    name: SkillName.Move,
    skillCategory: SkillCategoryName.Dexterity,
    symbol: 1,
    isTargetRequired: true,
    powerName: "Move",
    caracs: {
      speed: 1
    }
  },
  Cristallize: {
    name: SkillName.Cristallize,
    skillCategory: SkillCategoryName.Wisdom,
    symbol: 2,
    isTargetRequired: false,
    powerName: "Cristallize",
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
      attackValue: 1
    }
  },
  Draw: {
    name: SkillName.Draw,
    skillCategory: SkillCategoryName.Intelligence,
    symbol: 3,
    isTargetRequired: false,
    powerName: "Draw",
    caracs: {
      drawCards: 1
    }
  }
};

export const SkillCategoryLib: { [key in SkillCategoryName]: SkillCategory } = {
  Dexterity: {
    name: SkillCategoryName.Dexterity,
    color: "green"
  },
  Intelligence: {
    name: SkillCategoryName.Intelligence,
    color: "blue"
  },
  Wisdom: {
    name: SkillCategoryName.Wisdom,
    color: "yellow"
  },
  Strength: {
    name: SkillCategoryName.Strength,
    color: "red"
  }
};
