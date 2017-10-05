/*jslint es6 */

// special
const plusElem = document.getElementById("plus");
const minusElem = document.getElementById("minus");
const timesElem = document.getElementById("times");
const divideElem = document.getElementById("divide");
const equalElem = document.getElementById("equal");
const dotElem = document.getElementById("dot");
const clearElem = document.getElementById("clear");
const allClearElem = document.getElementById("allClear");

// interface
const displayElem = document.getElementById("display");
const numberElem = document.getElementsByClassName("number");
let numberArray;

let clickCount = 0;
let dotTest = true;
let firstNumTest = true;
let result = undefined;
let displayResult = "";
let memory;
let action;

// numbers - click events

numberArray = Array.from(numberElem);
numberArray.forEach(function (item) {
    "use strict";
    item.addEventListener("click", function (e) {
        if (clickCount < 9) {
            displayElem.textContent = displayElem.textContent + " " + e.target.textContent;
            clickCount += 1;
            firstNumTest = false;
        }
    });
});

// reset & dot buttons - click events

allClearElem.onclick = function () {
    "use strict";
    displayElem.textContent = "";
    clickCount = 0;
    dotTest = true;
    firstNumTest = true;
    memory = 0;
    result = undefined;
    action = "none";
    oneOperation = false;
};

clearElem.onclick = function () {
    "use strict";
    displayElem.textContent = "";
    clickCount = 0;
    dotTest = true;
    firstNumTest = true;
};

dotElem.onclick = function () {
    "use strict";
    if (clickCount < 9) {
        if (firstNumTest) {
            displayElem.textContent = "0 .";
            clickCount += 1;
            firstNumTest = false;
            dotTest = false;
        } else if (dotTest) {
            displayElem.textContent = displayElem.textContent + " .";
            clickCount += 1;
            dotTest = false;
        }
    }
};

// mathematical operators

plusElem.onclick = addition;
minusElem.onclick = subtraction;
timesElem.onclick = multiplication;
divideElem.onclick = division;

let oneOperation = false;

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}

equalElem.onclick = function () {
    "use strict";
    if (oneOperation) {
        let value = displayElem.textContent;
        value = Number(value.replace(/\s/g, ""));
        oneOperation = false;
        switch (action) {
        case "addition":
            result = memory + value;
            break;
        case "subtraction":
            result = memory - value;
            break;
        case "multiplication":
            result = memory * value;
            break;
        case "division":
            result = memory / value;
            break;
        }
        if (result !== undefined) {
            if (result > 999999999 || result < 0.0000001) {
                displayElem.textContent = "ERROR";
            } else if (result.countDecimals() >= 1) {
                result = result.toFixed(2);
                result = result.toString().split("").join(" ");
                displayElem.textContent = result;
            } else {
                result = result.toString().split("").join(" ");
                displayElem.textContent = result;
            }

        }
    }
};

// math functions

function addition() {
    "use strict";
    let value = displayElem.textContent;
    value = Number(value.replace(/\s/g, ""));
    displayElem.textContent = "";
    action = "addition";
    clickCount = 0;
    oneOperation = true;
    dotTest = true;
    return memory = value;
}

function subtraction() {
    "use strict";
    let value = displayElem.textContent;
    value = Number(value.replace(/\s/g, ""));
    displayElem.textContent = "";
    action = "subtraction";
    clickCount = 0;
    oneOperation = true;
    dotTest = true;
    return memory = value;
}

function multiplication() {
    "use strict";
    let value = displayElem.textContent;
    value = Number(value.replace(/\s/g, ""));
    displayElem.textContent = "";
    action = "multiplication";
    clickCount = 0;
    oneOperation = true;
    dotTest = true;
    return memory = value;
}

function division() {
    "use strict";
    let value = displayElem.textContent;
    value = Number(value.replace(/\s/g, ""));
    displayElem.textContent = "";
    action = "division";
    clickCount = 0;
    oneOperation = true;
    dotTest = true;
    return memory = value;
}
