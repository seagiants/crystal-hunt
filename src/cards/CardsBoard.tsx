import * as React from "react";
import { TilesBoardProps } from "../types";
import { getCards } from "./cardStateHandling";
import { Card, splitCardName, getCardColor } from "./Card";
import { Caracs } from "../action/Action";
import { OverlayTrigger, Tooltip } from "react-bootstrap/lib";
import { loadAbility } from "../action/ability/abilityLib";

// ----- Interfaces ----- // // FIXME should live in /types.ts
export interface CardTileProps {
  card: Card;
  index: number;
  playerId: string;
  activateCard(cardIndex: number, playerId: string): object;
  endTurn(): object;
}

interface CardNameProps {
  name: string;
}

interface ActionTypeProps {
  type: string;
}

interface CardCaracsProps {
  caracs: Caracs;
}

// ----- Components ----- //
const CardName = (props: CardNameProps) => {
  const splits = splitCardName(props.name).map((n, i) => {
    return (
      <text key={`${n}-${i}`} x="10" y={(15 * (i + 1)).toString()} fontSize="9">
        {n}
      </text>
    );
  });
  return <g>{splits}</g>;
};

const ActionType = (props: ActionTypeProps) => (
  <text x="10" y="60" fontSize="8">
    /{props.type.toUpperCase()}/
  </text>
);

const CardCaracs = (props: CardCaracsProps) => {
  const caracList = Object.keys(props.caracs).map((carac, i) => (
    <text key={i} x="10" y={80 + (i + 1) * 10} fontSize="7">
      {`${carac}: ${
        props.caracs[carac] > 0
          ? "+" + props.caracs[carac]
          : props.caracs[carac]
      }`}
    </text>
  ));
  return <g>{caracList}</g>;
};

function getCardDescription(card: Card) {
  return (
    <Tooltip id={"tooltip" + card.name} placement="bottom">
      <strong>
        {card.name} ({card.cardType})
      </strong>{" "}
      <br />
      {card.abilityId}: {loadAbility(card.abilityId).description}
      <br />
      {abilityCaracsDescription(card.abilityCaracs)}
    </Tooltip>
  );
}

function abilityCaracsDescription(caracs: Caracs) {
  const caracList = Object.keys(caracs).map((carac, i) => (
    <text key={i}>
      {`${carac}: ${caracs[carac] > 0 ? "+" + caracs[carac] : caracs[carac]}`}
      <br />
    </text>
  ));
  return <g>{caracList}</g>;
}
export const CardTile = (props: CardTileProps) => {
  return (
    <OverlayTrigger overlay={getCardDescription(props.card)} placement="bottom">
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
        >
          <title>{props.card.description}</title>
        </rect>
        <CardName name={props.card.name} />
        <ActionType type={props.card.cardType} />
        <CardCaracs caracs={props.card.abilityCaracs} />
      </svg>
    </OverlayTrigger>
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
