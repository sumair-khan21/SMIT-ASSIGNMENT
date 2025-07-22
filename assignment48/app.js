import { client } from "./config.js";
// console.log(client);

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let phoneNumber = document.getElementById("phoneNumber");
let password = document.getElementById("password");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let confirmPassword = document.getElementById("confirmPassword");

let signUp = document.getElementById("signUp");
if (signUp) {
  signUp.addEventListener("click", async (e) => {
    e.preventDefault();

    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Signup error:  ${error.message}`,
      });
      return;
    }

    const { error: insertError } = await client
      .from("e-commerce_users")
      .insert([
        {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          phone_number: phoneNumber.value,
        },
      ]);

    if (insertError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Data insert error:  ${insertError.message}`,
      });
    } else {
      Swal.fire({
        title: "Good job!",
        text: "User data inserted in table!",
        icon: "success",
      });
    }
    firstName.value = "";
    lastName.value = "";
    phoneNumber.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
  });
}




let signIn = document.getElementById("signIn");

if (signIn) {
  signIn.addEventListener("click", async (e) => {
    e.preventDefault();

    const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
      email: loginEmail.value,
      password: loginPassword.value,
    });

    if (signInError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Sign in error: ${signInError.message}`,
      });
      return;
    }
 
      Swal.fire({
        title: "Good job!",
        text: "User signed in successfully!",
        icon: "success",
      }).then(() => {
        window.location.href = "dashboard.html";
      });
    

    loginEmail.value = "";
    loginPassword.value = "";
  });
}










let googleBtn = document.getElementById("googleSignIn");
googleBtn.addEventListener("click", async () => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/dashboard.html' } 
  });

  if (error) {
    console.error("Google OAuth error:", error.message);
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Google login failed:  ${error.message}`,
      });
  }
});





// ==============================================================================================
