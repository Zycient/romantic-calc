import * as React from "react";
import CalcButton from "./CalcButton";
import { calcTypes } from "../states/calculationAtom";

const ButtonsContainer = () => {
  
  return (
    // ? TODO: need to figure out manual spacing/stretching of buttons and remove blanks
    <div className="buttons-container grid grid-cols-5 grid-rows-5 gap-1 m-1">
      <CalcButton rawText="<-" calcType={calcTypes.actionType} />
      <CalcButton rawText="C" calcType={calcTypes.actionType} />
      <CalcButton rawText="_" calcType={calcTypes.actionType} />
      <CalcButton rawText="_" calcType={calcTypes.actionType} />
      <CalcButton rawText="_" calcType={calcTypes.actionType} />
      <CalcButton rawText="7" calcType={calcTypes.operandType} />
      <CalcButton rawText="8" calcType={calcTypes.operandType} />
      <CalcButton rawText="9" calcType={calcTypes.operandType} />
      <CalcButton rawText="/" calcType={calcTypes.operatorType} />
      <CalcButton rawText="_" calcType={calcTypes.actionType} />
      <CalcButton rawText="4" calcType={calcTypes.operandType} />
      <CalcButton rawText="5" calcType={calcTypes.actionType} />
      <CalcButton rawText="6" calcType={calcTypes.operandType} />
      <CalcButton rawText="*" calcType={calcTypes.operatorType} />
      <CalcButton rawText="R" calcType={calcTypes.actionType} />
      <CalcButton rawText="1" calcType={calcTypes.operandType} />
      <CalcButton rawText="2" calcType={calcTypes.operandType} />
      <CalcButton rawText="3" calcType={calcTypes.operandType} />
      <CalcButton rawText="-" calcType={calcTypes.operatorType} />
      <CalcButton rawText="_" calcType={calcTypes.actionType} />
      <CalcButton rawText="_" calcType={calcTypes.actionType} />
      <CalcButton rawText="0" calcType={calcTypes.operandType} />
      <CalcButton rawText="." calcType={calcTypes.actionType} />
      <CalcButton rawText="+" calcType={calcTypes.operatorType} />
      <CalcButton rawText="=" calcType={calcTypes.actionType} />
    </div>
  );
};

export default ButtonsContainer;
