const calculator = {
    return firstOperand - secondOperand;
  }

  if (operator === "*") {
    return firstOperand * secondOperand;
  }

  if (operator === "/") {
  }

  return secondOperand;
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(calculator.displayValue);

  if (calculator.firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (calculator.operator) {
    const result = calculate(
      calculator.firstOperand,
      inputValue,
      calculator.operator
    );

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;

  if (nextOperator === "=") {
    calculator.operator = null;
  } else {
    calculator.operator = nextOperator;
  }
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

keys.addEventListener("click", (event) => {
  const target = event.target;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});