import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import ErrorMessage from "../errorMessage";

export default class CharacterPage extends Component {
  state = { selectedCharacter: 130, error: false };

  componentDidCatch() {
    this.setState({ error: true });
  }

  onCharacterSelected = (id) => {
    this.setState({ selectedCharacter: id });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return (
      <Row>
        <Col md="6">
          <ItemList onCharacterSelected={this.onCharacterSelected} />
        </Col>
        <Col md="6">
          <CharDetails characterId={this.state.selectedCharacter} />
        </Col>
      </Row>
    );
  }
}
