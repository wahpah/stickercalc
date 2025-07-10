// ================
// SECRET CALCULATOR VARIABLES
// ================
let currentInput = "";
let operator = "";
let previousValue = "";
let resultShown = false;

let secretMemory = null;
let clearCount = 0;
let revealArmed = false;
let revealUsed = false;

// ================
// CREATE INVISIBLE BUTTONS
// ================
function createButtonGrid() {
  const calc = document.querySelector("body");
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.top = "50%";
  overlay.style.left = "50%";
  overlay.style.transform = "translate(-50%, -50%)";
  overlay.style.width = "320px";
  overlay.style.height = "640px";
  overlay.style.zIndex = "999";  // on top
  overlay.style.display = "grid";
  overlay.style.gridTemplateColumns = "repeat(4, 1fr)";
  overlay.style.gridGap = "10px";
  overlay.style.padding = "160px 10px 0";  // offset grid to buttons area

  let buttons = [
    "AC", "+/-", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", "0", ".", "=",
    "≡"
  ];

  buttons.forEach(label => {
    let btn = document.createElement("button");
    btn.style.height = "70px";
    btn.style.background = "transparent";
    btn.style.border = "none";
    btn.style.fontSize = "1px";  // basically invisible
    btn.style.color = "transparent";
    btn.addEventListener("click", () => handleButton(label));
    overlay.appendChild(btn);
  });

  calc.appendChild(overlay);
}

// ================
// SECRET HANDLER
// ================
function handleButton(label) {
  if (revealArmed && !revealUsed) {
    alert(secretMemory);
    revealUsed = true;
    return;
  }

  if (label === "AC") {
    currentInput = "";
    previousValue = "";
    operator = "";
    clearCount++;
    if (clearCount >= 3 && !revealUsed) {
      revealArmed = true;
    }
    return;
  }

  if (label === "+/-") {
    if (currentInput !== "") currentInput = (parseFloat(currentInput) * -1).toString();
    return;
  }

  if (label === "%") {
    if (currentInput !== "") currentInput = (parseFloat(currentInput) / 100).toString();
    return;
  }

  if (label === "≡") {
    let total = parseFloat(currentInput || "0");
    secretMemory = Math.abs(total - 6419870);
    clearCount = 0;
    revealArmed = false;
    revealUsed = false;
    return;
  }

  if (["+", "-", "*", "/"].includes(label)) {
    if (currentInput === "" && previousValue === "") return;
    if (previousValue !== "" && currentInput !== "") calculate();
    operator = label;
    previousValue = currentInput;
    currentInput = "";
    return;
  }

  if (label === "=") {
    calculate();
    return;
  }

  // numbers & .
  if (resultShown) {
    currentInput = "";
    resultShown = false;
  }
  currentInput += label;
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
  previousValue = "";
  operator = "";
  resultShown = true;
}

// ================
// RUN
// ================
createButtonGrid();
