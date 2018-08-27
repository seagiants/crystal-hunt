import * as React from "react";
import { SimpleGame } from "../types";

interface DeckInfoProps {
  G: SimpleGame;
  playerId: string;
}

export const DeckInfo = (props: DeckInfoProps) => {
  if (props.playerId === "0") {
    return <div>{props.G.decksPlayer0.length} cards left in your deck</div>;
  } else {
    return <div>{props.G.decksPlayer1.length} cards left in your deck</div>;
  }
};
