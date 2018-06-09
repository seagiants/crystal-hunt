import { Class2Name } from "./Avatar";

export const class2Lib: { [key in Class2Name]: Array<string> } = {
  Warrior: [
    "Sword",
    "Axe",
    "HealingPotion",
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
    "FireAura",
    "Teleportation",
    "GandalfStaff"
  ],
  Assassin: [
    "SetATrickyTrap",
    "PoisonnedArrows",
    "Illusion",
    "Doliprane",
    "SummonSpiderNest",
    "FishermansFriend",
    "SevenLeagueBoots"
  ],
  Monster: []
};
