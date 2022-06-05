const hoursTimer = document.getElementById("hoursTimer");
const minutesTimer = document.getElementById("minutesTimer");
const secondsTimer = document.getElementById("secondsTimer");

const painelTimer = document.getElementById("painelTimer");

const btnStart = document.getElementById("start");
const btnRestart = document.getElementById("restart");
const btnStop = document.getElementById("stop");

const inputs = document.querySelector(".inputs");

const message = document.getElementById("message-loading");

var counter;

function twoDigits(digit) {
  if (digit < 10) {
    return `0${digit}`;
  } else {
    return digit;
  }
}

function startTimer() {
  var h = hoursTimer.value;
  var m = minutesTimer.value;
  var s = secondsTimer.value;
  message.textContent = "Começando...";

  if (h == "") {
    h = 0;
  }

  if (m == "") {
    m = 0;
  }

  if (s == "") {
    s = 0;
  }

  if (h == 0 && m == 0 && s == 0) {
    message.textContent = "Por favor, digite os valores";
  } else {
    inputs.style.display = "none";
  }

  setTimeout(() => {
    message.textContent = "";
  }, 1000);

  counter = setInterval(() => {
    if (s == 0) {
      if (m == 0) {
        s = 59;
        if (h == 0) {
          m = 59;
          s = 59;
        } else {
          h--;
          m = 59;
          s = 59;
        }
      } else {
        m--;
        s = 59;
      }
    } else {
      s--;
    }

    painelTimer.textContent = `${twoDigits(h)}:${twoDigits(m)}:${twoDigits(s)}`;
  }, 1000);
}

function resumeTimer() {
  clearInterval(counter);
  var pT = painelTimer.textContent;
  var hor = Number(`${pT[0]}${pT[1]}`);
  var min = Number(`${pT[3]}${pT[4]}`);
  var sec = Number(`${pT[6]}${pT[7]}`);
  message.textContent = "Retomando...";

  setTimeout(() => {
    message.textContent = "";
  }, 1000);

  counter = setInterval(() => {
    if (sec == 0) {
      if (min == 0) {
        sec = 59;
        if (hor == 0) {
          min = 59;
          sec = 59;
        } else {
          hor--;
          min = 59;
          sec = 59;
        }
      } else {
        min--;
        sec = 59;
      }
    } else {
      sec--;
    }

    painelTimer.textContent = `${twoDigits(hor)}:${twoDigits(min)}:${twoDigits(
      sec
    )}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(counter);
  message.textContent = "Parando...";

  setTimeout(() => {
    message.textContent = "";
  }, 1000);

  btnStart.addEventListener("click", resumeTimer);
}

function restartTimer() {
  clearInterval(counter);
  painelTimer.textContent = "00:00:00";
  inputs.style.display = "";
  message.textContent = "Zerando...";

  setTimeout(() => {
    message.textContent = "";
  }, 1000);
}

btnStart.addEventListener("click", startTimer);
btnStop.addEventListener("click", stopTimer);
btnRestart.addEventListener("click", restartTimer);
