import { ActionType } from "../action/skillLib";
import { TRIGGERINGACTIONTEMPLATE } from "../action/type";

export interface Card extends TRIGGERINGACTIONTEMPLATE {
  type: ActionType;
  charge?: number;
  upgradeName?: string;
}

export interface CardTileProps {
  card: Card;
  index: number;
  playerId: string;
  activateCard(cardIndex: number, playerId: string): object;
  endTurn(): object;
}
