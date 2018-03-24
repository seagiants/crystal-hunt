import * as React from "react";

const PlayerInfo = ({
  ID,
  currentPlayer,
  currentHealth
}: {
  ID: string;
  currentPlayer: string;
  currentHealth: number;
}) => (
  <div>
    <p>
      It is player#{currentPlayer} turn
    </p>
    <p className="HPBar">[player#{ID}] - {currentHealth} HP</p>
  </div>
);

export default PlayerInfo;
