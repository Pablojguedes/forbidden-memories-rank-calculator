import "./Main.css";
import { useState } from "react";
import ValueCard from "../ValueCard/ValueCard";
import { calculateRank } from "../../util/calculateRank";
import RadioInput from "../RadioInput/RadioInput";
import { WINNING_CONDITIONS } from "../../constants/winningConditions";
import { PARAMETERS } from "../../constants/parameters";

const updateParameterInList = (parametersList, updatedElement) => {
  return parametersList.map((parameter) =>
    parameter.label === updatedElement.label ? updatedElement : parameter
  );
};

const Main = () => {
  const [parametersList, setParametersList] = useState(PARAMETERS);
  const [winningType, setWinningType] = useState("annihilation");
  const [englishMode, setEnglishMode] = useState(false);

  const { points, grade } = calculateRank(parametersList, winningType);

  const onIncreaseOrDecrease = (parameter, increaseOrDecrease) => {
    const updatedElement = {
      ...parameter,
      value:
        increaseOrDecrease === "decrease"
          ? Math.max(0, parameter.value - 1)
          : parameter.value + 1,
    };

    setParametersList((prevList) =>
      updateParameterInList(prevList, updatedElement)
    );
  };

  const onValueChange = (event, parameter) => {
    const updatedElement = {
      ...parameter,
      value: event.target.value,
    };

    setParametersList((prevList) =>
      updateParameterInList(prevList, updatedElement)
    );
  };

  const onRadioChange = (event) => {
    setWinningType(event.target.value);
  };

  const setTurnsAndCardsUsed = () => {
    setParametersList((prevList) =>
      prevList.map((parameter) => {
        if (parameter.label === "Turnos") {
          return { ...parameter, value: 10 };
        }
        if (parameter.label === "Cartas Restantes") {
          return { ...parameter, value: 20 };
        }
        return parameter;
      })
    );
  };

  const onResetHandler = () => {
    setParametersList(PARAMETERS);
    setWinningType("annihilation");
  };

  return (
    <div id="main-div">
      <div id="values-div">
        {parametersList.map((parameter) => {
          return (
            <ValueCard
              key={parameter.label}
              parameter={parameter}
              onValueChange={onValueChange}
              onDecrease={onIncreaseOrDecrease}
              onIncrease={onIncreaseOrDecrease}
            />
          );
        })}
        <fieldset id="winning-type-container">
          <legend>Tipo de vitória</legend>
          {WINNING_CONDITIONS.map((condition) => (
            <RadioInput
              key={condition}
              conditionName={condition}
              winningType={winningType}
              onRadioChange={onRadioChange}
            />
          ))}
        </fieldset>
        <div id="rank-value-div">
          <span>Pontos: {points}</span>
          <span>
            Rank:{" "}
            <span
              className="rank-span"
              id={
                points > 79
                  ? "red-span"
                  : points > 19
                  ? "green-span"
                  : "blue-span"
              }
            >
              {grade}
            </span>
          </span>
        </div>
        <div id="buttons-container">
          <input
            type="button"
            value="Alterar T&C"
            onClick={setTurnsAndCardsUsed}
          />
          <input type="button" value="Resetar" onClick={onResetHandler} />
        </div>
      </div>
    </div>
  );
};

export default Main;
