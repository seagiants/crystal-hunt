import { SimpleGame, GameContext } from "../types";
import {
  getSkillPower,
  SkillName,
  SkillCategoryName,
  getSkillCategory
} from "./skillLib";

export interface SkillCategory {
  name: SkillCategoryName;
  color: string;
}

export interface SkillJSON {
  name: SkillName;
  skillCategory: SkillCategoryName;
  symbol: number;
  isTargetRequired: boolean;
  caracs: Caracs;
  powerName: string;
}

export class Skill implements SkillJSON {
  name: SkillName;
  skillCategory: SkillCategoryName;
  symbol: number;
  isTargetRequired: boolean;
  caracs: Caracs;
  powerName: string;
  constructor(template: SkillJSON) {
    this.name = template.name;
    this.skillCategory = template.skillCategory;
    this.symbol = template.symbol;
    this.isTargetRequired = template.isTargetRequired;
    this.powerName = template.powerName;
    this.caracs = { ...template.caracs };
  }
  power(g: SimpleGame, ctx: GameContext, target: object): SimpleGame {
    console.log(this.getAddedCaracs(g, ctx.currentPlayer));    
    return getSkillPower(this.powerName)(
      g,
      ctx,
      target,
      this.getAddedCaracs(g, ctx.currentPlayer)
    );
  }
  // Add caracs (only number) from skill and player.
  // Todo handle Boolean caracs
  getAddedCaracs(g: SimpleGame, playerId: string): Caracs {
    let newCaracs: Caracs = { ...g.playersContext[playerId].caracs };
    Object.keys(this.caracs).forEach(carac => {
      newCaracs[carac] !== undefined
        ? (newCaracs[carac] = newCaracs[carac] + this.caracs[carac])
        : (newCaracs[carac] = this.caracs[carac]);
    });
    return newCaracs;
  }
  getColor(): string {
    return getSkillCategory(this.skillCategory).color;
  }
  toJSON(): SkillJSON {
    return {
      name: this.name,
      skillCategory: this.skillCategory,
      symbol: this.symbol,
      isTargetRequired: this.isTargetRequired,
      caracs: { ...this.caracs },
      powerName: this.powerName
    };
  }
}
// Correspond to key/value pairs for game elements (player, monster, skill, spell) caracteristics.
// Caracteristics are tagged name assiociated with some game logic.
export interface Caracs {
  [caracName: string]: number;
}

export interface AttackCaracs extends Caracs {
  // Used to determine the attack damage.
  attackValue: number;
  [caracName: string]: number;
}
export interface SkillPower {
  (
    G: SimpleGame,
    ctx: GameContext,
    target: object,
    powerCaracs: Caracs
  ): SimpleGame;
}

export type SkillPowerDicType = { [key in string]: SkillPower };

export type SkillDicType = { [key in SkillName]: SkillJSON };

export type SkillCategoryDicType = {
  [key in SkillCategoryName]: SkillCategory
};
