import React from "react";

import DisplayChild from "./DisplayChild";

const Display = ({ amount, days, rate }) => {


  const calculateDivs = () => {

    const dividends = (amount * rate / 36500) * days;
    return <p>{Math.round(dividends)} rub</p>;
  };



  return (
    <div className="flex">
      <DisplayChild data={rate} text="interest rate" />
      <DisplayChild
        data={calculateDivs()}
        text=" monthly repayment"
      />
    </div>
  );
};

export default Display;
