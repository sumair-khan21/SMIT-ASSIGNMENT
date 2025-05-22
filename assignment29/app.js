// do input lene hain login email or password agr dono sahi ho toh alert ajaye or  ye dom se krna hy


// let login = document.getElementById('login')
// login.addEventListener('click', function(){
//     let email = document.getElementById('email').value
//     let password = document.getElementById('password').value
//     if(email == "sums@gmail.com" && password == "1234"){
//         console.log("login");
//     }else{
//         console.log("Wrong password and email");
//     }
// })



// ek form banan hhy bht saray input hoga toh niche card bana k show karega  card horizontal ane chahiye or har std ka random roll generate ho



let submit = document.getElementById('submit')
submit.addEventListener('click',function(){
    let firstName = document.getElementById('firstName')
    let lastName = document.getElementById('lastName')
    let education = document.getElementById('education')
    let email = document.getElementById('email')
    let password = document.getElementById('password')

    let card = document.getElementById('card')
    card.classList.add('card')
    let card1 = document.createElement('div')
    card1.classList.add('card1')
    card1.innerHTML = `
    <h1>${firstName.value}</h1>
    <h1>${lastName.value}</h1>
    <h1>${education.value}</h1>
    <h1>${email.value}</h1>
    <h1>${password.value}</h1>    
    `
    card.appendChild(card1)
})