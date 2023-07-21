import "./Main.css";
import { useEffect, useState } from "react";
import React from "react";
import ValueCard from "../ValueCard/ValueCard";
import { PARAMETERS } from "../../constants/parameters";
import { calculateRank } from "../../util/calculateRank";

const Main = () => {
  const [parametersList, setParametersList] = useState(PARAMETERS);
  const [rankValue, setRankValue] = useState(100);
  const [rankDef, setRankDef] = useState("");
  const [winningType, setWinningType] = useState("annihilation");

  useEffect(() => {
    setRankValue(calculateRankValue(parametersList));
  }, [parametersList, winningType]);

  useEffect(() => {
    setRankDef(defineRank(rankValue));
  }, [rankValue]);

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
    console.log(event.target.value);
    setWinningType(event.target.value);
  };

  const calculateRankValue = (parameters) => {
    const body = {
      turns: parameters[0].value,
      effectiveAttacks: parameters[1].value,
      defensiveVictories: parameters[2].value,
      faceDownPlays: parameters[3].value,
      fusions: parameters[4].value,
      equips: parameters[5].value,
      pureMagics: parameters[6].value,
      triggeredTraps: parameters[7].value,
      usedCards: parameters[8].value,
      remainingLPs: parameters[9].value,
      winningType: winningType,
    };
    return calculateRank(body);
  };

  const onResetHandler = () => {
    setParametersList(PARAMETERS);
    setWinningType("annihilation");
  };

  const defineRank = (value) => {
    if (value > 79) return "S - A Pow";
    if (value > 19) return "B - C - D Pow/Tec";
    return "S - A Tec";
  };

  return (
    <div id="main-div">
      <div id="values-div">
        {parametersList?.map((parameter) => {
          return (
            <ValueCard
              parameter={parameter}
              onValueChange={onValueChange}
              onDecrease={onIncreaseOrDecrease}
              onIncrease={onIncreaseOrDecrease}
            />
          );
        })}
        <fieldset id="winning-type-container">
          <legend>Escolha o tipo de vitória</legend>
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
          <span>Pontos: {rankValue}</span>
          <span>
            Rank:{" "}
            <span
              className="rank-span"
              id={
                rankValue > 79
                  ? "red-span"
                  : rankValue > 19
                  ? "green-span"
                  : "blue-span"
              }
            >
              {rankDef}
            </span>
          </span>
        </div>
        <input type="button" value="Resetar" onClick={onResetHandler} />
      </div>
    </div>
  );
};

export default Main;
