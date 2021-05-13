import React, { Component } from "react";
import GotService from "../../../services/gotService";
import ItemDetails, { Field } from "../../itemDetails";
import ErrorMessage from "../../errorMessage/errorMessage";
import PropTypes from "prop-types";

export default class BooksItem extends Component {
  gotService = new GotService();
  state = { error: false };

  componentDidCatch() {
    this.setState({ error: true });
  }

  onItemSelected = (id) => {
    this.setState({ selectedBook: id });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <ItemDetails
        itemId={this.props.booksId}
        getData={this.gotService.getBook}
      >
        <Field field="numberOfPages" label="Number of pages" />
        <Field field="publisher" label="Publisher" />
        <Field field="released" label="Released" />
      </ItemDetails>
    );
  }
}

BooksItem.propTypes = {
  booksId: PropTypes.string,
};
