import * as React from "react";
import CalcDisplay from "./CalcDisplay";
import ButtonsContainer from "./ButtonsContainer";

const CalcContainer = () => {
  return (
    <div className="calc-container grid grid-cols-1 grid-rows-[1fr_3fr] gap-1 m-1 bg-slate-300 dark:bg-slate-900">
      <CalcDisplay />
      <ButtonsContainer />
    </div>
  );
};

export default CalcContainer;
