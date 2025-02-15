// let cityName = prompt("Enter your city name: ");
// let city = cityName.toLowerCase();
// if(cityName == "karachi"){
//     alert(`welcome to city of lights ${cityName}`)
// }else{
//     ("wrong city name entered")
// }
// let message = prompt("Enter your gender")
// if(message == "male"){
//     alert("Good Morning Sir")
// }else if(message =="female"){
//     alert("Good Morning Ma'am")}else{
//         alert("invalid input")
//     }
// let color = prompt("Enter color of road traffic signal")
// let signal = color.toLowerCase()
// if(signal == "green"){
//     alert("move now")
// }else if(signal == "yellow"){
//     alert("ready to move")
// }else if(signal == "red"){
//     alert("must stop")
// }else{
//     alert("invalid input")
// }

// let fuel = prompt("Enter remaining fuel in car in litres")
// let currentFuel = "0.25litres"
// if(fuel < currentFuel){
//   alert("Please refill the fuel in your car")
// }else{
//     alert("No need to refill")
// }

// var a = 4;
// if (++a === 5){
// alert("given condition for variable a is true");
// }

// var b = 82;
// if (b++ === 83){
// alert("given condition for variable b is true");
// }
//  var c = 12;
// if (c++ === 13){
// alert("condition 1 is true");
// }
// if (c === 13){
// alert("condition 2 is true");
// }
// if (++c < 14){
// alert("condition 3 is true");
// }
// if(c === 14){
// alert("condition 4 is true");
// }
// var materialCost = 20000;
// var laborCost = 2000;
// var totalCost = materialCost + laborCost;
// if (totalCost === laborCost + materialCost){
// alert("The cost equals");
// }
//  if (true){
// alert("True");
// }
// if (false){
// alert("False");
// }
//  if("car" < "cat"){
// alert("car is smaller than cat");
// }


// document.write("<h1>Marks Sheet</h1>")
// let totalmarks = +prompt("Enter total marks");
// let obtainedmarks = +prompt("Enter your obtained marks");
// let percentage = (obtainedmarks / totalmarks) * 100;
// let grade;
// let remarks;
// if(percentage >= 80){
//     grade = "A-one";
//     remarks = "Excellent";
//     document.write(`TotalMarks: ${totalmarks} <br> Obtained Marks: ${obtainedmarks} <br> Percentage: ${percentage.toFixed(2)} <br> Grade: ${grade} <br> remarks: ${remarks}`)
// }else if(percentage >= 70){
//     grade = "A";
//     remarks = "Good";
//     document.write(`TotalMarks: ${totalmarks} <br> Obtained Marks: ${obtainedmarks} <br> Percentage: ${percentage.toFixed(2)} <br> Grade: ${grade} <br> remarks: ${remarks}`)
// }
// else if(percentage >= 60){
//     grade = "B";
//     remarks = "You Need to Improve";
//     document.write(`TotalMarks: ${totalmarks} <br> Obtained Marks: ${obtainedmarks} <br> Percentage: ${percentage.toFixed(2)} <br> Grade: ${grade} <br> remarks: ${remarks}`)
// }else{
//     grade = "Fail";
//     remarks = "Sorry";
//     document.write(`TotalMarks: ${totalmarks} <br> Obtained Marks: ${obtainedmarks} <br> Percentage: ${percentage.toFixed(2)} <br> Grade: ${grade} <br> remarks: ${remarks}`)
// }


// let secretNumber = 2;
// let guess = +prompt("Enter your guess number");
// if(guess === secretNumber){
//     alert("Bingo! Correct answer")
// }else if(guess === secretNumber + 1 || guess === secretNumber - 1){
//     alert("Close enough to the correct answer")}
//     else{
//         alert("Sorry! Try again")
//     }

// let check = +prompt("Enter a number to check whether it is divisible by 3 or not");
// if(check % 3 === 0){
//     alert(`${check} is divisible by 3`)}
//     else{
//         alert(`${check} is not divisible by 3`)
//     }

// let check = +prompt("Enter a number to check whether it is even or odd");

// if(check % 2== 0){
//     alert(`${check} is even`)}
//     else{
//         alert(`${check} is odd`)
//     }

// let temp = +prompt("Enter temperature");
// if(temp >40){
//     alert("It is too hot outside")
// }else if(temp > 30){
//     alert("The weather today is normal")
// }else if(temp > 20){
//     alert("Today's weather is cool")
// }else if(temp > 10){
//     alert("OMG! Today's weather is so cool")
// }else{
//     alert("DEAD COLD")
// }


let firstNum = +prompt("Enter first number");
let secondNum = +prompt("Enter Second number");
let operators = +prompt("+,-,*, / & %");
if(operators === "+"){
    document.write(`Addition of ${firstNum} and ${secondNum} is ${firstNum + secondNum}`)
}else if(operators === "-"){
    document.write(`Subtraction of ${firstNum} and ${secondNum} is ${firstNum - secondNum}`)
}else if(operators === "*"){
    document.write(`Multiplication of ${firstNum} and ${secondNum} is ${firstNum * secondNum}`)
}else if(operators === "/"){
    if(secondNum !== 0){
        document.write(`Division of ${firstNum} and ${secondNum} is ${firstNum / secondNum}`)
}else{
    document.write("Division by zero is not allowed")
}
}else if(operators == "%"){
    if(secondNum !== 0){
        document.write(`Percentage of ${firstNum} and ${secondNum} is ${firstNum % secondNum}`)
}else{
    document.write("Percentage by zero is not allowed")
}
}else{
    document.write("Invalid Operator")
}











