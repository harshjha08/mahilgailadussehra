
/* ── THEME TOGGLE ── */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('mgd-theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('mgd-theme', next);
  themeIcon.className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

/* ── MOBILE NAV ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
let previousBodyOverflow = '';

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.contains('show');
  if (isOpen) {
    closeMobileNav(true);
    return;
  }

  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  mobileNav.inert = false;
  mobileNav.removeAttribute('aria-hidden');
  mobileNav.classList.add('show');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', 'Close menu');
  mobileNavClose.focus();
});

function closeMobileNav(restoreFocus = false) {
  mobileNav.classList.remove('show');
  mobileNav.inert = true;
  mobileNav.setAttribute('aria-hidden', 'true');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Open menu');
  document.body.style.overflow = previousBodyOverflow;
  if (restoreFocus) hamburger.focus();
}

mobileNavClose.addEventListener('click', () => closeMobileNav(true));
mobileNavBackdrop.addEventListener('click', () => closeMobileNav(true));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileNav.classList.contains('show')) {
    closeMobileNav(true);
  }
});

/* ── NOTICE ── */
const noticeOverlay = document.getElementById('noticeOverlay');
const noticeBody = document.getElementById('noticeBody');
const noticeTitle = document.getElementById('noticeTitle');
const langToggle = document.getElementById('langToggle');
const noticeClose = document.getElementById('noticeClose');
const noticeComplaint = document.getElementById('noticeComplaint');
const noticeTicker = document.getElementById('noticeTicker');
const noticeTickerTrack = document.getElementById('noticeTickerTrack');
const posterOverlay = document.getElementById('posterOverlay');

const notices = [
  {
    titleHi: 'सूचना / Notice',
    titleEn: 'Notice',
    tickerText: 'यह वेबसाइट रामलीला कलाकारों एवं इच्छुक व्यक्तियों की सुविधा हेतु बनाई गई है। यह रामलीला वेलफेयर कमेटी माहिल गहिला द्वारा आधिकारिक रूप से संचालित नहीं है। सामग्री केवल सुविधा प्रदान करने के उद्देश्य से प्रकाशित की गई है।',
    bodyHi: 'यह वेबसाइट रामलीला कलाकारों एवं इच्छुक व्यक्तियों की सुविधा हेतु बनाई गई है। यह रामलीला वेलफेयर कमेटी माहिल गहिला द्वारा आधिकारिक रूप से संचालित नहीं है। सामग्री केवल सुविधा प्रदान करने के उद्देश्य से प्रकाशित की गई है।',
    bodyEn: 'This website has been created for the convenience of Ramleela performers and interested participants. It is not officially managed, sponsored, or endorsed by the Ramleela Welfare Committee Mahil Gaila. The content is provided solely for reference and convenience.',
    complaintUrl: 'https://forms.gle/V7MyPy6air9JkBq76',
    complaintLabel: 'शिकायत दर्ज करें',
  },
];

let noticeInHindi = true;
let activeNoticeIndex = 0;
let noticeOpenSource = 'initial';
let noticeReturnFocus = null;

function renderNoticeTickerGroup(isDuplicate = false) {
  const group = document.createElement('div');
  group.className = 'notice-ticker-group';
  if (isDuplicate) group.setAttribute('aria-hidden', 'true');

  notices.forEach((notice, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'notice-ticker-item';
    button.dataset.noticeIndex = String(index);
    button.setAttribute('aria-label', `सूचना ${index + 1} पढ़ें`);
    if (isDuplicate) button.tabIndex = -1;

    const text = document.createElement('span');
    text.className = 'notice-ticker-text';
    text.textContent = notice.tickerText;
    button.appendChild(text);
    group.appendChild(button);
  });

  return group;
}

function renderNoticeTicker() {
  noticeTickerTrack.replaceChildren(
    renderNoticeTickerGroup(),
    renderNoticeTickerGroup(true),
  );
}

function updateNoticeLanguage() {
  const notice = notices[activeNoticeIndex];
  noticeTitle.textContent = noticeInHindi ? notice.titleHi : notice.titleEn;
  noticeBody.textContent = noticeInHindi ? notice.bodyHi : notice.bodyEn;
  langToggle.textContent = noticeInHindi ? 'English' : 'हिन्दी';
  noticeComplaint.hidden = !notice.complaintUrl;
  if (notice.complaintUrl) noticeComplaint.href = notice.complaintUrl;
  noticeComplaint.textContent = notice.complaintLabel || 'शिकायत दर्ज करें';
}

function openNotice(index, source = 'ticker') {
  if (!Number.isInteger(index) || !notices[index]) return;
  activeNoticeIndex = index;
  noticeInHindi = true;
  noticeOpenSource = source;
  noticeReturnFocus = document.activeElement;
  updateNoticeLanguage();
  noticeOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
  noticeClose.focus();
}

function closeNotice() {
  noticeOverlay.classList.remove('show');
  document.body.style.overflow = '';
  if (noticeOpenSource === 'initial') {
    localStorage.setItem('mgd-notice-seen', '1');
    showPoster();
  } else if (noticeReturnFocus instanceof HTMLElement) {
    noticeReturnFocus.focus();
  }
}

function toggleNoticeLanguage() {
  noticeInHindi = !noticeInHindi;
  updateNoticeLanguage();
}

renderNoticeTicker();
noticeTickerTrack.addEventListener('click', (event) => {
  const button = event.target.closest('[data-notice-index]');
  if (!button || !noticeTickerTrack.contains(button)) return;
  openNotice(Number(button.dataset.noticeIndex));
});
langToggle.addEventListener('click', toggleNoticeLanguage);
noticeClose.addEventListener('click', closeNotice);
noticeOverlay.addEventListener('click', (event) => {
  if (event.target === noticeOverlay) closeNotice();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && noticeOverlay.classList.contains('show')) {
    closeNotice();
  }
});

if (localStorage.getItem('mgd-notice-seen')) {
  noticeOverlay.classList.remove('show');
  showPoster();
} else {
  updateNoticeLanguage();
  noticeOverlay.classList.add('show');
}

function showPoster() {
  posterOverlay.classList.add('show');
  posterOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePoster() {
  posterOverlay.classList.remove('show');
  posterOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

posterOverlay.addEventListener('click', (event) => {
  if (event.target === posterOverlay) closePoster();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && posterOverlay.classList.contains('show')) {
    closePoster();
  }
});

/* ── COUNTDOWN ── */
function updateCountdown() {
  const target = new Date('2026-10-20T00:00:00').getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    ['cd-days','cd-hours','cd-minutes','cd-seconds'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    document.getElementById('eventNameDisplay').textContent = '🎉 विजयदशमी की शुभकामनाएँ!';
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  document.getElementById('cd-days').textContent    = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent   = String(h).padStart(2,'0');
  document.getElementById('cd-minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-seconds').textContent = String(s).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ── GALLERY SLIDESHOW ── */
const galleryHighlights = {
  eyebrow: '📸 आज की विशेष झलकियाँ',
  title: 'दशहरा महोत्सव 2026 नवरात्रि के चौथे दिन',
  allPhotosLabel: 'सभी फ़ोटो देखें',
  slides: [
    {
      src: 'assets/dussehra 2026/dussehra2627.jpeg',
      alt: 'दशहरा महोत्सव 2026 नवरात्रि के चौथे दिन',
      caption: 'दशहरा महोत्सव 2026 नवरात्रि के चौथे दिन माहिल गहिला, पंजाब',
    },
    {
      src: 'assets/dussehra 2026/dussehra2629.jpeg',
      alt: 'दशहरा महोत्सव 2026 नवरात्रि के चौथे दिन',
      caption: 'दशहरा महोत्सव 2026 नवरात्रि के चौथे दिन माहिल गहिला, पंजाब',
    },
    {
      src: 'assets/dussehra 2026/dussehra2630.jpeg',
      alt: 'दशहरा महोत्सव 2026 नवरात्रि के चौथे दिन',
      caption: 'दशहरा महोत्सव 2026 नवरात्रि के चौथे दिन माहिल गहिला, पंजाब',
    },
    {
      src: 'assets/dussehra 2026/dussehra2631.jpeg',
      alt: 'दशहरा महोत्सव 2026 नवरात्रि के चौथे दिन',
      caption: 'दशहरा महोत्सव 2026 नवरात्रि के चौथे दिन माहिल गहिला, पंजाब',
    },
    
  ],
};
const galleryImages = galleryHighlights.slides;
let galleryIdx = 0;
const heroGalleryImg = document.getElementById('heroGalleryImg');
const dotsWrap = document.getElementById('galleryDots');
const galleryImageCaption = document.getElementById('galleryImageCaption');

document.getElementById('gallerySectionEyebrow').textContent = galleryHighlights.eyebrow;
document.getElementById('gallerySectionTitle').textContent = galleryHighlights.title;
document.querySelector('#galleryAllPhotos span').textContent = galleryHighlights.allPhotosLabel;

galleryImages.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
  dot.type = 'button';
  dot.setAttribute('aria-label', `फ़ोटो ${i + 1} दिखाएँ`);
  dot.setAttribute('aria-pressed', String(i === 0));
  dot.addEventListener('click', () => setGalleryImage(i));
  dotsWrap.appendChild(dot);
});

function setGalleryImage(idx) {
  galleryIdx = (idx + galleryImages.length) % galleryImages.length;
  const slide = galleryImages[galleryIdx];
  heroGalleryImg.src = slide.src;
  heroGalleryImg.alt = slide.alt;
  galleryImageCaption.textContent = slide.caption;
  dotsWrap.querySelectorAll('.gallery-dot').forEach((d, i) => {
    d.classList.toggle('active', i === galleryIdx);
    d.setAttribute('aria-pressed', String(i === galleryIdx));
  });
}

function galleryNext() {
  setGalleryImage(galleryIdx + 1);
}
function galleryPrev() {
  setGalleryImage(galleryIdx - 1);
}

document.getElementById('galleryNext').addEventListener('click', galleryNext);
document.getElementById('galleryPrev').addEventListener('click', galleryPrev);
heroGalleryImg.addEventListener('error', () => {
  heroGalleryImg.style.background = 'var(--gradient-media-fallback)';
  console.error('Unable to load gallery highlight image:', galleryImages[galleryIdx].src);
});

setGalleryImage(galleryIdx);
setInterval(galleryNext, 4000);

/* ── MODALS ── */
function openModal(id) {
  document.getElementById(id).classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('show');
  document.body.style.overflow = '';
}

document.querySelectorAll('.overlay-backdrop').forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target === el) closeModal(el.id);
  });
});

/* ── SCROLL FADE-UP ANIMATION ── */
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

fadeEls.forEach(el => fadeObs.observe(el));

/* ── NAVBAR SCROLL SHADOW ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? 'var(--shadow)' : 'none';
}, { passive: true });

/* ── REDUCED MOTION ── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.mandala-icon').forEach(el => el.style.animation = 'none');
  document.querySelectorAll('.fade-up').forEach(el => { el.classList.add('visible'); });
}
