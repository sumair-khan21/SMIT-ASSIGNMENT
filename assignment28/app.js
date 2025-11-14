let Days = document.getElementById('days')
let Hours = document.getElementById('hours')
let Minutes = document.getElementById('min')
let Seconds = document.getElementById('sec')
let Main = document.getElementById('main')
let eidDay = new Date("March 26 2026 00:00:00").getTime();

function timer(){
    let current = new Date().getTime();
    let remainingDays = eidDay - current;
    let days = Math.floor(remainingDays / 1000 / 60 / 60 /24)
    let hours = Math.floor(remainingDays / 1000 / 60 / 60) % 24;
    let min = Math.floor(remainingDays / 1000 / 60 / 60) % 60;
    let sec = Math.floor(remainingDays / 1000 ) % 60;

    Days.innerHTML = days;
    Hours.innerHTML = hours;
    Minutes.innerHTML = min;
    Seconds.innerHTML = sec;

    if(remainingDays <= 0){
        Main.innerHTML = "Happy Eid ul Fitr!";
    }
}

setInterval(timer, 1000);
