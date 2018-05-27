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

const getAvatarText = (currentRace: string, currentClass2: string) =>
  currentRace + "/" + currentClass2;

// ------ Component
const PlayerInfo = ({
  ID,
  currentPlayer,
  currentHealth,
  currentRace,
  currentClass2,
  infos
}: {
  ID: string;
  currentPlayer: string;
  currentHealth: number;
  currentRace: string;
  currentClass2: string;
  infos: Array<String>;
}) => (
  <div style={style}>
    <p>{getTurnText(ID, currentPlayer)}</p>
    <p>{getAvatarText(currentRace, currentClass2)}</p>
    <p className="HPBar">
      <svg width="200" height="60">
        {getHealthBars(currentHealth)}
      </svg>
    </p>
    <p className="Infos">Infos : {infos[infos.length - 1]}</p>
  </div>
);

export default PlayerInfo;
