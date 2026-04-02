import * as React from "react";
import { BsArrowLeft } from "react-icons/bs";
import calculationAtom, {
  calcTypes,
  currentOperand,
  currentOperator,
} from "../states/calculationAtom";
import { useRecoilState } from "recoil";
import { romanAtom } from "../states/romanAtom";

type props = {
  rawText: string;
  calcType?: string;
};

const CalcButton = ({ rawText, calcType = calcTypes.operandType }: props) => {
  const [calculationState, setCalculationState] =
    useRecoilState(calculationAtom);
  const [currentOperandState, setCurrentOperandState] =
    useRecoilState(currentOperand);
  const [currentOperatorState, setCurrentOperatorState] =
    useRecoilState(currentOperator);
  const [romanState, setRomanState] = useRecoilState(romanAtom);

  /**
   * Handles incoming text to see if formatting is needed
   * or an icon needs to be returned.
   * @returns formatted text or icon as needed
   */
  const handleDisplay = () => {
    // Backspace
    if (rawText === "<-") {
      return <BsArrowLeft />;
    } else {
      return rawText;
    }
  };

  // ? TODO: handler logic for updating calculationAtom state list and parsing operands/operators
  const handleClick = () => {
    if (calcType === calcTypes.operandType) {
      alert("Operand");
    } else if (calcType === calcTypes.operatorType) {
      alert("Operator");
    } else if (calcType === calcTypes.backspaceType) {
      alert("Backspace");
    } else if (calcType === calcTypes.clearType) {
      alert("Clear");
    } else if (calcType === calcTypes.decimalType) {
      alert("Decimal");
    } else if (calcType === calcTypes.equalsType) {
      alert("Equals");
    } else if (calcType === calcTypes.romanType) {
      setRomanState(!romanState);
    } else {
      // Default: Operand
      alert("Operand");
    }
  };

  return (
    <div
      className="calc-button flex justify-center items-center rounded-xs bg-linear-to-b from-slate-100 dark:from-slate-700 to-slate-200 dark:to-slate-600 hover:bg-gray-300 dark:hover:bg-gray-600 select-none cursor-pointer"
      onClick={handleClick}
    >
      {handleDisplay()}
    </div>
  );
};

export default CalcButton;
