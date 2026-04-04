import * as React from "react";
import CalcButton from "./CalcButton";
import { calcTypes } from "../states/calculationAtom";
import { useRecoilValue } from "recoil";
import { romanAtom } from "../states/romanAtom";

const ButtonsContainer = () => {
  const isRoman = useRecoilValue(romanAtom);
  
  return (
    // ? TODO: need to figure out manual spacing/stretching of buttons and remove blanks
    // ? TODO: need to do ternary for regular vs roman rawBtnVal
    <div className="buttons-container grid grid-cols-5 grid-rows-5 gap-1 m-1">
      <CalcButton rawBtnVal="<-" calcType={calcTypes.backspaceType} />
      <CalcButton rawBtnVal="C" calcType={calcTypes.clearType} />
      <CalcButton rawBtnVal="_" calcType={calcTypes.clearType} />
      <CalcButton rawBtnVal="_" calcType={calcTypes.clearType} />
      <CalcButton rawBtnVal="_" calcType={calcTypes.clearType} />
      <CalcButton rawBtnVal="7" calcType={calcTypes.operandType} />
      <CalcButton rawBtnVal="8" calcType={calcTypes.operandType} />
      <CalcButton rawBtnVal="9" calcType={calcTypes.operandType} />
      <CalcButton rawBtnVal="/" calcType={calcTypes.operatorType} />
      <CalcButton rawBtnVal="_" calcType={calcTypes.clearType} />
      <CalcButton rawBtnVal="4" calcType={calcTypes.operandType} />
      <CalcButton rawBtnVal="5" calcType={calcTypes.operandType} />
      <CalcButton rawBtnVal="6" calcType={calcTypes.operandType} />
      <CalcButton rawBtnVal="*" calcType={calcTypes.operatorType} />
      <CalcButton rawBtnVal="R" calcType={calcTypes.romanType} />
      <CalcButton rawBtnVal="1" calcType={calcTypes.operandType} />
      <CalcButton rawBtnVal="2" calcType={calcTypes.operandType} />
      <CalcButton rawBtnVal="3" calcType={calcTypes.operandType} />
      <CalcButton rawBtnVal="-" calcType={calcTypes.operatorType} />
      <CalcButton rawBtnVal="_" calcType={calcTypes.clearType} />
      <CalcButton rawBtnVal="_" calcType={calcTypes.clearType} />
      <CalcButton rawBtnVal="0" calcType={calcTypes.operandType} />
      <CalcButton rawBtnVal="." calcType={calcTypes.decimalType} />
      <CalcButton rawBtnVal="+" calcType={calcTypes.operatorType} />
      <CalcButton rawBtnVal="=" calcType={calcTypes.operatorType} />
    </div>
  );
};

export default ButtonsContainer;
