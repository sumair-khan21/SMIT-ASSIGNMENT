// let abc = document.getElementById('abc');
// let plus = 0;
// function start(){

//     setInterval(() => {
//         abc.textContent = plus;
//         plus +=1;
//         if(plus > 10){
//             plus = 0;
//         }        
//     }, 2000);
// }

let miliSec = 0;
let sec = 0;
let min = 0;
let miliValue = document.getElementById('miliSec'); 
let secValue = document.getElementById('sec');
let minValue = document.getElementById('min'); 
let interval;
let isRunning = false;

function timer() {
    miliSec++;
    miliValue.innerHTML = miliSec;
    
    if (miliSec == 100) {
        sec++;
        secValue.innerHTML = sec;
        miliSec = 0;
    }
    if (sec == 60) {
        min++;
        minValue.innerHTML = min;
        sec = 0;
    }
}

function start() {
    if (!isRunning) {
        interval = setInterval(timer, 10);
        isRunning = true;
    }
}

function pause() {
    clearInterval(interval);
    isRunning = false; 
}

function reset() {
    clearInterval(interval);
    miliSec = 0;
    sec = 0;
    min = 0;
    isRunning = false; 

    miliValue.innerHTML = "00";
    secValue.innerHTML = "00";
    minValue.innerHTML = "00";
}