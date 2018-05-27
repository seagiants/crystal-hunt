import * as React from "react";
import CrystalHuntClient from "./CrystalHuntClient";
import GameSelector from "./GameSelector";

interface GameSelectorProps {}
interface GameSelectorState {
  inProgressGameId: string;
  inProgressPlayerId: string;
  inProgressRaceName: string;
  selectedGameId: string;
  selectedPlayerId: string;
  selectedRaceName: string;
}

class Main extends React.Component<GameSelectorProps, GameSelectorState> {
  constructor(props: GameSelectorProps) {
    super(props);
    this.state = {
      inProgressGameId: "foo",
      inProgressPlayerId: "0",
      inProgressRaceName: "",
      selectedGameId: "",
      selectedPlayerId: "",
      selectedRaceName: ""
    };
    // Binding is not allowed in JSX becuz of bad perfs so we do it here
    this.handleGIDChange = this.handleGIDChange.bind(this);
    this.handlePIDChange = this.handlePIDChange.bind(this);
    this.handleRNChange = this.handleRNChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleGIDChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ inProgressGameId: event.currentTarget.value });
  }

  handlePIDChange(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ inProgressPlayerId: event.currentTarget.value });
  }

  handleRNChange(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ inProgressRaceName: event.currentTarget.value });
  }

  handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      selectedGameId: this.state.inProgressGameId,
      selectedPlayerId: this.state.inProgressPlayerId,
      selectedRaceName: this.state.inProgressRaceName
    });
  }

  render() {
    const selectionComponent = (
      <GameSelector
        handleSubmit={this.handleSubmit}
        handleGIDChange={this.handleGIDChange}
        handlePIDChange={this.handlePIDChange}
        handleRNChange={this.handleRNChange}
        inProgressGameId={this.state.inProgressGameId}
        inProgressPlayerId={this.state.inProgressPlayerId}
        inProgressRaceName={this.state.inProgressRaceName}
      />
    );
    const gameComponent = (
      <div>
        <CrystalHuntClient
          gameID={this.state.selectedGameId}
          playerID={this.state.selectedPlayerId}
          raceName={this.state.selectedRaceName}
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
