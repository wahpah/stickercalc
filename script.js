let display = document.getElementById("display");
let currentInput = "";
let operator = "";
let previousValue = "";
let resultShown = false;

let secretMemory = null;
let clearCount = 0;
let revealArmed = false;
let revealUsed = false;

function append(value) {
    if (resultShown) {
        currentInput = "";
        resultShown = false;
    }
    currentInput += value;
    updateDisplay();
}

function operator(op) {
    if (currentInput === "" && previousValue === "") return;
    if (previousValue !== "" && currentInput !== "") {
        calculate();
    }
    operator = op;
    previousValue = currentInput;
    currentInput = "";
}

function calculate() {
    let a = parseFloat(previousValue);
    let b = parseFloat(currentInput);
    if (isNaN(a) || isNaN(b)) return;

    switch (operator) {
        case '+': currentInput = (a + b).toString(); break;
        case '-': currentInput = (a - b).toString(); break;
        case '*': currentInput = (a * b).toString(); break;
        case '/': currentInput = (a / b).toString(); break;
    }
    updateDisplay();
    previousValue = "";
    operator = "";
    resultShown = true;
}

function clearDisplay() {
    currentInput = "";
    previousValue = "";
    operator = "";
    updateDisplay("0");
    clearCount += 1;
    if (clearCount >= 3 && !revealUsed) {
        revealArmed = true;
        document.querySelector(".calculator").classList.add("armed");
    }
}

function plusMinus() {
    if (currentInput !== "") {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function percent() {
    if (currentInput !== "") {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }
}

function updateDisplay(value) {
    display.innerText = value !== undefined ? value : currentInput || "0";
}

let menuButton = document.getElementById("secret");
menuButton.addEventListener("click", function() {
    let total = parseFloat(currentInput || "0");
    let forcedTotal = Math.abs(total - 6419870);
    secretMemory = forcedTotal;
    clearCount = 0;
    revealArmed = false;
    revealUsed = false;
    document.querySelector(".calculator").classList.remove("armed");
});

document.querySelector(".calculator").addEventListener("click", function() {
    if (revealArmed && !revealUsed) {
        updateDisplay(secretMemory.toString());
        revealUsed = true;
        revealArmed = false;
        document.querySelector(".calculator").classList.remove("armed");
    }
});