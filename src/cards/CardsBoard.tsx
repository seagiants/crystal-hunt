import * as React from "react";
import { getColor } from "../action/Skill";
import { TilesBoardProps } from "../types";
import { CardTileProps, Card } from "./types";
import { getCards } from "./stateAccessors";
import { splitCardName } from "./Card";

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
      {splitCardName(props.card.name).map((name, i) => {
        console.log("card name", name);
        return (
          <text
            x="10"
            y={(20 * (i + 1)).toString()}
            fontSize="10"
            key={`${name}-${i}`}
          >
            {name}
          </text>
        );
      })}
      {}
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
