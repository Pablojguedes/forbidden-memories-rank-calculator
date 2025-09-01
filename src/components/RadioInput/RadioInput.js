import "./RadioInput.css";

const RadioInput = ({ conditionName, winningType, onRadioChange }) => {
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <>
      <input
        type="radio"
        id={`${conditionName}-radio`}
        name="winning-type"
        value={conditionName}
        onChange={onRadioChange}
        checked={winningType === conditionName}
      />
      <label htmlFor={`${conditionName}-radio`}>
        {capitalizeFirstLetter(conditionName)}
      </label>
    </>
  );
};

export default RadioInput;
