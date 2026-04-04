/**
 * Global helper functions
 */
export const doCalculation = (operands: string[], operators: string[]) => {
  console.log("TEST - doCalculation entry"); // ? TODO: REMOVE

  // Extract current global operands and operator
  if (operands.length === 2 && operators.length === 1) {
    console.log("TEST - calculation will be done..."); // ? TODO: REMOVE
  } else {
    // HALT calculation if invalid list lengths!
    console.error(
      "TEST - calculation halted, invalid global list lengths; operands: " +
        operands.length.toString() +
        ", operators: " +
        operators.length.toString(),
    );
    return null; // result stays null
  }

  // Parse operands
  const calcOperands: number[] = [];
  for (const op in operands) {
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
          continue;
        }
      } catch (innerErr) {
        console.error(innerErr);
      }
    }
  }

  // ? TEST ONLY - TODO: REMOVE
  if (operators.find((elem) => elem === "=")) {
    console.log("found = in operators");
  }
  // ? END TEST

  // Parse operator and do calculation
  const calcOperator = operators[0];
  let calcResult = 0;
  if (calcOperator === "+") {
    // Addition
    calcResult = calcOperands[0] + calcOperands[1];
  } else if (calcOperator === "-") {
    // Subtraction
    calcResult = calcOperands[0] - calcOperands[1];
  } else if (calcOperator === "*") {
    // Multiplication
    calcResult = calcOperands[0] * calcOperands[1];
  } else if (calcOperator === "/") {
    // Division
    calcResult = calcOperands[0] / calcOperands[1];
  } else if (calcOperator === "=") {
    // Equality, special operation
    console.log("Equality operator in calculation, ignore");
    // ? TODO: equals early OR equals in succession calculation
  } else {
    // INVALID operator
    console.error("INVALID operator found in calculation, aborting");
    return null;
  }

  // Check if number is "safe" for int/float, if not, set to safe max
  if (Number.isInteger(calcResult)) {
    // Check int safety
    if (!Number.isSafeInteger(calcResult)) {
      calcResult = Number.MAX_SAFE_INTEGER * (calcResult < 0 ? -1 : 1);
    }
  } else {
    // Check float safety
    if (Math.abs(calcResult) > Number.MAX_VALUE) {
      calcResult = Number.MAX_VALUE * (calcResult < 0 ? -1 : 1);
    }
  }

  // Return formatted result obj w/additional operator to button so it can be set if needed
  console.log("TEST - doCalculation exit"); // ? TODO: REMOVE
  return calcResult;
};
