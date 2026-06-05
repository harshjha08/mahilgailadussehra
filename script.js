let sideBar = document.querySelector(".menu-extension");
let menuBtn = document.querySelector("#menuBtn");

menuBtn.addEventListener("click", () => {
    sideBar.classList.toggle("active");
});


let day2roll = document.getElementById("day2-roll");
let day5roll = document.getElementById("day5-roll");
let day6roll = document.getElementById("day6-roll");
let day8roll = document.getElementById("day8-roll");
function day2rollview(){
    day2roll.style.display = "flex";
}
function day5rollview(){
    day5roll.style.display = "flex";
    
}
function day6rollview(){
    day6roll.style.display = "flex";
  
}
function day8rollview(){
    day8roll.style.display = "flex";
}
function closerollview2(){
    day2roll.style.display = "none";
}
function closerollview5(){
    day5roll.style.display = "none";
}
function closerollview6(){
    day6roll.style.display = "none";
}
function closerollview8(){
    day8roll.style.display = "none";
}
// ===== CUSTOMIZE HERE =====
const eventName = "विजयादशमी";
const targetDate = "2026-10-20 00:00:00";
// ==========================

document.getElementById("eventName").textContent =
    `${eventName} Countdown`;

document.getElementById("countdownMessage").textContent =
    `${eventName} starts in...`;

function updateCountdown() {

    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();

    const diff = target - now;

    if (diff <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        document.getElementById("countdownMessage").textContent =
            `${eventName} has arrived! 🎉`;

        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);