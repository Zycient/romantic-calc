import * as React from "react";
import { useRecoilValue } from "recoil";
import {
  currentResultAtom,
  operandsAtom,
  operatorsAtom,
} from "../states/calculationAtom";

const CalcDisplay = () => {
  const [primaryDisplayVal, setPrimaryDisplayVal] = React.useState("");
  const [secondaryDisplayVal, setSecondaryDisplayVal] = React.useState("");
  const currentResult = useRecoilValue(currentResultAtom);
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
      for (let i = 0; i < operands.length; i++) {
        // Every odd iteration only
        if (i % 2 !== 0) {
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
    <div className="calc-display flex flex-col justify-center items-end w-full pr-1 bg-linear-to-b from-slate-300 dark:from-slate-900 to-slate-100 dark:to-slate-700 rounded-xs">
      <div className="calc-display-secondary font-light text-right text-sm text-ellipsis text-nowrap">
        {secondaryDisplayVal}
      </div>
      <div className="calc-display-primary font-semibold text-right text-lg text-ellipsis text-nowrap">
        {primaryDisplayVal}
      </div>
    </div>
  );
};

export default CalcDisplay;
