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
