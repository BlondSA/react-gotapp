import PropTypes from "prop-types";
import React, { Component } from "react";
import "./itemList.css";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage";
export default class ItemList extends Component {
  state = { itemList: null, error: false };

  componentDidMount() {
    const { getData } = this.props;
    getData()
      .then((itemList) => {
        this.setState({ itemList, error: false });
      })
      .catch(() => {
        this.onError();
      });
  }

  componentDidCatch() {
    this.onError();
  }

  onError = () => {
    this.setState({ itemList: null, error: true });
  };

  renderItems = (arr) => {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => {
            this.props.onItemSelected(id);
          }}
        >
          {label}
        </li>
      );
    });
  };

  render() {
    const { itemList, error } = this.state;
    if (error) {
      return <ErrorMessage />;
    }
    if (!itemList) {
      return <Spinner />;
    }
    const items = this.renderItems(itemList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}

ItemList.propTypes = {
  getData: PropTypes.func,
  onItemSelected: PropTypes.func,
  renderItem: PropTypes.func,
};
