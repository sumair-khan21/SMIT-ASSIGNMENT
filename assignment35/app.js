function checkBirthday() {
    let today = new Date();
    let birthDayInput = +document.getElementById("birthDay").value;
    let birthMonthInput = +document.getElementById("birthMonth").value - 1;

    let currentYear = today.getFullYear();
    let birthday = new Date(currentYear, birthMonthInput, birthDayInput);

    let resultBox = document.getElementById("resultBox");

    if (isNaN(birthDayInput) || isNaN(birthMonthInput + 1)) {
      resultBox.innerText = "Please enter a valid date and month.";
      return;
    }

    if (birthday < today) {
      resultBox.innerText = " Your birthday has already passed this year!";
    } else {
      let timeDiff = birthday.getTime() - today.getTime();
      let seconds = Math.floor(timeDiff / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      let remainingHours = hours % 24;
      let remainingMinutes = minutes % 60;
      let remainingSeconds = seconds % 60;

      resultBox.innerText = `${days} Days, ${remainingHours} Hours, ${remainingMinutes} Minutes, ${remainingSeconds} Seconds left! `;
    }
  }
