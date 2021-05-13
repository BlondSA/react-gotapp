import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../pages/characterPage/characterPage";
import BooksPage from "../pages/booksPage";
import HousesPage from "../pages/housesPage/";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BooksItem from "../pages/booksItem";
import GotService from "../../services/gotService";
import "./app.css";

export default class App extends Component {
  state = {
    onShowRandomChar: true,
    error: false,
  };

  gotService = new GotService();

  componentDidCatch() {
    console.log("Error");
    this.setState({ error: true });
  }

  toggleRandomChar = () => {
    this.setState((state) => {
      return { onShowRandomChar: !state.onShowRandomChar };
    });
  };

  render() {
    const randomChar = this.state.onShowRandomChar ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <Router>
        <div className="app">
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
            <Route path="/characters" exact component={CharacterPage} />
            <Route path="/houses" exact component={HousesPage} />
            <Route path="/books" exact component={BooksPage} />
            <Route
              path="/books/:id"
              render={({ match }) => {
                const { id } = match.params;
                return <BooksItem booksId={id} />;
              }}
            />
          </Container>
        </div>
      </Router>
    );
  }
}
