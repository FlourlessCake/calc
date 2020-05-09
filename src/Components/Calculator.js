import React, { useState } from "react";
import Display from "./Display";
import data from "../depcalc.json";

import "../styles/Calculator.css";
import "react-input-range/lib/css/index.css";

const Calculator = () => {
  const { deposits } = data;
  const finder = (depoType) => deposits.find((d) => d.code === depoType);
  const nearestBelow = (input, lookup) =>
    lookup.reduce((prev, curr) => (input >= curr ? curr : prev));

  const [amountValue, setAmountValue] = useState(0);
  const [daysValue, setDaysValue] = useState(null);
  const [type, setType] = useState("unic");

  const helpers = (depoType) => {
    const deposit = finder(depoType)
    const maxCurrentPeriodOfDeposit = nearestBelow(
      daysValue,
      deposit.param.map((d) => d.period_from)
    );
    const investPeriod = deposit.param.find(
      (d) => d.period_from === maxCurrentPeriodOfDeposit
    );
    const clientRate = nearestBelow(amountValue, investPeriod.summs_and_rate);

    return {investPeriod, clientRate}
  }
  const {investPeriod, clientRate} = helpers(type)

  console.log(investPeriod)

  const handleDepo = (value) => {
    setType(value);
  };

  return (
    <div className="container">
      {deposits.map((d) => (
        <div key={d.code} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id={d.code}
            value="option1"
            onChange={() => handleDepo(d.code)}
          />
          <label className="form-check-label" htmlFor={d.code}>
            {d.name}
          </label>
        </div>
      ))}

      <h4>I want to invest {amountValue} rub</h4>
      <div className="form-group">
        <label htmlFor="amount">Amount of deposit</label>
        <input
          type="number"
          className="form-control"
          id="amount"
          onChange={(e) => setAmountValue(e.target.value)}
          min={clientRate.summ_from}
        />
        <small id="amount" className="form-text text-muted">
          Min amount of deposit on this Rate is {clientRate.summ_from}
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="term">Term of deposit</label>
        <input
          type="number"
          className="form-control"
          id="term"
          onChange={(e) => setDaysValue(e.target.value)}
          min={investPeriod.period_from}
        />
        <small id="term" className="form-text text-muted">
          Min invest period is {investPeriod.period_from}
        </small>
      </div>
      <Display days={daysValue} amount={amountValue} rate={clientRate.rate} />
    </div>
  );
};

export default Calculator;
