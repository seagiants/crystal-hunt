import * as React from "react";
import { CellProps, CBProps } from "./types/index";
import "./CellsBoard.css";

export const Cell = (props: CellProps) => {
  let idx = props.idx;
  return (
    <span>
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          props.activateCell(idx);
        }}
      >
        [{props.cell}]
      </a>
    </span>
  );
};

export const CellsBoard = (props: CBProps) => {
  if (props.ctx.gameover === "0") {
    return <div className="container">You win!</div>;
  } else {
    return (
      <div className="container">
        {props.G.cells.map((cell: number, idx: number) => (
          <Cell
            key={idx}
            activateCell={props.moves.activateCell}
            endTurn={props.events.endTurn}
            G={props.G}
            cell={cell}
            idx={idx}
          />
        ))}
      </div>
    );
  }
};
