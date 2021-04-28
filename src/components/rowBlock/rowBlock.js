import React from "react";
import { Col, Row } from "reactstrap";

// eslint-disable-next-line react/prop-types
const RowBlock = ({ left, right }) => {
  return (
    <Row>
      <Col md="6">{left}</Col>
      <Col md="6">{right}</Col>
    </Row>
  );
};

export default RowBlock;
