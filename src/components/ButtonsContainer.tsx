import * as React from "react";
import CalcButton from "./CalcButton";

const ButtonsContainer = () => {
  // ? Need buttons: Backspace, Clear, 0-9, ., /, *, -, +, ROMAN, =
  return (
    <div className="buttons-container grid grid-cols-5 grid-rows-5 gap-1 m-1">
      <CalcButton displayText="<-" />
      <CalcButton displayText="C" />
      <CalcButton displayText="_" />
      <CalcButton displayText="_" />
      <CalcButton displayText="_" />
      <CalcButton displayText="7" />
      <CalcButton displayText="8" />
      <CalcButton displayText="9" />
      <CalcButton displayText="/" />
      <CalcButton displayText="_" />
      <CalcButton displayText="4" />
      <CalcButton displayText="5" />
      <CalcButton displayText="6" />
      <CalcButton displayText="*" />
      <CalcButton displayText="R" />
      <CalcButton displayText="1" />
      <CalcButton displayText="2" />
      <CalcButton displayText="3" />
      <CalcButton displayText="-" />
      <CalcButton displayText="_" />
      <CalcButton displayText="_" />
      <CalcButton displayText="0" />
      <CalcButton displayText="." />
      <CalcButton displayText="+" />
      <CalcButton displayText="=" />
    </div>
  );
};

export default ButtonsContainer;
