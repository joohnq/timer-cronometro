const hoursTimer = document.getElementById("hoursTimer");
const minutesTimer = document.getElementById("minutesTimer");
const secondsTimer = document.getElementById("secondsTimer");
const painelTimer = document.getElementById("painelTimer");
const btnStart = document.getElementById("start");
const btnRestart = document.getElementById("restart");
const btnStop = document.getElementById("stop");
const inputs = document.querySelector(".inputs");
const buttons = document.querySelector('.controls-timer > .buttons')
const message = document.getElementById("message-loading");
var counter;

function twoDigits(digit) {
  if (digit == "") {
    return "00";
  }
  if (digit < 10) {
    return `0${digit}`;
  } else {
    return digit;
  }
}

function cleanSetupTimer() {
  painelTimer.textContent = "00:00:00";
  hoursTimer.value = "";
  minutesTimer.value = "";
  secondsTimer.value = "";
  inputs.style.display = "";
  // buttons.style.alignItems = "center"
}

function timeOutCleanMessage() {
  setTimeout(() => {
    message.textContent = "";
  }, 1000);
}

function returnMessage(status) {
  switch (status) {
    case (status = "Start"):
      message.textContent = "Começando...";
      break;
    case (status = "Stop"):
      message.textContent = "Parando...";
      break;
    case (status = "Restart"):
      message.textContent = "Zerando...";
      break;
    case (status = "Resume"):
      message.textContent = "Retornando...";
      break;
  }
}

function startTimer() {
  let h = hoursTimer.value;
  let m = minutesTimer.value;
  let s = secondsTimer.value;

  const menuPoibilitiesSeconds = [
    s >= 60 && s < 120,
    s >= 120 && s < 180,
    s >= 180 && s < 240,
    s >= 240 && s < 300,
    s >= 300 && s < 360,
  ];

  const menuPoibilitiesMinutes = [
    m >= 60 && m < 120,
    m >= 120 && m < 180,
    m >= 180 && m < 240,
    m >= 240 && m < 300,
    m >= 300 && m < 360,
  ];

  switch (menuPoibilitiesSeconds.indexOf(true)) {
    case 0:
      s -= 60;
      m = 1;
      break;
    case 1:
      s -= 120;
      m = 2;
      break;
    case 2:
      s -= 180;
      m = 3;
      break;
    case 3:
      s -= 240;
      m = 4;
      break;
    case 4:
      s -= 300;
      m = 5;
      break;
  }

  switch (menuPoibilitiesMinutes.indexOf(true)) {
    case 0:
      m -= 60;
      h = 1;
      break;
    case 1:
      m -= 120;
      h = 2;
      break;
    case 2:
      m -= 180;
      h = 3;
      break;
    case 3:
      s -= 240;
      h = 4;
      break;
    case 4:
      m -= 300;
      h = 5;
      break;
  }

  returnMessage("Start");
  inputs.style.display = "none";
  timeOutCleanMessage();

  if(h == '' && m == '' && s == ''){
    message.textContent = 'Por favor insira os valores'
    cleanSetupTimer()
}else{
  counter = setInterval(() => {
    function counterStartTimer() {
        if (h == 0 && m == 0 && s == 0) {
          clearInterval(counter);
          cleanSetupTimer();
          console.log("Terminei");
        } else {
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
        }
    }
    setTimeout(counterStartTimer, 100);

    painelTimer.textContent = `${twoDigits(h)}:${twoDigits(m)}:${twoDigits(s)}`;
  }, 1000);
}
}

function resumeTimer() {
  clearInterval(counter);
  var pT = painelTimer.textContent;
  var hoursInPainel = Number(`${pT[0]}${pT[1]}`);
  var minutesInPainel = Number(`${pT[3]}${pT[4]}`);
  var secondsInPainel = Number(`${pT[6]}${pT[7]}`);
  returnMessage("Resume");
  timeOutCleanMessage();

  counter = setInterval(() => {
    if (secondsInPainel == 0) {
      if (minutesInPainel == 0) {
        secondsInPainel = 59;
        if (hoursInPainel == 0) {
          minutesInPainel = 59;
          secondsInPainel = 59;
        } else {
          hoursInPainel--;
          minutesInPainel = 59;
          secondsInPainel = 59;
        }
      } else {
        minutesInPainel--;
        secondsInPainel = 59;
      }
    } else {
      secondsInPainel--;
    }

    painelTimer.textContent = `${twoDigits(hoursInPainel)}:${twoDigits(
      minutesInPainel
    )}:${twoDigits(secondsInPainel)}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(counter);
  returnMessage("Stop");

  timeOutCleanMessage();

  btnStart.addEventListener("click", resumeTimer);
}

function restartTimer() {
  location.reload()
}

btnStart.addEventListener("click", startTimer);
btnStop.addEventListener("click", stopTimer);
btnRestart.addEventListener("click", restartTimer);
