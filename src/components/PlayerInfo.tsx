import * as React from "react";

const style = {
  width: "10%"
};

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

const getTurnText = (yourID: string, currentPlayerID: string) =>
  yourID === currentPlayerID ? "Your turn" : "Opponent's turn";

// ------ Component
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
  <div style={style}>
    <p>{getTurnText(ID, currentPlayer)}</p>
    <p className="HPBar">
      <svg width="200" height="60">
        {getHealthBars(currentHealth)}
      </svg>
    </p>
    <p className="Infos">Infos : {infos[infos.length - 1]}</p>
  </div>
);

export default PlayerInfo;
