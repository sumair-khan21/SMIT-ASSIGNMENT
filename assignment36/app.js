function checkWeekend() {
    let userInput = document.getElementById("dateInput").value;
    let day = new Date(userInput).getDay();

    let result = document.getElementById("resultText");
    if (day == "0" || day == "6") {
      result.textContent = "✅ It's a Weekend!";
    } else {
      result.textContent = "📅 It's a Weekday!";
    }
  }