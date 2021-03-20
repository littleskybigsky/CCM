import React, { useState } from "react";
import Geocoder from "./Geocoder";
import Form from "./Form";
import Modal1 from "./Modal1";
import FirstCall from "./Calls/first_call";

const AddressParts = (data) => {
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip_code, setZip_Code] = useState("");
  const makeAddress = () => {
    setStreet(data.street);
    setCity(data.city);
    setState(data.state);
    setZip_Code(data.zip_code);
  };

  return (
    <div>
      <Form
        setStreet={setStreet}
        setCity={setCity}
        setState={setState}
        setZip_Code={setZip_Code}
      />
      <Modal1 />
      <FirstCall />
      <Geocoder street={street} city={city} state={state} zip_code={zip_code} />
    </div>
  );
};
export default AddressParts;
