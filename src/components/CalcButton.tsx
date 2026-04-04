import * as React from "react";
import { BsArrowLeft } from "react-icons/bs";
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
  const [romanState, setRomanState] = useRecoilState(romanAtom);
  // const [decimalState, setDecimalState] = React.useState(false); // ? TODO: do I need this???

  /**
   * Handles incoming text to see if formatting is needed
   * or an icon needs to be returned.
   * @returns formatted text or icon as needed
   */
  const handleButtonDisplay = () => {
    // ? TODO: get the remaining icons and add if blocks for those
    // ? TODO: handle romanToggle and alternate display for those
    // Backspace
    if (rawBtnVal === "<-") {
      return <BsArrowLeft />;
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
      let combinedOperand = currentOperandState + rawBtnVal;
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

  const handleOperatorOrEquals = (keepOperator = false) => {
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
      setOperandsState([...operandsState, tempOperand]);

      // Do calculation
      const calculationResult = doCalculation(operandsState, operatorsState);

      // If valid, set calculation result as current and global operand
      if (calculationResult) {
        setCurrentOperandState(calculationResult?.toString());
        setOperandsState([calculationResult?.toString()]);
      }
      // ? TODO: see if I need an ELSE case here for invalid result...

      // Clear or keep operator
      if (keepOperator) {
        // Operator Type: Set current and global operator
        setCurrentOperatorState(rawBtnVal);
        setOperatorsState([...operatorsState, rawBtnVal]);
      } else {
        // Equals Type: Clear current and global operator
        setCurrentOperatorState("");
        setOperatorsState([]);
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

  // ? TODO: test all types
  const handleClick = () => {
    if (calcType === calcTypes.operandType) {
      handleOperand();
    } else if (calcType === calcTypes.operatorType) {
      handleOperatorOrEquals(true);
    } else if (calcType === calcTypes.backspaceType) {
      handleBackspace();
    } else if (calcType === calcTypes.clearType) {
      handleClear();
    } else if (calcType === calcTypes.decimalType) {
      handleDecimal();
    } else if (calcType === calcTypes.equalsType) {
      handleOperatorOrEquals();
    } else if (calcType === calcTypes.romanType) {
      setRomanState(!romanState);
    } else {
      // Default: Operand
      handleOperand();
    }
  };

  return (
    <div
      className="calc-button flex justify-center items-center rounded-xs bg-linear-to-b from-slate-100 dark:from-slate-700 to-slate-200 dark:to-slate-600 hover:bg-gray-300 dark:hover:bg-gray-600 select-none cursor-pointer"
      onClick={handleClick}
    >
      {handleButtonDisplay()}
    </div>
  );
};

export default CalcButton;
