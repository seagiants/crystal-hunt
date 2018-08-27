import * as React from "react";
import { GameBoardProps, ReadyState } from "../types/index";
import { ActionsBoard } from "../action/ActionsBoard";
import MutedActionBoard from "../action/MutedActionBoard";
import PlayerInfo from "./PlayerInfo";
import CurrentPhase from "./CurrentPhase";
import MapBoard from "../map/MapBoard";
import "../index.css";
import { getHealth, getInfos, getAvatar } from "../state/getters";
import { CardsBoard } from "../cards/CardsBoard";
import { TriggersList } from "../action/TriggersList";
import { getAutoTriggerActions } from "../action/actionStateHandling";
import AvatarSelector from "./AvatarSelector";

// ----- Utils
const getActionBoard = (props: GameBoardProps) => {
  if (props.isActive) {
    return (
      <ActionsBoard
        G={props.G}
        ctx={props.ctx}
        moves={props.moves}
        events={props.events}
        playerId={props.playerID}
      />
    );
  } else {
    return (
      <MutedActionBoard
        G={props.G}
        ctx={props.ctx}
        moves={props.moves}
        events={props.events}
        playerId={props.playerID}
      />
    );
  }
};

// ----- Component
export const GameBoard = (props: GameBoardProps) => {
  if (props.ctx.gameover !== undefined) {
    return <div className="container">Player {props.ctx.gameover} wins!</div>;
  }
  if (props.G.readyState !== ReadyState.Both) {
    return (
      <AvatarSelector
        readyState={props.G.readyState}
        moves={props.moves}
        playerID={props.playerID}
      />
    );
  } else {
    return (
      <div>
        <div className="main-container">
          <PlayerInfo
            ID={props.playerID}
            currentPlayer={props.ctx.currentPlayer}
            currentHealth={getHealth(props.G, props.playerID)}
            currentklass={getAvatar(props.G, props.playerID).klass}
            currentRace={getAvatar(props.G, props.playerID).race}
            infos={getInfos(props.G)}
          />
          <CurrentPhase currentPhase={props.ctx.phase} />
          <MapBoard
            G={props.G}
            ctx={props.ctx}
            moves={props.moves}
            events={props.events}
          />
          <TriggersList
            actions={getAutoTriggerActions(props.G, props.playerID)}
          />
          {getActionBoard(props)}
        </div>
        <CardsBoard
          G={props.G}
          ctx={props.ctx}
          moves={props.moves}
          events={props.events}
          playerId={props.playerID}
        />
      </div>
    );
  }
};
