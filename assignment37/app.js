function showGreeting() {
    let today = new Date();
    let hours = today.getHours();
    let greeting = "";

    if(hours >= 5 && hours < 12){
        greeting = "🌞 Good Morning";
    } else if(hours >= 12 && hours < 17){
        greeting = "🌤️ Good Afternoon";
    } else if(hours >= 17 && hours < 21){
        greeting = "🌇 Good Evening";
    } else{
        greeting = "🌙 Good Night";
    }

    document.getElementById("greetingOutput").textContent = greeting;
  }