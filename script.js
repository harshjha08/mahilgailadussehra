
let sideBar = document.querySelector(".menu-extension");
let menuBtn = document.querySelector("#menuBtn");

menuBtn.addEventListener("click", () => {
    sideBar.classList.toggle("active");
});

//document.addEventListener("contextmenu", e => e.preventDefault());

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
const eventName = "🚩विजयदशमी🚩";
const targetDate = "2026-10-20 00:00:00";



document.getElementById("eventName").textContent =
    `${eventName}`;

// document.getElementById("countdownMessage").textContent =
//     `${eventName} starts in...`;

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
            `${eventName} की हार्दिक शुभकामनाएँ`;

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

const noticeHindi = `
यह वेबसाइट रामलीला में विभिन्न पात्रों की भूमिका निभाने वाले कलाकारों एवं इच्छुक व्यक्तियों की सुविधा हेतु बनाई गई है। यह वेबसाइट किसी भी प्रकार से रामलीला वेलफेयर कमेटी माहिल गहिला द्वारा आधिकारिक रूप से संचालित, प्रायोजित अथवा प्रकाशित नहीं की गई है। इस वेबसाइट पर उपलब्ध सामग्री का उद्देश्य केवल सुविधा प्रदान करना है। यद्यपि सामग्री यथासंभव सही रखने का प्रयास किया गया है, फिर भी इसका समिति से कोई आधिकारिक संबंध नहीं है। यदि आपको इस वेबसाइट की किसी सामग्री अथवा संचालन से कोई आपत्ति या शिकायत है, तो कृपया नीचे दिए गए शिकायत विकल्प का उपयोग करें।
`;

const noticeEnglish = `
This website has been created for the convenience of Ramleela performers and interested participants.This website is not officially managed, sponsored, published, or endorsed by the Ramleela Welfare Committee Mahil Gaila.The content available here is provided solely for convenience and reference purposes. Although efforts have been made to keep the information accurate, it should not be considered official committee content.If you have any objection, concern, or complaint regarding this website or its content, please use the complaint option provided below.
`;

let currentLanguage = "hi";

window.addEventListener("load", () => {

    const noticeSeen = localStorage.getItem("noticeSeen");

    if(noticeSeen){
        document.getElementById("noticeOverlay").style.display = "none";
    }
    //document.getElementById("noticeOverlay").style.display = "flex";

});

function closeNotice(){

    localStorage.setItem("noticeSeen","false");
    document.getElementById("noticeOverlay").style.display = "none";
}

function toggleLanguage(){

    const text = document.getElementById("noticeText");
    const toggle = document.getElementById("langToggle");

    if(currentLanguage === "hi"){

        text.innerText = noticeEnglish;
        toggle.innerText = "हिन्दी";

        currentLanguage = "en";

    }else{

        text.innerText = noticeHindi;
        toggle.innerText = "English";

        currentLanguage = "hi";
    }
}


const images = [
   "dussehra2501.jpeg",
   "dussehra2502.jpeg",
   "dussehra2503.jpeg",
   "dussehra2504.jpeg",
   "dussehra2505.jpeg",
   "dussehra2506.jpeg",
   "dussehra2507.jpeg"
];
let currentImage = 0;

const galleryImage = document.getElementById("galleryImage");

function showImage(index){
    galleryImage.src = images[index];
}

function showImage(){
    const img = document.getElementById("galleryImage");
    img.style.transform = "scale(1.03)";
    img.style.opacity = "0";
    setTimeout(() => {
        img.src = images[currentImage];
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
        
    },400)
}
function nextImage(){

    currentImage++;

    if(currentImage >= images.length){
        currentImage = 0;
    }

    showImage(currentImage);
}

function previousImage(){

    currentImage--;

    if(currentImage < 0){
        currentImage = images.length - 1;
    }

    showImage(currentImage);
}
showImage();
setInterval(nextImage, 4000);