import { Action } from "./Action";
import * as React from "react";

// ----- Components
export const TriggersList = (props: { actions: Array<Action> }) => {
  return (
    <p>
      {"Trigger list : "}
      <ul>
        {props.actions.map((current, index) => (
          <li key={"trigListid" + index + current.avatarId}>{current.name}</li>
        ))}
      </ul>
    </p>
  );
};
