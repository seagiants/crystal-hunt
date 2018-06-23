import { Class2Name } from "./Avatar";

export const class2Lib: { [key in Class2Name]: Array<string> } = {
  Warrior: [
    "Sword",
    "Axe",
    "HealingPotion",
    "SummonMonster",
    "NikeRMax",
    "Regeneration",
    "ShoesOfTheGiants",
    "FeldonsCane"
  ],
  Mage: [
    "SummonMonster",
    "Fireball",
    "MentalExplosion",
    "CrystalAffinity",
    "FireAura",
    "Teleportation",
    "GandalfStaff",
    "FeldonsCane"
  ],
  Assassin: [
    "SetATrickyTrap",
    "PoisonnedArrows",
    "Illusion",
    "Doliprane",
    "SummonSpiderNest",
    "FishermansFriend",
    "SevenLeagueBoots",
    "FeldonsCane"
  ],
  Monster: []
};
