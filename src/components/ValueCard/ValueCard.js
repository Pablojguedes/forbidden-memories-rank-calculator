import "./ValueCard.css";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ValueCard = ({
  parameter,
  onIncreaseOrDecrease,
  onValueChange,
  englishMode = false,
}) => {
  const valueChangeHandler = (event) => {
    onValueChange(event, parameter);
  };

  return (
    <div id="card-div">
      <div id="title-tooltip-container">
        <h6 id="card-title">
          {englishMode ? parameter.engLabel : parameter.label}
        </h6>
        <div id="tooltip-holder">
          <AiOutlineInfoCircle size={12} fontWeight={500} />
          <span className="tooltip-text">
            {englishMode ? parameter.engTooltipText : parameter.tooltipText}
          </span>
        </div>
      </div>
      <div id="value-container-div">
        <button onClick={() => onIncreaseOrDecrease(parameter, "decrease")}>
          -
        </button>
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
        <button onClick={() => onIncreaseOrDecrease(parameter, "increase")}>
          +
        </button>
      </div>
    </div>
  );
};

export default ValueCard;
