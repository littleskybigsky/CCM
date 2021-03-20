import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Card1 from "./Card";
import Card2 from "./Card2";
import CardDeck from "react-bootstrap/CardDeck";
import ActionContainer from "./explore";

function Modal1() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <button className="button" variant="primary" onClick={handleShow}>
          Write 'em
        </button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Take Action!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ActionContainer />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modal1;
