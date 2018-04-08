import * as React from "react";
import CrystalHuntClient from "./CrystalHuntClient";
import GameSelector from "./GameSelector";

interface GameSelectorProps {}
interface GameSelectorState {
  inProgressGameId: string;
  inProgressPlayerId: string;
  selectedGameId: string;
  selectedPlayerId: string;
}

class Main extends React.Component<GameSelectorProps, GameSelectorState> {
  constructor(props: GameSelectorProps) {
    super(props);
    this.state = {
      inProgressGameId: "foo",
      inProgressPlayerId: "0",
      selectedGameId: "",
      selectedPlayerId: ""
    };
    // Binding is not allowed in JSX becuz of bad perfs so we do it here
    this.handleGIDChange = this.handleGIDChange.bind(this);
    this.handlePIDChange = this.handlePIDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleGIDChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ inProgressGameId: event.currentTarget.value });
  }

  handlePIDChange(event: React.FormEvent<HTMLSelectElement>) {
    console.log(event.currentTarget.value);
    this.setState({ inProgressPlayerId: event.currentTarget.value });
  }

  handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    console.log(
      this.state.inProgressPlayerId,
      typeof this.state.inProgressPlayerId
    );
    this.setState({
      selectedGameId: this.state.inProgressGameId,
      selectedPlayerId: this.state.inProgressPlayerId
    });
  }

  render() {
    const selectionComponent = (
      <GameSelector
        handleSubmit={this.handleSubmit}
        handleGIDChange={this.handleGIDChange}
        handlePIDChange={this.handlePIDChange}
        inProgressGameId={this.state.inProgressGameId}
        inProgressPlayerId={this.state.inProgressPlayerId}
      />
    );
    const gameComponent = (
      <div>
        <CrystalHuntClient
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

export default Main;
