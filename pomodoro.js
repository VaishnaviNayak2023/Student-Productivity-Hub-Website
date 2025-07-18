const timerDisplay = document.getElementById('timer');                  //Timer Display
const startPauseBtn = document.getElementById('start-pause');           //Pause Button
const resetBtn = document.getElementById('reset');                      //Reset Button
const modeButtons = document.querySelectorAll('.mode-btn');            

let timer;
let isRunning = false;
let currentMode = 'pomodoro';
let timeLeft = 1500; // 25 min

const timeValues = {
  pomodoro: 1500,
  short: 300,
  long: 900
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  timeLeft = timeValues[currentMode];
  updateDisplay();
}

startPauseBtn.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
    startPauseBtn.textContent = 'start';
  } else {
    startTimer();
    startPauseBtn.textContent = 'pause';
  }
});

resetBtn.addEventListener('click', () => {
  resetTimer();
  startPauseBtn.textContent = 'start';
});

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    modeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentMode = btn.dataset.mode;
    resetTimer();
    startPauseBtn.textContent = 'start';
  });
});

updateDisplay(); // initial
