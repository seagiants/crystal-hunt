import * as React from "react";

const getHealthBars = (health: number) =>
  Array.from({ length: health }, (v, k) => k).map(k => (
    <rect
      width="20"
      height="60"
      x={k * 21}
      key={k}
      style={{ fill: "red" }}
      stroke="black"
    >
      {k}
    </rect>
  ));

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
    <p>It is player#{currentPlayer} turn</p>
    <p className="HPBar">
      <svg>{getHealthBars(currentHealth)}</svg>
    </p>
    <p className="Infos">Infos : {infos[infos.length - 1]}</p>
  </div>
);

export default PlayerInfo;
