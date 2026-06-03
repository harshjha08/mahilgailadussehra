let sideBar = document.querySelector(".menu-extension");
let menuBtn = document.querySelector("#menuBtn");

menuBtn.addEventListener("click", () => {
    sideBar.classList.toggle("active");
    console.log("btn clicked");
    console.log(sideBar.classList);

});