import * as React from "react";
import { GameBoardProps } from "../types/index";
import { ActionsBoard } from "../skill/ActionsBoard";
import PlayerInfo from "./PlayerInfo";
import CurrentPhase from "./CurrentPhase";
import MapBoard from "../map/MapBoard";
import "../index.css";
import { getHealth } from "../state/getters";

export const GameBoard = (props: GameBoardProps) => {
  if (props.ctx.gameover !== undefined) {
    return <div className="container">Player {props.ctx.gameover} wins!</div>;
  } else {
    return (
      <div className="container">
        <PlayerInfo
          ID={props.playerID}
          currentPlayer={props.ctx.currentPlayer}
          currentHealth={getHealth(props.G, props.playerID)}
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
        />
      </div>
    );
  }
};
