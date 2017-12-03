// special characters elements
const plusElem = document.getElementById('plus');
const minusElem = document.getElementById('minus');
const timesElem = document.getElementById('times');
const divideElem = document.getElementById('divide');
const equalElem = document.getElementById('equal');
const dotElem = document.getElementById('dot');
const clearElem = document.getElementById('clear');
const allClearElem = document.getElementById('allClear');

// interface elements
const displayElem = document.getElementById('display');
const numberElem = document.getElementsByClassName('number');

Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split('.')[1].length || 0;
};

const calculator = {
  numberClicksCounter: 0,
  dotIsClicked: false,
  numberIsClicked: false,
  operationInProgress: false,
  result: undefined,
  displayResult: '',
  numberInMemory: 0,
  mathematicalOperation: undefined,

  clickCountReset() {
    calculator.numberClicksCounter = 0;
  },

  clickCountIncrement() {
    calculator.numberClicksCounter += 1;
  },

  getCurrentNumber() {
    let value = displayElem.textContent;
    value = Number(value.replace(/\s/g, ''));
    displayElem.textContent = '';

    calculator.operationInProgress = true;
    calculator.dotIsClicked = false;
    calculator.numberIsClicked = false;
    calculator.clickCountReset();

    calculator.numberInMemory = value;
    return calculator.numberInMemory;
  },

  resetAll() {
    calculator.numberClicksCounter = 0;
    calculator.dotIsClicked = false;
    calculator.numberIsClicked = false;
    calculator.operationInProgress = false;
    calculator.result = undefined;
    calculator.displayResult = '';
    calculator.numberInMemory = 0;
    calculator.mathematicalOperation = undefined;
    displayElem.textContent = calculator.displayResult;
  },

  resetCurrent() {
    calculator.numberClicksCounter = 0;
    calculator.displayResult = '';
    calculator.dotIsClicked = false;
    calculator.numberIsClicked = false;
    displayElem.textContent = calculator.displayResult;
  },

  getFloatingPointNumber() {
    if (calculator.numberClicksCounter < 6) {
      if (!calculator.numberIsClicked) {
        displayElem.textContent = '0 .';
        calculator.clickCountIncrement();
        calculator.numberIsClicked = false;
        calculator.dotIsClicked = true;
      } else if (!calculator.dotIsClicked) {
        displayElem.textContent = `${displayElem.textContent} .`;
        calculator.clickCountIncrement();
        calculator.dotIsClicked = true;
      }
    }
  },

  getResult() {
    if (calculator.operationInProgress) {
      let value = displayElem.textContent;
      value = Number(value.replace(/\s/g, ''));
      calculator.operationInProgress = false;
      switch (calculator.mathematicalOperation) {
        case 'addition':
          calculator.result = calculator.numberInMemory + value;
          break;
        case 'subtraction':
          calculator.result = calculator.numberInMemory - value;
          break;
        case 'multiplication':
          calculator.result = calculator.numberInMemory * value;
          break;
        case 'division':
          calculator.result = calculator.numberInMemory / value;
          break;
        default:
          break;
      }
      if (calculator.result !== undefined) {
        if (calculator.result.countDecimals() >= 1) {
          calculator.result = calculator.result.toFixed(2);
          calculator.result = calculator.result.toString().split('').join(' ');
          displayElem.textContent = calculator.result;
        } else {
          calculator.result = calculator.result.toString().split('').join(' ');
          displayElem.textContent = calculator.result;
        }
      }
    }
  }
};

const mathFunctionsFlags = {

  addition() {
    calculator.mathematicalOperation = 'addition';
  },

  subtraction() {
    calculator.mathematicalOperation = 'subtraction';
  },

  multiplication() {
    calculator.mathematicalOperation = 'multiplication';
  },

  division() {
    calculator.mathematicalOperation = 'division';
  }
};

// Click events

allClearElem.onclick = calculator.resetAll;
clearElem.onclick = calculator.resetCurrent;
dotElem.onclick = calculator.getFloatingPointNumber;
equalElem.onclick = calculator.getResult;

const numberArray = Array.from(numberElem);
numberArray.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (calculator.numberClicksCounter < 6) {
      displayElem.textContent = `${displayElem.textContent} ${e.target.textContent}`;
      calculator.clickCountIncrement();
      calculator.numberIsClicked = true;
    }
  });
});

plusElem.addEventListener('click', () => {
  calculator.getCurrentNumber();
  mathFunctionsFlags.addition();
});

minusElem.addEventListener('click', () => {
  calculator.getCurrentNumber();
  mathFunctionsFlags.subtraction();
});

timesElem.addEventListener('click', () => {
  calculator.getCurrentNumber();
  mathFunctionsFlags.multiplication();
});

divideElem.addEventListener('click', () => {
  calculator.getCurrentNumber();
  mathFunctionsFlags.division();
});
