// Current Date & Time Display
// Task: Current date and time ko browser mein display karo.
// let today = new Date()
// console.log(today);


// Only Date Extract Karo
// Task: Sirf date (day/month/year) print karo.
// Output example: 23/05/2025

// let today = new Date()
// console.log(`Today is ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`);



// Only Time Extract Karo
// Task: Sirf current time show karo in format: HH:MM:SS
// let today = new Date()
// console.log(`Time ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`);



// Countdown Timer
// Task: Kisi specific future date (jaise New Year) tak kitna time baqi hai wo countdown show karo.
// Output example: 100 days 5 hours 30 minutes 10 seconds left
function updateCountdown() {

    
    let today = new Date()
    let eid = new Date("May 26 2026")
    // console.log(eid);
    let time = eid.getTime() - today.getTime()
    // console.log(time);
    if(time <= 0){
        document.getElementById("countdown").innerText = "Eid ul Adha is here";
        clearInterval(interval);
        return;
    }


let seconds = Math.floor(time / 1000)
// console.log(seconds);
let minutes = Math.floor(seconds / 60)
// console.log(minutes);
let hours = Math.floor(minutes / 60)
// console.log(hours);
let days = Math.floor(hours / 24)
// console.log(days);
let remainingHours = hours % 24
// console.log(remainingHours);
let remainingMinutes = minutes % 60
// console.log(remainingMinutes);
let remainingSeconds = seconds % 60
// console.log(remainingSeconds);
// console.log(`${days} days ${remainingHours} hours ${remainingMinutes} minutes ${remainingSeconds} seconds left`);


document.getElementById("countdown").innerText =
`${days} days ${remainingHours} hours ${remainingMinutes} minutes ${remainingSeconds} seconds left`;

}
updateCountdown();

setInterval(updateCountdown, 1000);




