import * as React from "react";
import { getColor } from "../action/Skill";
import { CardProps, ActionsBoardProps } from "../types";
import { Card } from "../action/type";
import { getCards } from "../state/getters";

export const PlayerCard = (props: CardProps) => {
  return (
    <svg height="210" width="210">
      <rect
        width="150"
        height="200"
        style={{ fill: getColor(props.card) }}
        stroke="black"
        rx="20"
        ry="20"
        onClick={e => {
          e.preventDefault();
          console.log("yo");
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

export const CardsBoard = (props: ActionsBoardProps) => {
  if (getCards(props.G, props.playerId).length > 0) {
    return (
      <div>
        {props.G.playersContext[props.playerId].cards.map(
          (card: Card, idx: number) => (
            <PlayerCard
              key={idx}
              activateCard={props.moves.activateCard}
              endTurn={props.events.endTurn}
              G={props.G}
              ctx={props.ctx}
              card={card}
              index={idx}
              playerId={props.playerId}
            />
          )
        )}
      </div>
    );
  } else {
    return <div />;
  }
};
