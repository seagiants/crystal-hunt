import { Class2Name } from "./Avatar";

export const class2Lib: { [key in Class2Name]: Array<string> } = {
  Warrior: [
    "Sword",
    "Axe",
    "HealingPotion",
    "FireAura",
    "SummonMonster",
    "NikeRMax",
    "Regeneration",
    "ShoesOfTheGiants"
  ],
  Mage: [
    "SummonMonster",
    "Fireball",
    "MentalExplosion",
    "CrystalAffinity",
    "Telekinesy",
    "Teleportation",
    "GandalfStaff"
  ],
  Assassin: ["SummonMonster", "Fireball", "MentalExplosion", "CrystalAffinity"],
  Monster: []
};
