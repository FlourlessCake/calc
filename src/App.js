import React, { useState } from "react";
import data from "./depcalc.json";
import Calculator from "./Components/Calculator.js";

function App() {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">Choose your rabstvo jebanoe</div>
      </nav>
      <div className="container">
        <Calculator />
      </div>
    </>
  );
}

export default App;
