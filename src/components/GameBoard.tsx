import * as React from "react";
import { GameBoardProps } from "../types/index";
import { ActionsBoard } from "../action/ActionsBoard";
import PlayerInfo from "./PlayerInfo";
import CurrentPhase from "./CurrentPhase";
import MapBoard from "../map/MapBoard";
import "../index.css";
import { getHealth, getInfos } from "../state/getters";
import { CardsBoard } from "./CardsBoard";

export const GameBoard = (props: GameBoardProps) => {
  if (props.ctx.gameover !== undefined) {
    return <div className="container">Player {props.ctx.gameover} wins!</div>;
  } else {
    return (
      <div>
        <div id="main-container">
          <PlayerInfo
            ID={props.playerID}
            currentPlayer={props.ctx.currentPlayer}
            currentHealth={getHealth(props.G, props.playerID)}
            infos={getInfos(props.G)}
          />
          <CurrentPhase currentPhase={props.ctx.phase} />
          <MapBoard
            G={props.G}
            ctx={props.ctx}
            moves={props.moves}
            events={props.events}
          />
          <ActionsBoard
            G={props.G}
            ctx={props.ctx}
            moves={props.moves}
            events={props.events}
            playerId={props.playerID}
          />
        </div>
        <div id="card-container">
          <CardsBoard
            G={props.G}
            ctx={props.ctx}
            moves={props.moves}
            events={props.events}
            playerId={props.playerID}
          />
        </div>
      </div>
    );
  }
};
