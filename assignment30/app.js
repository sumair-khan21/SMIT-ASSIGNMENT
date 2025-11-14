// // password generator with uni code 

let generate = document.getElementById('generate')
let result = document.getElementById('result')


generate.addEventListener('click', function(){
    let length = +document.getElementById('length').value
    let password = ""

    if(!length || length <= 0){
        result.innerText = "Please enter a valid number"
        return;
    }
    for(let i = 0; i < length; i++){
        let random = Math.round(Math.random() * 4)
        let charCode
        if(random == 0){
            charCode = Math.floor(Math.random() * 26) + 97
        }else if(random == 1){
            charCode = Math.floor(Math.random() * 10) + 48
        }else if(random == 2){
            charCode = Math.floor(Math.random() * 26) + 65
        }else{
            charCode = Math.floor(Math.random() * 15) + 33 
        }
        password += String.fromCharCode(charCode)
    }
    result.innerText = password;
    
})
