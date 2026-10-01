/* Cast & Characters archive. Vanilla JS, no dependencies.
   To add an artist: add one object to castData below. Nothing else needs editing.
   Any field can be omitted, null, "" or []: the UI hides that section automatically. */
(function () {
  'use strict';

  /* ---------- Placeholders (replace with your own files later) ---------- */
  const DEFAULT_ARTIST_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#e5d8c0"/><circle cx="200" cy="190" r="70" fill="#c9b794"/><path d="M60 500c0-110 60-170 140-170s140 60 140 170z" fill="#c9b794"/></svg>');
  const HERO_IMAGE = 'https://picsum.photos/seed/ramlila-stage/1600/900'; // REPLACE: hero background
  const img = (seed, w = 600, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`; // demo image helper
  const DEMO_VIDEO = 'aqz-KE-bpKQ'; // REPLACE: YouTube video ID (the part after v= or /shorts/)

  /* ---------- DATABASE (all names, years and bios are fictional demo content) ----------
     status: "current" | "historical"
     gallery items: "url" or { src, caption, year }
     videos: { type:"youtube", id, title, year, format:"video" | "short" }            */
  const castData = [
    {
      id: 1, name: 'Harsh Jha', aliases: ['Harsh', 'Harshu'], searchableTerms: ['ram lila lead', 'main protagonist'],
      primaryRole: 'Shri Ram', characters: ['Shri Ram', 'Lakshman'], status: 'current',
      currentPhoto: img('cast1-now'),                 // REPLACE: current portrait
      costumePhoto: img('cast1-costume', 600, 800),   // REPLACE: photo in costume
      gallery: [                                      // REPLACE: performance photographs
        { src: img('cast1-g1', 800, 600), caption: 'Entry of the procession', year: '2024' },
        { src: img('cast1-g2', 600, 900), caption: 'The bow scene', year: '2023' },
        { src: img('cast1-g3', 800, 800), year: '2025' },
        { src: img('cast1-g4', 800, 560), caption: 'Coronation tableau', year: '2022' },
        { src: img('cast1-g5', 600, 780) }
      ],
      videos: [
        { type: 'youtube', id: DEMO_VIDEO, title: 'Ram and Ravan, final scene', year: '2025', format: 'video' },
        { type: 'youtube', id: DEMO_VIDEO, title: 'Entry clip (vertical)', year: '2024', format: 'short' }
      ],
      biography: 'Demo biography. Harsh first stepped onto the Ramlila stage as Lakshman and took on the role of Shri Ram soon after.\nHe continues to rehearse with the committee through the year.',
      currentStatus: 'Lead performer, current season', activeYears: '2022 – Present', hometown: 'Demo Town', experience: '4 seasons',
      roleHistory: [
        { year: '2022', character: 'Lakshman', description: 'First performance with the troupe.' },
        { year: '2023', character: 'Shri Ram', description: 'Took over the central role.' },
        { year: '2024', character: 'Shri Ram', description: 'Continued the role with an extended bow scene.' },
        { year: '2025', character: 'Shri Ram', description: 'Led the closing act of the season.' }
      ],
      contact: { instagram: 'demo_harsh', facebook: 'https://facebook.com/demo', email: 'demo@example.com', phone: null, youtube: 'https://youtube.com/@demo' },
      awards: ['Demo Award: Best Newcomer'], notes: 'Demo note. Known for portraying Shri Ram with a quiet, restrained style.'
    },
    {
      id: 2, name: 'Aarav Mishra', aliases: ['Aarav Bhaiya'], searchableTerms: ['veteran'], primaryRole: 'Shri Ram',
      characters: ['Shri Ram'], status: 'historical', currentPhoto: null, costumePhoto: null,
      gallery: [{ src: img('cast2-g1', 700, 900), year: '2013' }, { src: img('cast2-g2', 800, 600) }], videos: [],
      biography: 'Demo biography of an earlier Shri Ram. Records from these years are still being collected.',
      activeYears: '2010 – 2015', roleHistory: [{ year: '2010', character: 'Shri Ram', description: '' }],
      contact: { instagram: null, facebook: null, email: null, phone: null, youtube: null }, awards: [], notes: ''
    },
    {
      id: 3, name: 'Kabir Sharma', aliases: ['Kabir'], primaryRole: 'Shri Ram', characters: ['Shri Ram', 'Bharat'], status: 'current',
      currentPhoto: img('cast3-now'), costumePhoto: img('cast3-costume'),
      gallery: [{ src: img('cast3-g1', 800, 600), caption: 'Rehearsal', year: '2024' }, { src: img('cast3-g2', 600, 850) }, { src: img('cast3-g3', 800, 700) }],
      videos: [{ type: 'youtube', id: DEMO_VIDEO, title: 'Sita Swayamvar scene', year: '2023' }],
      biography: 'Demo biography. Kabir plays Bharat in the reunion scene and shares the Shri Ram role in alternate seasons.',
      currentStatus: 'Active', activeYears: '2019 – Present', hometown: 'Demo City', experience: '7 seasons',
      roleHistory: [{ year: '2019', character: 'Bharat', description: 'Debut season.' }, { year: '2022', character: 'Shri Ram', description: 'Alternate-season lead.' }],
      contact: { instagram: 'demo_kabir', facebook: null, email: 'kabir@example.com', phone: '+91 00000 00000', youtube: null }, awards: [], notes: ''
    },
    {
      id: 4, name: 'Devendra Rana', aliases: ['Dev', 'Ravan Sahab'], searchableTerms: ['ten heads', 'lanka king'], primaryRole: 'Ravan',
      characters: ['Ravan'], status: 'current', currentPhoto: img('cast4-now'), costumePhoto: img('cast4-costume'),
      gallery: [{ src: img('cast4-g1', 800, 600), caption: 'Court of Lanka', year: '2024' }, { src: img('cast4-g2', 600, 800) }],
      videos: [{ type: 'youtube', id: DEMO_VIDEO, title: 'Ravan court monologue', year: '2024', format: 'short' }],
      biography: 'Demo biography. Known for a commanding voice and long stage presence.', currentStatus: 'Lead antagonist',
      activeYears: '2016 – Present', hometown: 'Demo Town', experience: '9 seasons',
      roleHistory: [{ year: '2016', character: 'Ravan', description: 'First season in the role.' }, { year: '2024', character: 'Ravan', description: 'Extended court scene.' }],
      contact: { instagram: 'demo_dev', facebook: null, email: null, phone: null, youtube: null }, awards: ['Demo Award: Best Villain'], notes: 'Demo note.'
    },
    {
      id: 5, name: 'Omkar Tiwari', aliases: ['Omu'], primaryRole: 'Ravan', characters: ['Ravan', 'Kumbhkaran'], status: 'historical',
      currentPhoto: img('cast5-now'), costumePhoto: img('cast5-costume'), gallery: [], videos: [],
      biography: '', activeYears: '2001 – 2012', roleHistory: [], contact: {}, awards: [], notes: 'Demo archive note: known for the Ravan role in early seasons.'
    },
    {
      id: 6, name: 'Pranav Gill', aliases: ['Pranav'], searchableTerms: ['bajrangbali', 'mahaveer'], primaryRole: 'Hanuman', characters: ['Hanuman'], status: 'current',
      currentPhoto: img('cast6-now'), costumePhoto: img('cast6-costume'),
      gallery: [{ src: img('cast6-g1', 800, 600), caption: 'Lanka Dahan', year: '2025' }, { src: img('cast6-g2', 600, 800) }, { src: img('cast6-g3', 700, 700) }],
      videos: [{ type: 'youtube', id: DEMO_VIDEO, title: 'Lanka Dahan', year: '2025' }],
      biography: 'Demo biography. Pranav trains in stage acrobatics for the leaping scenes.', activeYears: '2018 – Present', hometown: 'Demo Town', experience: '8 seasons',
      roleHistory: [{ year: '2018', character: 'Hanuman', description: 'First season.' }, { year: '2025', character: 'Hanuman', description: 'Lanka Dahan sequence.' }],
      contact: { instagram: 'demo_pranav', facebook: 'https://facebook.com/demo', email: null, phone: null, youtube: null }, awards: [], notes: ''
    },
    { id: 7, name: 'Rohan Verma', aliases: ['Rohan'], searchableTerms: ['bajrangbali'], primaryRole: 'Hanuman', characters: ['Hanuman'], status: 'historical',
      currentPhoto: img('cast7-now'), costumePhoto: null, gallery: [], videos: [], biography: 'Demo biography of an earlier Hanuman.', activeYears: '2005 – 2014',
      roleHistory: [{ year: '2005', character: 'Hanuman', description: 'Debut.' }], contact: { email: 'rohan@example.com' }, awards: [], notes: '' },
    { id: 8, name: 'Ishita Kapoor', aliases: ['Ishita'], primaryRole: 'Sita', characters: ['Sita'], status: 'current',
      currentPhoto: img('cast8-now'), costumePhoto: img('cast8-costume'), gallery: [{ src: img('cast8-g1', 700, 900), year: '2024' }, { src: img('cast8-g2', 800, 600) }],
      videos: [], biography: 'Demo biography. Ishita joined as a youth artist.', activeYears: '2020 – Present', hometown: 'Demo City', experience: '5 seasons',
      roleHistory: [{ year: '2020', character: 'Sita', description: 'Debut.' }, { year: '2023', character: 'Sita', description: 'Ashok Vatika scene.' }],
      contact: { instagram: 'demo_ishita', facebook: null, email: null, phone: null, youtube: 'https://youtube.com/@demo' }, awards: [], notes: '' },
    { id: 9, name: 'Meera Sethi', aliases: [], primaryRole: 'Sita', characters: ['Sita'], status: 'historical', currentPhoto: null, costumePhoto: null,
      gallery: [], videos: [], biography: '', activeYears: '', roleHistory: [], contact: {}, awards: [], notes: '' },
    { id: 10, name: 'Yash Malhotra', aliases: ['Yash'], primaryRole: 'Lakshman', characters: ['Lakshman'], status: 'current',
      currentPhoto: img('cast10-now'), costumePhoto: img('cast10-costume'), gallery: [{ src: img('cast10-g1', 800, 640) }, { src: img('cast10-g2', 640, 800) }],
      videos: [], biography: 'Demo biography.', activeYears: '2021 – Present', roleHistory: [{ year: '2021', character: 'Lakshman', description: 'Debut.' }],
      contact: { instagram: 'demo_yash', email: null }, awards: [], notes: '' },
    { id: 11, name: 'Tanmay Bedi', aliases: ['Tanu'], searchableTerms: ['indrajit'], primaryRole: 'Meghnad', characters: ['Meghnad'], status: 'current',
      currentPhoto: img('cast11-now'), costumePhoto: img('cast11-costume'), gallery: [{ src: img('cast11-g1', 800, 600), year: '2023' }],
      videos: [{ type: 'youtube', id: DEMO_VIDEO, title: 'Meghnad battle', year: '2023' }], biography: 'Demo biography.', activeYears: '2017 – Present',
      roleHistory: [{ year: '2017', character: 'Meghnad', description: 'Debut.' }], contact: { facebook: 'https://facebook.com/demo' }, awards: [], notes: '' },
    { id: 12, name: 'Sahil Arora', aliases: ['Sahil'], primaryRole: 'Kumbhkaran', characters: ['Kumbhkaran', 'Ravan'], status: 'historical',
      currentPhoto: img('cast12-now'), costumePhoto: img('cast12-costume'), gallery: [{ src: img('cast12-g1', 800, 640) }], videos: [],
      biography: 'Demo biography.', activeYears: '2008 – 2018', roleHistory: [{ year: '2008', character: 'Kumbhkaran', description: 'Debut.' }],
      contact: {}, awards: [], notes: 'Demo archive note.' }
    // Add new artists above this line.
  ];

  /* ---------- Helpers ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s == null ? '' : s).toLowerCase().trim();
  const slugify = s => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const has = v => Array.isArray(v) ? v.length > 0 : typeof v === 'string' ? v.trim() !== '' : v != null;
  const clean = v => (Array.isArray(v) ? v : []).filter(has);
  const unique = arr => [...new Set(arr)];
  const $ = id => document.getElementById(id);

  /* Fill every missing field so rendering never meets undefined. */
  function normalizeArtist(a) {
    return Object.assign({
      aliases: [], searchableTerms: [], primaryRole: '', characters: [], status: 'historical', currentPhoto: null, costumePhoto: null,
      gallery: [], videos: [], biography: '', currentStatus: '', activeYears: '', hometown: '', experience: '', roleHistory: [], awards: [], notes: ''
    }, a, {
      contact: Object.assign({ instagram: null, facebook: null, email: null, phone: null, youtube: null }, a.contact),
      slug: a.slug || slugify(a.name)
    });
  }
  const cast = castData.map(normalizeArtist);
  const charactersOf = a => unique([a.primaryRole, ...clean(a.characters), ...a.roleHistory.map(r => r.character)].filter(has));
  const galleryOf = a => clean(a.gallery).map(g => typeof g === 'string' ? { src: g } : g).filter(g => has(g.src));
  const photoOf = a => has(a.currentPhoto) ? a.currentPhoto : DEFAULT_ARTIST_IMAGE;
  const statusLabel = a => a.status === 'current' ? 'Current cast' : 'Historical cast';
  const imgTag = (src, alt, extra = '') => `<img src="${esc(src)}" alt="${esc(alt)}" ${extra}>`;

  /* Replace any broken image with the default placeholder. */
  document.addEventListener('error', e => {
    const t = e.target;
    if (t && t.tagName === 'IMG' && t.closest('.cast-page') && t.src !== DEFAULT_ARTIST_IMAGE) { t.onerror = null; t.src = DEFAULT_ARTIST_IMAGE; }
  }, true);

  /* ---------- Search ---------- */
  const state = { mode: 'all', query: '' };

  function searchHaystack(a, mode) {
    const nameParts = [a.name, ...clean(a.aliases)];
    const charParts = [a.primaryRole, ...clean(a.characters), ...a.roleHistory.map(r => r.character)];
    if (mode === 'artists') return norm(nameParts.join(' | '));
    if (mode === 'characters') return norm(charParts.join(' | '));
    const history = a.roleHistory.map(r => `${r.year} ${r.character}`);
    return norm([...nameParts, ...charParts, ...clean(a.searchableTerms), ...history].join(' | '));
  }

  function searchCast(query, mode) {
    const tokens = norm(query).split(/\s+/).filter(Boolean);
    return cast.filter(a => {
      if (mode === 'current' && a.status !== 'current') return false;
      if (mode === 'historical' && a.status !== 'historical') return false;
      if (!tokens.length) return true;
      const hay = searchHaystack(a, mode);
      return tokens.every(t => hay.includes(t));
    });
  }

  function renderResultCard(a, i) {
    const intro = has(a.biography) ? a.biography.split('\n')[0].slice(0, 130) + (a.biography.length > 130 ? '…' : '') : 'Archive information currently unavailable.';
    return `<li style="animation-delay:${Math.min(i, 8) * 60}ms"><button class="cr-btn" data-artist="${esc(a.slug)}" aria-label="View archive: ${esc(a.name)}">
      <figure class="cr-fig">${imgTag(photoOf(a), a.name, 'loading="lazy"')}</figure>
      <div class="cr-body"><span class="cr-status">${statusLabel(a)}</span><h3>${esc(a.name)}</h3>
      ${has(a.primaryRole) ? `<p class="cr-role">${esc(a.primaryRole)}</p>` : ''}
      ${has(a.activeYears) ? `<p class="cr-years">${esc(a.activeYears)}</p>` : ''}
      <p class="cr-intro">${esc(intro)}</p><span class="cr-more">View archive →</span></div></button></li>`;
  }

  function renderResults(list) {
    $('cpCount').textContent = list.length ? `${list.length} ${list.length === 1 ? 'artist' : 'artists'} found` : '0 artists found';
    $('cpResults').innerHTML = list.length ? list.map(renderResultCard).join('')
      : `<li class="cp-empty"><h3>Nothing found in the archive</h3><p>Try another name, or search for a character such as Shri Ram, Ravan or Hanuman.</p></li>`;
  }

  function runSearch() {
    $('cpClear').hidden = !state.query;
    renderResults(searchCast(state.query, state.mode));
  }

  function setMode(mode) {
    state.mode = mode;
    document.querySelectorAll('#cpFilters button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  }

  /* Character chips: number of artists per character */
  function renderCharacters(chars, cls = 'cp-chip') {
    return chars.map(c => `<button class="${cls}" data-char="${esc(c)}">${esc(c)}</button>`).join('');
  }
  function renderCharStrip() {
    const counts = {};
    cast.forEach(a => charactersOf(a).forEach(c => counts[c] = (counts[c] || 0) + 1));
    const sorted = Object.keys(counts).sort((x, y) => counts[y] - counts[x]);
    $('cpCharStrip').innerHTML = sorted.map(c => `<button class="cp-chip" data-char="${esc(c)}">${esc(c)} <small>${counts[c]}</small></button>`).join('');
  }

  function searchByCharacter(character) {
    closeModal(true);
    state.query = character; $('cpQuery').value = character; setMode('characters'); runSearch();
    history.replaceState(null, '', '?character=' + slugify(character));
    $('cpResultsWrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- Profile sections. Each returns '' when there is nothing to show. ---------- */
  const section = (title, body, cls = '') => body ? `<section class="pf-sec ${cls}"><h3>${title}</h3>${body}</section>` : '';

  function renderArtistInfo(a) {
    return `<header class="pf-head"><figure class="pf-portrait">${imgTag(photoOf(a), 'Portrait of ' + a.name)}</figure><div>
      ${has(a.primaryRole) ? `<p class="pf-role">${esc(a.primaryRole)}</p>` : ''}
      <h2 id="cpProfileName">${esc(a.name)}</h2>
      <div class="pf-meta"><span>${statusLabel(a)}</span>${has(a.activeYears) ? `<span>${esc(a.activeYears)}</span>` : ''}${has(a.hometown) ? `<span>${esc(a.hometown)}</span>` : ''}</div>
      <p class="pf-lede">${has(a.biography) ? esc(a.biography.split('\n')[0]) : 'Archive information currently unavailable.'}</p></div></header>`;
  }

  function renderComparison(a) {
    if (!has(a.costumePhoto)) return '';
    return section('Off stage and on stage', `<div class="pf-vs"><figure>${imgTag(photoOf(a), a.name + ' today', 'loading="lazy"')}<figcaption>Today</figcaption></figure>
      <span class="pf-vs-mid">as</span><figure>${imgTag(a.costumePhoto, a.name + ' in costume as ' + (a.primaryRole || 'a character'), 'loading="lazy"')}<figcaption>On the Ramlila stage${has(a.primaryRole) ? ', as ' + esc(a.primaryRole) : ''}</figcaption></figure></div>`);
  }

  function renderGallery(a) {
    const items = galleryOf(a);
    if (!items.length) return '';
    return section('Performance gallery', `<div class="pf-gallery">${items.map((g, i) => `<button class="gl-item" data-lb-open="${i}" aria-label="Open photograph ${i + 1}">${imgTag(g.src, g.caption || `${a.name} performing`, 'loading="lazy"')}${(g.caption || g.year) ? `<span>${esc([g.caption, g.year].filter(has).join(', '))}</span>` : ''}</button>`).join('')}</div>`);
  }

  function renderVideos(a) {
    const vids = clean(a.videos).filter(v => (v.type || 'youtube') === 'youtube' && has(v.id));
    if (!vids.length) return '';
    return section('Watch the character come alive', `<div class="pf-videos">${vids.map(v => `<figure class="vid ${v.format === 'short' ? 'short' : ''}">
      <div class="vid-frame">${imgTag('https://img.youtube.com/vi/' + encodeURIComponent(v.id) + '/hqdefault.jpg', v.title || 'Video', 'loading="lazy"')}
      <button class="vid-play" data-video="${esc(v.id)}" aria-label="Play video: ${esc(v.title || 'performance clip')}"></button></div>
      <figcaption>${esc([v.title, v.year].filter(has).join(', '))}</figcaption></figure>`).join('')}</div>`);
  }

  function renderRoleHistory(a) {
    const rows = a.roleHistory.filter(r => has(r.year) || has(r.character));
    if (!rows.length) return a.status === 'historical' ? section('Role history', '<p class="pf-unavail">Archive information currently unavailable.</p>') : '';
    return section('Role history', `<ol class="tl">${rows.map(r => `<li><div class="tl-year">${esc(r.year || '')}</div><div class="tl-char">${esc(r.character || '')}</div>${has(r.description) ? `<p>${esc(r.description)}</p>` : ''}</li>`).join('')}</ol>`);
  }

  function renderCharactersPortrayed(a) {
    const chars = charactersOf(a);
    return chars.length ? section('Characters portrayed', `<div class="cp-charstrip">${renderCharacters(chars)}</div>`) : '';
  }

  function renderBiography(a) {
    const paras = has(a.biography) ? a.biography.split('\n').filter(has).map(p => `<p>${esc(p)}</p>`).join('') : '';
    const facts = [['Current involvement', a.currentStatus], ['Active years', a.activeYears], ['Hometown', a.hometown], ['Experience', a.experience]].filter(f => has(f[1]));
    if (!paras && !facts.length) return '';
    return section('Biography', `<div class="pf-bio"><div>${paras || '<p class="pf-unavail">Information not available.</p>'}</div>${facts.length ? `<dl>${facts.map(f => `<dt>${f[0]}</dt><dd>${esc(f[1])}</dd>`).join('')}</dl>` : ''}</div>`);
  }

  function renderContact(a) {
    const c = a.contact || {}, links = [];
    const url = (v, base) => /^https?:/i.test(v) ? v : base + v.replace(/^@/, '');
    if (has(c.instagram)) links.push(['Instagram', url(c.instagram, 'https://instagram.com/')]);
    if (has(c.facebook)) links.push(['Facebook', url(c.facebook, 'https://facebook.com/')]);
    if (has(c.youtube)) links.push(['YouTube', url(c.youtube, 'https://youtube.com/@')]);
    if (has(c.email)) links.push(['Email', 'mailto:' + c.email]);
    if (has(c.phone)) links.push(['Phone', 'tel:' + c.phone.replace(/[^\d+]/g, '')]);
    return links.length ? section('Contact and social', `<div class="pf-links">${links.map(l => `<a href="${esc(l[1])}" target="_blank" rel="noopener">${l[0]}</a>`).join('')}</div>`) : '';
  }

  function renderArchiveNotes(a) {
    const awards = clean(a.awards);
    if (!has(a.notes) && !awards.length) return '';
    return section('Archive notes', `${has(a.notes) ? `<p class="pf-note">${esc(a.notes)}</p>` : ''}${awards.length ? `<ul class="pf-awards">${awards.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}`);
  }

  function renderRelatedArtists(a) {
    const mine = charactersOf(a);
    const related = cast.filter(o => o.id !== a.id).map(o => ({ o, n: charactersOf(o).filter(c => mine.includes(c)).length })).filter(x => x.n).sort((x, y) => y.n - x.n).slice(0, 8);
    if (!related.length) return '';
    return section('Artists who have portrayed the same character', `<div class="pf-related">${related.map(({ o }) => `<button class="rel" data-artist="${esc(o.slug)}">${imgTag(photoOf(o), o.name, 'loading="lazy"')}<b>${esc(o.name)}</b><small>${esc(o.primaryRole)}</small></button>`).join('')}</div>`);
  }

  function renderOtherCharacters(a) {
    const mine = charactersOf(a);
    const others = unique(cast.flatMap(charactersOf)).filter(c => !mine.includes(c));
    return others.length ? section('Explore other characters', `<div class="cp-charstrip">${renderCharacters(others)}</div>`) : '';
  }

  /* ---------- Modal ---------- */
  let lastFocus = null, tlObserver = null, lbState = { items: [], i: 0 };
  const modal = () => $('cpModal');

  function openArtistProfile(slug, updateUrl = true) {
    const a = cast.find(x => x.slug === slug);
    if (!a) return;
    const first = modal().hidden;
    if (first) lastFocus = document.activeElement;
    lbState = { items: galleryOf(a), i: 0, name: a.name };
    $('cpProfile').innerHTML = `<article class="pf">${renderArtistInfo(a)}${renderCharactersPortrayed(a)}${renderComparison(a)}${renderGallery(a)}${renderVideos(a)}${renderRoleHistory(a)}${renderBiography(a)}${renderContact(a)}${renderArchiveNotes(a)}${renderRelatedArtists(a)}${renderOtherCharacters(a)}</article>`;
    modal().hidden = false;
    document.body.style.overflow = 'hidden';
    const sheet = modal().querySelector('.cp-sheet');
    sheet.scrollTop = 0;
    sheet.focus({ preventScroll: true });
    if (updateUrl) history.replaceState(null, '', '?artist=' + a.slug);
    observeTimeline(sheet);
  }

  function observeTimeline(root) {
    if (tlObserver) tlObserver.disconnect();
    const items = root.querySelectorAll('.tl li');
    if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('in')); return; }
    tlObserver = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); tlObserver.unobserve(e.target); } }), { root, threshold: 0.2 });
    items.forEach(i => tlObserver.observe(i));
  }

  function closeModal(keepUrl) {
    if (modal().hidden) return;
    modal().hidden = true;
    $('cpProfile').innerHTML = '';
    document.body.style.overflow = '';
    if (!keepUrl) history.replaceState(null, '', location.pathname);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- Lightbox ---------- */
  function showLightbox(i) {
    const n = lbState.items.length;
    lbState.i = (i + n) % n;
    const g = lbState.items[lbState.i];
    $('cpLbImg').src = g.src;
    $('cpLbImg').alt = g.caption || `${lbState.name} performing`;
    $('cpLbCap').textContent = [g.caption, g.year].filter(has).join(', ');
    $('cpLightbox').hidden = false;
  }
  const closeLightbox = () => { $('cpLightbox').hidden = true; };

  /* ---------- Events ---------- */
  function bindEvents() {
    const root = document.querySelector('.cast-page');
    root.addEventListener('click', e => {
      const t = e.target.closest('[data-artist],[data-char],[data-close],[data-lb-open],[data-lb],[data-video],[data-mode]');
      if (!t) return;
      if (t.dataset.artist) openArtistProfile(t.dataset.artist);
      else if (t.dataset.char) searchByCharacter(t.dataset.char);
      else if (t.hasAttribute('data-close')) closeModal();
      else if (t.dataset.lbOpen != null) showLightbox(+t.dataset.lbOpen);
      else if (t.dataset.lb) { t.dataset.lb === 'close' ? closeLightbox() : showLightbox(lbState.i + (t.dataset.lb === 'next' ? 1 : -1)); }
      else if (t.dataset.video) {
        const frame = t.parentElement; // lazy: iframe is only created on click
        frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(t.dataset.video)}?autoplay=1&rel=0" title="Performance video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      } else if (t.dataset.mode) { setMode(t.dataset.mode); runSearch(); }
    });
    $('cpQuery').addEventListener('input', e => { state.query = e.target.value; runSearch(); });
    $('cpForm').addEventListener('submit', e => e.preventDefault());
    $('cpClear').addEventListener('click', () => { state.query = ''; $('cpQuery').value = ''; setMode('all'); runSearch(); history.replaceState(null, '', location.pathname); $('cpQuery').focus(); });
    $('cpBurger').addEventListener('click', () => {
      const open = $('cpLinks').classList.toggle('open');
      $('cpBurger').setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', e => {
      if (!$('cpLightbox').hidden) {
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') showLightbox(lbState.i + 1);
        else if (e.key === 'ArrowLeft') showLightbox(lbState.i - 1);
        return;
      }
      if (modal().hidden) return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'Tab') { // keep focus inside the drawer
        const f = [...modal().querySelectorAll('button,a[href],iframe')].filter(x => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- URL support: ?artist=slug  or  ?character=ram ---------- */
  function applyUrlParams() {
    const p = new URLSearchParams(location.search);
    const character = p.get('character'), artist = p.get('artist');
    if (character) {
      const key = slugify(character);
      const match = unique(cast.flatMap(charactersOf)).find(c => slugify(c) === key) || character;
      state.query = match; $('cpQuery').value = match; setMode('characters'); runSearch();
    }
    if (artist) openArtistProfile(slugify(artist), false);
  }

  function init() {
    $('cpHeroBg').style.backgroundImage = `url("${HERO_IMAGE}")`;
    renderCharStrip();
    bindEvents();
    runSearch();
    applyUrlParams();
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();