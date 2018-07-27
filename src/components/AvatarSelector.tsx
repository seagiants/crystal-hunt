import * as React from "react";
import { ReadyState, Moves } from "../types";
import { KlassName, RaceName } from "../avatar/Avatar";

interface ASProps {
  readyState: ReadyState;
  moves: Moves;
  playerID: string;
}

interface ASState {
  klass: KlassName;
  race: RaceName;
}

class AvatarSelector extends React.Component<ASProps, ASState> {
  constructor(props: ASProps) {
    super(props);
    this.state = { klass: KlassName.Assassin, race: RaceName.Elve };
    this.handleClassSelection = this.handleClassSelection.bind(this);
    this.handleRaceSelection = this.handleRaceSelection.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClassSelection(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ klass: KlassName[event.currentTarget.value] });
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
          {Object.keys(KlassName).map((k, i) => (
            <label key={`${k}${i}`}>
              <input
                key={k}
                type="radio"
                value={KlassName[k]}
                checked={this.state.klass === k}
                onChange={this.handleClassSelection}
              />
              {KlassName[k]}
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
