import { SimpleGame, GameContext, PlayerContext } from "./types/index";
import { Game } from "boardgame.io/core";
import { TriggerPhase, SkillCategoryName } from "./action/skillLib";
import { initMapSetup } from "./map/mapDefinitions";
import {
  getSelectedActionCategory,
  getHealth,
  getCards
} from "./state/getters";
import { setEndTurn, setCards, setSelectedAction } from "./state/setters";
import { loadSkill } from "./action/Skill";
import { triggerPower } from "./action/Power";
import { toKey } from "./map/Cell";
import { triggerMonsterSkill } from "./map/Avatar";
import { Avatar } from "./map/type";
import {
  triggerEnchantments,
  plugCard,
  cleanDeadMonsters,
  getActiveAction,
  getBlackCrystalCellAvatarId
} from "./state/gameLogic";
// import { loadCard } from "./action/Card";

function initPlayerContext(playerId: string): PlayerContext {
  return {
    playerID: playerId,
    skills: [
      loadSkill("Move"),
      loadSkill("Draw"),
      loadSkill("Cristallize"),
      loadSkill("Attack")
    ],
    selectedSkill: null,
    caracs: {
      healthInit: 5,
      healthCurrent: 5,
      attackValue: 1
    },
    cards: []
  };
}

const CrystalHunt = Game({
  setup: (): SimpleGame => {
    // TODO : playersContext should be dropped and state flattened.
    // TODO : dynamically set the monsterCounter.
    const basicSetup = initMapSetup();
    return {
      map: basicSetup.map,
      playersContext: { 0: initPlayerContext("0"), 1: initPlayerContext("1") },
      avatars: basicSetup.basicAvatars,
      blackCrystalCellId: basicSetup.blackCrystalCellId,
      monsterCounter: 2,
      endTurn: false,
      selectedAction: null
    };
  },
  moves: {
    // it seems that G and ctx are injected
    activateCell: (G: SimpleGame, ctx: GameContext, cellXY: number[]) => {
      /* activateCell Workflow :
        - Retrieve Skill (TODO : failover if no skill)
        - Trigger Skill (TODO : check prior conditions)
        - Unselect skill
        - endTurn
        TODO : Log the action, to display to players.
        */
      const selectedActionCategory = getSelectedActionCategory(
        G,
        ctx.currentPlayer
      );
      // Phase is active if selectedAction !== null.
      // TODO : Explicit more ?
      const selectedAction = getActiveAction(
        G,
        ctx.currentPlayer,
        selectedActionCategory!
      );
      const playerMoved = triggerPower(
        selectedAction,
        G,
        ctx,
        toKey(cellXY[0], cellXY[1])
      );
      const actionSaved: SimpleGame = setSelectedAction(
        playerMoved,
        null,
        ctx.currentPlayer
      );
      const endTurn: SimpleGame = setEndTurn(actionSaved, true);
      return endTurn;
    },
    activateAction: (
      G: SimpleGame,
      ctx: GameContext,
      categoryName: SkillCategoryName
    ) => {
      /* activateAction workflow :
        - Retrieve Active Action (Spell, if not Skill)
        - Check if TargetRequired, Select the skill and wait for target.
        - If not, Trigger the power,
        - If not Draw skill end turn (To refactor!).
        TODO : Preview the legal targets.
        TODO : Review endTurn workflow
      */
      const action = getActiveAction(G, ctx.currentPlayer, categoryName);
      console.log("Activating " + categoryName);
      if (action.isTargetRequired) {
        console.log(action.name + " is selected");
        // Corresponding category is stored in the state.
        const skillSaved: SimpleGame = setSelectedAction(
          G,
          action.skillCategory,
          ctx.currentPlayer
        );
        return skillSaved;
      } else {
        console.log(action.name + " is triggered");
        // State is modified by the power.
        const powerTriggered = triggerPower(action, G, ctx, "");
        // EndTurn is triggered.
        const turnEnded = setEndTurn(powerTriggered, true);
        // Todo : Implement a better workflow
        return action.name === "Draw" ? powerTriggered : turnEnded;
      }
    },
    activateCard: (
      G: SimpleGame,
      ctx: GameContext,
      cardIndex: number,
      playerId: string
    ) => {
      /* Pick Card workflow :
         - Plug the card
         - Clean card board 
         - EndTurn is triggered.
      */
      const cardPlugged = plugCard(G, playerId, cardIndex);
      const cardsCleaned = setCards(cardPlugged, playerId, []);
      const turnEnded = setEndTurn(cardsCleaned, true);
      return turnEnded;
    }
  },

  flow: {
    // EndGame workflow, checking victory conditions, returning winner playerId
    endGameIf: (G: SimpleGame, ctx: GameContext) => {
      const avatarOnCentralCell = getBlackCrystalCellAvatarId(G);
      // Checking player on centrall Cell
      if (avatarOnCentralCell !== null) {
        return avatarOnCentralCell;
      }
      // Checking player0 is alive
      if (getHealth(G, "0") < 1) {
        return "1";
      }
      // Checking player1 is alive
      if (getHealth(G, "1") < 1) {
        return "0";
      }
      return;
    },
    endTurnIf: (G: SimpleGame, ctx: GameContext) => G.endTurn,
    onTurnEnd: (G: SimpleGame, ctx: GameContext) => {
      // EndTurn Workflow : Clean deadMonsters, triggerEnchantments, reset EndTurn.
      const deadMonstersCleaned = cleanDeadMonsters(G);
      // Trigger EndTurnEchantment
      const enchantmentTriggered = triggerEnchantments(
        deadMonstersCleaned,
        ctx,
        ctx.currentPlayer,
        TriggerPhase.TurnEnd
      );
      // Reset EndTurnProp
      return setEndTurn(enchantmentTriggered, false);
    },
    onTurnBegin: (G: SimpleGame, ctx: GameContext) => {
      let monsters = G.avatars.filter(avatar => avatar.type === "Monster");
      let tempG = { ...G };
      // Each monster will trigger their skill then pass the state to the next.
      let reducer = (prevG: SimpleGame, currMonster: Avatar) =>
        triggerMonsterSkill(prevG, ctx, currMonster.id);
      return monsters.reduce(reducer, tempG);
    },
    phases: [
      {
        name: "Choose Action",
        allowedMoves: ["activateAction"],
        endPhaseIf: (G: SimpleGame, ctx: GameContext) => {
          return (
            getSelectedActionCategory(G, ctx.currentPlayer) !== null ||
            getCards(G, ctx.currentPlayer).length > 0
          );
        },
        onPhaseBegin: (G: SimpleGame, ctx: GameContext) => {
          return G;
        }
      },
      {
        name: "Choose Cell",
        allowedMoves: ["activateCell"],
        endPhaseIf: (G: SimpleGame, ctx: GameContext): boolean => {
          return (
            getSelectedActionCategory(G, ctx.currentPlayer) === null ||
            getCards(G, ctx.currentPlayer).length > 0
          );
        }
      },
      {
        name: "Pick a Card",
        allowedMoves: ["activateCard"],
        endPhaseIf: (G: SimpleGame, ctx: GameContext) => {
          return getCards(G, ctx.currentPlayer).length === 0;
        }
      }
    ]
  }
});

export default CrystalHunt;
