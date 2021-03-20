import Card from "react-bootstrap/Card";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ActionContainer from "./explore";
import "./Card2.css";

const Card2 = () => {
  return (
    <Card className="mx-5 action-form">
      <Card.Body>
        <ActionContainer className="mx-5" />
      </Card.Body>
    </Card>
  );
};

export default Card2;
