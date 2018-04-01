import {
  TriggerPhase,
  ActionType,
  SkillCategoryName
} from "../action/skillLib";
import { SimpleGame, GameContext } from "../types";
import {
  getEnchantment,
  getEnchantmentTrigger,
  getHealthInit,
  getHealth,
  getCard,
  getCategory,
  getSkillByCat,
  getSpell,
  getMonsterCounter,
  getBlackCrystalCellId,
  getAvatarOnCell
} from "./getters";
import { triggerPower } from "../action/Power";
import { setHealth, setCards, addMonster, setCellAvatar } from "./setters";
import { Avatar } from "../map/type";
import {
  loadCard,
  getCardType,
  loadEnchantment,
  loadEquipment,
  loadSpell
} from "../action/Card";
import { Skill, Spell, Caracs } from "../action/type";
import { initMonsterAvatar } from "../map/Avatar";

// auto triggering enchantment logic
// TODO : Handle several enchantment triggers
export function triggerEnchantments(
  G: SimpleGame,
  ctx: GameContext,
  playerId: string,
  triggerValue: TriggerPhase
): SimpleGame {
  const enchantment = getEnchantment(G, playerId, "NoCategory");
  const trigger = getEnchantmentTrigger(G, playerId, "NoCategory");
  // Trigger enchantment based on trigger value.
  const enchantmentTriggered: SimpleGame =
    enchantment !== undefined && trigger === TriggerPhase.TurnEnd
      ? triggerPower(
          getEnchantment(G, playerId, "NoCategory"),
          G,
          ctx,
          playerId
        )
      : G;
  return enchantmentTriggered;
}

// Heal key word : Adding value to health, max by healthInit
export function heal(
  g: SimpleGame,
  avatarId: string,
  value: number
): SimpleGame {
  const currentHealth = getHealth(g, avatarId);
  const max = getHealthInit(g, avatarId);
  return currentHealth + value < max
    ? setHealth(g, avatarId, currentHealth + value)
    : setHealth(g, avatarId, max);
}

// Damage key word : substracting value to health, min by 0.
export function damage(
  g: SimpleGame,
  avatarId: string,
  value: number
): SimpleGame {
  const currentHealth = getHealth(g, avatarId);
  return currentHealth - value < 0
    ? setHealth(g, avatarId, 0)
    : setHealth(g, avatarId, currentHealth - value);
}

// TODO : Refactor, don't access state directly, use setter only
export function cleanDeadMonsters(g: SimpleGame): SimpleGame {
  const deadMonsters: Array<Avatar> = g.avatars.filter(avatar => {
    return avatar.type === "Monster" && avatar.caracs.healthCurrent < 1;
  });
  let tempG = { ...g };
  deadMonsters.forEach((avatar: Avatar) => {
    tempG = {
      ...tempG,
      map: {
        ...tempG.map,
        [avatar.position]: {
          ...tempG.map[avatar.position],
          avatar: null
        }
      }
    };
  });
  const notOnCellAnymore = tempG;
  // Clean dead monsters from Avatars.
  const noDeadOnAvatars: SimpleGame = {
    ...notOnCellAnymore,
    avatars: notOnCellAnymore.avatars.filter(
      avatar => avatar.caracs.healthCurrent > 0 || avatar.type === "Player"
    )
  };
  return noDeadOnAvatars;
}

// Draw key words : Replace cards of a player with full new cards.
// TODO : Correctly implements deck mechanism.
export function drawCards(g: SimpleGame, playerId: string): SimpleGame {
  return setCards(g, playerId, [
    loadCard("Sword"),
    loadCard("CrystalAffinity"),
    loadCard("SummonMonster")
  ]);
}

// Plug keyword : Plugging a card is based on its type.
// Spell/Equipment are linked to the corresponding slot of their category.
// Enchantment are linked to the Intelligence Spell slot.
export function plugCard(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  switch (getCardType(getCard(g, playerId, cardIndex))) {
    case ActionType.Equipment:
      return plugEquipment(g, playerId, cardIndex);
    case ActionType.Enchantment:
      return plugEnchantment(g, playerId, cardIndex);
    case ActionType.Spell:
      return plugSpell(g, playerId, cardIndex);
    default:
      return g;
  }
}

// Make it plugs on Intelligence prop only
// (Enchantment should be longer to cast, trigger intelligence twice : draw card, then cast enchantment)
export function plugEnchantment(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const card = getCard(g, playerId, cardIndex);
  return { ...g, [`enchantmentPlayer${playerId}`]: loadEnchantment(card) };
}

// Make it plugs on categorized prop (aka equipmentStrengthPlayer, or equipmentDexterityPlayer)
export function plugEquipment(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const card = getCard(g, playerId, cardIndex);
  return { ...g, [`equipmentPlayer${playerId}`]: loadEquipment(card) };
}

// Stored in the categorized spell slot of the player.
export function plugSpell(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const card = getCard(g, playerId, cardIndex);
  const category = getCategory(card).toLowerCase();
  return { ...g, [`${category}SpellPlayer${playerId}`]: loadSpell(card) };
}

// Active Action is the spell one if any, if not it's the skill one.
export function getActiveAction(
  g: SimpleGame,
  playerId: string,
  categoryName: SkillCategoryName
): Skill | Spell {
  const spell = g[`${categoryName!.toLowerCase()}SpellPlayer${playerId}`];
  return spell !== null && spell !== undefined
    ? getSpell(g, playerId, categoryName!)
    : getSkillByCat(g, playerId, categoryName!);
}

export function summon(
  g: SimpleGame,
  monsterName: string,
  cellId: string,
  caracs?: Caracs
): SimpleGame {
  // TODO : Better handling of the id, it's overloaded in the setter function.
  console.log("in summon");
  console.log(caracs);  
  const monster = initMonsterAvatar("NeverMind", cellId, caracs);
  const monsterAdded = addMonster(g, monster);
  const monsterPositionned = setCellAvatar(
    monsterAdded,
    cellId,
    "M" + getMonsterCounter(monsterAdded).toString()
  );
  return monsterPositionned;
}

// Black Crystal Cell is identified by the BlackCrystalCellId.
export function getBlackCrystalCellAvatarId(g: SimpleGame ): string | null {
  return getAvatarOnCell(g, getBlackCrystalCellId(g));
}