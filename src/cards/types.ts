import { ActionType } from "../action/skillLib";
import { TRIGGERINGACTIONTEMPLATE } from "../action/type";

export interface Card extends TRIGGERINGACTIONTEMPLATE {
  type: ActionType;
  charge?: number;
}

export interface Decks {
  // Makes it use an enum as index ??
  [index: string]: Array<Card>;
}
