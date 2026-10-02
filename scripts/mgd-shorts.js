/* ==========================================================================
   MGD Shorts — दशहरा की झलकियाँ
   Mount:  <section id="mgd-shorts-section" class="mgd-shorts-section"></section>
   To add a Short: add ONE object to mgdShortsData below. Only `id` is required.
   ========================================================================== */

/* ---------- 1. CONFIG ---------- */
const mgdShortsConfig = {
  heading: "दशहरा की झलकियाँ",
  subtitle: "रामलीला और दशहरा महोत्सव के कुछ यादगार क्षण",
  viewAllUrl: "https://www.youtube.com/embed/vdNm1FnHFoc" // e.g. "https://www.youtube.com/@yourchannel/shorts"; leave "" to hide the link
};

/* ---------- 2. DATA (edit here only) ----------
   id (required) · title · character · role · year · category ·
   description · location · thumbnail (custom image URL, optional) */
const mgdShortsData = [
  {
    id: "ccI6p3lR75U",
    title: "दो योद्धाओं का आमना-सामना",
    year: "2026",
    category: "दशहरा",
    description: "रणभूमि में आमने-सामने आए दो योद्धाओं के बीच हुए रोमांचक युद्ध की झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "vdNm1FnHFoc",
    title: "रावण के योद्धा की वीर ललकार",
    character: "Pardeep",
    role: "निकुंभ",
    year: "2026",
    category: "रामलीला",
    description: "रावण की ओर से युद्धभूमि में उतरे निकुंभ की वीर ललकार, जिसने श्रीराम की सेना को युद्ध के लिए चुनौती दी।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "EnYiDpwOhFw",
    title: "राम और रावण का अंतिम युद्ध",
    year: "2026",
    category: "रामलीला",
    description: "लंका के रणक्षेत्र में श्रीराम और रावण के बीच हुए निर्णायक अंतिम युद्ध का रोमांचक दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "mLpLYvdo2e8",
    title: "रावण के योद्धाओं का रणउत्साह",
    year: "2026",
    category: "रामलीला",
    description: "युद्धभूमि में रावण के योद्धाओं का जोश, उत्साह और युद्ध के प्रति उनका अदम्य उत्साह देखने को मिलता है।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "oVyO8e9Ku_k",
    title: "अंतिम युद्ध के कुछ रोमांचक पल",
    year: "2026",
    category: "दशहरा",
    description: "राम-रावण युद्ध के अंतिम चरण के कुछ ऐसे रोमांचक क्षण, जिन्होंने रणभूमि का वातावरण और भी जीवंत कर दिया।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "uxhFadKTMWU",
    title: "दशहरा के विशाल पुतलों की झलक",
    year: "2026",
    category: "रामलीला",
    description: "दशहरा महोत्सव के लिए तैयार किए गए विशाल पुतलों की एक विशेष झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "C3kQ3KH8zBI",
    title: "अंगद की रावण को वीर ललकार",
    character: "Harsh Jha",
    role: "अंगद",
    year: "2026",
    category: "दशहरा",
    description: "अंगद के रूप में रावण को दी गई जोशीली ललकार और अधर्म के विरुद्ध युद्ध की प्रचंड चुनौती का दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "OCYk5B5qC5U",
    title: "राम और रावण का घमासान युद्ध",
    character: "Gaurav Kaushal and Kuljit",
    year: "2026",
    category: "रामलीला",
    description: "श्रीराम और रावण के बीच लड़े गए निर्णायक और घमासान युद्ध का प्रभावशाली मंचन।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "cTeiX5vVdC0",
    title: "रावण, कुंभकर्ण और मेघनाद के पुतले",
    year: "2026",
    category: "दशहरा",
    description: "दशहरा महोत्सव में रावण, कुंभकर्ण और मेघनाद के विशाल पुतलों की भव्य झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "xHvaQKymUBs",
    title: "राम और रावण का घमासान रण",
    year: "2026",
    category: "रामलीला",
    description: "रणभूमि में श्रीराम और रावण के बीच हुए घमासान युद्ध का रोमांचक दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "IebavL62Ji0",
    title: "लक्ष्मण की रावण की सेना को ललकार",
    year: "2026",
    category: "दशहरा",
    description: "लक्ष्मण द्वारा रावण की संपूर्ण सेना को युद्ध के लिए दी गई निर्भीक और वीरतापूर्ण ललकार का दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "2bgoNExkkZM",
    title: "दशहरा पुतलों की भव्य झलक",
    year: "2026",
    category: "रामलीला",
    description: "दशहरा महोत्सव के लिए तैयार किए गए विशाल पुतलों और उनके भव्य स्वरूप की झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "T9Aq_UDZYjE",
    title: "रावण का अहंकार और आत्मप्रशंसा",
    year: "2026",
    category: "दशहरा",
    description: "रणभूमि में रावण अपने सामर्थ्य और पराक्रम का बखान करते हुए अपने अहंकार का प्रदर्शन करता है।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "iqBbGQcUoLw",
    title: "दोनों सेनाओं के योद्धाओं का घमासान युद्ध",
    year: "2026",
    category: "रामलीला",
    description: "श्रीराम और रावण की सेनाओं के योद्धाओं के बीच हुए भीषण और रोमांचक युद्ध की झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "oRRO_-8SEXI",
    title: "अंतिम क्षणों में रावण की महादेव आराधना",
    year: "2026",
    category: "दशहरा",
    description: "युद्ध के अंतिम क्षणों में रावण द्वारा महादेव की आराधना कर उनका आशीर्वाद प्राप्त करने का भावपूर्ण दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "TdyoJGMmRQs",
    title: "रावण के वीर योद्धा का रण में प्रवेश",
    year: "2026",
    category: "रामलीला",
    description: "रावण का एक जांबाज़ योद्धा युद्धभूमि में उतरकर श्रीराम की सेना के विरुद्ध मोर्चा संभालता हुआ।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "JfJdcVZl9ow",
    title: "रावण दहन का भव्य दृश्य",
    year: "2026",
    category: "दशहरा",
    description: "अधर्म पर धर्म की विजय के प्रतीक रावण दहन का भव्य और रोमांचक दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "v7qQsCwDosY",
    title: "मेघनाद और लक्ष्मण का अंतिम युद्ध",
    year: "2026",
    category: "रामलीला",
    description: "मेघनाद और लक्ष्मण के बीच हुए निर्णायक अंतिम युद्ध का रोमांचक मंचन।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "-1nHOM5Su4g",
    title: "लक्ष्मण का क्रोधित स्वरूप",
    year: "2026",
    category: "दशहरा",
    description: "रणभूमि में लक्ष्मण के प्रचंड और क्रोधित स्वरूप की प्रभावशाली झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "6huGZThakNM",
    title: "रावण के योद्धाओं की वानर सेना को चुनौती",
    year: "2026",
    category: "रामलीला",
    description: "रावण के योद्धा वानर सेना को चुनौती देते हुए उनके पराक्रम को कम आंकते हैं और युद्ध के लिए ललकारते हैं।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "2z4ThGRU0GU",
    title: "रावण दहन",
    year: "2026",
    category: "दशहरा",
    description: "बुराई पर अच्छाई और अधर्म पर धर्म की विजय का प्रतीक रावण दहन।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "zlojf1KDHf8",
    title: "श्रीराम द्वारा रावण का वध",
    year: "2026",
    category: "रामलीला",
    description: "श्रीराम द्वारा रावण का वध किए जाने का वह निर्णायक क्षण, जो धर्म की अधर्म पर विजय का प्रतीक बना।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "0-438OmFWho",
    title: "लक्ष्मण और मेघनाद का युद्ध",
    year: "2026",
    category: "दशहरा",
    description: "रणभूमि में लक्ष्मण और मेघनाद के बीच हुए वीरतापूर्ण और रोमांचक युद्ध की झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "Sk1liAC-Eyc",
    title: "राम और रावण का निर्णायक युद्ध",
    year: "2026",
    category: "दशहरा",
    description: "लंका के रणक्षेत्र में श्रीराम और रावण के बीच हुए निर्णायक युद्ध का प्रभावशाली दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "7NYmxwQY9WA",
    title: "रावण का युद्ध का ऐलान",
    year: "2026",
    category: "रामलीला",
    description: "रावण द्वारा रणभूमि में युद्ध का ऐलान करते हुए अपने पराक्रम और सामर्थ्य का प्रदर्शन करने का दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "UxNotfhkyhA",
    title: "रावण दहन और आतिशबाज़ी",
    year: "2026",
    category: "दशहरा",
    description: "रावण दहन के साथ आकाश में हुई भव्य आतिशबाज़ी और दशहरा उत्सव के उल्लासपूर्ण वातावरण की झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "zCSqQdyDLlA",
    title: "रावण के योद्धाओं और श्रीराम की सेना का युद्ध",
    year: "2026",
    category: "रामलीला",
    description: "रावण के योद्धाओं और श्रीराम की सेना के बीच हुए रोमांचक और घमासान युद्ध का दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "qEYtMmsW128",
    title: "मेघनाद और लक्ष्मण का आमना-सामना",
    year: "2026",
    category: "दशहरा",
    description: "रणभूमि में मेघनाद और लक्ष्मण के बीच हुए वीरतापूर्ण आमने-सामने के युद्ध की रोमांचक झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },

  {
    id: "ikki5Qg_VEk",
    title: "लक्ष्मण और मेघनाद का निर्णायक युद्ध",
    year: "2026",
    category: "रामलीला",
    description: "लक्ष्मण के मूर्छित होने से पहले मेघनाद के साथ हुए भीषण और निर्णायक युद्ध का रोमांचक दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  }
];
    
/* ---------- 3. COMPONENT ----------
   Is poore block ko purane "3. COMPONENT" ki jagah paste karo.
   CONFIG (section 1) aur DATA (section 2) bilkul waise hi rahenge. */
(function () {
  "use strict";

  var NS = "mgd-shorts-";
  var LOAD_TIMEOUT = 12000;  // player never became ready -> fallback card
  var SETTLE_MS = 110;       // swipe must be idle this long before autoplay starts
  var BLOCK_CHECK_MS = 1400; // not playing after this (and no user gesture yet) -> browser blocked sound, start silently
  var SHOW_RATIO = 0.35;     // share of the section that must be visible to count as "in view"
  var WARM_RANGE = 1;        // players kept alive: active card +/- 1 (only the active one ever plays)

  var state = {
    cards: [], data: [], active: 0, target: -1,
    pool: {},                // index -> { p, holder, ready, want, silent, block, timer, dead }
    userStopped: -1, visible: false, gesture: false,
    root: null, track: null, fill: null, count: null, prev: null, next: null,
    raf: 0, settle: 0, warm: 0, idle: 0, kick: 0
  };

  var clean = function (v) { return (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim()); };
  var reduced = function () { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; };
  var noop = function () {};

  function netInfo() {
    var c = navigator.connection || {};
    return { save: !!c.saveData, slow: /2g|3g/.test(c.effectiveType || "") };
  }

  function el(tag, cls, text, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls.split(" ").map(function (c) { return NS + c; }).join(" ");
    if (text) n.textContent = text;
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }

  function ytUrl(id) { return "https://www.youtube.com/shorts/" + encodeURIComponent(id); }
  function posterUrl(s) { return clean(s.thumbnail) || "https://i.ytimg.com/vi/" + encodeURIComponent(s.id) + "/hqdefault.jpg"; }
  function label(s) { return clean(s.character) ? clean(s.character) + (clean(s.role) ? " – " + clean(s.role) : "") : clean(s.title) || "Short"; }
  function isFs(stage) { return document.fullscreenElement === stage || document.webkitFullscreenElement === stage; }

  /* ---------- YouTube IFrame API (loaded once; preloaded when the section is near) ---------- */
  var ytPromise = null;
  function loadYouTubeAPI() {
    if (ytPromise) return ytPromise;
    ytPromise = new Promise(function (resolve, reject) {
      if (window.YT && window.YT.Player) return resolve(window.YT);
      var prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof prev === "function") { try { prev(); } catch (e) {} }
        resolve(window.YT);
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        var s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api"; s.async = true;
        s.onerror = function () { ytPromise = null; reject(new Error("YT API failed")); };
        document.head.appendChild(s);
      }
    });
    return ytPromise;
  }

  /* ---------- card ---------- */
  function createMGDShortCard(s, i, total) {
    var card = el("article", "card", null, { "aria-roledescription": "slide", "aria-label": (i + 1) + " / " + total + ": " + label(s) });
    card.dataset.index = i;
    var stage = el("div", "stage is-loading");
    var img = el("img", "poster", null, { alt: "", loading: i < 3 ? "eager" : "lazy", decoding: "async", draggable: "false" });
    img.addEventListener("load", function () {
      if (img.naturalWidth <= 120 && !clean(s.thumbnail)) return failCard(i); // YouTube's grey placeholder for unknown ids
      stage.classList.remove("is-loading"); img.classList.add("is-ready");
    });
    img.addEventListener("error", function () { failCard(i); });
    img.src = posterUrl(s);
    stage.appendChild(img);
    stage.appendChild(el("div", "vignette"));

    if (clean(s.category)) stage.appendChild(el("span", "badge", clean(s.category)));

    var play = el("button", "play", null, { type: "button", "aria-label": "चलाएँ: " + label(s) });
    play.dataset.label = play.getAttribute("aria-label");
    play.appendChild(el("span", "play-icon", null, { "aria-hidden": "true" }));
    play.addEventListener("click", function (e) { e.stopPropagation(); loadMGDShortVideo(i); });
    stage.appendChild(play);
    stage.appendChild(el("span", "spinner", null, { "aria-hidden": "true" }));
    stage.addEventListener("click", function () {
      if (i !== state.active) goTo(i);
      else if (!card.classList.contains("is-failed")) loadMGDShortVideo(i); // tap on the video = play/pause
    });

    stage.appendChild(buildOverlay(s));

    var close = el("button", "close", "✕", { type: "button", "aria-label": "वीडियो बंद करें" });
    close.addEventListener("click", function (e) {
      e.stopPropagation();
      state.userStopped = i;       // don't auto-restart a Short the user closed
      if (isFs(stage)) exitShortsFullscreen();
      deactivate(i);
      var pb = card.querySelector("." + NS + "play");
      if (pb && !card.classList.contains("is-failed")) pb.focus({ preventScroll: true });
    });
    stage.appendChild(close);

    var fullscreen = el("button", "fullscreen", "⛶", { type: "button", "aria-label": "पूरी स्क्रीन में देखें", title: "पूरी स्क्रीन में देखें" });
    fullscreen.addEventListener("click", function (e) {
      e.stopPropagation();
      if (isFs(stage)) exitShortsFullscreen(); else requestShortsFullscreen(stage);
    });
    if (!stage.requestFullscreen && !stage.webkitRequestFullscreen) fullscreen.hidden = true;
    stage.appendChild(fullscreen);

    var fb = el("div", "fallback", null, { role: "group" });
    fb.appendChild(el("p", "fallback-text", "यह वीडियो यहाँ नहीं चल सका"));
    fb.appendChild(el("a", "fallback-link", "YouTube पर देखें", { href: ytUrl(s.id), target: "_blank", rel: "noopener noreferrer" }));
    stage.appendChild(fb);

    card.appendChild(stage);
    return card;
  }

  function buildOverlay(s) {
    var o = el("div", "overlay");
    o.appendChild(el("span", "orn", null, { "aria-hidden": "true" }));
    var hasChar = !!clean(s.character);
    var head = hasChar ? clean(s.character) : clean(s.title);
    if (head) o.appendChild(el("h3", "name", head));
    if (clean(s.role) && hasChar) o.appendChild(el("p", "role", clean(s.role)));
    if (hasChar && clean(s.title)) o.appendChild(el("p", "scene", clean(s.title)));
    if (clean(s.description)) o.appendChild(el("p", "desc", clean(s.description)));
    var meta = [clean(s.year), clean(s.location)].filter(Boolean);
    if (meta.length) {
      var m = el("p", "meta");
      meta.forEach(function (t, k) {
        if (k) m.appendChild(el("span", "dot", null, { "aria-hidden": "true" }));
        m.appendChild(el("span", "meta-item", t));
      });
      o.appendChild(m);
    }
    return o;
  }

  function showFallback(card) {
    card.classList.add("is-failed");
    card.classList.remove("is-playing", "is-buffering", "is-paused");
    var stage = card.firstChild; stage.classList.remove("is-loading");
    var play = stage.querySelector("." + NS + "play"); if (play) play.disabled = true;
  }
  function failCard(i) { destroyPlayer(i); if (state.cards[i]) showFallback(state.cards[i]); }

  function requestShortsFullscreen(stage) {
    var request = stage.requestFullscreen || stage.webkitRequestFullscreen;
    if (!request) return;
    var result = request.call(stage);
    if (result && typeof result.catch === "function") result.catch(function (e) { console.warn("MGD Shorts fullscreen request failed:", e); });
  }
  function exitShortsFullscreen() {
    var exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (!exit) return;
    var result = exit.call(document);
    if (result && typeof result.catch === "function") result.catch(function (e) { console.warn("MGD Shorts fullscreen exit failed:", e); });
  }

  /* ---------- player pool ----------
     Only the ACTIVE card ever plays. The card right before/after it keeps a paused, ready player
     ("warm"), so swiping to it starts instantly instead of building a player from scratch.
     Sound simply follows play/pause: playing = sound on, paused = silent. */

  function lockIframe(p, title) {
    try {
      var f = p.getIframe();
      f.title = title;
      f.style.pointerEvents = "none";
      f.setAttribute("tabindex", "-1");
      f.setAttribute("allowfullscreen", "");
    } catch (e) {}
  }

  function unmute(e) {
    try { e.p.unMute(); e.p.setVolume(100); } catch (x) {}
    e.silent = false;
  }

  function createPlayer(i) {
    if (state.pool[i]) return state.pool[i];
    var card = state.cards[i], s = state.data[i];
    if (!card || !s || card.classList.contains("is-failed")) return null;

    var holder = el("div", "frame");
    holder.style.pointerEvents = "none";   // YouTube's own UI can't be touched; taps reach the MGD stage
    holder.style.opacity = "0";            // poster stays visible until the first frame actually plays
    holder.style.transition = reduced() ? "none" : "opacity .3s";
    var inner = document.createElement("div");
    holder.appendChild(inner);
    card.firstChild.appendChild(holder);

    var e = { p: null, holder: holder, ready: false, want: false, silent: false, block: 0, timer: 0, dead: false };
    state.pool[i] = e;

    e.timer = setTimeout(function () {
      if (e.ready || e.dead) return;
      var wanted = e.want;
      destroyPlayer(i);
      if (wanted) showFallback(card);
    }, LOAD_TIMEOUT);

    loadYouTubeAPI().then(function (YT) {
      if (e.dead) return;
      var vars = {
        playsinline: 1, controls: 0, disablekb: 1, fs: 1, rel: 0, modestbranding: 1,
        iv_load_policy: 3, cc_load_policy: 0, autoplay: 0,
        loop: 1, playlist: s.id          // official single-video loop; ENDED handler below is the backup
      };
      if (/^https?:$/.test(location.protocol)) vars.origin = location.origin;
      var p = new YT.Player(inner, {
        host: "https://www.youtube-nocookie.com",
        videoId: s.id, width: "100%", height: "100%", playerVars: vars,
        events: {
          onReady: function () {
            if (e.dead) return;
            e.ready = true; clearTimeout(e.timer);
            lockIframe(p, "YouTube Short: " + label(s));
            if (e.want && i === state.active) kick(i);
          },
          onAutoplayBlocked: function () {
            if (e.dead || !e.want) return;
            try { p.mute(); p.playVideo(); e.silent = true; } catch (x) {}
          },
          onStateChange: function (ev) {
            if (e.dead) return;
            var d = ev.data;
            if (d === 1) {
              if (!e.want || i !== state.active) { try { p.pauseVideo(); } catch (x) {} return; } // stray play of a non-active card
              clearTimeout(e.block);
              e.holder.style.opacity = "1";
              card.classList.remove("is-buffering", "is-paused");
              card.classList.add("is-playing");
              scheduleWarm();
            } else if (d === 3) {
              if (e.want && i === state.active) card.classList.add("is-buffering");
            } else if (d === 2) {
              if (card.classList.contains("is-playing")) {
                card.classList.remove("is-buffering");
                if (!e.want) card.classList.add("is-paused");
              }
            } else if (d === 0) {
              if (e.want) { try { p.seekTo(0, true); p.playVideo(); } catch (x) {} } // finished -> restart, like a reel
            }
          },
          onError: function () { if (!e.dead) failCard(i); }
        }
      });
      e.p = p;
      lockIframe(p, "YouTube Short: " + label(s));
    }).catch(function () {
      if (e.dead) return;
      var wanted = e.want;
      destroyPlayer(i);
      if (wanted) showFallback(card);
    });
    return e;
  }

  // Start (or resume) playback WITH sound. If the browser refuses sound (no user gesture on the page yet),
  // start silently; the very next tap anywhere gives sound automatically (no button needed).
  function kick(i) {
    var e = state.pool[i];
    if (!e || !e.ready) return;
    var p = e.p;
    e.silent = false;
    try { p.unMute(); p.setVolume(100); p.playVideo(); } catch (x) {}
    clearTimeout(e.block);
    e.block = setTimeout(function () {
      if (state.pool[i] !== e || e.dead || !e.want || i !== state.active || state.gesture) return;
      var st; try { st = p.getPlayerState(); } catch (x) { return; }
      if (st !== 1 && st !== 3) { try { p.mute(); p.playVideo(); e.silent = true; } catch (x) {} }
    }, BLOCK_CHECK_MS);
  }

  function playShort(i, manual) {
    var card = state.cards[i];
    if (!card || card.classList.contains("is-failed")) return;
    if (manual) state.userStopped = -1;
    var e = state.pool[i] || createPlayer(i);
    if (!e) return;
    e.want = true;
    card.classList.add("is-playing", "is-buffering");
    card.classList.remove("is-paused");
    if (e.ready) kick(i);
  }

  // Back to poster, paused at 0:00, player stays warm.
  function deactivate(i) {
    var card = state.cards[i], e = state.pool[i];
    if (card) card.classList.remove("is-playing", "is-paused", "is-buffering");
    if (!e) return;
    e.want = false; e.silent = false; clearTimeout(e.block);
    e.holder.style.opacity = "0";
    if (e.ready) {
      try {
        var st = e.p.getPlayerState();
        if (st === 0 || st === 1 || st === 2 || st === 3) { e.p.pauseVideo(); e.p.seekTo(0, true); }
      } catch (x) {}
    }
  }

  function destroyPlayer(i) {
    var e = state.pool[i];
    if (!e) return;
    e.dead = true; clearTimeout(e.timer); clearTimeout(e.block);
    delete state.pool[i];
    if (e.p) { try { e.p.stopVideo(); } catch (x) {} try { e.p.destroy(); } catch (x) {} }
    if (e.holder && e.holder.parentNode) e.holder.remove();
    var card = state.cards[i];
    if (card) card.classList.remove("is-playing", "is-paused", "is-buffering");
  }

  function destroyAll() { Object.keys(state.pool).forEach(function (k) { destroyPlayer(+k); }); }

  // After the active Short is rolling, quietly prepare the neighbours (skipped on Data Saver / slow networks).
  function scheduleWarm() {
    clearTimeout(state.warm);
    var n = netInfo(); if (n.save || n.slow) return;
    state.warm = setTimeout(function () {
      var a = state.active;
      [a + 1, a - 1].forEach(function (j, k) {
        if (j < 0 || j >= state.cards.length || state.pool[j]) return;
        setTimeout(function () {
          if (state.visible && Math.abs(j - state.active) <= WARM_RANGE) createPlayer(j);
        }, k * 1200);
      });
    }, 500);
  }

  // The ONLY play/pause control. Seeking is not possible anywhere.
  function togglePlayPause(i) {
    var card = state.cards[i];
    if (!card || card.classList.contains("is-failed")) return;
    var e = state.pool[i];
    if (!e || !card.classList.contains("is-playing")) { playShort(i, true); return; }   // poster -> start with sound
    if (e.silent) { unmute(e); return; }                                                  // silent autoplay: tap gives sound
    if (!e.ready) return;
    var st; try { st = e.p.getPlayerState(); } catch (x) { return; }
    if (st === 1 || st === 3) {                                                           // pause = silent
      state.userStopped = i; e.want = false;
      try { e.p.pauseVideo(); } catch (x) {}
      card.classList.add("is-paused"); card.classList.remove("is-buffering");
    } else {                                                                              // resume = sound back
      state.userStopped = -1; e.want = true;
      card.classList.remove("is-paused");
      kick(i);
    }
  }

  function loadMGDShortVideo(i) {
    if (i !== state.active) { goTo(i); return; }
    togglePlayPause(i);
  }

  function autoplayIfVisible() {
    if (!state.visible || document.hidden) return;
    if (state.userStopped === state.active) return;
    var e = state.pool[state.active];
    if (e && e.want) return;
    playShort(state.active, false);
  }

  // Any tap / key press on the page = browsers now allow sound. If a Short started silently, switch it on.
  function onGesture(ev) {
    state.gesture = true;
    var e = state.pool[state.active];
    if (e && e.silent && e.want) {
      var t = ev.target;
      if (!(t && t.closest && t.closest("." + NS + "stage"))) unmute(e); // taps on the stage are handled by togglePlayPause
    }
  }

  /* ---------- viewport awareness ---------- */
  function handleShortsVisibility(entries) {
    var e = entries[entries.length - 1];
    if (e.intersectionRatio === 0 || !e.isIntersecting) {
      if (state.visible) {
        state.visible = false;
        clearTimeout(state.warm);
        deactivate(state.active);
        state.userStopped = -1;
        clearTimeout(state.idle);
        state.idle = setTimeout(destroyAll, 30000); // far away for a while -> free all players
      }
    } else if (e.intersectionRatio >= SHOW_RATIO && !state.visible) {
      state.visible = true;
      clearTimeout(state.idle);
      if (state.target === -1) autoplayIfVisible();
    }
  }

  /* ---------- navigation ---------- */
  function applyActive(best) {
    var changed = best !== state.active;
    state.active = best;
    if (changed) state.userStopped = -1;
    var n = state.cards.length;
    state.cards.forEach(function (c, i) {
      c.classList.toggle("is-active", i === best);
      c.setAttribute("aria-current", i === best ? "true" : "false");
      c.classList.toggle("is-near", Math.abs(i - best) === 1);
    });
    state.fill.style.transform = "scaleX(" + ((best + 1) / n) + ")";
    state.count.textContent = (best + 1) + " / " + n;
    state.prev.disabled = best === 0; state.next.disabled = best === n - 1;

    // leaving a card stops it at once; players further than WARM_RANGE are freed
    Object.keys(state.pool).forEach(function (k) {
      k = +k;
      if (Math.abs(k - best) > WARM_RANGE) destroyPlayer(k);
      else if (k !== best) deactivate(k);
    });
    // posters of the next cards are fetched ahead of time
    [best - 1, best + 1, best + 2].forEach(function (j) {
      var c = state.cards[j], im = c && c.querySelector("." + NS + "poster");
      if (im && im.getAttribute("loading") === "lazy") im.setAttribute("loading", "eager");
    });
  }

  function scheduleSettle() {
    clearTimeout(state.settle);
    state.settle = setTimeout(function () {
      state.target = -1; updateActive(); autoplayIfVisible();
    }, SETTLE_MS);
  }

  function goTo(i) {
    i = Math.max(0, Math.min(state.cards.length - 1, i));
    var c = state.cards[i], t = state.track;
    state.target = i;                 // freeze active index while the programmatic scroll runs
    applyActive(i);
    t.scrollTo({ left: c.offsetLeft - (t.clientWidth - c.offsetWidth) / 2, behavior: reduced() ? "auto" : "smooth" });
    scheduleSettle();
    clearTimeout(state.kick);         // start right away (not after the scroll ends); rapid clicks collapse into one start
    state.kick = setTimeout(autoplayIfVisible, 60);
  }

  function updateActive() {
    state.raf = 0;
    if (state.target > -1) return;
    var t = state.track, mid = t.scrollLeft + t.clientWidth / 2, best = 0, d = Infinity;
    state.cards.forEach(function (c, i) {
      var dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (dist < d) { d = dist; best = i; }
    });
    applyActive(best);
  }
  function onScroll() {
    if (!state.raf) state.raf = requestAnimationFrame(updateActive);
    scheduleSettle();                 // also covers touch swipes
  }

  /* ---------- render ---------- */
  function renderMGDShorts(root) {
    var data = mgdShortsData.filter(function (s) { return s && clean(s.id); });
    state.data = data; root.textContent = "";
    root.setAttribute("aria-labelledby", NS + "heading");
    if (!data.length) { root.hidden = true; return; }

    var wrap = el("div", "container");
    var head = el("header", "head");
    head.appendChild(el("span", "orn-top", null, { "aria-hidden": "true" }));
    head.appendChild(el("h2", "title", mgdShortsConfig.heading, { id: NS + "heading" }));
    if (mgdShortsConfig.subtitle) head.appendChild(el("p", "subtitle", mgdShortsConfig.subtitle));
    wrap.appendChild(head);

    var view = el("div", "viewport");
    var track = el("div", "track", null, { role: "group", "aria-roledescription": "carousel", "aria-label": mgdShortsConfig.heading, tabindex: "0" });
    var frag = document.createDocumentFragment();
    data.forEach(function (s, i) { var c = createMGDShortCard(s, i, data.length); state.cards.push(c); frag.appendChild(c); });
    track.appendChild(frag); view.appendChild(track);
    wrap.appendChild(view);

    var foot = el("div", "foot");
    var prev = el("button", "nav " + NS + "nav-prev", null, { type: "button", "aria-label": "पिछला Short" });
    var next = el("button", "nav " + NS + "nav-next", null, { type: "button", "aria-label": "अगला Short" });
    [prev, next].forEach(function (b) { b.appendChild(el("span", "arrow", null, { "aria-hidden": "true" })); });
    var prog = el("div", "progress", null, { "aria-hidden": "true" });
    var bar = el("div", "bar"), fill = el("div", "fill"); bar.appendChild(fill);
    var count = el("span", "count", "1 / " + data.length, { "aria-live": "polite" });
    count.setAttribute("aria-hidden", "false");
    prog.appendChild(bar); prog.appendChild(count);
    foot.appendChild(prev); foot.appendChild(prog); foot.appendChild(next);
    wrap.appendChild(foot);

    if (clean(mgdShortsConfig.viewAllUrl)) {
      wrap.appendChild(el("a", "all", clean(mgdShortsConfig.viewAllLabel) || "सभी Shorts देखें", { href: mgdShortsConfig.viewAllUrl, target: "_blank", rel: "noopener noreferrer" }));
    }
    root.appendChild(wrap);

    Object.assign(state, { root: root, track: track, fill: fill, count: count, prev: prev, next: next });
    prev.addEventListener("click", function () { goTo(state.active - 1); });
    next.addEventListener("click", function () { goTo(state.active + 1); });
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(state.active - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goTo(state.active + 1); }
    });

    ["pointerdown", "keydown", "touchend"].forEach(function (t) { document.addEventListener(t, onGesture, { capture: true, passive: true }); });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) deactivate(state.active);   // tab in background: stop playing, stop using data
      else autoplayIfVisible();
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(handleShortsVisibility, { threshold: [0, SHOW_RATIO] }).observe(root);
      // Section is ~1 screen away: open connections, load the YouTube API and get the first player ready
      var connectionObserver = new IntersectionObserver(function (entries, observer) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        ["https://www.youtube.com", "https://www.youtube-nocookie.com", "https://i.ytimg.com"].forEach(function (url) {
          if (document.querySelector('link[rel="preconnect"][href="' + url + '"]')) return;
          var link = document.createElement("link");
          link.rel = "preconnect"; link.href = url;
          document.head.appendChild(link);
        });
        observer.disconnect();
        if (!netInfo().save) {
          loadYouTubeAPI().then(function () { if (!state.pool[state.active]) createPlayer(state.active); }).catch(noop);
        }
      }, { rootMargin: "900px 0px" });
      connectionObserver.observe(root);
    } // without IntersectionObserver the manual play button still works

    requestAnimationFrame(function () { goTo(0); track.scrollLeft = 0; });
  }

  function initMGDShorts() {
    var root = document.getElementById("mgd-shorts-section");
    if (!root || root.dataset.mgdReady) return;
    root.dataset.mgdReady = "1";
    renderMGDShorts(root);
  }

  window.MGDShorts = { init: initMGDShorts };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initMGDShorts);
  else initMGDShorts();
})();