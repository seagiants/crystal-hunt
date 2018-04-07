import * as React from "react";

interface GameSelectorProps {
  handleSubmit: (e: React.FormEvent<HTMLElement>) => void;
  handleGIDChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handlePIDChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  inProgressGameId: string;
  inProgressPlayerId: string;
}

const GameSelector = (props: GameSelectorProps) => (
  <div className="main-container">
    <div>Select a game</div>
    <div>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          placeholder="gameId"
          value={props.inProgressGameId}
          onChange={props.handleGIDChange}
        />
        <select
          value={props.inProgressPlayerId}
          onChange={props.handlePIDChange}
        >
          <option value="O">zero</option>
          <option value="1">one</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
);

export default GameSelector;
