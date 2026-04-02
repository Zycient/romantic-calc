import { atom } from "recoil";

export const calculationAtom = atom({
  key: "CalculationState",
  default: [], // list of string operands/operators to split and parse
});

export const calcTypes = {
  operandType: "operand",
  operatorType: "operator",
  actionType: "action", // can be backspace/clear/decimal/equals/romanToggle
};

export default calculationAtom;
