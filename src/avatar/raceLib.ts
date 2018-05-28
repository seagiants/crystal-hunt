import { Caracs } from "../action/Action";
import { RaceName } from "./Avatar";

export interface Race {
  caracs: Caracs;
  color: string;
}
export const raceLib: { [key in RaceName]: Race } = {
  Human: {
    caracs: {
      drawNumber: 1
    },
    color: "blue"
  },
  Orc: {
    caracs: {
      healthInit: 1,
      healthCurrent: 1
    },
    color: "red"
  },
  Elve: {
    caracs: {
      attackRange: 1
    },
    color: "green"
  },
  Monster: {
    caracs: {},
    color: "silver"
  }
};
