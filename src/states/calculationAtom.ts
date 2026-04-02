import { atom } from "recoil";

// ? Holds current expression, i.e. 2 + 2
export const calculationAtom = atom({
  key: "CalculationState",
  default: [], // list of string operands/operators to split and parse
});

// ? Holds current operand
export const currentOperand = atom({
  key: "CurrentOperandState",
  default: "",
});

// ? Holds current operator
export const currentOperator = atom({
  key: "CurrentOperatorState",
  default: "",
});

export const calcTypes = {
  operandType: "operand",
  operatorType: "operator",
  backspaceType: "backspace",
  clearType: "clear",
  decimalType: "decimal",
  equalsType: "equals",
  romanType: "roman",
};

export default calculationAtom;
