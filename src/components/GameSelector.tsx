import * as React from "react";
import App from "./App";

interface GameSelectorProps {}
interface GameSelectorState {
  inProgressGameId?: string;
  inProgressPlayerId?: string;
  selectedGameId?: string;
  selectedPlayerId?: string;
}

class GameSelector extends React.Component<
  GameSelectorProps,
  GameSelectorState
> {
  constructor(props: GameSelectorProps) {
    super(props);
    this.state = {
      inProgressGameId: "",
      inProgressPlayerId: "",
      selectedGameId: "",
      selectedPlayerId: ""
    };
    // Binding is not allowed in JSX becuz of bad perfs
    this.handleGIDChange = this.handleGIDChange.bind(this);
    this.handlePIDChange = this.handlePIDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleGIDChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ inProgressGameId: event.currentTarget.value });
  }

  handlePIDChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ inProgressPlayerId: event.currentTarget.value });
  }

  handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      selectedGameId: this.state.inProgressGameId,
      selectedPlayerId: this.state.inProgressPlayerId
    });
  }

  render() {
    let selectionComponent = (
      <div>
        <div>Select a game</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="gameId"
              value={this.state.inProgressGameId}
              onChange={this.handleGIDChange}
            />
            <input
              type="text"
              placeholder="playerId, 0 or 1"
              value={this.state.inProgressPlayerId}
              onChange={this.handlePIDChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
    let gameComponent = (
      <div>
        <App
          gameID={this.state.selectedGameId}
          playerID={this.state.selectedPlayerId}
        />
      </div>
    );
    return (
      <div>
        {this.state.selectedGameId !== "" && this.state.selectedPlayerId !== ""
          ? gameComponent
          : selectionComponent}
      </div>
    );
  }
}

export default GameSelector;
