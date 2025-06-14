let userName = document.getElementById('user_name')
let email = document.getElementById('email')
let password = document.getElementById('password')
let confirm_password = document.getElementById('confirm_password')
let phone = document.getElementById('phone')
let city = document.getElementById('city')
let gender_male = document.getElementById('gender_male');
let gender_female = document.getElementById('gender_female');
let gender_other = document.getElementById('gender_other');
let hobby_cricket = document.getElementById('hobby_cricket');
let hobby_football = document.getElementById('hobby_football');
let hobby_tennis = document.getElementById('hobby_tennis');
let userData = []

document.getElementById('submit').addEventListener('click', function () {

    let selectedGender = ""
    if (gender_male.checked) {
        selectedGender = gender_male.value;
    }
    else if (gender_female.checked) {
        selectedGender = gender_female.value;
    }
    else if (gender_other.checked) {
        selectedGender = gender_other.value;
    } else {
        alert('Please select your gender');
        return;
    }

    let selectedHobby = ""
    if (hobby_cricket.checked) {
        selectedHobby += hobby_cricket.value + ", ";
    }
    if (hobby_football.checked) {
        selectedHobby += hobby_football.value + ", ";
    }
    if (hobby_tennis.checked) {
        selectedHobby += hobby_tennis.value;
    }

    if (selectedHobby.length == 0) {
        alert('Please select your hobby');
        return;
    }

    if (userName.value.trim() == '') {
        alert('Please enter your name');
        return;
    }
    else if (email.value.trim() == '') {
        alert('Please enter your email');
        return;
    }
    else if (password.value.trim() == '') {
        alert('Please enter your password');
        return;
    }
    else if (confirm_password.value.trim() == '') {
        alert('Please enter your confirm password');
        return;
    }
    else if (phone.value.trim().length != 10) {
        alert('Phone number must be 10 digits');
        return;
    }
    else if (password.value.trim() != confirm_password.value.trim()) {
        alert('Password and confirm password must be same');
        return;
    }
    else if (phone.value.trim() == '') {
        alert('Please enter your phone number');
        return;
    }
    else if (city.value.trim() == '') {
        alert('Please enter your city');
        return;
    }
    else {
        let user = {
            userName: userName.value,
            email: email.value,
            password: password.value,
            confirm_password: confirm_password.value,
            phone: phone.value,
            city: city.value,
            gender: selectedGender,
            hobby: selectedHobby,
        }
    
        // console.log(userData)
        for (let i = 0; i < userData.length; i++) {
            // console.log(userData[i])
            // same email show alert this email is alerady register
            
            if (userData[i].email == user.email) {
                alert('This email is already register');
                return;
            }
        }
        userData.push(user)
        console.log(userData)
        alert('Form submitted successfully');
    }

    
    
    userName.value = ""
    email.value = ""
    password.value = ""
    confirm_password.value = ""
    phone.value = ""
    city.value = ""
    gender_male.checked = false
    gender_female.checked = false
    gender_other.checked = false
    hobby_cricket.checked = false
    hobby_football.checked = false
    hobby_tennis.checked = false
    window.location.href = "user-card.html";
    
})




