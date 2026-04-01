import * as React from "react";
import CalcButton from "./CalcButton";

const ButtonsContainer = () => {
  // ? Need buttons: Backspace, Clear, 0-9, ., /, *, -, +, ROMAN, =
  return (
    <div className="buttons-container grid grid-cols-5 grid-rows-5 gap-1 m-1">
      <CalcButton rawText="<-" />
      <CalcButton rawText="C" />
      <CalcButton rawText="_" />
      <CalcButton rawText="_" />
      <CalcButton rawText="_" />
      <CalcButton rawText="7" />
      <CalcButton rawText="8" />
      <CalcButton rawText="9" />
      <CalcButton rawText="/" />
      <CalcButton rawText="_" />
      <CalcButton rawText="4" />
      <CalcButton rawText="5" />
      <CalcButton rawText="6" />
      <CalcButton rawText="*" />
      <CalcButton rawText="R" />
      <CalcButton rawText="1" />
      <CalcButton rawText="2" />
      <CalcButton rawText="3" />
      <CalcButton rawText="-" />
      <CalcButton rawText="_" />
      <CalcButton rawText="_" />
      <CalcButton rawText="0" />
      <CalcButton rawText="." />
      <CalcButton rawText="+" />
      <CalcButton rawText="=" />
    </div>
  );
};

export default ButtonsContainer;
