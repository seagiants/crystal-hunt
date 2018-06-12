import * as React from "react";
import { ReadyState, Moves } from "../types";
import { Class2Name, RaceName } from "../avatar/Avatar";

interface ASProps {
  readyState: ReadyState;
  moves: Moves;
  playerID: string;
}

interface ASState {
  klass: Class2Name;
  race: RaceName;
}

class AvatarSelector extends React.Component<ASProps, ASState> {
  constructor(props: ASProps) {
    super(props);
    this.state = { klass: Class2Name.Assassin, race: RaceName.Elve };
    this.handleClassSelection = this.handleClassSelection.bind(this);
    this.handleRaceSelection = this.handleRaceSelection.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClassSelection(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ klass: Class2Name[event.currentTarget.value] });
  }

  handleRaceSelection(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ race: RaceName[event.currentTarget.value] });
  }

  handleClick(event: React.FormEvent<HTMLButtonElement>) {
    console.log(this.props.moves);
    event.preventDefault();
    this.props.moves.setAvatars(
      this.props.playerID,
      this.state.klass,
      this.state.race
    );
  }

  render() {
    return (
      <div>
        <div>Players not ready -> {this.props.readyState}</div>
        <div>
          {Object.keys(Class2Name).map((k, i) => (
            <label key={`${k}${i}`}>
              <input
                key={k}
                type="radio"
                value={Class2Name[k]}
                checked={this.state.klass === k}
                onChange={this.handleClassSelection}
              />
              {Class2Name[k]}
            </label>
          ))}
        </div>
        <div>
          {Object.keys(RaceName).map((r, i) => (
            <label key={`${r}${i}`}>
              <input
                key={r}
                type="radio"
                value={RaceName[r]}
                checked={this.state.race === r}
                onChange={this.handleRaceSelection}
              />
              {RaceName[r]}
            </label>
          ))}
        </div>
        <button onClick={this.handleClick}>Set avatar</button>
      </div>
    );
  }
}

export default AvatarSelector;
