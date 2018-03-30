import * as React from "react";
import App from "./App";

interface GameSelectorProps {}
interface GameSelectorState {
  inProgressGameId?: string;
  selectedGameId?: string;
}

class GameSelector extends React.Component<
  GameSelectorProps,
  GameSelectorState
> {
  constructor(props: GameSelectorProps) {
    super(props);
    this.state = {
      inProgressGameId: "",
      selectedGameId: ""
    };
    // Binding is not allowed in JSX becuz of bad perfs
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ inProgressGameId: event.currentTarget.value });
  }

  handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({ selectedGameId: this.state.inProgressGameId });
  }

  render() {
    let selectionComponent = (
      <div>
        <div>Select a game</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.inProgressGameId}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
    let gameComponent = (
      <div>
        <App gameID={this.state.selectedGameId} playerID="0" />
        <App gameID={this.state.selectedGameId} playerID="1" />
      </div>
    );
    return (
      <div>
        {this.state.selectedGameId !== "" ? gameComponent : selectionComponent}
      </div>
    );
  }
}

export default GameSelector;
