import * as React from "react";
import { GameBoardProps } from "../types/index";
import { ActionsBoard } from "../skill/ActionsBoard";
import PlayerInfo from "./PlayerInfo";
import CurrentPhase from "./CurrentPhase";
import MapBoard from "../map/MapBoard";
import "../index.css";
import { getAvatarOnCell } from "../state/getters";

export const GameBoard = (props: GameBoardProps) => {
  if (props.ctx.gameover === true) {
    return (
      <div className="container">
        Player {getAvatarOnCell(props.G, 1, 1)} wins!
      </div>
    );
  } else {
    return (
      <div className="container">
        <PlayerInfo
          ID={props.playerID}
          currentPlayer={props.ctx.currentPlayer}
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
