import * as React from "react";
import { TilesBoardProps } from "../types";
import { getCards } from "./cardStateHandling";
import { Card, splitCardName, getCardColor } from "./Card";

export interface CardTileProps {
  card: Card;
  index: number;
  playerId: string;
  activateCard(cardIndex: number, playerId: string): object;
  endTurn(): object;
}

export const CardTile = (props: CardTileProps) => {
  return (
    <svg width="120" height="140" key={props.index}>
      <rect
        width="110"
        height="140"
        style={{ fill: getCardColor(props.card) }}
        stroke="black"
        rx="20"
        ry="20"
        onClick={e => {
          e.preventDefault();
          props.activateCard(props.index, props.playerId);
        }}
      />
      {splitCardName(props.card.name).map((name, i) => {
        return (
          <text
            key={`${name}-${i}`}
            x="10"
            y={(15 * (i + 1)).toString()}
            fontSize="8"
          >
            {name}
          </text>
        );
      })}
      {Object.keys(props.card.abilityCaracs).map((carac, i) => (
        <text key={i} x="10" y={80 + (i + 1) * 10} fontSize="7">
          {`${carac}: ${props.card.abilityCaracs[carac]}`}
        </text>
      ))}
    </svg>
  );
};

export const CardsBoard = (props: TilesBoardProps) => {
  const cards: Array<Card> = getCards(props.G, props.playerId);
  if (cards.length > 0) {
    return (
      <div className="card-container">
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
