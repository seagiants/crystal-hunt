import { SimpleGame, GameContext, PlayerContext } from "./types/index";
import { Game } from "boardgame.io/core";
import { initMapSetup } from "./map/mapDefinitions";
import { getSelectedActionCategory, getHealth } from "./state/getters";
import { setSelectedAction } from "./state/setters";
import { toKey, toPathMatrix } from "./map/Cell";
import {
  cleanDeadMonsters,
  getBlackCrystalCellAvatarId,
  updateActionsStatus,
  setActionClicked,
  cleanDeadAction
} from "./state/gameLogic";
import { loadDeck } from "./cards/Card";
import { getCards } from "./cards/stateAccessors";
import { discardCards, plugCard } from "./cards/cardLogic";
import { ActionTileStatus } from "./old/type";
import {
  loadBasicActions,
  resetActionCount,
  upActionCount
} from "./action/actionStateHandling";
import { ActionsFlow, ActionFlow, ActionCategoryName } from "./action/Action";
import {
  getActiveAction,
  triggerAction,
  isTargetRequired,
  autoTarget,
  exhaustAction,
  autoTriggerActions
} from "./action/actionLogic";

// Todo : Refactor, flatten playerContext or merge other props in playerContext
function initPlayerContext(playerId: string): PlayerContext {
  return {
    playerID: playerId,
    actions: loadBasicActions(playerId),
    cards: [],
    actionFlows: initActionsFlow()
  };
}

// Todo : Refactor
function initActionsFlow(): ActionsFlow {
  const initActionFlow = (category: ActionCategoryName): ActionFlow => ({
    status: ActionTileStatus.Avalaible,
    actionCategory: category,
    exhaustCounter: 0
  });
  return {
    Dexterity: initActionFlow(ActionCategoryName.Dexterity),
    Intelligence: initActionFlow(ActionCategoryName.Intelligence),
    Wisdom: initActionFlow(ActionCategoryName.Wisdom),
    Strength: initActionFlow(ActionCategoryName.Strength)
  };
}

export const setupGame = (): SimpleGame => {
  // TODO : playersContext should be dropped and state flattened.
  // TODO : dynamically set the monsterCounter.
  const basicSetup = initMapSetup();
  return {
    map: basicSetup.map.cells,
    xMax: basicSetup.map.xMax,
    yMax: basicSetup.map.yMax,
    players: { 0: initPlayerContext("0"), 1: initPlayerContext("1") },
    avatars: basicSetup.basicAvatars,
    blackCrystalCellId: basicSetup.blackCrystalCellId,
    monsterCounter: 2,
    actionCount: 0,
    selectedAction: null,
    decksPlayer0: loadDeck(),
    decksPlayer1: loadDeck(),
    infoMessages: ["Game started"],
    pathMatrix: []
  };
};

const CrystalHunt = Game({
  setup: (): SimpleGame => setupGame(),
  moves: {
    // it seems that G and ctx are injected
    activateCell: (G: SimpleGame, ctx: GameContext, cellXY: number[]) => {
      /* activateCell Workflow :
        - Retrieve Action (TODO : failover if no skill)
        - If action, Trigger Action (TODO : check prior conditions)
        - Unselect Action
        - endTurn
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
      // The failover is probably useless as
      const actionTriggered =
        selectedAction !== null && selectedAction !== undefined
          ? triggerAction(
              G,
              selectedAction,
              ctx.currentPlayer,
              toKey(cellXY[0], cellXY[1])
            )
          : G;
      const actionUnsaved: SimpleGame = setSelectedAction(
        actionTriggered,
        null,
        ctx.currentPlayer
      );
      const actionFinalized: SimpleGame = exhaustAction(
        actionUnsaved,
        ctx.currentPlayer,
        selectedAction
      );
      return actionFinalized;
    },
    activateAction: (
      G: SimpleGame,
      ctx: GameContext,
      categoryName: ActionCategoryName
    ) => {
      /* activateAction workflow :
        - Retrieve Active Action (Spell, if not, Equipment)
        - Mark Action Tile as clicked,
        - Check if TargetRequired, Select the Action and wait for target.
        - If not, Trigger the ability,
        - If action is final, action is counted.
        TODO : Review endTurn workflow
      */
      // Retrieving active Action.
      const action = getActiveAction(G, ctx.currentPlayer, categoryName);
      console.log("Activating " + categoryName);
      // Corresponding ActionTile is marked as clicked
      const actionClicked = setActionClicked(
        G,
        ctx.currentPlayer,
        categoryName
      );
      // Check if a target is required before triggering action.
      if (isTargetRequired(action)) {
        // Corresponding category is stored in the state.
        const actionSaved: SimpleGame = setSelectedAction(
          actionClicked,
          action.abilityCategory,
          ctx.currentPlayer
        );
        console.log(action.name + " is selected");
        return actionSaved;
      } else {
        // State is modified by the power.
        // Then Action is exhausted.
        // By default, the triggered category is given as target (aka isTargetRequired = false)
        const actionTriggered = triggerAction(
          actionClicked,
          action,
          ctx.currentPlayer,
          autoTarget(action)
        );
        console.log(action.name + " is triggered");
        // ActionCount is finalized if no card is drawn.
        // Todo : Implement a better workflow
        const actionExhausted = exhaustAction(
          actionTriggered,
          ctx.currentPlayer,
          action
        );
        return actionExhausted;
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
      const cardsCleaned = discardCards(cardPlugged, playerId);
      // When picking card, one action is counted.
      const actionCounted = upActionCount(cardsCleaned);
      return actionCounted;
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
    endTurnIf: (G: SimpleGame, ctx: GameContext) => G.actionCount >= 2,
    onTurnEnd: (G: SimpleGame, ctx: GameContext) => {
      // EndTurn Workflow :
      // Trigger EndTurn Actions
      const endTurnActionsTriggered = autoTriggerActions(
        G,
        ctx.currentPlayer,
        TriggerPhase.TurnEnd
      );
      // Deal with ActionStatus
      const actionStatusUpdated = updateActionsStatus(
        endTurnActionsTriggered,
        ctx.currentPlayer
      );
      // Clean Phase, to refactor ??
      // Clean deadMonsters
      const deadMonstersCleaned = cleanDeadMonsters(actionStatusUpdated);
      // Clean Exhausted Spell
      const exhaustedSpellCleaned = cleanDeadAction(
        deadMonstersCleaned,
        ctx.currentPlayer
      );
      // Reset ActionCount Prop
      return resetActionCount(exhaustedSpellCleaned);
    },
    onTurnBegin: (G: SimpleGame, ctx: GameContext) => {
      // Update pathMatrix.
      return {
        ...G,
        pathMatrix: toPathMatrix(G)
      };
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
        },
        onPhaseEnd: (G: SimpleGame, ctx: GameContext) => {
          // Update the pathMatrix.
          return { ...G, pathMatrix: toPathMatrix(G) };
        }
      },
      {
        name: "Choose Cell",
        allowedMoves: ["activateCell", "activateAction"],
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
