function createButtonGrid() {
  const calc = document.querySelector("body");
  calc.style.position = "relative";

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
  overlay.style.padding = "160px 10px 0";

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
