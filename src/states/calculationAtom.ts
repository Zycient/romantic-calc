import { atom } from "recoil";

export const operandsAtom = atom({
  key: "OperandsState",
  default: <string[]>[], // list of string operands to parse
});

export const operatorsAtom = atom({
  key: "OperatorsState",
  default: <string[]>[], // list of string operators to parse
});

// ? Holds current operand
export const currentOperandAtom = atom({
  key: "CurrentOperandState",
  default: "0",
});

// ? Holds current operator
export const currentOperatorAtom = atom({
  key: "CurrentOperatorState",
  default: "",
});

// ? Holds current numeric result
export const currentResultAtom = atom({
  key: "CurrentResultState",
  default: "0"
});

export const calcTypes = {
  operandType: "operand",
  operatorType: "operator",
  backspaceType: "backspace",
  clearType: "clear",
  decimalType: "decimal",
  romanType: "roman",
};
