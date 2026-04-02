import * as React from "react";
import CalcButton from "./CalcButton";
import { calcTypes } from "../states/calculationAtom";

const ButtonsContainer = () => {
  
  return (
    // ? TODO: need to figure out manual spacing/stretching of buttons and remove blanks
    <div className="buttons-container grid grid-cols-5 grid-rows-5 gap-1 m-1">
      <CalcButton rawText="<-" calcType={calcTypes.backspaceType} />
      <CalcButton rawText="C" calcType={calcTypes.clearType} />
      <CalcButton rawText="_" calcType={calcTypes.clearType} />
      <CalcButton rawText="_" calcType={calcTypes.clearType} />
      <CalcButton rawText="_" calcType={calcTypes.clearType} />
      <CalcButton rawText="7" calcType={calcTypes.operandType} />
      <CalcButton rawText="8" calcType={calcTypes.operandType} />
      <CalcButton rawText="9" calcType={calcTypes.operandType} />
      <CalcButton rawText="/" calcType={calcTypes.operatorType} />
      <CalcButton rawText="_" calcType={calcTypes.clearType} />
      <CalcButton rawText="4" calcType={calcTypes.operandType} />
      <CalcButton rawText="5" calcType={calcTypes.operandType} />
      <CalcButton rawText="6" calcType={calcTypes.operandType} />
      <CalcButton rawText="*" calcType={calcTypes.operatorType} />
      <CalcButton rawText="R" calcType={calcTypes.romanType} />
      <CalcButton rawText="1" calcType={calcTypes.operandType} />
      <CalcButton rawText="2" calcType={calcTypes.operandType} />
      <CalcButton rawText="3" calcType={calcTypes.operandType} />
      <CalcButton rawText="-" calcType={calcTypes.operatorType} />
      <CalcButton rawText="_" calcType={calcTypes.clearType} />
      <CalcButton rawText="_" calcType={calcTypes.clearType} />
      <CalcButton rawText="0" calcType={calcTypes.operandType} />
      <CalcButton rawText="." calcType={calcTypes.decimalType} />
      <CalcButton rawText="+" calcType={calcTypes.operatorType} />
      <CalcButton rawText="=" calcType={calcTypes.equalsType} />
    </div>
  );
};

export default ButtonsContainer;
