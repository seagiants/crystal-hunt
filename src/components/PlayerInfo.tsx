import * as React from "react";

const PlayerInfo = ({
  ID,
  currentPlayer
}: {
  ID: string;
  currentPlayer: string;
}) => (
  <div>
    [player#{ID}] - it is player#{currentPlayer} turn
  </div>
);

export default PlayerInfo;
