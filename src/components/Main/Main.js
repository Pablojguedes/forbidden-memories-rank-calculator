import "./Main.css";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import ValueCard from "../ValueCard/ValueCard";
import { PARAMETERS } from "../../constants/parameters";
import { calculateRank } from "../../util/calculateRank";

const Main = () => {
  const [parametersList, setParametersList] = useState(PARAMETERS);
  const [rankValue, setRankValue] = useState(100);
  const [rankDef, setRankDef] = useState("");

  useEffect(() => {
    setRankValue(calculateRankValue(parametersList));
  }, [parametersList]);

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
    };
    return calculateRank(body);
  };

  const onResetHandler = () => {
    setParametersList(PARAMETERS);
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
        <input type="button" value="Resetar" onClick={onResetHandler}/>
      </div>
    </div>
  );
};

export default Main;