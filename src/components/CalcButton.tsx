import * as React from "react";
import { Bs123, BsArrowLeft } from "react-icons/bs";
import {
  calcTypes,
  currentOperandAtom,
  currentOperatorAtom,
  currentResultAtom,
  operandsAtom,
  operatorsAtom,
} from "../states/calculationAtom";
import { useRecoilState } from "recoil";
import { romanAtom } from "../states/romanAtom";
import { doCalculation } from "../Helpers";
import { LuDivide, LuMinus, LuPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { PiEqualsBold } from "react-icons/pi";
import { FaCreativeCommonsZero } from "react-icons/fa";
import { TbLetterV } from "react-icons/tb";

type props = {
  rawBtnVal: string;
  calcType?: string;
};

const CalcButton = ({ rawBtnVal, calcType = calcTypes.operandType }: props) => {
  const [operandsState, setOperandsState] = useRecoilState(operandsAtom);
  const [operatorsState, setOperatorsState] = useRecoilState(operatorsAtom);
  const [currentOperandState, setCurrentOperandState] =
    useRecoilState(currentOperandAtom);
  const [, setCurrentOperatorState] = useRecoilState(currentOperatorAtom);
  const [, setCurrentResultState] = useRecoilState(currentResultAtom);
  const [isRoman, setRomanState] = useRecoilState(romanAtom);

  /**
   * Handles incoming text to see if formatting is needed
   * or an icon needs to be returned.
   * @returns formatted text or icon as needed
   */
  const handleButtonDisplay = () => {
    if (rawBtnVal === "<-") {
      // Backspace
      return <BsArrowLeft />;
    } else if (rawBtnVal === "/") {
      // Divide
      return <LuDivide />;
    } else if (rawBtnVal === "*") {
      // Multiply
      return <RxCross2 />;
    } else if (rawBtnVal === "-") {
      // Subtract
      return <LuMinus />;
    } else if (rawBtnVal === "+") {
      // Add
      return <LuPlus />;
    } else if (rawBtnVal === "=") {
      // Equals
      return <PiEqualsBold />;
    } else if (rawBtnVal === "R") {
      // Roman Toggle - display arabic numeral or Roman icon depending on state
      if (!isRoman) {
        return <TbLetterV />;
      } else {
        return <Bs123 />;
      }
    } else if (rawBtnVal === "0") {
      return isRoman ? <FaCreativeCommonsZero /> : rawBtnVal;
    } else if (rawBtnVal === "1") {
      return isRoman ? "I" : rawBtnVal;
    } else if (rawBtnVal === "2") {
      return isRoman ? "II" : rawBtnVal;
    } else if (rawBtnVal === "3") {
      return isRoman ? "III" : rawBtnVal;
    } else if (rawBtnVal === "4") {
      return isRoman ? "IV" : rawBtnVal;
    } else if (rawBtnVal === "5") {
      return isRoman ? "V" : rawBtnVal;
    } else if (rawBtnVal === "6") {
      return isRoman ? "VI" : rawBtnVal;
    } else if (rawBtnVal === "7") {
      return isRoman ? "VII" : rawBtnVal;
    } else if (rawBtnVal === "8") {
      return isRoman ? "VIII" : rawBtnVal;
    } else if (rawBtnVal === "9") {
      return isRoman ? "IX" : rawBtnVal;
    } else {
      return rawBtnVal;
    }
  };

  const handleTooltip = () => {
    if (rawBtnVal === "<-") {
      // Backspace
      return "Backspace";
    } else if (rawBtnVal === "/") {
      // Divide
      return "Divide";
    } else if (rawBtnVal === "*") {
      // Multiply
      return "Multiply";
    } else if (rawBtnVal === "-") {
      // Subtract
      return "Subtract";
    } else if (rawBtnVal === "+") {
      // Add
      return "Add";
    } else if (rawBtnVal === "=") {
      // Equals
      return "Equals";
    } else if (rawBtnVal === "R") {
      // Roman Toggle
      return "Toggle between Roman and Arabic numerals";
    } else if (rawBtnVal === "C") {
      // Clear
      return "Clear";
    } else if (rawBtnVal === ".") {
      // Decimal
      return "Decimal";
    } else {
      return rawBtnVal;
    }
  };

  const handleOperand = () => {
    // Update current operand (will be globally updated later on operator or equals) and primary display result
    if (
      currentOperandState === "" ||
      (operandsState.length === 0 && currentOperandState === "0")
    ) {
      // If no previous OR is in init-zero state, just use current button value
      setCurrentOperandState(rawBtnVal);

      // Update result
      setCurrentResultState(rawBtnVal);
    } else {
      //? Handles both (operand operand) and (operand . operand) cases
      const combinedOperand = currentOperandState + rawBtnVal;
      // Append latest button value to pre-existing operand
      setCurrentOperandState(combinedOperand);

      // Update result using pre-existing and current operand
      setCurrentResultState(combinedOperand);
    }
  };

  const handleBackspace = () => {
    if (currentOperandState.length > 1) {
      // Remove a char from operand/result
      setCurrentOperandState(
        currentOperandState.slice(0, currentOperandState.length - 1),
      );
      setCurrentResultState(
        currentOperandState.slice(0, currentOperandState.length - 1),
      );
    } else {
      // If length <=1, just clear operand/result
      setCurrentOperandState("0");
      setCurrentResultState("0");
    }
  };

  const handleClear = () => {
    setCurrentOperandState("0");
    setCurrentOperatorState("");
    setOperandsState([]);
    setOperatorsState([]);
    setCurrentResultState("0");
  };

  const handleOperator = () => {
    // If no operands yet, do nothing
    if (currentOperandState.length < 1) {
      console.log("No operands yet, no operation performed.");
      return;
    } else {
      // ? If current operand has dot at end (leftover decimal),
      //   then need to strip out dot FIRST and THEN do operator
      let tempOperand = currentOperandState;
      if (tempOperand.slice(-1) === ".") {
        tempOperand = tempOperand.slice(
          tempOperand.length - 1,
          tempOperand.length,
        );
        setCurrentOperandState(tempOperand);
      }

      // Append current operand to global list
      const updatedOperands = [...operandsState, tempOperand];
      setOperandsState(updatedOperands);

      // Set current operator
      setCurrentOperatorState(rawBtnVal);

      // Set global operator
      // ? if dupe equals: update local (remove in doCalculation), don't update global
      // ? if NOT dupe reg ops: update local, update global
      // ? else (dupe reg ops): don't update local, don't update global
      let updatedOperators = JSON.parse(JSON.stringify(operatorsState));

      if (rawBtnVal === "=" && updatedOperators.slice(-1)[0] === rawBtnVal) {
        updatedOperators = [...updatedOperators, rawBtnVal];
      } else if (!(updatedOperators.slice(-1)[0] === rawBtnVal)) {
        updatedOperators = [...updatedOperators, rawBtnVal];
        setOperatorsState(updatedOperators);
      } else {
        console.log("Dupe regular operators, don't update local or global");
      }

      // Do calculation with latest operands and operators
      const calculationResult = doCalculation(
        updatedOperands,
        updatedOperators,
      );

      // If valid, set calculation result as current and global operand
      if (calculationResult) {
        // Set calculation result as current operand
        setCurrentOperandState(calculationResult.toString());

        // Set calculation result as PREVIOUS operand behind current in global
        const splicePoint =
          updatedOperands.length > 1 ? updatedOperands.length - 3 : 0;
        const splicedOperands = JSON.parse(JSON.stringify(updatedOperands));
        splicedOperands.splice(splicePoint, 1, calculationResult.toString());
        setOperandsState(splicedOperands);
      } else {
        console.error("Invalid calculation result in handleOperator");
        setCurrentOperandState("0");
        setOperandsState(["0"]);
      }

      // Update global result if non-null
      if (calculationResult) {
        setCurrentResultState(calculationResult.toString());
      }
    }
  };

  const handleDecimal = () => {
    // ONLY add the . to the operand if it does not already exist!
    if (!currentOperandState.indexOf(".")) {
      setCurrentOperandState(currentOperandState + ".");
    }
  };

  const handleClick = () => {
    if (calcType === calcTypes.operandType) {
      handleOperand();
    } else if (calcType === calcTypes.operatorType) {
      handleOperator();
    } else if (calcType === calcTypes.backspaceType) {
      handleBackspace();
    } else if (calcType === calcTypes.clearType) {
      handleClear();
    } else if (calcType === calcTypes.decimalType) {
      handleDecimal();
    } else if (calcType === calcTypes.romanType) {
      setRomanState(!isRoman);
    } else {
      // Default: Operand
      handleOperand();
    }
  };

  return (
    <>
      {rawBtnVal === "=" && (
        <div
          className="calc-button-eq flex justify-center items-center w-full rounded-xs bg-linear-to-b from-indigo-100 dark:from-indigo-700 to-indigo-200 dark:to-indigo-600 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold select-none cursor-pointer"
          onClick={handleClick}
          title={handleTooltip()}
        >
          {handleButtonDisplay()}
        </div>
      )}
      {rawBtnVal !== "=" && (
        <div
          className="calc-button flex justify-center items-center
          w-full rounded-xs bg-linear-to-b from-slate-100 dark:from-slate-700 to-slate-200 dark:to-slate-600 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold select-none cursor-pointer"
          onClick={handleClick}
          title={handleTooltip()}
        >
          {handleButtonDisplay()}
        </div>
      )}
    </>
  );
};

export default CalcButton;
