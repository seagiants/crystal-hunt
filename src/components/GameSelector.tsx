import * as React from "react";
import { Class2Name } from "../avatar/Avatar";

interface GameSelectorProps {
  handleSubmit: (e: React.FormEvent<HTMLElement>) => void;
  handleGIDChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handlePIDChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  handleRNChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  inProgressGameId: string;
  inProgressPlayerId: string;
  inProgressRaceName: string;
}

const GameSelector = (props: GameSelectorProps) => (
  <div className="main-container">
    <div>
      <div>Select a game</div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="gameId"
            value={props.inProgressGameId}
            onChange={props.handleGIDChange}
          />
        </div>
        <div>
          <select
            value={props.inProgressPlayerId}
            onChange={props.handlePIDChange}
          >
            <option value="O">zero</option>
            <option value="1">one</option>
          </select>
        </div>
        <div>
          <select
            value={props.inProgressRaceName}
            onChange={props.handleRNChange}
          >
            <option value={Class2Name.Mage}>Mage</option>
            <option value={Class2Name.Warrior}>Warrior</option>
            <option value={Class2Name.Assassin}>Assassin</option>
          </select>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
);

export default GameSelector;
