import React, { Component } from "react";
import "./charDetails.css";
import GotService from "../../services/gotService";
export default class CharDetails extends Component {
  gotService = new GotService();

  state = {
    character: null,
  };

  componentDidMount() {
    this.updateCharacter();
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    if (this.props.characterId !== prevProps.characterId) {
			this.updateCharacter();
		}
  }

  updateCharacter = () => {
    // eslint-disable-next-line react/prop-types
    const { characterId } = this.props;
    if (!characterId) {
      return;
    }
    this.gotService.getCharacter(characterId).then((character) => {
      this.setState({ character });
    });
  };

  render() {
    if (!this.state.character) {
      return <span className="select-error">Please select a character</span>;
    }

    const { name, born, gender, died, culture } = this.state.character;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Born</span>
            <span>{born}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Died</span>
            <span>{died}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Culture</span>
            <span>{culture}</span>
          </li>
        </ul>
      </div>
    );
  }
}
