import React, { Component } from "react";
import "./itemList.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner/spinner";
export default class ItemList extends Component {
  gotService = new GotService();
  state = { characterList: null };

  componentDidMount() {
    this.gotService.getAllCharacters().then((characterList) => {
      this.setState({ characterList });
    });
  }

  // componentWillUnmount() {}

  renderItems = (arr) => {
    return arr.map((item, i) => {
      return (
        <li
          key={i}
          className="list-group-item"
          // eslint-disable-next-line react/prop-types
          onClick={() => {
            // eslint-disable-next-line react/prop-types
            this.props.onCharacterSelected(i + 41);
          }}
        >
          {item.name}
        </li>
      );
    });
  };

  render() {
    const { characterList } = this.state;
    if (!characterList) {
      return <Spinner />;
    }
    const items = this.renderItems(characterList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}
