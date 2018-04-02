import * as React from "react";
import { getColor } from "../action/Skill";
import { CardTileProps, TilesBoardProps } from "../types";
import { Card } from "../action/type";
import { getCards } from "../state/getters";

export const CardTile = (props: CardTileProps) => {
  return (
    <svg width="120" height="120">
      <rect
        width="100"
        height="120"
        style={{ fill: getColor(props.card) }}
        stroke="black"
        rx="20"
        ry="20"
        onClick={e => {
          e.preventDefault();
          props.activateCard(props.index, props.playerId);
          // props.endTurn();
        }}
      />
      <text x="35" y="50">
        Card
      </text>
      <text x="25" y="120">
        {props.card.name}
      </text>
    </svg>
  );
};

export const CardsBoard = (props: TilesBoardProps) => {
  const cards: Array<Card> = getCards(props.G, props.playerId);
  if (cards.length > 0) {
    return (
      <div>
        {cards.map((card: Card, idx: number) => (
          <CardTile
            key={idx}
            activateCard={props.moves.activateCard}
            endTurn={props.events.endTurn}
            card={card}
            index={idx}
            playerId={props.playerId}
          />
        ))}
      </div>
    );
  } else {
    return <div />;
  }
};
