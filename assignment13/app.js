// Write a program that takes two user inputs for first and
// last name using prompt and merge them in a new variable
// titled fullName. Greet the user using his full name.

// let firstName = prompt(`ENTER YOUR FIRST NAME`)
// let lastName = prompt(`ENTER YOUR LAST NAME`)
// let fullName =  `${firstName + lastName}`
// alert(`Hello ${fullName}`)


// Write a program to take a user input about his favorite
// mobile phone model. Find and display the length of user
// input in your browser

// let favoriteModel = prompt(`ENTER YOUR FAVORITE MOBILE MODEL`);
// let mobile = favoriteModel;
// let mobileLenght  = favoriteModel.length;
// alert(`My Favorite mobile is: ${mobile} and lenght of string ${mobileLenght}`);


// Write a program to find the index of letter “n” in the word
// “Pakistani” and display the result in your browser .

// let letter = "Pakistani";
// alert(`String: ${letter} Index of n ${letter.indexOf('n')}`)
// alert(`String: ${letter} Index of n ${letter.indexOf('k')}`)


// Write a program to find the last index of letter “l” in the
// word “Hello World” and display the result in your browser.

// let letter = `Hello World`;
// alert(`string: ${letter} last index of l ${letter.lastIndexOf(`l`)}`)
// left to right start to end
// let text = "Hello World";
// let index = text.indexOf("l"); 
// console.log(index); // Output: 2
// right to left end to start
// let text = "Hello World";
// let lastIndex = text.lastIndexOf("l"); 
// console.log(lastIndex); // Output: 9
// nothing find return -1


// Write a program to find the character at 3rd index in the
// word “Pakistani” and display the result in your browser.

// let letter = "Pakistani"
// alert(`String: ${letter} and Character at index 3: ${letter.charAt(3)}` )

// Repeat Q1 using string concat() method.

// let firstName = prompt(`ENTER YOUR FIRST NAME`);
// let lastName = prompt(`ENTER YOUR LAST NAME`);
// let fullName = firstName.concat(' ', lastName);
// alert(`hello ${fullName}`);


// Write a program to replace the “Hyder” to “Islam” in the
// word “Hyderabad” and display the result in your browser.

// let city = "Hyderabad"
// let full = city.replace("Hyder", "Islam");
// alert(`City ${city} After replacement ${full}`)


// Write a program to replace all occurrences of “and” in the
// string with “&” and display the result in your browser.
// var message = “Ali and Sami are best friends. They play cricket and
// football together.”;

// var message = "Ali and Sami are best friends. They play cricket and football together.";
// let replaceWord = message.replace(/and/g, "&")
// alert(replaceWord)

// let text = "Ali and Sami and sami and ali";
// let result = text.replace(/and/g, "&");
// alert(result)  // Output: "Ali & Sami & John & Mary"


// Write a program that converts a string “472” to a number
// 472. Display the values & types in your browser.

// let myNumber = "472";
// let check = Number(myNumber);
// alert(`Value: ${myNumber} Type: ${typeof(myNumber)} Value: ${myNumber} Type: ${typeof(check)}`)


// Write a program that takes user input. Convert and
// show the input in capital letters.

// let letter = prompt(`Enter word`);
// let newLetter = letter.toUpperCase()
// alert(`your input ${letter} new input ${newLetter}`)
// let letter = prompt(`Enter word`);
// let newLetter = letter.split(" ").map(word => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`).join(" ");
// alert(`User input ${letter} Title case ${newLetter}`)


// Write a program that converts the variable num to
// string.
// var num = 35.36 ;
// Remove the dot to display “3536” display in your browser.

// let num =  35.36;
// let newNum = num.toString()
// alert(`Number: ${num} , Result: ${newNum.replace("35.36", "3536")}`)


// Write a program to take user input and store username
// in a variable. If the username contains any special symbol
// among [@ . , !], prompt the user to enter a valid username.
// For character codes of [@ .


// let user = prompt(`Enter your name`)
// let invalid = /[@.,!-_]/;
// if(invalid.test(user)){
//   alert(`Invalid username`)
// }else{
//     document.write(`your valid name is ${user}`)
// }


// let userInput = prompt(`Enter bakery items`).toLowerCase();
// let food = ["cake", "apple pie", "cookie", "chips", "patties"];
// let findItems = food.find(items => items.toLowerCase() === userInput);
// alert(findItems ? `${userInput} is available at index ${food.indexOf(userInput)} in our bakery` : `${userInput} is not available in our bakery`)



// Write a program to take password as an input from
// user. The password must qualify these requirements:
// a. It should contain alphabets and numbers
// b. It should not start with a number
// c. It must at least 6 characters long
// If the password does not meet above requirements,
// prompt the user to enter a valid password.
// For character codes of a-z, A-Z & 0-9, refer to ASCII
// table at the end of this document.

// let password = prompt(`Enter your password`)
// if(password.length < 6){
//     alert("password should be 6 character")
// }else if(!isNaN(password.charAt(0))){
// alert("dont start your password with number")
// }else{
//     let alphabets = /[a-zA-Z]/.test(password)
//     let num = /[0-9]/.test(password)
//     if(!alphabets || !num){
//         alert("it should be number and alphabets")
//     }else{
//  alert("Valid Password")
//     }
// }


// Write a program to convert the following string to an
// array using string split method.
// var university = “University of Karachi”;
// Display the elements of array in your browser.

// var university = "University of Karachi";
// let array = university.split(" ")
// for(let i = 0; i < array.length; i++){
//     console.log(array[i]);
    
// }
// // console.log(array);


// Write a program to display the last character of a user
// input.

// let user = "Pakistan";
// alert(`${user.charAt(user.length -1)}`)


let str = "The quick brown fox jumps over the lazy dog";
let lowerStr = str.toLowerCase();
let words = lowerStr.split(" ");
let count = 0;
for(let i =0; i < words.length; i++){
    if(words[i] == "the"){
     count++;
    }
}
document.write(`The word 'the' occurs ${count} times.`);
