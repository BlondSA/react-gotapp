import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage";

import "./app.css";

export default class App extends Component {
  state = {
    onShowRandomChar: true,
    error: false,
  };

  componentDidCatch() {
    console.log("Error");
    this.setState({ error: true });
  }

  toggleRandomChar = () => {
    this.setState({
      onShowRandomChar: !this.state.onShowRandomChar,
    });
  };

  render() {
    const randomChar = this.state.onShowRandomChar ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {randomChar}
              <button className="toggle-btn" onClick={this.toggleRandomChar}>
                Toggle random Character
              </button>
            </Col>
          </Row>
          <CharacterPage/>
        </Container>
      </>
    );
  }
}
