const painelCronometro = document.getElementById('painelCronometro')

const btnStart = document.getElementById("start");
const btnRestart = document.getElementById("restart");
const btnStop = document.getElementById("stop");

const secondsValue = document.getElementById("seconds-value");
const minutesValue = document.getElementById("minutes-value");

const messageLoading = document.getElementById("message-loading");

var counter
var s = 0
var m = 0
var h = 0 

function twoDigits(digit){
    if(digit < 10){
        return `0${digit}`
    }else{
        return digit
    }
}

function startCronometro() {
    messageLoading.textContent = 'Começando...'
    btnStart.style.display = 'none'
    counter = setInterval(() => {
        messageLoading.textContent = ''
        s += 1
        if(s > 59){
            s = 0
            m += 1
            
            if(m > 59){
                s = 0
                m = 0
                h += 1
            }
        }
        painelCronometro.textContent = `${twoDigits(h)}:${twoDigits(m)}:${twoDigits(s)}`
    }, 1000)

}

function stopCronometro() {
    clearInterval(counter)
    messageLoading.textContent = 'Parando...'
    btnStart.style.display = ''

    setTimeout(() => {
        messageLoading.textContent = ''
    }, 1000)

    btnStart.value = 'Recomeçar'
    btnStart.addEventListener("click", startCronometro)
}

function restartCronometro(){
    messageLoading.textContent = 'Zerando...'
    btnStart.value = 'Começar'
    btnStart.style.display = ''
    clearInterval(counter)
    setTimeout(() => {
        messageLoading.textContent = ''
        painelCronometro.textContent = '00:00:00'
    }, 500)
}

btnStart.addEventListener("click", startCronometro);
btnStop.addEventListener("click", stopCronometro);
btnRestart.addEventListener("click", restartCronometro)
