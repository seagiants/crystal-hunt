import * as React from "react";
import { GameBoardProps } from "../types/index";
import { SkillsBoard } from "../skill/SkillsBoard";
import PlayerInfo from "./PlayerInfo";
import CurrentPhase from "./CurrentPhase";
import MapBoard from "../map/MapBoard";
import "../index.css";

export const GameBoard = (props: GameBoardProps) => {
  if (props.ctx.gameover === "0") {
    return <div className="container">You win!</div>;
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
        <SkillsBoard
          G={props.G}
          ctx={props.ctx}
          moves={props.moves}
          events={props.events}
        />
      </div>
    );
  }
};
