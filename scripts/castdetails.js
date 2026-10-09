
(() => {
  'use strict';

  const API_URL =
    'https://script.google.com/macros/s/AKfycbwezkvR7PfGvTCV28g8PITMDkmWcR8MqlHapFRBKrTom0HYxQgGEibhg9oaohZz2OTClg/exec';

  const PAGE_SIZE = 6;
  const root = document.documentElement;

  const searchInput = document.getElementById('castSearch');
  const clearSearch = document.getElementById('clearSearch');
  const results = document.getElementById('castResults');
  const resultCount = document.getElementById('resultsCount');
  const totalCount = document.getElementById('castTotal');
  const loadMore = document.getElementById('loadMore');
  const loadStatus = document.getElementById('loadMoreStatus');
  const sentinel = document.getElementById('loadSentinel');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  const escapeHtml = value =>
    String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);

  const normalize = value =>
    String(value ?? '').normalize('NFC').toLocaleLowerCase().trim();

  
function getPhotoUrl(url) {
  if (!url) return '';

  const value = String(url).trim();

  try {
    const parsed = new URL(value);

    if (parsed.hostname === 'drive.google.com') {
      let id = parsed.searchParams.get('id');

      if (!id) {
        const match = parsed.pathname.match(/\/file\/d\/([^/]+)/);
        if (match) id = match[1];
      }

      if (id) {
        return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
      }
    }
  } catch (error) {
    console.warn('Invalid artist photo URL:', value);
  }

  return value;
}


  function normalizeArtist(record) {
    const roles = String(record.roles || '').trim();
    const activeYears = String(record.activeYears || '').trim();
    const duration = String(record.duration || '').trim();

    return {
      name: String(record.name || '').trim(),
      nickname: String(record.nickname || '').trim(),
      role: roles,
      image: getPhotoUrl(record.photo),
      since: [activeYears, duration].filter(Boolean).join(' · '),
      description: String(record.memories || '').trim(),
      socialProfile: String(record.socialProfile || '').trim()
    };
  }

  let normalizedCast = [];
  let matchingArtists = [];
  let visibleCount = 0;

  function cardMarkup(artist, index) {
    const description = artist.description;
    const canExpand = Array.from(description).length > 120;
    const preview = Array.from(description).slice(0, 120).join('');

    const initials = artist.name
      .split(/\s+/)
      .slice(0, 2)
      .map(part => Array.from(part)[0] || '')
      .join('');

    const image = artist.image
      ? `<img src="${escapeHtml(artist.image)}"
          alt="${escapeHtml(artist.name)}"
          loading="lazy" decoding="async">`
      : '';

    const social = artist.socialProfile
      ? `<a class="cast-social-link"
          href="${escapeHtml(
            /^https?:\/\//i.test(artist.socialProfile)
              ? artist.socialProfile
              : 'https://www.instagram.com/' +
                artist.socialProfile.replace(/^@/, '')
          )}"
          target="_blank" rel="noopener noreferrer">
          Social profile ↗
        </a>`
      : '';

    return `
      <li class="cast-card"
          style="animation-delay:${Math.min(index % PAGE_SIZE, 5) * 55}ms">

        <figure class="cast-card-photo${artist.image ? '' : ' no-photo'}">
          ${image}
          <span class="cast-avatar-fallback" aria-hidden="true">
            ${escapeHtml(initials || '?')}
          </span>
        </figure>

        <div class="cast-card-content">
          <span class="cast-card-index">Mahil Gaila Ramlila</span>
          <h3>${escapeHtml(artist.name)}</h3>

          ${artist.nickname ? `
            <p class="cast-card-years">
              Known as: ${escapeHtml(artist.nickname)}
            </p>` : ''}

          ${artist.role ? `
            <span class="cast-card-role">
              <i class="fa-solid fa-star" aria-hidden="true"></i>
              ${escapeHtml(artist.role)}
            </span>` : ''}

          ${artist.since ? `
            <p class="cast-card-years">
              <i class="fa-regular fa-calendar" aria-hidden="true"></i>
              ${escapeHtml(artist.since)}
            </p>` : ''}

          ${description ? `
            <p class="cast-card-description">
              ${escapeHtml(canExpand ? preview + '…' : description)}
            </p>` : ''}

          ${canExpand ? `
            <button class="description-toggle"
              type="button"
              data-full-description="${escapeHtml(description)}"
              aria-expanded="false">Read more</button>` : ''}

          ${social}
        </div>
      </li>`;
  }

  function updateLoadMore() {
    const remaining = Math.max(0, matchingArtists.length - visibleCount);

    if (loadMore) loadMore.hidden = remaining === 0;

    if (loadStatus) {
      loadStatus.textContent = remaining
        ? `और ${remaining} कलाकार बाकी`
        : '';
    }
  }

  function renderInitialBatch() {
    visibleCount = Math.min(PAGE_SIZE, matchingArtists.length);

    results.innerHTML = matchingArtists.length
      ? matchingArtists.slice(0, visibleCount).map(cardMarkup).join('')
      : `<li class="cast-empty">
          <i class="fa-solid fa-masks-theater" aria-hidden="true"></i>
          <h3>अभी कोई कलाकार उपलब्ध नहीं है</h3>
          <p>कलाकारों का विवरण जमा होने और सार्वजनिक अनुमति मिलने पर यहाँ दिखाई देगा।</p>
        </li>`;

    if (resultCount) {
      resultCount.textContent = `${matchingArtists.length} कलाकार`;
    }

    if (clearSearch) clearSearch.hidden = !searchInput.value;

    updateLoadMore();
  }

  function getMatches(query) {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);

    return normalizedCast.filter(artist => {
      const searchable = normalize([
        artist.name,
        artist.nickname,
        artist.role,
        artist.since,
        artist.description
      ].join(' '));

      return tokens.every(token => searchable.includes(token));
    });
  }

  function runSearch() {
    matchingArtists = getMatches(searchInput.value);
    renderInitialBatch();
  }

  function appendNextBatch() {
    if (visibleCount >= matchingArtists.length) return;

    const nextCount = Math.min(
      visibleCount + PAGE_SIZE,
      matchingArtists.length
    );

    results.insertAdjacentHTML(
      'beforeend',
      matchingArtists
        .slice(visibleCount, nextCount)
        .map(cardMarkup)
        .join('')
    );

    visibleCount = nextCount;
    updateLoadMore();
  }

  async function loadArtists() {
    results.innerHTML = `
      <li class="cast-empty">
        <h3>कलाकारों का विवरण लोड हो रहा है…</h3>
      </li>`;

    try {
      const response = await fetch(API_URL, { cache: 'no-store' });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(data.error || 'Unexpected API response');
      }

      normalizedCast = data
        .filter(record => record && String(record.name || '').trim())
        .map(normalizeArtist);

      matchingArtists = normalizedCast;

      if (totalCount) {
        totalCount.textContent = normalizedCast.length;
      }

      renderInitialBatch();
    } catch (error) {
      console.error('Unable to load artist directory:', error);

      results.innerHTML = `
        <li class="cast-empty">
          <h3>डेटा लोड नहीं हो पाया</h3>
          <p>कृपया इंटरनेट कनेक्शन जाँचें और पेज दोबारा खोलें।</p>
          <button type="button" id="retryCastLoad">फिर से कोशिश करें</button>
        </li>`;

      if (totalCount) totalCount.textContent = '0';
      if (resultCount) resultCount.textContent = '';
      if (loadMore) loadMore.hidden = true;

      document.getElementById('retryCastLoad')
        ?.addEventListener('click', loadArtists);
    }
  }

  results.addEventListener('error', event => {
    const image = event.target;

    if (!(image instanceof HTMLImageElement)) return;

    image.closest('.cast-card-photo')?.classList.add('no-photo');
    image.alt = '';
  }, true);

  searchInput?.addEventListener('input', runSearch);

  document.getElementById('castSearchForm')
    ?.addEventListener('submit', event => event.preventDefault());

  clearSearch?.addEventListener('click', () => {
    searchInput.value = '';
    runSearch();
    searchInput.focus();
  });

  results.addEventListener('click', event => {
    const button = event.target.closest('.description-toggle');
    if (!button) return;

    const description = button.previousElementSibling;
    const expanded = button.getAttribute('aria-expanded') !== 'true';

    description.textContent = expanded
      ? button.dataset.fullDescription
      : Array.from(button.dataset.fullDescription).slice(0, 120).join('') + '…';

    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'Read less' : 'Read more';
  });

  loadMore?.addEventListener('click', appendNextBatch);

  if ('IntersectionObserver' in window && sentinel) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) appendNextBatch();
    }, { rootMargin: '280px 0px' });

    observer.observe(sentinel);
  }

  const savedTheme = localStorage.getItem('mgd-theme') || 'light';

  root.setAttribute('data-theme', savedTheme);

  if (themeIcon) {
    themeIcon.className = savedTheme === 'dark'
      ? 'fa-solid fa-sun'
      : 'fa-solid fa-moon';
  }

  themeToggle?.setAttribute(
    'aria-label',
    savedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  );

  themeToggle?.addEventListener('click', () => {
    const nextTheme =
      root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('mgd-theme', nextTheme);

    if (themeIcon) {
      themeIcon.className = nextTheme === 'dark'
        ? 'fa-solid fa-sun'
        : 'fa-solid fa-moon';
    }

    themeToggle.setAttribute(
      'aria-label',
      nextTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  });

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.toggle('show') || false;

    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mobileNav?.addEventListener('click', event => {
    if (!event.target.closest('a')) return;

    mobileNav.classList.remove('show');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.setAttribute('aria-label', 'Open menu');
  });

  loadArtists();
})();