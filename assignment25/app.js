

document.getElementById("signup").addEventListener("click", function (event) {
    
    event.preventDefault();

    let username = document.getElementById("signupUsername").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let phone = document.getElementById("signupPhone").value.trim();
    let password = document.getElementById("signupPassword").value.trim();

    if (!username || !email || !phone || !password) {
        alert("Please fill all fields.");
        // Swal.fire("Please fill all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
   let userExists = false;

   for(let i = 0; i < users.length; i++){
    if(users[i].email === email){
        userExists = true;
        break;
    }
   }

    if (userExists) {
        alert("This email is already registered. Please login.");
        return;
    }

    users.push({ username, email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Signup successful! Please click on login.",
        showConfirmButton: false,
        timer: 1500
      });
    // alert("Signup successful! Please login now.");

    document.getElementById("signupUsername").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPhone").value = "";
    document.getElementById("signupPassword").value = "";
});

document.getElementById("loginBtn").addEventListener("click", function (event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = null;
    for(let i = 0; i < users.length; i++){
        if(users[i].email === email && users[i].password === password){
            validUser = users[i];
            break;
        }
    }
   

    if (validUser !== null) {
        alert("Login successful! Redirecting to dashboard...");
        localStorage.setItem("loggedInUser", email);
        window.location.href = "dashboard.html";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid email or password. Please try again.",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        // alert("Invalid email or password. Please try again.");
    }
});

