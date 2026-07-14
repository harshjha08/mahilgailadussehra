
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

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.contains('show');
  mobileNav.classList.toggle('show', !isOpen);
  hamburger.classList.toggle('open', !isOpen);
  hamburger.setAttribute('aria-expanded', String(!isOpen));
});

function closeMobileNav() {
  mobileNav.classList.remove('show');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

/* ── NOTICE ── */
const noticeOverlay = document.getElementById('noticeOverlay');
const noticeBody = document.getElementById('noticeBody');
const langToggle = document.getElementById('langToggle');

const textHi = 'यह वेबसाइट रामलीला कलाकारों एवं इच्छुक व्यक्तियों की सुविधा हेतु बनाई गई है। यह रामलीला वेलफेयर कमेटी माहिल गहिला द्वारा आधिकारिक रूप से संचालित नहीं है। सामग्री केवल सुविधा प्रदान करने के उद्देश्य से प्रकाशित की गई है।';
const textEn = 'This website has been created for the convenience of Ramleela performers and interested participants. It is not officially managed, sponsored, or endorsed by the Ramleela Welfare Committee Mahil Gaila. The content is provided solely for reference and convenience.';

let noticeInHindi = true;

if (localStorage.getItem('mgd-notice-seen')) {
  noticeOverlay.classList.remove('show');
}

function closeNotice() {
  localStorage.setItem('mgd-notice-seen', '1');
  noticeOverlay.classList.remove('show');
}

function toggleNoticeLanguage() {
  noticeInHindi = !noticeInHindi;
  noticeBody.textContent = noticeInHindi ? textHi : textEn;
  langToggle.textContent = noticeInHindi ? 'English' : 'हिन्दी';
}

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
const galleryImages = [
  'assets/dussehra 2025/dussehra2501.jpeg',
  'assets/dussehra 2025/dussehra2502.jpeg',
  'assets/dussehra 2025/dussehra2503.jpeg',
  'assets/dussehra 2025/dussehra2504.jpeg',
  'assets/dussehra 2025/dussehra2505.jpeg',
  'assets/dussehra 2025/dussehra2506.jpeg',
  'assets/dussehra 2025/dussehra2507.jpeg'
];
let galleryIdx = 0;
const heroGalleryImg = document.getElementById('heroGalleryImg');
const dotsWrap = document.getElementById('galleryDots');

galleryImages.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Image ${i+1}`);
  dot.onclick = () => setGalleryImage(i);
  dotsWrap.appendChild(dot);
});

function setGalleryImage(idx) {
  galleryIdx = idx;
  heroGalleryImg.src = galleryImages[idx];
  document.querySelectorAll('.gallery-dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

function galleryNext() {
  setGalleryImage((galleryIdx + 1) % galleryImages.length);
}
function galleryPrev() {
  setGalleryImage((galleryIdx - 1 + galleryImages.length) % galleryImages.length);
}

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
  navbar.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(139,0,0,0.12)' : 'none';
}, { passive: true });

/* ── REDUCED MOTION ── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.mandala-icon').forEach(el => el.style.animation = 'none');
  document.querySelectorAll('.fade-up').forEach(el => { el.classList.add('visible'); });
}
