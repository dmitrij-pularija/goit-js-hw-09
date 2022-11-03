const startButton = document.querySelector("button[data-start]");
const stopButton = document.querySelector("button[data-stop]");
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startCheng() {
  if (!startButton.disabled) {
    startButton.disabled = true;
    stopButton.disabled = false;
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
}

function stopCheng() {
  if (!stopButton.disabled) {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(timerId);
    document.body.style.backgroundColor = "#fafafa";
  }
}

startButton.addEventListener("click", () => startCheng());
stopButton.addEventListener("click", () => stopCheng());
