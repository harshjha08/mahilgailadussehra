/* ═══════════════════════════════════════════════════════════
   videos-data.js  —  YouTube cards ka SINGLE source of truth
   Home page aur videos.html dono isi file se cards lete hain.

   Ye file  assets/js/  folder me rehni chahiye.
   Thumbnails ka folder:  assets/Youtube Cards Thumbnails/

   Naya card jodna ho  -> VIDEOS array ke SABSE UPAR ek object daal do.
   Card hatana ho      -> us object ko delete kar do.
   Card edit karna ho  -> us object ki value badal do.
   (Array ka order hi display order hai: upar = sabse naya)

   thumb me sirf file ka naam likho (ya poora https:// URL).
   ═══════════════════════════════════════════════════════════ */
(function () {
  // Script ki apni location se thumbnails ka folder nikalta hai,
  // isliye page kisi bhi folder me ho, path sahi rehta hai.
  const THUMB_BASE = new URL("../assets/Youtube Cards Thumbnails/", document.currentScript.src);

  // type -> card ka title prefix
  const TYPES = {
    dussehra: "दशहरा महोत्सव",
    vivaah: "सीता राम विवाह",
  };

  const VIDEOS = [
    { type: "dussehra", year: 2026, thumb: "thumbnail2026.jpeg",        url: "https://www.youtube.com/live/-QHr9oQQSus?si=fwb7xSSLuHDaEc83" },
    { type: "vivaah",   year: 2026, thumb: "thumbnail2026_vivaah.jpeg", url: "https://www.youtube.com/live/bAox3KKr_HA?si=MAiP9LQedkgbAQzq" },
    { type: "dussehra", year: 2025, thumb: "thumbnail2025.jpeg",        url: "https://www.youtube.com/live/UQ5N3MPz6T4" },
    { type: "vivaah",   year: 2025, thumb: "thumbnail2025_vivaah.jpeg", url: "https://www.youtube.com/live/y7PD6HslcrM" },
    { type: "dussehra", year: 2024, thumb: "thumbnail2024.jpeg",        url: "https://www.youtube.com/live/oKe7uc8NFZs" },
    { type: "dussehra", year: 2023, thumb: "thumbnail2023.jpeg",        url: "https://www.youtube.com/live/xp3lNdH2QYc" },
    { type: "dussehra", year: 2022, thumb: "thumbnail2022.jpeg",        url: "https://www.youtube.com/live/_dOO-KbIeqo" },
    { type: "dussehra", year: 2021, thumb: "thumbnail2021.jpeg",        url: "https://www.youtube.com/live/dSiqyFEQZIs" },
    { type: "dussehra", year: 2019, thumb: "thumbnail2019.jpeg",        url: "https://www.youtube.com/live/x46Sx-kYL2E" },
    { type: "dussehra", year: 2018, thumb: "thumbnail2018.jpeg",        url: "https://www.youtube.com/live/sZw5-UAUGHA" },
  ];

  /* ---------- helpers ---------- */
  const titleOf = (v) => v.title || `${TYPES[v.type] || v.type} ${v.year}`;

  const thumbSrc = (v) =>
    /^(https?:)?\/\//.test(v.thumb) ? v.thumb : new URL(v.thumb, THUMB_BASE).href;

  // Devanagari digits (२०२५) ko 2025 banata hai, taaki search dono tarah chale
  const normalize = (s) =>
    String(s)
      .replace(/[०-९]/g, (d) => "०१२३४५६७८९".indexOf(d))
      .toLowerCase()
      .trim();

  /* ---------- "CRUD" API (in-memory, array par) ---------- */
  const VideoStore = {
    types: TYPES,
    getAll: () => VIDEOS.slice(),
    getLatest: (n = 4) => VIDEOS.slice(0, n),
    years: () => [...new Set(VIDEOS.map((v) => v.year))].sort((a, b) => b - a),
    add: (video) => { VIDEOS.unshift(video); return video; },
    update: (index, patch) => Object.assign(VIDEOS[index], patch),
    remove: (index) => VIDEOS.splice(index, 1)[0],

    search(query = "", { type = "all", year = "all" } = {}) {
      const q = normalize(query);
      return VIDEOS.filter((v) => {
        if (type !== "all" && v.type !== type) return false;
        if (year !== "all" && String(v.year) !== String(year)) return false;
        return !q || normalize(titleOf(v)).includes(q) || String(v.year).includes(q);
      });
    },
  };

  /* ---------- card renderer (DOM se, innerHTML nahi) ---------- */
  function el(tag, cls, attrs = {}) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    return n;
  }

  function createCard(v, i = 0) {
    const title = titleOf(v);
    const card = el("div", "yt-card");
    card.style.animationDelay = `${Math.min(i, 12) * 0.03}s`;

    const thumb = el("div", "yt-thumb");
    const img = el("img", "", { src: thumbSrc(v), alt: title, loading: "lazy" });
    const play = el("div", "yt-play-icon", { "aria-hidden": "true" });
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
    thumb.append(img, play);

    const body = el("div", "yt-card-body");
    const t = el("div", "yt-card-title");
    t.textContent = title;
    const a = el("a", "yt-watch-btn", { href: v.url, target: "_blank", rel: "noopener" });
    a.innerHTML = '<i class="fa-brands fa-youtube"></i> Watch';
    body.append(t, a);

    card.append(thumb, body);
    return card;
  }

  function renderInto(container, list) {
    container.replaceChildren(...list.map(createCard));
  }

  window.VideoStore = VideoStore;
  window.VideoUI = { createCard, renderInto, titleOf };
})();