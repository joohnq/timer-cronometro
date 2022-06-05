const hoursTimer = document.getElementById('hoursTimer')
const minutesTimer = document.getElementById('minutesTimer')
const secondsTimer = document.getElementById('secondsTimer')

const painelTimer = document.getElementById('painelTimer')

const btnStart = document.getElementById("start");
const btnRestart = document.getElementById("restart");
const btnStop = document.getElementById("stop");

var counter

function twoDigits(digit){
    if(digit < 10){
        return `0${digit}`
    }else{
        return digit
    }
}

function startTimer() {
        var h = hoursTimer.value 
        var m = minutesTimer.value 
        var s = secondsTimer.value

        if(h == ''){
            h = 0
        }

        if(m == ''){
            m = 0
        }

        if(s == ''){
            s = 0
        }

        counter  = setInterval(() => {
            painelTimer.textContent = `${twoDigits(h)}:${twoDigits(m)}:${twoDigits(s)}`

            if(s == 0){
                s = 59
                m--
            }else{
                s--
            }
        }, 1000)   
}

function resumeTimer(){
    var pT = painelTimer.textContent
    var hor = Number(`${pT[0]}${pT[1]}`)
    var min = Number(`${pT[3]}${pT[4]}`)
    var sec = Number(`${pT[6]}${pT[7]}`)

    counter  = setInterval(() => {
        if(sec == 0){
            sec = 59
            min--
        }else{
            sec--
        }

        painelTimer.textContent = `${twoDigits(hor)}:${twoDigits(min)}:${twoDigits(sec)}`
    }, 1000)  
}

function stopTimer(){
    clearInterval(counter)
    btnStart.addEventListener("click", resumeTimer);
}

btnStart.addEventListener("click", startTimer);
btnStop.addEventListener('click', stopTimer)