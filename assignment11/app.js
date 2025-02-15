// let userInp = prompt(`Enter a single alphabet or number`)

// if(userInp.length === 1){
//     let check = userInp.charCodeAt(0) 
//     if(check >= 48 && check <= 57){
//     alert(`It is a number "${userInp}"`)
//     }else if(check >= 65 && check <= 90){
//         alert(`It is a uppercase alphabet "${userInp}"`)
//     }else if(check >=97 && check <= 122 ){
//         alert(`It is a lowercase alphabet "${userInp}"`)
//     }
//     else{
//     alert(`It is not a number or alphabet!`)
//     }

// }else{
//     alert(`This is not a single number or alphabet. Please try again`)
// }
// ------------------------------------------------------------------------
let int1 = +prompt(`Enter integer 01`);
let int2 = +prompt(`Enter integer 02`);

if(isNaN(int1) || isNaN(int2)){
    alert(`Invalid number!`)
}else{
    if(int1 > int2){
        alert(`${int1} is Greater Than Integer 02.`)
        }else if(int2 > int1){
        alert(`${int2} is Greater Than Integer 01.`)
        }else{
         alert(`It both are equal!`)
        }
}












