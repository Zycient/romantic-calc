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

  // const formatPrimaryDisplay = () => {
  //   setPrimaryDisplayVal(currentResult);
  // };

  // ? TODO: figure out operands and operators for this
  // ! I need to figure out how to store and display =
  const formatSecondaryDisplay = () => {};

  React.useEffect(() => {
    // Update primary from end result
    // formatPrimaryDisplay();
    setPrimaryDisplayVal(currentResult);
  }, [currentResult]);

  React.useEffect(() => {
    // Update secondary from global operands and operators
    // NEED at least one of each
    if (operands.length > 0 && operators.length > 0) {
      formatSecondaryDisplay();
    }
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
