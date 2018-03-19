import * as React from "react";
import { CellProps, CellsBoardProps } from "../types/index";

export const Cell = (props: CellProps) => {
  return (
    <span>
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          props.activateCell(props.idx);
          props.endTurn();
        }}
      >
        [{props.cell}]
      </a>
    </span>
  );
};

export const CellsBoard = (props: CellsBoardProps) => {
  if (props.ctx.gameover === "0") {
    return <div>You win!</div>;
  } else {
    return (
      <div>
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
