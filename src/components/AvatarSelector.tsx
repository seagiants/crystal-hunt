import * as React from "react";
import { ReadyState, Moves } from "../types";
import { Class2Name, RaceName } from "../avatar/Avatar";

interface ASProps {
  readyState: ReadyState;
  moves: Moves;
  playerID: string;
}

interface ASState {}

class AvatarSelector extends React.Component<ASProps, ASState> {
  constructor(props: ASProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: React.FormEvent<HTMLButtonElement>) {
    console.log(this.props.moves);
    event.preventDefault();
    this.props.moves.setAvatars(
      this.props.playerID,
      Class2Name.Mage,
      RaceName.Elve
    );
  }

  render() {
    return (
      <div>
        <div>Players not ready {this.props.readyState}</div>
        <button onClick={this.handleClick}>Assassin / Elve</button>
      </div>
    );
  }
}

export default AvatarSelector;
