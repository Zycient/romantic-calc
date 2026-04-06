/**
 * Global helper functions
 */
const doOperation = (
  leftOperand: number,
  operator: string,
  rightOperand: number,
) => {
  let calcResult = 0;
  if (operator === "+") {
    // Addition
    calcResult = leftOperand + rightOperand;
  } else if (operator === "-") {
    // Subtraction
    calcResult = leftOperand - rightOperand;
  } else if (operator === "*") {
    // Multiplication
    calcResult = leftOperand * rightOperand;
  } else if (operator === "/") {
    // Division
    calcResult = leftOperand / rightOperand;
  }
  return calcResult;
};

export const parseOperands = (operands: string[]) => {
  // Parse operands
  const calcOperands: number[] = [];
  for (const op of operands) {
    try {
      if (op.includes(".")) {
        calcOperands.push(parseFloat(op));
      } else {
        calcOperands.push(parseInt(op));
      }
    } catch (err) {
      // ERROR in parsing operand
      console.error(err);
      // try again but check for dangling decimal
      try {
        if (op.slice(-1) === ".") {
          calcOperands.push(parseInt(op));
        } else {
          calcOperands.push(0); // if all else fails, use zero
        }
      } catch (innerErr) {
        console.error(innerErr);
        calcOperands.push(0); // if all else fails, use zero
      }
    }
  }
  return calcOperands;
};

const ensureNumberSafety = (inputNum: number) => {
  if (Number.isInteger(inputNum)) {
    // Check int safety
    if (!Number.isSafeInteger(inputNum)) {
      inputNum = Number.MAX_SAFE_INTEGER * (inputNum < 0 ? -1 : 1);
    }
  } else {
    // Check float safety
    if (Math.abs(inputNum) > Number.MAX_VALUE) {
      inputNum = Number.MAX_VALUE * (inputNum < 0 ? -1 : 1);
    }
  }
  return inputNum;
};

export const doCalculation = (operands: string[], operators: string[]) => {
  // If only one operand and no operator, result = operand
  if (operands.length === 1 && operators.length === 0) {
    // Parse Operand into number
    const calcOperands = parseOperands(operands);

    // Return parsed operand only
    return calcOperands[0];
  }

  // Prepare local operators list without equals
  let operatorsWithoutEquals: string[] = [];
  if (operators.length < 1) {
    // HALT calculation if invalid list lengths!
    console.error(
      "Calculation halted, invalid global list lengths; operands: " +
        operands.length.toString() +
        ", operators: " +
        operators.length.toString(),
    );
    return null; // result stays null
  } else {
    // Filter out "="
    operatorsWithoutEquals = JSON.parse(
      JSON.stringify(operators.filter((e) => e !== "=")),
    );
  }

  // Check compatibility of global operands/operator lists
  // - operands should be even-length
  // - operators, without counting =, should be odd-length
  // (if duplicate equals, handle in separate case)
  if (
    operands.length > 1 &&
    operands.length % 2 === 0 &&
    operatorsWithoutEquals.length > 0 &&
    operatorsWithoutEquals.length % 2 !== 0 &&
    operators.slice(-1)[0] !== operators.slice(-2)[0]
  ) {
    // Parse Operands into numbers
    const calcOperands = parseOperands(operands);

    // Parse operator and do calculation
    const lastOperator = operatorsWithoutEquals.slice(-1)[0];
    const leftOperand = calcOperands.slice(-2)[0];
    const rightOperand = calcOperands.slice(-1)[0];
    let calcResult = doOperation(leftOperand, lastOperator, rightOperand);

    // Check if number is "safe" for int/float, if not, set to safe max
    calcResult = ensureNumberSafety(calcResult);

    // Return formatted result obj w/additional operator to button so it can be set if needed
    return calcResult;
  } else if (
    operands.length === 1 &&
    operators.length === 1 &&
    operators.slice(-1)[0] !== "="
  ) {
    // Parse Operand into number
    const calcOperands = parseOperands(operands);

    // Return parsed operand only
    return calcOperands[0];
  } else if (
    operands.length === 1 &&
    operators.length === 1 &&
    operators.slice(-1)[0] === "="
  ) {
    // ? EXAMPLE: 1= --> 1+1=2
    // Duplicate first operand and also use as second operand
    const fusedOperands = [...operands, operands.slice(-1)[0]];

    // Parse Operands into numbers
    const calcOperands = parseOperands(fusedOperands);

    // Parse operator and do calculation
    const lastOperator = operatorsWithoutEquals.slice(-1)[0];
    const leftOperand = calcOperands.slice(-2)[0];
    const rightOperand = calcOperands.slice(-1)[0];
    let calcResult = doOperation(leftOperand, lastOperator, rightOperand);

    // Check if number is "safe" for int/float, if not, set to safe max/min
    calcResult = ensureNumberSafety(calcResult);

    // Return result
    return calcResult;
  } else if (
    operands.length > 1 &&
    operators.length > 1 &&
    operators.slice(-1)[0] === operators.slice(-2)[0]
  ) {
    // ? EXAMPLE: 1+1=2 --> = --> 2+1=3 --> = --> 3+1=4 etc.
    // Parse initial operands into numbers
    const calcOperands = parseOperands([
      operands.slice(-2)[0],
      operands.slice(-1)[0],
    ]);

    // Do initial operation to get initial result (which will become new left operand)
    const lastOperator = operatorsWithoutEquals.slice(-1)[0];
    const leftOperand = calcOperands.slice(-2)[0];
    const rightOperand = calcOperands.slice(-1)[0];
    let calcResult = doOperation(leftOperand, lastOperator, rightOperand);

    // Check if initial result is "safe" for int/float, if not, set to safe max/min
    calcResult = ensureNumberSafety(calcResult);

    // Parse new left operand (from initial result) into number
    const newCalcOperands = parseOperands([calcResult.toString()]);

    // Do final operation (left operand is last result, right operand stays the same)
    const newLeftOperand = newCalcOperands[0];
    let newCalcResult = doOperation(newLeftOperand, lastOperator, rightOperand);

    // Check result number safety again
    newCalcResult = ensureNumberSafety(newCalcResult);

    // Return result
    return newCalcResult;
  } else {
    // HALT calculation if invalid list lengths!
    console.error(
      "Calculation halted, invalid global list lengths; operands: " +
        operands.length.toString() +
        ", operators: " +
        operators.length.toString(),
    );
    return null; // result stays null
  }
};
