import * as React from "react";
// import { CellProps, CellsBoardProps } from "./types/index";
import { GameBoardProps } from "./types/index";
import { CellsBoard } from "./CellsBoard";
import { SkillsBoard } from "./SkillsBoard";
import CurrentPhase from "./CurrentPhase";
import "./index.css";

export const GameBoard = (props: GameBoardProps) => {
  if (props.ctx.gameover === "0") {
    return <div className="container">You win!</div>;
  } else {
    return (
      <div className="container">
        <CurrentPhase currentPhase={props.ctx.phase} />
        <SkillsBoard
          G={props.G}
          ctx={props.ctx}
          moves={props.moves}
          events={props.events}
        />
        <CellsBoard
          G={props.G}
          ctx={props.ctx}
          moves={props.moves}
          events={props.events}
        />
      </div>
    );
  }
};
