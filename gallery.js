// =====================================
// GALLERIES
// =====================================

const galleries = {

    diwali2026: {

        title: "दीपावली 2026",

        images: [
            "https://picsum.photos/id/1015/1200/800",
            "https://picsum.photos/id/1016/1200/800",
            "https://picsum.photos/id/1018/1200/800",
            "https://picsum.photos/id/1020/1200/800",
            "https://picsum.photos/id/1024/1200/800"
        ]

    },

    chhath2026: {

        title: "छठ पूजा 2026",

        images: [
            "https://picsum.photos/id/1025/1200/800",
            "https://picsum.photos/id/1035/1200/800",
            "https://picsum.photos/id/1038/1200/800",
            "https://picsum.photos/id/1040/1200/800"
        ]

    },

    ramleela2026: {

        title: "रामलीला 2026",

        images: [
            "https://picsum.photos/id/1041/1200/800",
            "https://picsum.photos/id/1043/1200/800",
            "https://picsum.photos/id/1050/1200/800",
            "https://picsum.photos/id/1052/1200/800"
        ]

    },

    dussehra2026: {

        title: "दशहरा 2026",

        images: [
            "https://picsum.photos/id/1060/1200/800",
            "https://picsum.photos/id/1067/1200/800",
            "https://picsum.photos/id/1070/1200/800",
            "https://picsum.photos/id/1080/1200/800"
        ]

    },

    holi2026: {

        title: "होली 2026",

        images: [
            "https://picsum.photos/id/1081/1200/800",
            "https://picsum.photos/id/1082/1200/800",
            "https://picsum.photos/id/1084/1200/800",
            "https://picsum.photos/id/1085/1200/800"
        ]

    },

    janmashtami2026: {

        title: "जन्माष्टमी 2026",

        images: [
            "https://picsum.photos/id/1087/1200/800",
            "https://picsum.photos/id/1089/1200/800",
            "https://picsum.photos/id/1090/1200/800",
            "https://picsum.photos/id/1092/1200/800"
        ]

    },

    birthday2025: {

        title: "Birthday Celebration 2025",

        images: [
            "https://picsum.photos/id/1093/1200/800",
            "https://picsum.photos/id/1094/1200/800",
            "https://picsum.photos/id/1096/1200/800",
            "https://picsum.photos/id/1100/1200/800"
        ]

    },

    annualevent2025: {

        title: "वार्षिक समारोह 2025",

        images: [
            "https://picsum.photos/id/1101/1200/800",
            "https://picsum.photos/id/1103/1200/800",
            "https://picsum.photos/id/1105/1200/800",
            "https://picsum.photos/id/1110/1200/800"
        ]

    }

};

// =====================================
// ELEMENTS
// =====================================

const modal =
document.getElementById("galleryModal");

const galleryImage =
document.getElementById("galleryImage");

const galleryTitle =
document.getElementById("galleryTitle");

const imageCounter =
document.getElementById("imageCounter");

const loopNotice =
document.getElementById("loopNotice");

const autoPlayBtn =
document.getElementById("autoPlayBtn");

const searchInput =
document.getElementById("searchInput");

// =====================================
// VARIABLES
// =====================================

let currentGallery = null;
let currentIndex = 0;

let autoSlide = null;
let autoPlayRunning = false;

// =====================================
// SHOW IMAGE
// =====================================

function showImage() {

    galleryImage.style.opacity = "0";

    setTimeout(() => {

        galleryImage.src =
        currentGallery.images[currentIndex];

        galleryImage.style.opacity = "1";

        imageCounter.textContent =
        `${currentIndex + 1} / ${currentGallery.images.length}`;

    }, 180);

}

// =====================================
// LOOP NOTICE
// =====================================

function showLoopNotice() {

    loopNotice.style.display =
    "block";

    setTimeout(() => {

        loopNotice.style.display =
        "none";

    }, 1800);

}

// =====================================
// NEXT
// =====================================

function nextImage() {

    currentIndex++;

    if (
        currentIndex >=
        currentGallery.images.length
    ) {

        currentIndex = 0;

        showLoopNotice();

    }

    showImage();

}

// =====================================
// PREVIOUS
// =====================================

function previousImage() {

    currentIndex--;

    if (
        currentIndex < 0
    ) {

        currentIndex =
        currentGallery.images.length - 1;

        showLoopNotice();

    }

    showImage();

}

// =====================================
// OPEN GALLERY
// =====================================

document
.querySelectorAll(".gallery-card")
.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const key =
            card.dataset.gallery;

            currentGallery =
            galleries[key];

            currentIndex = 0;

            galleryTitle.textContent =
            currentGallery.title;

            modal.style.display =
            "flex";

            showImage();

        }
    );

});

// =====================================
// BUTTONS
// =====================================

document
.getElementById("nextBtn")
.addEventListener(
    "click",
    nextImage
);

document
.getElementById("prevBtn")
.addEventListener(
    "click",
    previousImage
);

// =====================================
// CLOSE
// =====================================

function closeGallery() {

    stopAutoSlide();

    modal.style.display =
    "none";

}

document
.getElementById("closeBtn")
.addEventListener(
    "click",
    closeGallery
);

document
.getElementById("backBtn")
.addEventListener(
    "click",
    closeGallery
);

// =====================================
// AUTO PLAY
// =====================================

function startAutoSlide() {

    autoSlide =
    setInterval(
        nextImage,
        3000
    );

    autoPlayRunning = true;

    autoPlayBtn.textContent =
    "⏸ Stop Auto";

}

function stopAutoSlide() {

    clearInterval(autoSlide);

    autoPlayRunning = false;

    autoPlayBtn.textContent =
    "▶ Auto Slide";

}

autoPlayBtn.addEventListener(
    "click",
    () => {

        if (
            autoPlayRunning
        ) {

            stopAutoSlide();

        } else {

            startAutoSlide();

        }

    }
);

// =====================================
// SEARCH
// =====================================

searchInput.addEventListener(
    "input",
    function () {

        const value =
        this.value
        .toLowerCase()
        .trim();

        document
        .querySelectorAll(
            ".gallery-card"
        )
        .forEach(card => {

            const text =
            card.innerText
            .toLowerCase();

            if (
                text.includes(value)
            ) {

                card.style.display =
                "block";

            } else {

                card.style.display =
                "none";

            }

        });

    }
);

// =====================================
// SWIPE SUPPORT
// =====================================

let touchStartX = 0;

galleryImage.addEventListener(
    "touchstart",
    e => {

        touchStartX =
        e.touches[0].clientX;

    }
);

galleryImage.addEventListener(
    "touchend",
    e => {

        let touchEndX =
        e.changedTouches[0].clientX;

        let diff =
        touchStartX -
        touchEndX;

        if (diff > 50) {

            nextImage();

        }

        if (diff < -50) {

            previousImage();

        }

    }
);

// =====================================
// KEYBOARD SUPPORT
// =====================================

document.addEventListener(
    "keydown",
    e => {

        if (
            modal.style.display !==
            "flex"
        ) return;

        if (
            e.key ===
            "ArrowRight"
        ) {

            nextImage();

        }

        if (
            e.key ===
            "ArrowLeft"
        ) {

            previousImage();

        }

        if (
            e.key ===
            "Escape"
        ) {

            closeGallery();

        }

    }
);