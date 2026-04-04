import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  primaryDisplayAtom,
  secondaryDisplayAtom,
} from "../states/displayAtom";
import {
  currentOperandAtom,
  currentResultAtom,
  operandsAtom,
  operatorsAtom,
} from "../states/calculationAtom";

const CalcDisplay = () => {
  // ? TODO: might be able to convert display vals to LOCAL only states and remove Recoil states for those
  const [primaryDisplayVal, setPrimaryDisplayVal] =
    useRecoilState(primaryDisplayAtom);
  const [secondaryDisplayVal, setSecondaryDisplayVal] =
    useRecoilState(secondaryDisplayAtom);
  const currentResult = useRecoilValue(currentResultAtom);
  const currentOperand = useRecoilValue(currentOperandAtom);
  const operands = useRecoilValue(operandsAtom);
  const operators = useRecoilValue(operatorsAtom);

  const formatSecondaryDisplay = () => {
    if (operators.length < 1) {
      // No display on empty operators
      setSecondaryDisplayVal("");
    } else {
      // Create copy of operands
      const expressionList = JSON.parse(JSON.stringify(operands));

      // Create copy of operators (reversed for pop functionality)
      const localOperators = JSON.parse(
        JSON.stringify(operators),
      ).reverse() as string[];

      // Iterate copy and splice in operators at every other index
      console.log("CHECK LOOP"); //? TODO: REMOVE
      for (let i = 0; i < operands.length; i++) {
        if (i % 2 !== 0) { // odd
          // Pop current operator to splice
          let currentOperator;
          if (localOperators.length > 0) {
            currentOperator = localOperators.pop();
          }
          // Splice current operator into expression list
          expressionList.splice(i, 0, currentOperator);
        } else {
          continue;
        }
      }

      // Reformat into flat string for display
      setSecondaryDisplayVal(expressionList.join(" "));
    }
  };

  React.useEffect(() => {
    // Update primary from end result
    setPrimaryDisplayVal(currentResult);
  }, [currentResult]);

  React.useEffect(() => {
    // Update secondary from global operands and operators
    formatSecondaryDisplay();
  }, [operands, operators]);

  return (
    // ? TODO: need to handle extra long results (do some text formatting so that dots... are used)
    <div className="calc-display flex flex-col justify-center items-end w-full pr-1 bg-linear-to-b from-slate-300 dark:from-slate-900 to-slate-100 dark:to-slate-700 rounded-xs">
      <div className="calc-display-secondary font-light text-right text-sm">
        {secondaryDisplayVal}
      </div>
      <div className="calc-display-primary font-semibold text-right text-lg">
        {primaryDisplayVal}
      </div>
    </div>
  );
};

export default CalcDisplay;
