const startButton = document.querySelector("button[data-start]");
const stopButton = document.querySelector("button[data-stop]");
let timerId = null;

function setButton(set) {
  startButton.disabled = set;
  stopButton.disabled = !set;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startCheng() {
  setButton(true);
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopCheng() {
  setButton(false);
  clearInterval(timerId);
  document.body.style.backgroundColor = "#fafafa";
}

setButton(false);
startButton.addEventListener("click", () => startCheng());
stopButton.addEventListener("click", () => stopCheng());
