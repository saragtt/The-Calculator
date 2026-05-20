const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

const screen = document.querySelector(".screen");
const keys = document.querySelector(".keys");

if (screen) {
  screen.style.width = "100%";
}

function updateDisplay() {
  screen.value = calculator.displayValue;
}
updateDisplay();

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    if (result === "Error") {
      calculator.displayValue = "Error";
      resetCalculator();
      return;
    }

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") return firstOperand + secondOperand;
  if (operator === "-") return firstOperand - secondOperand;
  if (operator === "*") return firstOperand * secondOperand;
  if (operator === "/") {
    if (secondOperand === 0) return "Error"; // Controllo divisione per zero
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

keys.addEventListener("click", (event) => {
  const target = event.target;

  if (!target.matches("button")) return;

  if (target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.value === "=") {
    if (calculator.operator && !calculator.waitingForSecondOperand) {
      handleOperator(calculator.operator);
    }
    // Resetta l'operatore per il calcolo successivo
    calculator.operator = null;
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = true;
    updateDisplay();
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
