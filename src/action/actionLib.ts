import {
  ActionCategoryName,
  ActionTypeName,
  ActionLib,
  ActionCategory
} from "./Action";
import { SimpleGame } from "../types";
import { initAction } from "./actionStateHandling";

export const ActionCategoryLib: {
  [key in ActionCategoryName]: ActionCategory
} = {
  Dexterity: {
    name: ActionCategoryName.Dexterity,
    color: "#009933",
    clickedColor: "#66ff66",
    exhaustedColor: "gray"
  },
  Intelligence: {
    name: ActionCategoryName.Intelligence,
    color: "#0000ff",
    clickedColor: "#3399ff",
    exhaustedColor: "gray"
  },
  Wisdom: {
    name: ActionCategoryName.Wisdom,
    color: "#ffff00",
    clickedColor: "#ffff99",
    exhaustedColor: "gray"
  },
  Strength: {
    name: ActionCategoryName.Strength,
    color: "#ff0005",
    clickedColor: "#ff5050",
    exhaustedColor: "gray"
  }
};

export const BasicActionLib: ActionLib = {
  Move: {
    name: "Move",
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Dexterity,
    abilityId: "Move",
    abilityCaracs: {
      moveRange: 0
    }
  },
  Crystallize: {
    name: "Crystalize",
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Wisdom,
    abilityId: "Crystalize",
    abilityCaracs: {
      quantity: 1
    }
  },
  Attack: {
    name: "Attack",
    abilityCategory: ActionCategoryName.Strength,
    cardType: ActionTypeName.Equipment,
    abilityId: "Attack",
    abilityCaracs: {
      attackValue: 0
    }
  },
  Draw: {
    name: "Draw",
    abilityCategory: ActionCategoryName.Intelligence,
    cardType: ActionTypeName.Equipment,
    abilityId: "Draw",
    isFinal: false,
    abilityCaracs: {
      drawCards: 3
    }
  }
};

export const MonsterActionLib: ActionLib = {
  CircularAttack: {
    name: "CircularAttack",
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    abilityId: "CircularAttack",
    abilityCaracs: {}
  },
  Attack: {
    name: "MonsterAttack",
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    abilityId: "Attack",
    abilityCaracs: {}
  },
  PoisonAttack: {
    name: "MonsterPoisonAttack",
    cardType: ActionTypeName.Equipment,
    abilityCategory: ActionCategoryName.Strength,
    abilityId: "PoisonAttack",
    abilityCaracs: {}
  }
};

export const UpgradeLib: ActionLib = {
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

/** Load monster action based on a actionName and a monsterId. */
export function loadActionMonster(
  g: SimpleGame,
  monsterId: string,
  actionName: string
) {
  const template = MonsterActionLib[actionName];
  return initAction(template, monsterId, "monster");
}
