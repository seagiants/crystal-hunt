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

const displayLogInfo = (infos: Array<string>) => {
  return (
    <ul>
      {/*
        infos.forEach(element => {
          return <li>element</li>;
        }) as React.ReactNode
        */}
      <li>{infos[infos.length - 1]}</li>
      <li>{infos[infos.length - 2]}</li>
      <li>{infos[infos.length - 3]}</li>
      <li>{infos[infos.length - 4]}</li>
    </ul>
  );
};

const getTurnText = (yourID: string, currentPlayerID: string) =>
  yourID === currentPlayerID ? "Your turn" : "Opponent's turn";

const getAvatarText = (currentRace: string, currentklass: string) =>
  currentRace + "/" + currentklass;

// ------ Component
const PlayerInfo = ({
  ID,
  currentPlayer,
  currentHealth,
  currentRace,
  currentklass,
  infos
}: {
  ID: string;
  currentPlayer: string;
  currentHealth: number;
  currentRace: string;
  currentklass: string;
  infos: Array<string>;
}) => (
  <div style={style}>
    <p>{getTurnText(ID, currentPlayer)}</p>
    <p>{getAvatarText(currentRace, currentklass)}</p>
    <p className="HPBar">
      <svg width="200" height="60">
        {getHealthBars(currentHealth)}
      </svg>
    </p>
    <p className="Infos">Infos : </p>
    {displayLogInfo(infos)}
  </div>
);

export default PlayerInfo;
