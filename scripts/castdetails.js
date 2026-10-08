/* Add cast members as objects in castData; optional image, role, year and description values may be null. */
(() => {
  'use strict';

  const castData = [
    {
      name: 'Kuljit Mahil',
      characters: ['भगवान श्रीराम', 'Shri Ram', 'Ram'],
      role: 'भगवान श्रीराम',
      image: '../assets/Cast%20Images/kuljit_mahal.jpeg',
      since: 'Portraying Since 2023',
      description: 'Mahil Gaila Ramlila ki cast listing mein Bhagwan Shri Ram ki bhoomika ke liye darj hain. Is bhoomika ki shuruaat 2023 se darj hai.'
    },
    {
      name: 'Harsh Jha',
      characters: ['लक्ष्मण', 'Lakshman'],
      role: 'लक्ष्मण',
      image: '../assets/Cast%20Images/harsh_jha.png',
      since: 'Portraying Since 2023',
      description: 'Mahil Gaila Ramlila ki cast listing mein Lakshman ki bhoomika ke liye darj hain. Is bhoomika ki shuruaat 2023 se darj hai.'
    },
    {
      name: 'Jivanlal',
      characters: ['हनुमान जी', 'Hanuman', 'Bajrangbali'],
      role: 'हनुमान जी',
      image: '../assets/Cast%20Images/jivan_lal.jpeg',
      since: 'Portraying Since 2024',
      description: 'Mahil Gaila Ramlila ki cast listing mein Hanuman ji ki bhoomika ke liye darj hain. Is bhoomika ki shuruaat 2024 se darj hai.'
    },
    {
      name: 'Gaurav Kaushal',
      characters: ['रावण', 'Ravan', 'Raavan'],
      role: 'रावण',
      image: '../assets/Cast%20Images/gaurav_kaushal.png',
      since: 'Portraying Since 2022',
      description: 'Mahil Gaila Ramlila ki cast listing mein Ravan ki bhoomika ke liye darj hain. Is bhoomika ki shuruaat 2022 se darj hai.'
    },
    {
      name: 'Mangat Pabla',
      characters: ['कुंभकर्ण', 'Kumbhkaran', 'Kumbhakarna'],
      role: 'कुंभकर्ण',
      image: '../assets/Cast%20Images/manga_pabla.jpeg',
      since: 'Portraying Since 2024',
      description: 'Mahil Gaila Ramlila ki cast listing mein Kumbhkaran ki bhoomika ke liye darj hain. Is bhoomika ki shuruaat 2024 se darj hai.'
    },
    {
      name: 'Surjit Jassi',
      characters: ['मेघनाद', 'Meghnaad', 'Meghnad', 'Indrajit'],
      role: 'मेघनाद',
      image: '../assets/Cast%20Images/sheeta_jassi.jpeg',
      since: 'Portraying Since 2024',
      description: 'Mahil Gaila Ramlila ki cast listing mein Meghnaad ki bhoomika ke liye darj hain. Is bhoomika ki shuruaat 2024 se darj hai.'
    },
    {
      name: 'Karan',
      characters: ['हनुमान जी', 'Hanuman', 'Bajrangbali'],
      role: 'हनुमान जी',
      image: '../assets/Cast%20Images/karan.jpeg',
      since: 'For 4 years',
      description: 'Mahil Gaila ki cast listing mein Hanuman ji ki bhoomika ke liye darj hain; listing mein is role ke liye chaar saal ka anubhav bataya gaya hai.'
    },
    {
      name: 'Aman',
      characters: ['विभिन्न पात्र', 'Various characters'],
      role: 'विभिन्न पात्र',
      image: '../assets/Cast%20Images/amandeep_shippi.jpeg',
      since: 'Since 2016',
      description: 'Mahil Gaila Ramlila ki cast listing mein vibhinn patro ke liye darj hain. Website par unka naam 2016 ke saath diya gaya hai.'
    }
  ];

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

  const escapeHtml = value => String(value == null ? '' : value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);

  const normalize = value => String(value == null ? '' : value)
    .normalize('NFC')
    .toLocaleLowerCase()
    .trim();

  const normalizedCast = castData.map(artist => ({
    ...artist,
    image: artist.image || null,
    description: artist.description || '',
    characters: Array.isArray(artist.characters) ? artist.characters : [],
    searchText: normalize([
      artist.name,
      ...(Array.isArray(artist.characters) ? artist.characters : []),
      artist.role
    ].filter(Boolean).join(' ')),
    searchableYears: (String(artist.since || '').match(/\d{4}/g) || []).join(' ')
  }));

  let matchingArtists = normalizedCast;
  let visibleCount = 0;
  let loadObserver;

  function cardMarkup(artist, index) {
    const description = Array.from(artist.description);
    const canExpand = description.length > 40;
    const preview = description.slice(0, 40).join('');
    const initials = artist.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => Array.from(part)[0] || '')
      .join('');
    return `
      <li class="cast-card" style="animation-delay:${Math.min(index % PAGE_SIZE, 5) * 55}ms">
        <figure class="cast-card-photo${artist.image ? '' : ' no-photo'}">
          ${artist.image ? `<img src="${escapeHtml(artist.image)}" alt="${escapeHtml(`${artist.name} as ${artist.role || 'Ramlila artist'}`)}"
            loading="lazy" decoding="async">` : ''}
          <span class="cast-avatar-fallback" aria-hidden="true">${escapeHtml(initials)}</span>
        </figure>
        <div class="cast-card-content">
          <span class="cast-card-index">Mahil Gaila Ramlila</span>
          <h3>${escapeHtml(artist.name)}</h3>
          ${artist.role ? `<span class="cast-card-role"><i class="fa-solid fa-star" aria-hidden="true"></i>${escapeHtml(artist.role)}</span>` : ''}
          ${artist.since ? `<p class="cast-card-years"><i class="fa-regular fa-calendar" aria-hidden="true"></i>${escapeHtml(artist.since)}</p>` : ''}
          ${description.length ? `<p class="cast-card-description">${escapeHtml(canExpand ? `${preview}…` : preview)}</p>` : ''}
          ${canExpand ? `<button class="description-toggle" type="button" data-full-description="${escapeHtml(description.join(''))}" aria-expanded="false">Read more</button>` : ''}
        </div>
      </li>`;
  }

  function updateLoadMore() {
    const remaining = Math.max(0, matchingArtists.length - visibleCount);
    loadMore.hidden = remaining === 0;
    loadStatus.textContent = remaining
      ? `और ${remaining} कलाकार${remaining === 1 ? '' : ''} बाकी`
      : '';
  }

  function renderInitialBatch() {
    visibleCount = Math.min(PAGE_SIZE, matchingArtists.length);
    results.innerHTML = matchingArtists.length
      ? matchingArtists.slice(0, visibleCount).map(cardMarkup).join('')
      : `<li class="cast-empty">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <h3>कोई कलाकार नहीं मिला</h3>
          <p>नाम, पात्र या वर्ष बदलकर फिर से खोजें।</p>
        </li>`;
    resultCount.textContent = `${matchingArtists.length} कलाकार`;
    clearSearch.hidden = !searchInput.value;
    updateLoadMore();
  }

  function getMatches(query) {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    return normalizedCast.filter(artist => {
      return tokens.every(token =>
        artist.searchText.includes(token) || artist.searchableYears.includes(token)
      );
    });
  }

  function runSearch() {
    matchingArtists = getMatches(searchInput.value);
    renderInitialBatch();
  }

  function appendNextBatch() {
    if (visibleCount >= matchingArtists.length) return;
    const nextCount = Math.min(visibleCount + PAGE_SIZE, matchingArtists.length);
    const nextCards = matchingArtists.slice(visibleCount, nextCount);
    results.insertAdjacentHTML('beforeend', nextCards.map(cardMarkup).join(''));
    visibleCount = nextCount;
    updateLoadMore();
  }

  results.addEventListener('error', event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    image.closest('.cast-card-photo')?.classList.add('no-photo');
    image.alt = '';
  }, true);

  searchInput.addEventListener('input', runSearch);
  document.getElementById('castSearchForm').addEventListener('submit', event => event.preventDefault());

  clearSearch.addEventListener('click', () => {
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
      : `${Array.from(button.dataset.fullDescription).slice(0, 40).join('')}…`;
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'Read less' : 'Read more';
  });

  loadMore.addEventListener('click', appendNextBatch);

  if ('IntersectionObserver' in window) {
    loadObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) appendNextBatch();
    }, { rootMargin: '280px 0px' });
    loadObserver.observe(sentinel);
  } else {
    loadMore.textContent = 'और कलाकार देखें';
  }

  const savedTheme = localStorage.getItem('mgd-theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  themeIcon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  themeToggle.setAttribute('aria-label', savedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('mgd-theme', nextTheme);
    themeIcon.className = nextTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('show');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mobileNav.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    mobileNav.classList.remove('show');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  });

  totalCount.textContent = normalizedCast.length;
  runSearch();
})();
