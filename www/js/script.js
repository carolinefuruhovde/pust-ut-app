// Get the HTMLElements
let startStopButton = document.querySelector(".button");
let timeElm = document.querySelector(".timer");

// hide/show innerframe elementer
document.querySelector(".Mediter").style.display = "none";
document.querySelector(".Dans").style.display = "none";
document.querySelector(".Musikk").style.display = "none";
document.querySelector(".Sov").style.display = "none";
document.querySelector(".Kos").style.display = "none";
document.querySelector(".Drikk").style.display = "none";
document.querySelector(".Spis").style.display = "none";
document.querySelector(".Tren").style.display = "none";

// hvordan legger jeg til forskjellige økter? 50,10,30 metoden...
let activePhase = 0;
let program = [
  { type: "START ARBEID", duration: 50 },
  { type: "PUST UT", duration: 10 },
  { type: "JOBB VIDERE", duration: 50 },
  { type: "PUST UT", duration: 10 },
  { type: "JOBB VIDERE", duration: 30 },
  { type: "PUST UT", duration: 30 },
  { type: "JOBB VIDERE", duration: 50 },
  { type: "PUST UT", duration: 10 },
  { type: "JOBB VIDERE", duration: 50 },
  { type: "PUST UT", duration: 10 },
  { type: "JOBB VIDERE", duration: 30 },
  { type: "PUST UT", duration: 30 },
  { type: "JOBB VIDERE", duration: 50 },
  { type: "PUST UT", duration: 10 },
  { type: "JOBB VIDERE", duration: 50 },
  { type: "PUST UT", duration: 10 },
];

let seconds = 0;
let minutes = program[activePhase].duration;
let phaseType = program[activePhase].type;

let intervalId;
let visibleActivity;

// Add event listener to the startStop button
startStopButton.addEventListener("click", startCountdown);

function startCountdown() {
  let headerElement = document.querySelector("header");
  headerElement.innerHTML = phaseType;

  if (intervalId == undefined) {
    // Start new count-down
    startStopButton.textContent = "STOP";

    function countDown() {
      minutes -= 5;
      // seconds -= 1;

      if (seconds < 0) {
        seconds = 59;
        minutes -= 1;
      }
      if (minutes < 0) {
        window.clearInterval(intervalId);
        resetTime();
      }
      showTime();
    }
    intervalId = window.setInterval(countDown, 1000);
  } else {
    // Stop existing count-down
    startStopButton.textContent = "START";

    clearCountDown();
    showTime();
  }
}

function showTime() {
  let min = minutes;
  let sec = seconds;
  if (sec < 10) {
    sec = "0" + seconds;
  }
  timeElm.textContent = min + ":" + sec;
}

function clearCountDown() {
  window.clearInterval(intervalId);
  intervalId = undefined;
}

function resetTime() {
  activePhase++;
  clearCountDown();
  minutes = 0;
  seconds = 0;

  if (activePhase >= program.length) {
    // reset the entire app
    activePhase = 0;
    console.log("stop count down");
  } else {
    // start counter for next phase
    minutes = program[activePhase].duration;
    phaseType = program[activePhase].type;

    let headerElement = document.querySelector("header");
    headerElement.innerHTML = phaseType;

    if (phaseType == "PUST UT") {
      let activities = document.querySelectorAll(".activities div");
      let activity =
        activities[Math.floor(Math.random() * (activities.length - 1))];
      activity.style.display = "block";
      visibleActivity = activity;

      let timerElm = document.querySelector(".timer");
      timerElm.classList.add("paused");
    } else {
      visibleActivity.style.display = "none";
      let timerElm = document.querySelector(".timer");
      timerElm.classList.remove("paused");
    }

    startCountdown();
  }
}
