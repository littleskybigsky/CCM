import Card from "react-bootstrap/Card";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./Card.css";

const Card1 = (props) => {
  return (
    <Card
      style={{ width: "18rem", color: "#351F75" }}
      className="mx-3 img-container font-weight-bold"
    >
      <Card.Img
        className="mx-auto mt-4"
        style={{ width: "100px", height: "100px" }}
        variant="top"
        src={props.image}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.party}
          {props.codeIntro}
          {props.code}
        </Card.Text>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item>{props.dcNumber}</ListGroup.Item>
        <ListGroup.Item>{props.localNumber}</ListGroup.Item>
        <ListGroup.Item className="p-0">
          <div>
            <a
              target="_blank"
              href={`https://twitter.com/intent/tweet?text=.${props.twitter}%20To%20fully%20hit%20our%20decarbonization%20targets%2C%20we%20must%20*fully*%20displace%20the%20fossil%20fuel%20industry.%20The%20federal%20government%20should%20end%20direct%20%2B%20indirect%20subsidies%20for%20fossil%20fuels!%20@theclimatevote`}
            >
              <img
                style={{
                  width: "25px",
                  display: "inline-block",
                }}
                src={
                  "https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"
                }
                alt="tweet"
                className="tweet"
              />
            </a>
            {props.twitter}
          </div>
        </ListGroup.Item>
        <ListGroup.Item>{props.lcvScore}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Card1;
