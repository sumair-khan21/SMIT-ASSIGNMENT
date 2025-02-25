let result = document.getElementById("result");
let generate = document.getElementById("generate");
let copy = document.getElementById("copy");
let uppercase = document.getElementById("uppercase");
let lowercase = document.getElementById("lowercase");
let number = document.getElementById("number");
let special = document.getElementById("special");
let all = document.getElementById("all");
let range = document.getElementById("range");
let rangeValue = document.getElementById("rangeValue");
let strength = document.getElementById("strength");

range.addEventListener("input", function () {
    rangeValue.value = range.value;
    generatePassword();
    updateStrength();
});

rangeValue.addEventListener("input", function () {
    if (rangeValue.value < 1) rangeValue.value = '1';
    if (rangeValue.value > 50) rangeValue.value = '50';
    range.value = rangeValue.value;
    generatePassword();
    updateStrength();
});

generate.addEventListener("click", generatePassword);

function generatePassword() {
    let chars = "";
    let password = "";

    if (all.checked) {
        chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:<>?";
    } else {
        if (uppercase.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (lowercase.checked) chars += "abcdefghijklmnopqrstuvwxyz";
        if (special.checked) chars += "!@#$%^&*()_+{}:<>?";
        if (number.checked) chars += "0123456789";
    }

    if (chars.length === 0) {
        result.textContent = "Select at least one option!";
        return;
    }

    for (let i = 0; i < range.value; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    result.textContent = password;
    updateStrength();
}

function updateStrength() {
    let length = range.value;
    if (length <= 10) {
        strength.textContent = "Weak";
        strength.style.color = "red";
    } else if (length <= 20) {
        strength.textContent = "Medium";
        strength.style.color = "orange";
    } else {
        strength.textContent = "Strong";
        strength.style.color = "green";
    }
}

copy.addEventListener("click", function () {
    navigator.clipboard.writeText(result.textContent);
    Swal.fire({
        icon: "success",
        title: "Copied!",
        text: "Your password has been copied to the clipboard.",
        timer: 1500,
        showConfirmButton: false,
    });
});
