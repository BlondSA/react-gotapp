import React, { Component } from "react";
import "./itemDetails.css";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

// eslint-disable-next-line react/prop-types
const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Field };

export default class ItemDetails extends Component {
  state = {
    item: null,
    loading: true,
    error: false,
  };

  componentDidMount = () => {
    this.updateItem();
  };

  componentDidUpdate = (prevProps) => {
    // eslint-disable-next-line react/prop-types
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  };

  onItemDetailsLoaded = (item) => {
    this.setState({ item, loading: false });
  };

  updateItem = () => {
    // eslint-disable-next-line react/prop-types
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }
    this.setState({ loading: true });
    // eslint-disable-next-line react/prop-types
    getData(itemId)
      .then(this.onItemDetailsLoaded)
      .catch(() => this.onError());
  };

  onError = () => {
    this.setState({ item: null, error: true });
  };

  render() {
    if (!this.state.item && this.state.error) {
      return <ErrorMessage />;
    } else if (!this.state.item) {
      return <span className="select-error">Please select a item</span>;
    }

    const { item } = this.state;
    const { name } = item;

    if (this.state.loading) {
      return (
        <div className="char-details rounded">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            // eslint-disable-next-line react/prop-types
            React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item });
            })
          }
        </ul>
      </div>
    );
  }
}
