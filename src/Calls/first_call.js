import React, { useState } from "react";
import Axios from "axios";
import { Modal, Button } from "react-bootstrap";

const FirstCall = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    Axios.post("https://climate-changemakers-9156.twil.io/call_test2")
      .then(console.log("Success!"))
      .catch((error) => {
        console.error(error);
      });
    console.log("Success");
  };
  return (
    <>
      <button className="button" variant="primary" onClick={handleShow}>
        Call 'em
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Call your Representatives</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="phone_script_header">
            Get ready to call your rep! Once you click, you will be immediately
            directed to the call so take a second to prepare what you want to
            say. Feel free to use this script below:
          </div>
          <div className="phone_script">
            Hi [Sen./Rep. ___ ], thanks for taking my call. I am a consituent
            located at [your address]. Running on fossil fuels means living on
            borrowed time - using coal, oil, and gas means choosing extractivism
            and exploitation (of both the environment and of marginalized
            communities). Why settle for this when we know we have alternatives
            that are cleaner, cheaper, healthier, and *actually* sustainable?
            Cleaning up our energy system is one of the highest-impact ways to
            reverse climate change, and reflects the values of the society I
            want to live in - not the one we have to settle for. We can get
            there faster by supporting clean energy tax credits today. Thanks
            for taking a decisive stand against the fossil fuel industry.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="button" variant="primary" onClick={handleClick}>
            Make the Call!
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FirstCall;
