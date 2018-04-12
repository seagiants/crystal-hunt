import {
  TriggerPhase,
  ActionType,
  SkillCategoryName,
  SkillCategoryLib
} from "../action/skillLib";
import { SimpleGame, GameContext } from "../types";
import {
  getEnchantment,
  getEnchantmentTrigger,
  getHealthInit,
  getHealth,
  getCategory,
  getSkillByCat,
  getSpell,
  getMonsterCounter,
  getBlackCrystalCellId,
  getAvatarOnCell,
  isTrapped,
  getActionFlow,
  getCategories,
  getCrystallized,
  getAvatarPosition,
  hasUpgrade
} from "./getters";
import { triggerPower } from "../action/Power";
import {
  setHealth,
  addMonster,
  setCellAvatar,
  addInfoMessage,
  setActionFlow,
  upExhaustCounter,
  setExhaustCounter,
  setActionStatus,
  upActionCount,
  setSelectedAction
} from "./setters";
import { Avatar } from "../map/types";
import {
  getCardType,
  loadEnchantment,
  loadEquipment,
  loadSpell,
  loadUpgrade
} from "../cards/Card";
import {
  Skill,
  Spell,
  Caracs,
  ActionFlow,
  ActionTileStatus
} from "../action/type";
import { initMonsterAvatar } from "../map/Avatar";
import { getCard } from "../cards/stateAccessors";
import { toKey } from "../map/Cell";

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
  // Target is always current player
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

export function cleanExhaustedSpell(
  g: SimpleGame,
  playerId: string
): SimpleGame {
  let newG: SimpleGame;
  // Clean a spell if its charge < 1 for current category & player.
  function reducer(prevG: SimpleGame, categoryName: string) {
    const spellValue = g[`${categoryName.toLowerCase()}SpellPlayer${playerId}`];
    if (
      spellValue !== undefined &&
      spellValue !== null &&
      spellValue.charge !== undefined &&
      spellValue.charge < 1
    ) {
      return {
        ...prevG,
        [`${categoryName.toLowerCase()}SpellPlayer${playerId}`]: null
      };
    } else {
      return prevG;
    }
  }

  newG = Object.keys(SkillCategoryLib).reduce(reducer, g);
  return newG;
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

// TODO : Make it plugs on Intelligence prop only
// (Enchantment should be longer to cast, trigger intelligence twice : draw card, then cast enchantment)
export function plugEnchantment(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const card = getCard(g, playerId, cardIndex);
  return { ...g, [`enchantmentPlayer${playerId}`]: loadEnchantment(card) };
}

// TODO: Make it plugs on categorized prop (aka equipmentStrengthPlayer, or equipmentDexterityPlayer)
export function plugEquipment(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  // Equipment condition to upgrade is being on crystallized when equipped.
  const card = getCard(g, playerId, cardIndex);
  const isUpgraded = getCrystallized(g, getAvatarPosition(g, playerId)) && hasUpgrade(card);
  const loadedCard = isUpgraded ? loadUpgrade(card) : card;
  return { ...g, [`equipmentPlayer${playerId}`]: loadEquipment(loadedCard) };
}

// TODO: Stored in the categorized spell slot of the player.
export function plugSpell(
  g: SimpleGame,
  playerId: string,
  cardIndex: number
): SimpleGame {
  const card = getCard(g, playerId, cardIndex);
  const category = getCategory(card).toLowerCase();
  return { ...g, [`${category}SpellPlayer${playerId}`]: loadSpell(card) };
}

// TODO : Use only setters
// TODO : Better handling of charge caracs.
export function diminishChargeSpell(
  g: SimpleGame,
  playerId: string,
  categoryName: SkillCategoryName
): SimpleGame {
  const spell = getSpell(g, playerId, categoryName);
  console.log(
    "Diminish charge for " + categoryName + " spell of player " + playerId
  );
  return {
    ...g,
    [`${categoryName.toLowerCase()}SpellPlayer${playerId}`]: {
      ...spell,
      charge: spell.charge ? spell.charge - 1 : undefined
    }
  };
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
export function getBlackCrystalCellAvatarId(g: SimpleGame): string | null {
  return getAvatarOnCell(g, getBlackCrystalCellId(g));
}

// Refreshing Action : Set to Avalaible & exhaustCounter = 0
export function refreshAction(
  g: SimpleGame,
  playerId: string,
  category: SkillCategoryName
): SimpleGame {
  const refreshExhaustCounter = setExhaustCounter(g, playerId, category, 0);
  return setActionStatus(
    refreshExhaustCounter,
    playerId,
    category,
    ActionTileStatus.Avalaible
  );
}

// Updating Action Status is :
// switching clicked -> exhausted, exhausted && 0 -> avalaible then diminishing its exhaustCounter
export function updateActionStatus(
  g: SimpleGame,
  playerId: string,
  category: SkillCategoryName
): SimpleGame {
  const actionFlow: ActionFlow = getActionFlow(g, playerId, category);
  let status: ActionTileStatus;
  switch (actionFlow.status) {
    case ActionTileStatus.Clicked:
      status = ActionTileStatus.Exhausted;
      break;
    case ActionTileStatus.Exhausted:
      status =
        actionFlow.exhaustCounter === 0
          ? ActionTileStatus.Avalaible
          : ActionTileStatus.Exhausted;
      break;
    default:
      status = ActionTileStatus.Avalaible;
      break;
  }
  // Diminshing exhausted counter after status check to handle correctly avalaible vs exhausted.
  const exhaustCounter =
    actionFlow.exhaustCounter > 0 ? actionFlow.exhaustCounter - 1 : 0;
  return setActionFlow(g, playerId, category, {
    ...actionFlow,
    status: status,
    exhaustCounter: exhaustCounter
  });
}

// Refreshing all actions Status
export function updateActionsStatus(
  g: SimpleGame,
  playerId: string
): SimpleGame {
  return Object.keys(SkillCategoryName).reduce(
    (tempG, currCat) =>
      updateActionStatus(tempG, playerId, SkillCategoryName[currCat]),
    { ...g }
  );
}

// Switch the status of the current clicked tile, and restore the status of the previous one
export function setActionClicked(
  g: SimpleGame,
  playerId: string,
  category: SkillCategoryName
): SimpleGame {
  const tempG = getCategories().reduce(
    (prevG, currCat) => {
      const actionFlow = getActionFlow(g, playerId, currCat);
      // If currCat === category (clicked tile) or status = clicked (previous clicked tile) => update
      return currCat === category ||
        actionFlow.status === ActionTileStatus.Clicked
        ? setActionFlow(prevG, playerId, currCat, {
            ...actionFlow,
            status:
              // If Clicked, then Avalaible, nor Clicked (was the clicked one case)
              actionFlow.status === ActionTileStatus.Clicked
                ? ActionTileStatus.Avalaible
                : ActionTileStatus.Clicked
          })
        : prevG;
    },
    { ...g }
  );
  return tempG;
}
// Finalizing an Action : Up action Counter, set Action Tile to exhausted, clean saved Action
export function finalizeAction(g: SimpleGame, playerId: string, category: SkillCategoryName): SimpleGame {
  // Up Action counter
  const actionCounted = upActionCount(g);
  // Exhaust used Action
  const actionExhausted = setActionStatus(actionCounted, playerId, category, ActionTileStatus.Exhausted);
  // Clean saved action
  return setSelectedAction(actionExhausted, null, playerId);
}

// Check if a cell is trapped, if trigger the trapp (exhaust Dext + 3 & info).
export function triggerTrap(
  g: SimpleGame,
  playerId: string,
  cellId: string
): SimpleGame {
  if (isTrapped(g, cellId)) {
    // +3 exhaust to Dexterity
    const trappedPlayer = upExhaustCounter(
      g,
      playerId,
      SkillCategoryName.Dexterity,
      3
    );
    // Add a funky message
    return addInfoMessage(
      trappedPlayer,
      "Player" + playerId + " has been trapped on " + cellId + ", this punk..."
    );
  } else {
    return g;
  }
}

export function checkTraps(
  g: SimpleGame,
  playerId: string,
  path: [number, number][]
) {
  const movePath = path.filter((curr, index) => index !== 0);
  const trapsTriggered = movePath.reduce(
    (tempG, currCell) =>
      triggerTrap(tempG, playerId, toKey(currCell[0], currCell[1])),
    { ...g }
  );
  return trapsTriggered;
}
