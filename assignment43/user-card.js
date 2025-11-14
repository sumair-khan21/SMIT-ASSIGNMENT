let mainCard = document.getElementById('mainCard');
let userCard = document.createElement('div');
let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
let userPhone = document.getElementById('userPhone');
let userCity = document.getElementById('userCity');
let userGender = document.getElementById('userGender');
let userHobbies = document.getElementById('userHobbies');


userCard.classList.add('user-card');

userCard.innerHTML = `
<div class="user-card">
        <h2>User Details</h2>
        <p><strong>Name:</strong> <span id="userName">${userName.value}</span></p>
        <p><strong>Email:</strong> <span id="userEmail">${userEmail.value}</span></p>
        <p><strong>Phone:</strong> <span id="userPhone">${userPhone.value}</span></p>
        <p><strong>City:</strong> <span id="userCity">${userCity.value}</span></p>
        <p><strong>Gender:</strong> <span id="userGender">${userGender.value}</span></p>
        <p><strong>Hobbies:</strong> <span id="userHobbies">${userHobbies.value}</span></p>
    </div>
`


mainCard.appendChild(userCard);
