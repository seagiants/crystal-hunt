import { Class2Name } from "./Avatar";

export const class2Lib: { [key in Class2Name]: Array<string> } = {
  Warrior: [
    "Sword",
    "Axe",
    "HealingPotion",
    "FireAura",
    "SummonMonster",
    "CrystalAffinity",
    "Regeneration",
    "GoldenShoes"
  ],
  Mage: ["SummonMonster", "Fireball", "MentalExplosion", "CrystalAffinity"],
  Assassin: ["SummonMonster", "Fireball", "MentalExplosion", "CrystalAffinity"],
  Monster: []
};
