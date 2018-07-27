import { KlassName } from "./Avatar";

export const klassLib: { [key in KlassName]: Array<string> } = {
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
