let currentInput = "";
let operator = "";
let previousValue = "";
let resultShown = false;
let secretMemory = null;
let clearCount = 0;
let revealArmed = false;
let revealUsed = false;

const buttonPositions = [
  ["AC", 10, 160], ["+/-", 90, 160], ["%", 170, 160], ["/", 250, 160],
  ["7", 10, 240], ["8", 90, 240], ["9", 170, 240], ["*", 250, 240],
  ["4", 10, 320], ["5", 90, 320], ["6", 170, 320], ["-", 250, 320],
  ["1", 10, 400], ["2", 90, 400], ["3", 170, 400], ["+", 250, 400],
  ["0", 10, 480], ["0", 90, 480], [".", 170, 480], ["=", 250, 480],
  ["≡", 10, 560]
];

function createButtons() {
  const container = document.getElementById("buttons-container");
  buttonPositions.forEach(([label, left, top]) => {
    const btn = document.createElement("button");
    btn.className = "button";
    btn.style.left = left + "px";
    btn.style.top = top + "px";
    btn.onclick = () => handleButton(label);
    container.appendChild(btn);
  });
}

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
    if (clearCount >= 3 && !revealUsed) revealArmed = true;
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
    case "+": currentInput = (a + b).toString(); break;
    case "-": currentInput = (a - b).toString(); break;
    case "*": currentInput = (a * b).toString(); break;
    case "/": currentInput = (a / b).toString(); break;
  }
  previousValue = "";
  operator = "";
  resultShown = true;
}

createButtons();