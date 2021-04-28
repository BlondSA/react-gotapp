import React, { Component } from "react";
import ItemList from "../../itemList";
import ItemDetails, { Field } from "../../itemDetails";
import ErrorMessage from "../../errorMessage";
import GotService from "../../../services/gotService";
import RowBlock from "../../rowBlock";

export default class CharacterPage extends Component {
  state = { selectedCharacter: null, error: false };
  gotService = new GotService();

  componentDidCatch() {
    this.setState({ error: true });
  }

  onItemSelected = (id) => {
    this.setState({ selectedCharacter: id });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllCharacters}
        renderItem={({ name }) => name}
      />
    );

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedCharacter}
        getData={this.gotService.getCharacter}
      >
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
