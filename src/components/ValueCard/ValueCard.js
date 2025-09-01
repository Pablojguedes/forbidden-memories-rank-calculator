import "./ValueCard.css";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ValueCard = ({ parameter, onDecrease, onIncrease, onValueChange }) => {
  const increaseHandler = () => {
    onIncrease(parameter, "increase");
  };

  const decreaseHandler = () => {
    onDecrease(parameter, "decrease");
  };

  const valueChangeHandler = (event) => {
    onValueChange(event, parameter);
  };

  return (
    <div id="card-div">
      <div id="title-tooltip-container">
        <h6 id="card-title">{parameter.label}</h6>
        <div id="tooltip-holder">
          <AiOutlineInfoCircle size={12} fontWeight={500} />
          <span className="tooltip-text">{parameter.tooltipText}</span>
        </div>
      </div>
      <div id="value-container-div">
        <button onClick={decreaseHandler}>-</button>
        {parameter.type === "label" ? (
          <h6 id="value-text">{parameter.value}</h6>
        ) : (
          <input
            type="number"
            id="value-text"
            value={parameter.value}
            onChange={valueChangeHandler}
          />
        )}
        <button onClick={increaseHandler}>+</button>
      </div>
    </div>
  );
};

export default ValueCard;
