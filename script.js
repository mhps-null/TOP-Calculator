let firstNumber = null;
let secondNumber = null;
let operator = null;
let shouldResetDisplay = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return 'Error';
    return a / b;
}

function operate(op, a, b) {
    switch (op) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
}

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-action="equals"]');
const clearButton = document.querySelector('[data-action="clear"]');
const decimalButton = document.querySelector('[data-action="decimal"]');
const percentageButton = document.querySelector('[data-action="percentage"]');
const deleteButton = document.querySelector('[data-action="delete"]');

function appendNumber(num) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = num;
        shouldResetDisplay = false;
    } else {
        display.textContent += num;
    }
}

numberButtons.forEach(btn =>
    btn.addEventListener('click', () => appendNumber(btn.textContent))
);

function setOperator(op) {
    if (operator !== null) evaluate();
    firstNumber = Number(display.textContent);
    operator = op;
    shouldResetDisplay = true;
}

operatorButtons.forEach(btn =>
    btn.addEventListener('click', () => setOperator(btn.dataset.operator))
);

function roundResult(num, digits = 4) {
    return Number(num.toFixed(digits));
}

function evaluate() {
    if (operator === null || shouldResetDisplay) return;

    secondNumber = Number(display.textContent);
    const result = operate(operator, firstNumber, secondNumber);

    display.textContent =
        result === 'Error'
            ? 'Error'
            : roundResult(result, 4);

    operator = null;
    shouldResetDisplay = true;
}

equalsButton.addEventListener('click', evaluate);

function clearAll() {
    display.textContent = '0';
    firstNumber = null;
    secondNumber = null;
    operator = null;
    shouldResetDisplay = false;
}

clearButton.addEventListener('click', clearAll);

function convertToPercentage() {
    let currentValue = Number(display.textContent);
    currentValue = currentValue / 100;
    display.textContent = currentValue.toString();
}

percentageButton.addEventListener('click', convertToPercentage);

function deleteLast() {
    if (shouldResetDisplay) return;
    if (display.textContent.length === 1) {
        display.textContent = '0';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

deleteButton.addEventListener('click', deleteLast);

decimalButton.addEventListener('click', () => {
    if (shouldResetDisplay) display.textContent = '0';
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
});
