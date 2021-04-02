import React, { Component } from "react";
import {Col, Row, Container} from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import ErrorMessage from "../errorMessage";

import "./app.css";

export default class App extends Component {
	state = {
		onShowRandomChar: true,
		error: false,
	};

	toggleRandomChar = () => {
		this.setState({
			onShowRandomChar: !this.state.onShowRandomChar,
		});
	};

	render() {
		if (this.state.error) {
			return <ErrorMessage/>;
		}
		const randomChar = this.state.onShowRandomChar ? <RandomChar /> : null;

		return (
			<>
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{size: 5, offset: 0}}>
						{randomChar}
						<button className="toggle-btn" onClick={this.toggleRandomChar}>Toggle random Character</button>
						</Col>
					</Row>
					<Row>
						<Col md="6">
							<ItemList />
						</Col>
						<Col md="6">
							<CharDetails />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
