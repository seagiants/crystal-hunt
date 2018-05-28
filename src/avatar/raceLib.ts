import { Caracs } from "../action/Action";
import { RaceName } from "./Avatar";

export const raceLib: { [key in RaceName]: Caracs } = {
  Human: {
    drawNumber: 1
  },
  Orc: {
    healthInit: 1,
    healthCurrent: 1
  },
  Elve: {
    attackRange: 1
  },
  Monster: {}
};
