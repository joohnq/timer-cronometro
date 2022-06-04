const horasTimer = document.getElementById('hoursTimer')
const minutesTimer = document.getElementById('minutesTimer')
const segundosTimer = document.getElementById('secondsTimer')

const painelTimer = document.getElementById('painelTimer')

const btnStart = document.getElementById("start");
const btnRestart = document.getElementById("restart");
const btnStop = document.getElementById("stop");

function twoDigits(digit){
    if(digit < 10){
        return `0${digit}`
    }else{
        return digit
    }
}

function startCronometro() {
    var h = Number(horasTimer.value)
    var m = Number(minutesTimer.value)
    var s = Number(secondsTimer.value)

    setInterval(() => {
        s--

        

        if(s < 0){
            s = 59 
            m--

            if(m == 0){
                s = 60
                m = 59
                h--
            }
        }
        painelTimer.textContent = `${twoDigits(h)}: ${twoDigits(m)}: ${twoDigits(s)}`
    }, 1000)
}

// function stopCronometro() {
    
// }

// function restartCronometro(){
    
// }

btnStart.addEventListener("click", startCronometro);
// btnStop.addEventListener("click", stopCronometro);
// btnRestart.addEventListener("click", restartCronometro)