const supabaseUrl = "https://vmcveofukestnfhmkbcr.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtY3Zlb2Z1a2VzdG5maG1rYmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2ODgzNDMsImV4cCI6MjA2OTI2NDM0M30.MJ-cpe6IGG5wAG9lQleKb8jBKkB3CSNYp91L8B4NvfA";
const client = supabase.createClient(supabaseUrl, supabaseKey);



let registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    registrationForm.addEventListener("click", async (e) => {
        e.preventDefault();
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let image = document.getElementById("profileImage").files[0];
        // console.log(firstName, lastName, email, password, confirmPassword, profileImage);
        // phone 11 digits
        let phone = document.getElementById("phone").value;
        if (phone.length != 11) {
            alert("Phone number must be 11 digits");
            return;
        }
        if (password != confirmPassword) {
            alert("Password and confirm password do not match");
            return;
        }

        const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.log("Error signing up:", error.message);
        } else {
            console.log("User signed up successfully", data);
            //   window.location.href = "login.html";
        }


        const { data: imageDta, error: imageError } = await client.storage
            .from("registration")
            .upload(`public/${data.user.id}`, image, {
                cacheControl: "3600",
                upsert: true,
            });

        if (imageError) {
            console.log("Error uploading image:", imageError.message);
        }
        console.log("Image uploaded successfully", imageDta);

        const { data: imageUrl } = client.storage
            .from("registration")
            .getPublicUrl(`public/${data.user.id}`);

        let userUrl = imageUrl.publicUrl;


         const { error: fileError, data: fileData } = await client
      .from("registrationForm")
      .insert({
        // id: data.user.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        profileImage: userUrl,
      });
    if (fileError) {
      console.log("Error signing up:", fileError.message);
    } else {
        // console.log("User signed up successfully", fileData);
      //   window.location.href = "login.html";
    }


















    })
}

let loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("click", async (e) => {
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            console.log("Error signing in:", error.message);
            alert("Invalid email or password");
        } else {
            console.log("User signed in successfully", data);
            window.location.href = "dashboard.html";
        }


    })
}

