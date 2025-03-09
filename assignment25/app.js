// START SIGNUP


document.getElementById("signup").addEventListener("click", function (event) {
    event.preventDefault();

    let username = document.getElementById("signupUsername").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let phone = document.getElementById("signupPhone").value.trim();
    let password = document.getElementById("signupPassword").value.trim();

    if (!username || !email || !phone || !password) {
        alert("Please fill all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("This email is already registered. Please login.");
        return;
    }

    users.push({ username, email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login now.");

    document.getElementById("signupUsername").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPhone").value = "";
    document.getElementById("signupPassword").value = "";
});




// START LOGIN
document.getElementById("loginBtn").addEventListener("click", function (event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});



