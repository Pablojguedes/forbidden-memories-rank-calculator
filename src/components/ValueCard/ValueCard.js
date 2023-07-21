import "./ValueCard.css";
import React from "react";

const ValueCard = ({ parameter, onDecrease, onIncrease, onValueChange }) => {
  const increaseHandler = () => {
    onIncrease(parameter, "increase");
  };

  const decreaseHandler = () => {
    onDecrease(parameter, "decrease");
  };

  const valueChangeHandler = (event) => {
    onValueChange(event, parameter);
  }

  return (
    <div id="card-div">
      <h6 id="card-title">{parameter.label}</h6>
      <div id="value-container-div">
        <button onClick={decreaseHandler}>-</button>
        {parameter.type === "label" ? (
          <h6 id="value-text">{parameter.value}</h6>
        ) : (
          <input type="input" id="value-text" value={parameter.value} onChange={valueChangeHandler}/>
        )}
        <button onClick={increaseHandler}>+</button>
      </div>
    </div>
  );
};

export default ValueCard;
