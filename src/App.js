import logo from "./logo.png";
import React, { useState } from "react";
import "./App.css";
import AddressParts from "./AddressParts";
import CardDeck from "react-bootstrap/CardDeck";
import Card1 from "./Card";
import "bootstrap/dist/css/bootstrap.min.css";
import ActionContainer from "./explore";
import Card2 from "./Card2";
import Modal1 from "./Modal1";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p></p>
        <div>
          <a href="https://www.climatechangemakers.org/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
        </div>
        <p></p>
        <AddressParts />
        <p></p>
      </header>
    </div>
  );
}

export default App;
