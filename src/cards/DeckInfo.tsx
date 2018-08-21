import * as React from "react";
import { SimpleGame } from "../types";

interface DeckInfoProps {
  G: SimpleGame;
}

export const DeckInfo = (props: DeckInfoProps) => (
  <div>There is {props.G.decksPlayer0.length} cards left in your deck</div>
);
