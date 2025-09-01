import "./Main.css";
import { useState } from "react";
import ValueCard from "../ValueCard/ValueCard";
import { PARAMETERS } from "../../constants/parameters";
import { calculateRank } from "../../util/calculateRank";

const Main = () => {
  const [parametersList, setParametersList] = useState(PARAMETERS);
  const [winningType, setWinningType] = useState("annihilation");

  const { points, grade } = calculateRank(parametersList, winningType);

  const onIncreaseOrDecrease = (parameter, increaseOrDecrease) => {
    const alteredElement = {
      label: parameter.label,
      value:
        increaseOrDecrease === "decrease"
          ? parameter.value > 0
            ? parameter.value - 1
            : 0
          : parameter.value + 1,
      type: parameter.type,
    };

    const updatedParamsList = parametersList.map((parameter) => {
      if (parameter.label === alteredElement.label) {
        return alteredElement;
      }
      return parameter;
    });

    setParametersList(updatedParamsList);
  };

  const onValueChange = (event, parameter) => {
    const changedElement = {
      label: parameter.label,
      value: event.target.value,
      type: parameter.type,
    };

    const updatedParamsList = parametersList.map((parameter) => {
      if (parameter.label === changedElement.label) {
        return changedElement;
      }
      return parameter;
    });

    setParametersList(updatedParamsList);
  };

  const onRadioChange = (event) => {
    setWinningType(event.target.value);
  };

  const setTurnsAndCardsUsed = (
    firstParameter,
    secondParameter,
    firstValue,
    secondValue
  ) => {
    const firstAlteredElement = {
      label: firstParameter,
      value: firstValue,
      type: "input",
    };
    const secondAlteredElement = {
      label: secondParameter,
      value: secondValue,
      type: "input",
    };

    const updatedParamsList = parametersList.map((parameter) => {
      if (parameter.label === firstAlteredElement.label) {
        return firstAlteredElement;
      }
      if (parameter.label === secondAlteredElement.label) {
        return secondAlteredElement;
      }

      return parameter;
    });

    setParametersList(updatedParamsList);
  };

  const onTurnsAndCardsUsedUpdate = () => {
    setTurnsAndCardsUsed("Turnos", "Cartas Restantes", 10, 20);
  };

  const onResetHandler = () => {
    setParametersList(PARAMETERS);
    setWinningType("annihilation");
  };

  return (
    <div id="main-div">
      <div id="values-div">
        {parametersList?.map((parameter) => {
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
          <input
            type="radio"
            id="anih-radio"
            name="winning-type"
            value="annihilation"
            onChange={onRadioChange}
            checked={winningType === "annihilation" ? true : false}
          />
          <label htmlFor="anih-radio">Annihilation</label>
          <input
            type="radio"
            id="deck-radio"
            name="winning-type"
            value="deck"
            onChange={onRadioChange}
            checked={winningType === "deck" ? true : false}
          />
          <label htmlFor="deck-radio">Deck</label>
          <input
            type="radio"
            id="exodia-radio"
            name="winning-type"
            value="exodia"
            onChange={onRadioChange}
            checked={winningType === "exodia" ? true : false}
          />
          <label htmlFor="exodia-radio">Exodia</label>
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
            onClick={onTurnsAndCardsUsedUpdate}
          />
          <input type="button" value="Resetar" onClick={onResetHandler} />
        </div>
      </div>
    </div>
  );
};

export default Main;
