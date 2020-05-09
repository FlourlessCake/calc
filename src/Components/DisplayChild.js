import React from "react";

const DisplayChild = ({ data, text }) => {
  return (
    <span>
      {data} <small>{text}</small>
    </span>
  );
};


export default DisplayChild;