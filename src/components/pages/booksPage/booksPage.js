import PropTypes from "prop-types";
import React, { Component } from "react";
import ItemList from "../../itemList";
import ErrorMessage from "../../errorMessage";
import GotService from "../../../services/gotService";
import { withRouter } from "react-router-dom";

class BooksPage extends Component {
  state = { error: false };
  gotService = new GotService();

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return (
      <ItemList
        onItemSelected={(itemId) => {
          this.props.history.push(itemId);
        }}
        getData={this.gotService.getAllBooks}
        renderItem={({ name }) => name}
      />
    );
  }
}

BooksPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(BooksPage);
