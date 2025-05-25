function calculateAge() {
    let userInput = document.getElementById("dobInput").value;
    if (!userInput) {
      alert("Please enter your date of birth.");
      return;
    }
    let today = new Date();
    let dob = new Date(userInput);
    let todayYear = today.getFullYear();
    let dobYear = dob.getFullYear();
    let age = todayYear - dobYear;
    document.getElementById("ageOutput").textContent = `🎂 Your age is ${age} years`;
  }