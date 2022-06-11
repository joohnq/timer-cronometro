const painelCronometro = document.getElementById("painelCronometro");
const btnStart = document.getElementById("start");
const btnRestart = document.getElementById("restart");
const btnStop = document.getElementById("stop");
const secondsValue = document.getElementById("seconds-value");
const minutesValue = document.getElementById("minutes-value");
const messageLoading = document.getElementById("message-loading");

btnRestart.style.display = "none";
btnStop.style.display = "none";

var counter;

function returnConfigAction(ident) {
  this.ident = ident;
  switch (ident) {
    case "Start":
      ident = [
        (messageLoading.textContent = "Começando..."),
        (btnStart.style.display = "none"),
        (btnRestart.style.display = ""),
        (btnStop.style.display = ""),
      ];
      break;

    case "Resume":
      ident = [
        (messageLoading.textContent = "Recomeçando..."),
        (btnStart.style.display = "none"),
        (btnRestart.style.display = ""),
        (btnStop.style.display = ""),
      ];
      break;

    case "Stop":
      ident = [
        (messageLoading.textContent = "Parando..."),
        (btnStart.style.display = ""),
        (btnStart.textContent = "Recomeçar"),
        (btnRestart.style.display = ""),
        (btnStop.style.display = "none"),
      ];
      break;

    case "Restart":
      ident = [
        (messageLoading.textContent = "Zerando..."),
        (btnStart.textContent = "Começar"),
        (btnStart.style.display = ""),
        (btnRestart.style.display = "none"),
        (btnStop.style.display = "none"),
      ];
      break;
  }
  return ident;
}

function timeOutMessage(){
    setTimeout(() => {
        messageLoading.textContent = "";
      }, 1000);   
}

function twoDigits(digit) {
  if (digit < 10) {
    return `0${digit}`;
  } else {
    return digit;
  }
}

function startCronometro() {
  let s = 0;
  let m = 0;
  let h = 0;

  returnConfigAction("Start");
  timeOutMessage()

  counter = setInterval(() => {
    s += 1;
    if (s > 59) {
      s = 0;
      m += 1;

      if (m > 59) {
        s = 0;
        m = 0;
        h += 1;
      }
    }
    painelCronometro.textContent = `${twoDigits(h)}:${twoDigits(m)}:${twoDigits(
      s
    )}`;
  }, 1000);
}

function resumeCronometro() {
  clearInterval(counter);
  returnConfigAction("Resume");
  timeOutMessage()

  let pC = painelCronometro.textContent;
  let hoursInPainel = Number(`${pC[0]}${pC[1]}`);
  let minutesInPainel = Number(`${pC[3]}${pC[4]}`);
  let secondsInPainel = Number(`${pC[6]}${pC[7]}`);

  counter = setInterval(() => {
    secondsInPainel += 1;
    if (secondsInPainel > 59) {
      secondsInPainel = 0;
      minutesInPainel += 1;

      if (minutesInPainel > 59) {
        secondsInPainel = 0;
        minutesInPainel = 0;
        hoursInPainel += 1;
      }
    }
    painelCronometro.textContent = `${twoDigits(hoursInPainel)}:${twoDigits(
      minutesInPainel
    )}:${twoDigits(secondsInPainel)}`;
  }, 1000);
}

function stopCronometro() {
  clearInterval(counter);
  returnConfigAction("Stop");
  timeOutMessage()

  btnStart.addEventListener("click", resumeCronometro);
}

function restartCronometro() {
  clearInterval(counter);
  returnConfigAction("Restart");
  timeOutMessage()

  setTimeout(() => {
    painelCronometro.textContent = "00:00:00";
  }, 500);
}

btnStart.addEventListener("click", startCronometro);
btnStop.addEventListener("click", stopCronometro);
btnRestart.addEventListener("click", restartCronometro);
