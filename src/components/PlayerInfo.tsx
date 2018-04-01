import * as React from "react";

const PlayerInfo = ({
  ID,
  currentPlayer,
  currentHealth,
  infos
}: {
  ID: string;
  currentPlayer: string;
  currentHealth: number;
  infos: Array<String>;
}) => (
  <div>
    <p>
      It is player#{currentPlayer} turn
    </p>
    <p className="HPBar">[player#{ID}] - {currentHealth} HP</p>
    <p className="Infos">Infos : {infos[infos.length - 1]}</p>
  </div>
);

export default PlayerInfo;
