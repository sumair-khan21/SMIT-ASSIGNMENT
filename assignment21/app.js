let fullText = "";
let startingText = 0;
let limit = 150;
let expandText = false;

function text() {
  fullText = document.getElementById("userInput").value.trim();
  startingText = 0;
  document.getElementById("output").innerHTML = "";
  expandText = false;
  toggleText();
}

function toggleText() {
  if (!expandText) {
    startingText += limit;
  } else {
    startingText -= limit;
  }
  document.getElementById("output").innerHTML = fullText.substring(
    0,
    startingText
  );

  if (startingText >= fullText.length) {
    expandText = true;
    document.getElementById("toggleBtn").innerText = "See Less";
  } else {
    expandText = false;
    document.getElementById("toggleBtn").innerText = "See More";
  }
  document.getElementById("toggleBtn").style.display =
    fullText.length > limit ? "inline-block" : "none";
}
