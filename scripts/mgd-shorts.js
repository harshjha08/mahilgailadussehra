/* ==========================================================================
   MGD Shorts — दशहरा की झलकियाँ
   Mount:  <section id="mgd-shorts-section" class="mgd-shorts-section"></section>
   To add a Short: add ONE object to mgdShortsData below. Only `id` is required.
   ========================================================================== */

/* ---------- 1. CONFIG ---------- */
const mgdShortsConfig = {
  heading: "दशहरा की झलकियाँ",
  subtitle: "रामलीला और दशहरा महोत्सव के कुछ यादगार क्षण",
  viewAllLabel: "सभी Shorts देखें →",
  viewAllUrl: "https://www.youtube.com/embed/vdNm1FnHFoc" // e.g. "https://www.youtube.com/@yourchannel/shorts"; leave "" to hide the link
};

/* ---------- 2. DATA (edit here only) ----------
   id (required) · title · character · role · year · category ·
   description · location · thumbnail (custom image URL, optional) */
const mgdShortsData = [
  {
    id: "vdNm1FnHFoc",
    title: "रावण वध का अद्भुत दृश्य",
    character: "गौरव कौशल",
    role: "रावण",
    year: "2026",
    category: "रामलीला",
    description: "लंका के अंतिम युद्ध में रावण के रूप में गौरव कौशल का प्रभावशाली अभिनय।",
    location: "माहिल गहिला",
    thumbnail: null
  },
  {
    id: "ccI6p3lR75U",
    title: "दशहरा की यादगार झलक",
    year: "2026",
    category: "दशहरा",
    description: "माहिल गहिला दशहरा महोत्सव की एक यादगार झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },
  {
    id: "mLpLYvdo2e8",
    title: "रामलीला की यादगार झलक",
    year: "2026",
    category: "रामलीला",
    description: "माहिल गहिला की रामलीला प्रस्तुति का एक यादगार दृश्य।",
    location: "माहिल गहिला",
    thumbnail: null
  },
  {
    id: "Sk1liAC-Eyc",
    title: "दशहरा महोत्सव की झलक",
    year: "2026",
    category: "दशहरा",
    description: "दशहरा महोत्सव के उत्सव और माहौल की एक खूबसूरत झलक।",
    location: "माहिल गहिला",
    thumbnail: null
  },
  {
    id: "dk_l1xPuFLo",
    title: "रामलीला का एक यादगार क्षण",
    year: "2026",
    category: "रामलीला",
    description: "माहिल गहिला रामलीला के मंचन से जुड़ा एक यादगार क्षण।",
    location: "माहिल गहिला",
    thumbnail: null
  }
];

/* ---------- 3. COMPONENT ---------- */
(function () {
  "use strict";

  var NS = "mgd-shorts-";
  var FAR = 2;               // safety net: a player this far from the active card is always destroyed
  var LOAD_TIMEOUT = 10000;  // player never became ready -> fallback card
  var SETTLE_MS = 160;       // scroll must be idle this long before autoplay starts
  var BLOCK_CHECK_MS = 1500; // if still not playing after this, assume autoplay-with-sound was blocked
  var SHOW_RATIO = 0.35;     // share of the section that must be visible to count as "in view"

  var state = {
    cards: [], data: [], active: 0, target: -1,
    playing: -1, player: null, ready: false, manual: false, seq: 0, userStopped: -1,
    visible: false, root: null, track: null, fill: null, count: null, prev: null, next: null,
    raf: 0, timer: 0, settle: 0, block: 0
  };

  var clean = function (v) { return (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim()); };
  var reduced = function () { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; };

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

  /* ---------- YouTube IFrame API (loaded once, only when first needed) ---------- */
  var ytPromise = null;
  function loadYouTubeAPI() {
    if (ytPromise) return ytPromise;
    ytPromise = new Promise(function (resolve, reject) {
      if (window.YT && window.YT.Player) return resolve(window.YT);
      var prev = window.onYouTubeIframeAPIReady; // stay compatible with any other user of the API
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
      if (img.naturalWidth <= 120 && !clean(s.thumbnail)) return showFallback(card); // YouTube's grey placeholder for unknown ids
      stage.classList.remove("is-loading"); img.classList.add("is-ready");
    });
    img.addEventListener("error", function () { showFallback(card); });
    img.src = posterUrl(s);
    stage.appendChild(img);
    stage.appendChild(el("div", "vignette"));

    if (clean(s.category)) stage.appendChild(el("span", "badge", clean(s.category)));

    var play = el("button", "play", null, { type: "button", "aria-label": "चलाएँ: " + label(s) });
    play.dataset.label = play.getAttribute("aria-label");
    play.appendChild(el("span", "play-icon", null, { "aria-hidden": "true" }));
    play.addEventListener("click", function (e) { e.stopPropagation(); loadMGDShortVideo(i); });
    stage.appendChild(play);
    stage.addEventListener("click", function () {
      if (i !== state.active) goTo(i);
      else if (!card.classList.contains("is-failed")) loadMGDShortVideo(i); // tap on the video = play/pause
    });

    stage.appendChild(buildOverlay(s));

    var close = el("button", "close", "✕", { type: "button", "aria-label": "वीडियो बंद करें" });
    close.addEventListener("click", function (e) {
      e.stopPropagation();
      state.userStopped = i;       // don't auto-restart a Short the user closed
      resetCard(i, true);
    });
    stage.appendChild(close);

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
    var stage = card.firstChild; stage.classList.remove("is-loading");
    var play = stage.querySelector("." + NS + "play"); if (play) play.disabled = true;
  }

  /* ---------- player lifecycle ---------- */
  // is-muted: video is playing silently (autoplay restriction). The play button is shown again as an "unmute" control.
  function setMuted(card, muted) {
    if (!card) return;
    card.classList.toggle("is-muted", !!muted);
    updatePlayButton(card, !card.classList.contains("is-paused"));
  }

  // The MGD play button doubles as pause (is-paused on the card = show the play icon).
  function updatePlayButton(card, isPlaying) {
    if (!card) return;
    card.classList.toggle("is-paused", !isPlaying);
    var b = card.querySelector("." + NS + "play");
    if (b) b.setAttribute("aria-label", !isPlaying ? "चलाएँ" : card.classList.contains("is-muted") ? "आवाज़ चालू करें" : "रोकें");
  }

  // The ONLY play/pause control. No seeking is possible anywhere.
  function togglePlayPause(i) {
    var card = state.cards[i];
    if (!card || card.classList.contains("is-failed")) return;
    if (state.playing !== i) { playActiveShort(true); return; }   // poster -> start (with sound)
    var p = state.player;
    if (!p || !state.ready) return;                                // still loading
    var st = p.getPlayerState(), running = (st === 1 || st === 3);
    if (running && card.classList.contains("is-muted")) {          // silent autoplay: first tap turns sound on
      try { p.unMute(); } catch (e) {}
      setMuted(card, false); return;
    }
    if (running) {
      state.userStopped = i;                                       // viewport logic must not restart it
      p.pauseVideo(); updatePlayButton(card, false);
    } else {
      state.userStopped = -1;
      try { p.unMute(); } catch (e) {}
      setMuted(card, false); p.playVideo();
    }
  }

  // Create the (single) player for the ACTIVE card. Never more than one exists.
  function ensureActivePlayer(manual) {
    var i = state.active, card = state.cards[i], s = state.data[i];
    if (!card || card.classList.contains("is-failed")) return;
    if (state.playing === i) return;
    if (state.playing > -1) destroyActivePlayer();

    var seq = ++state.seq;
    state.playing = i; state.manual = !!manual; state.ready = false;
    card.classList.add("is-playing");
    var holder = el("div", "frame");
    holder.style.pointerEvents = "none";   // YouTube's own UI can't be touched; taps reach the MGD stage/buttons (z-index above), swipes reach the carousel
    holder.style.opacity = "0";            // stays hidden (poster visible) until the first frame actually plays
    holder.style.transition = reduced() ? "none" : "opacity .35s";
    var inner = document.createElement("div");
    holder.appendChild(inner);
    card.firstChild.appendChild(holder);

    clearTimeout(state.timer);
    state.timer = setTimeout(function () {
      if (seq !== state.seq) return;
      destroyActivePlayer(); showFallback(card);
    }, LOAD_TIMEOUT);

    loadYouTubeAPI().then(function (YT) {
      if (seq !== state.seq) return; // card changed / section left while the API was loading
      var vars = {
        playsinline: 1, controls: 0, disablekb: 1, fs: 0, rel: 0, modestbranding: 1,
        iv_load_policy: 3, cc_load_policy: 0, autoplay: 0,
        loop: 1, playlist: s.id          // official single-video loop; ENDED handler below is the backup
      };
      if (/^https?:$/.test(location.protocol)) vars.origin = location.origin;
      var p = new YT.Player(inner, {
        host: "https://www.youtube-nocookie.com",
        videoId: s.id, width: "100%", height: "100%", playerVars: vars,
        events: {
          onReady: function () {
            if (seq !== state.seq) return;
            state.player = p; state.ready = true; clearTimeout(state.timer);
            lockIframe(p, "YouTube Short: " + label(s));
            p.playVideo();
            clearTimeout(state.block);
            state.block = setTimeout(function () {   // autoplay with sound blocked? retry muted
              if (seq !== state.seq || !state.player) return;
              var st = p.getPlayerState();
              if (st !== 1 && st !== 3) {
                p.mute(); p.playVideo();
                state.block = setTimeout(function () { // even muted autoplay refused: show the play button
                  if (seq !== state.seq) return;
                  var s2 = p.getPlayerState();
                  if (s2 !== 1 && s2 !== 3) { card.classList.add("is-live"); updatePlayButton(card, false); } // let the user start it
                }, BLOCK_CHECK_MS);
              }
            }, BLOCK_CHECK_MS);
          },
          onAutoplayBlocked: function () {
            if (seq !== state.seq) return;
            p.mute(); p.playVideo();
          },
          onStateChange: function (e) {
            if (seq !== state.seq) return;
            if (e.data === 1) {
              clearTimeout(state.block); holder.style.opacity = "1";
              card.classList.add("is-live"); updatePlayButton(card, true); setMuted(card, p.isMuted());
            }
            else if (e.data === 2) { card.classList.add("is-live"); updatePlayButton(card, false); }
            else if (e.data === 0) { p.seekTo(0, true); p.playVideo(); } // finished -> restart automatically, like a reel
          },
          onError: function () {
            if (seq !== state.seq) return;
            destroyActivePlayer(); showFallback(card);
          }
        }
      });
      state.player = p;
      lockIframe(p, "YouTube Short: " + label(s));
    }).catch(function () {
      if (seq !== state.seq) return;
      destroyActivePlayer(); showFallback(card);
    });
  }

  // Make the embedded iframe a plain, non-interactive video surface.
  function lockIframe(p, title) {
    try {
      var f = p.getIframe();
      f.title = title;
      f.style.pointerEvents = "none";
      f.setAttribute("tabindex", "-1");
      f.removeAttribute("allowfullscreen");
    } catch (e) {}
  }

  function playActiveShort(manual) {
    var i = state.active, card = state.cards[i];
    if (!card || card.classList.contains("is-failed")) return;
    if (manual) state.userStopped = -1;
    if (state.playing === i) {
      var p = state.player;
      if (p && state.ready) {
        if (manual) { try { p.unMute(); } catch (e) {} setMuted(card, false); }
        p.playVideo();
      } else if (manual) state.manual = true;
      return;
    }
    ensureActivePlayer(manual);
  }

  function pauseActiveShort() {
    if (state.player && state.ready) { try { state.player.pauseVideo(); } catch (e) {} }
  }

  function destroyActivePlayer() {
    var i = state.playing, p = state.player;
    state.seq++;                      // invalidates pending callbacks
    clearTimeout(state.timer); clearTimeout(state.block);
    state.player = null; state.ready = false; state.playing = -1;
    if (p) { try { p.stopVideo(); } catch (e) {} try { p.destroy(); } catch (e) {} } // next visit is a fresh player from 0:00
    var card = state.cards[i];
    if (card) {
      var h = card.querySelector("." + NS + "frame"); if (h) h.remove();
      card.classList.remove("is-playing", "is-live", "is-paused", "is-muted");
      var pb = card.querySelector("." + NS + "play"); if (pb) pb.setAttribute("aria-label", pb.dataset.label);
    }
  }

  function resetCard(i, focusPlay) {
    if (state.playing !== i) return;
    destroyActivePlayer();
    var card = state.cards[i];
    var play = card && card.querySelector("." + NS + "play");
    if (focusPlay && play && !card.classList.contains("is-failed")) play.focus({ preventScroll: true });
  }

  // Play button / tap on the card: other cards are brought to the centre first, the active card toggles play/pause.
  function loadMGDShortVideo(i) {
    if (i !== state.active) { goTo(i); return; }
    togglePlayPause(i);
  }

  function autoplayIfVisible() {
    if (!state.visible) return;
    if (state.playing === state.active || state.userStopped === state.active) return;
    playActiveShort(false);
  }

  /* ---------- viewport awareness ---------- */
  function handleShortsVisibility(entries) {
    var e = entries[entries.length - 1];
    if (e.intersectionRatio === 0 || !e.isIntersecting) {
      if (state.visible) {
        state.visible = false;
        pauseActiveShort();
        destroyActivePlayer();        // active index is preserved
        state.userStopped = -1;
      }
    } else if (e.intersectionRatio >= SHOW_RATIO && !state.visible) {
      state.visible = true;
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
    // the playing Short always follows the active card; leaving it stops it immediately (covers FAR too)
    if (state.playing > -1 && (state.playing !== best || Math.abs(state.playing - best) > FAR)) destroyActivePlayer();
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
    scheduleSettle();                 // plays the new active Short once movement ends (if section is visible)
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
      wrap.appendChild(el("a", "all", mgdShortsConfig.viewAllLabel, { href: mgdShortsConfig.viewAllUrl, target: "_blank", rel: "noopener noreferrer" }));
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

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(handleShortsVisibility, { threshold: [0, SHOW_RATIO] }).observe(root);
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