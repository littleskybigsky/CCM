import React from "react";
import { useForm } from "react-hook-form";

import "./Form.css";

export default function Form({ setStreet, setCity, setState, setZip_Code }) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
    setStreet(data.street);
    setCity(data.city);
    setState(data.state);
    setZip_Code(data.zip_code);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Street" name="street" ref={register} />
        <input type="text" placeholder="City" name="city" ref={register} />
        <input type="text" placeholder="State" name="state" ref={register} />
        <input
          type="text"
          placeholder="Zip Code"
          name="zip_code"
          ref={register}
        />
        <p></p>
        <button className="button" type="submit">
          Meet Your Reps
        </button>
      </form>
    </div>
  );
}
