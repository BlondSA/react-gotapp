import PropTypes from "prop-types";
import React, { Component } from "react";
import "./randomChar.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

export default class RandomChar extends Component {
  gotService = new GotService();
  state = { character: {}, loading: true, error: false };

  componentDidMount() {
    this.updateCharacter();
    this.timerId = setInterval(this.updateCharacter, 1500);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharacterLoaded = (character) => {
    this.setState({ character, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updateCharacter = () => {
    const id = Math.floor(Math.random() * 140 + 25); // 25-140
    this.gotService
      .getCharacter(id)
      .then(this.onCharacterLoaded)
      .catch(this.onError);
  };

  render() {
    const { character, loading, error } = this.state;
    console.log("render");

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View character={character} /> : null;

    return (
      <div className="random-block rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ character }) => {
  const { name, gender, born, died, culture } = character;
  return (
    <>
      <h4>Random Character: {name}</h4>
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
    </>
  );
};

View.propTypes = {
  character: PropTypes.shape({
    born: PropTypes.any,
    culture: PropTypes.any,
    died: PropTypes.any,
    gender: PropTypes.any,
    name: PropTypes.any,
  }),
};
