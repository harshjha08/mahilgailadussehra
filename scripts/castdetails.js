
(() => {
  'use strict';

  const API_URL =
    'https://script.google.com/macros/s/AKfycbwezkvR7PfGvTCV28g8PITMDkmWcR8MqlHapFRBKrTom0HYxQgGEibhg9oaohZz2OTClg/exec';

  const PAGE_SIZE = 6;
  const DESCRIPTION_PREVIEW_LENGTH = 40;
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
  const imageViewer = document.getElementById('castImageViewer');
  const imageViewerImage = document.getElementById('castImageViewerImage');
  const imageViewerTitle = document.getElementById('castImageViewerTitle');
  const imageViewerRole = document.getElementById('castImageViewerRole');
  const imageViewerClose = document.getElementById('castImageViewerClose');
  let imageViewerTrigger = null;
  let imageViewerCloseTimer = null;

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

  function getText(value) {
    if (typeof value !== 'string' && typeof value !== 'number') return '';
    return String(value).trim();
  }

  function firstText(...values) {
    return values.map(getText).find(Boolean) || '';
  }

  function getPhotoUrl(url) {
    const value = getText(url);
    if (!value) return '';

    try {
      const parsed = new URL(value, document.baseURI);

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

  function getSocialProfile(value) {
    const profile = getText(value);
    if (!profile) return null;

    try {
      const url = new URL(profile);
      if (!['http:', 'https:'].includes(url.protocol)) return null;

      const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
      if (hostname === 'facebook.com' || hostname.endsWith('.facebook.com')) {
        return { url: url.href, label: 'Facebook', icon: 'fa-facebook' };
      }
      if (hostname === 'instagram.com' || hostname.endsWith('.instagram.com')) {
        return { url: url.href, label: 'Instagram', icon: 'fa-instagram' };
      }
      if (hostname === 'snapchat.com' || hostname.endsWith('.snapchat.com')) {
        return { url: url.href, label: 'Snapchat', icon: 'fa-snapchat' };
      }
    } catch (error) {
      return null;
    }

    return null;
  }

  function normalizeArtist(record) {
    const source = record && typeof record === 'object' ? record : {};
    const roles = firstText(source.roles, source.role, source.character);
    const activeYears = firstText(source.activeYears, source.since);
    const duration = getText(source.duration);
    const nickname = getText(source.nickname);
    const memories = firstText(source.description, source.memories);
    const description = [
      nickname ? `Also known as: ${nickname}` : '',
      memories
    ].filter(Boolean).join('\n\n');

    return {
      name: getText(source.name),
      role: roles,
      image: getPhotoUrl(firstText(source.photo, source.image)),
      since: [activeYears, duration].filter(Boolean).join(' · '),
      description,
      socialProfile: getSocialProfile(source.socialProfile)
    };
  }

  let normalizedCast = [];
  let matchingArtists = [];
  let visibleCount = 0;

  function cardMarkup(artist, index) {
    const description = artist.description;
    const descriptionCharacters = Array.from(description);
    const canExpand = descriptionCharacters.length > DESCRIPTION_PREVIEW_LENGTH;
    const preview = descriptionCharacters
      .slice(0, DESCRIPTION_PREVIEW_LENGTH)
      .join('');

    const initials = artist.name
      .split(/\s+/)
      .slice(0, 2)
      .map(part => Array.from(part)[0] || '')
      .join('');

    const image = artist.image
      ? `<button class="cast-photo-trigger" type="button"
          aria-label="View full photo of ${escapeHtml(artist.name)}">
          <img src="${escapeHtml(artist.image)}"
          alt="${escapeHtml(artist.name)}"
          loading="lazy" decoding="async">
        </button>`
      : '';

    const social = artist.socialProfile
      ? `<a class="cast-social-link"
          href="${escapeHtml(artist.socialProfile.url)}"
          target="_blank" rel="noopener noreferrer"
          aria-label="${artist.socialProfile.label} profile for ${escapeHtml(artist.name)}">
          <i class="fa-brands ${artist.socialProfile.icon}" aria-hidden="true"></i>
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
          <span class="cast-card-index">${artist.featured ? 'वर्तमान मुख्य भूमिका' : 'अन्य भूमिकाएँ'}</span>
          <h3>${escapeHtml(artist.name)}</h3>

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
            <div class="cast-story-heading">
              <i class="fa-solid fa-book-open" aria-hidden="true"></i>
              <span>मंच से जुड़ा सफ़र</span>
            </div>
            <p class="cast-card-description">
              ${escapeHtml(canExpand ? preview + '…' : description)}
            </p>` : ''}

          ${canExpand ? `
            <button class="description-toggle"
              type="button"
              data-full-description="${escapeHtml(description)}"
              aria-expanded="false">Read More</button>` : ''}

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

  function getArtistKey(name) {
    return normalize(name)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ');
  }

  async function loadFeaturedArtists() {
    const indexUrl = new URL('../index.html', document.baseURI);
    const response = await fetch(indexUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Featured cast request failed: ${response.status}`);
    }

    const html = await response.text();
    const indexDocument = new DOMParser().parseFromString(html, 'text/html');

    return Array.from(indexDocument.querySelectorAll('#cast .cast-card'))
      .map(card => {
        const image = card.querySelector('.cast-card-img');
        const social = card.querySelector('.cast-insta');

        return {
          name: card.querySelector('.cast-card-name')?.textContent,
          role: card.querySelector('.cast-card-role')?.textContent,
          photo: image?.getAttribute('src')
            ? new URL(image.getAttribute('src'), indexUrl).href
            : '',
          since: card.querySelector('.cast-card-since')?.textContent,
          description: card.querySelector('.cast-card-description')?.textContent,
          socialProfile: social?.getAttribute('href')
            ? new URL(social.getAttribute('href'), indexUrl).href
            : ''
        };
      })
      .filter(record => getText(record.name))
      .map(record => ({
        ...normalizeArtist(record),
        featured: true
      }));
  }

  async function loadApiArtists() {
    const response = await fetch(API_URL, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error(data.error || 'Unexpected API response');
    }

    return data.filter(record => record && getText(record.name));
  }

  function mergeArtists(featuredArtists, apiRecords) {
    const artistsByName = new Map(
      featuredArtists.map(artist => [getArtistKey(artist.name), artist])
    );

    apiRecords
      .filter(record => record && getText(record.name))
      .map(normalizeArtist)
      .forEach(apiArtist => {
        const key = getArtistKey(apiArtist.name);
        const featuredArtist = artistsByName.get(key);

        if (!featuredArtist) {
          artistsByName.set(key, apiArtist);
          return;
        }

        artistsByName.set(key, {
          ...apiArtist,
          featured: true,
          name: featuredArtist.name,
          role: featuredArtist.role || apiArtist.role,
          image: featuredArtist.image || apiArtist.image,
          since: featuredArtist.since || apiArtist.since,
          description: [
            featuredArtist.description,
            apiArtist.description
          ].filter((description, index, descriptions) =>
            description && descriptions.indexOf(description) === index
          ).join('\n\n'),
          socialProfile: featuredArtist.socialProfile || apiArtist.socialProfile
        });
      });

    return Array.from(artistsByName.values());
  }

  async function loadArtists() {
    results.innerHTML = `
      <li class="cast-empty">
        <h3>Loading Content…</h3>
      </li>`;

    const [featuredResult, apiResult] = await Promise.allSettled([
      loadFeaturedArtists(),
      loadApiArtists()
    ]);

    const featuredArtists = featuredResult.status === 'fulfilled'
      ? featuredResult.value
      : [];
    const apiRecords = apiResult.status === 'fulfilled'
      ? apiResult.value
      : [];

    if (featuredResult.status === 'rejected') {
      console.error('Unable to load featured artists from index.html:', featuredResult.reason);
    }
    if (apiResult.status === 'rejected') {
      console.error('Unable to load artist directory from API:', apiResult.reason);
    }

    normalizedCast = mergeArtists(featuredArtists, apiRecords);
    matchingArtists = getMatches(searchInput.value);

    if (totalCount) totalCount.textContent = normalizedCast.length;
    renderInitialBatch();

    if (featuredResult.status === 'rejected' && apiResult.status === 'rejected') {
      results.innerHTML = `
        <li class="cast-empty">
          <h3>Could not fetch artist data</h3>
          <p>Please check your internet connection and try again.</p>
          <button type="button" id="retryCastLoad">Try Again</button>
        </li>`;
      if (totalCount) totalCount.textContent = '0';
      if (resultCount) resultCount.textContent = '';
      if (loadMore) loadMore.hidden = true;
      document.getElementById('retryCastLoad')
        ?.addEventListener('click', loadArtists);
    } else if (apiResult.status === 'rejected' && loadStatus) {
      loadStatus.textContent = 'Could not load remaining artist data from API.';
    }
  }

  results.addEventListener('error', event => {
    const image = event.target;

    if (!(image instanceof HTMLImageElement)) return;

    image.closest('.cast-card-photo')?.classList.add('no-photo');
    image.alt = '';
  }, true);

  function closeImageViewer() {
    if (!imageViewer?.open || imageViewer.classList.contains('is-closing')) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      imageViewer.close();
      return;
    }

    imageViewer.classList.remove('is-visible');
    imageViewer.classList.add('is-closing');
    imageViewerCloseTimer = window.setTimeout(() => {
      imageViewer.close();
    }, 220);
  }

  results.addEventListener('click', event => {
    const trigger = event.target.closest('.cast-photo-trigger');
    if (!trigger || !results.contains(trigger) || !imageViewer?.showModal) return;

    const image = trigger.querySelector('img');
    if (!image || !image.src) return;

    const sourceRect = image.getBoundingClientRect();
    imageViewerTrigger = trigger;
    imageViewerImage.src = image.currentSrc || image.src;
    imageViewerImage.alt = image.alt;
    imageViewerTitle.textContent = trigger.closest('.cast-card')?.querySelector('h3')?.textContent || image.alt;
    imageViewerRole.textContent = trigger.closest('.cast-card')?.querySelector('.cast-card-role')?.textContent.trim() || '';

    imageViewer.showModal();
    imageViewer.classList.remove('is-closing');
    window.requestAnimationFrame(() => {
      imageViewer.classList.add('is-visible');

      if (!imageViewerImage.animate) return;

      const targetRect = imageViewerImage.getBoundingClientRect();
      if (!targetRect.width || !targetRect.height || !sourceRect.width || !sourceRect.height) return;

      const scaleX = sourceRect.width / targetRect.width;
      const scaleY = sourceRect.height / targetRect.height;

      imageViewerImage.animate([
        {
          opacity: 0.65,
          filter: 'blur(7px)',
          transform: `translate(${sourceRect.left - targetRect.left}px, ${sourceRect.top - targetRect.top}px) scale(${scaleX}, ${scaleY})`
        },
        { opacity: 1, filter: 'blur(0)', transform: 'none' }
      ], {
        duration: 720,
        easing: 'cubic-bezier(.16, 1, .3, 1)'
      });
    });
  });

  imageViewerClose?.addEventListener('click', closeImageViewer);

  imageViewer?.addEventListener('click', event => {
    if (event.target === imageViewer) closeImageViewer();
  });

  imageViewer?.addEventListener('cancel', event => {
    event.preventDefault();
    closeImageViewer();
  });

  imageViewer?.addEventListener('close', () => {
    window.clearTimeout(imageViewerCloseTimer);
    imageViewer.classList.remove('is-visible', 'is-closing');
    imageViewerImage.removeAttribute('src');
    imageViewerTrigger?.focus();
    imageViewerTrigger = null;
  });

  searchInput?.addEventListener('input', runSearch);

  document.getElementById('castSearchForm')
    ?.addEventListener('submit', event => event.preventDefault());

  clearSearch?.addEventListener('click', () => {
    searchInput.value = '';
    runSearch();
    searchInput.focus();
  });

  const cardHeightTransitions = new WeakMap();

  function updateDescription(button, expanded) {
    const description = button.previousElementSibling;
    const fullDescription = button.dataset.fullDescription;
    const card = button.closest('.cast-card');

    const update = () => {
      description.textContent = expanded
        ? fullDescription
        : Array.from(fullDescription).slice(0, DESCRIPTION_PREVIEW_LENGTH).join('') + '…';
      card?.classList.toggle('is-expanded', expanded);
      button.setAttribute('aria-expanded', String(expanded));
      button.textContent = expanded ? 'Less' : 'Read More';
    };

    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      update();
      return;
    }

    const startHeight = card.getBoundingClientRect().height;
    cardHeightTransitions.get(card)?.cleanup();
    card.style.transition = 'none';
    card.style.height = `${startHeight}px`;
    update();

    card.style.height = '';
    const targetHeight = card.getBoundingClientRect().height;
    card.style.height = `${startHeight}px`;
    card.offsetHeight;

    card.style.transition = '';
    card.offsetHeight;

    if (Math.abs(startHeight - targetHeight) < 1) {
      card.style.height = '';
      return;
    }

    const finishTransition = event => {
      if (event && (event.target !== card || event.propertyName !== 'height')) return;
      const transition = cardHeightTransitions.get(card);
      if (!transition) return;
      window.clearTimeout(transition.timeout);
      card.removeEventListener('transitionend', transition.onTransitionEnd);
      card.style.height = '';
      cardHeightTransitions.delete(card);
    };
    const onTransitionEnd = event => finishTransition(event);
    const timeout = window.setTimeout(() => finishTransition(), 400);

    cardHeightTransitions.set(card, {
      timeout,
      onTransitionEnd,
      cleanup: () => finishTransition()
    });
    card.addEventListener('transitionend', onTransitionEnd);
    card.style.height = `${targetHeight}px`;
  }

  results.addEventListener('click', event => {
    const button = event.target.closest('.description-toggle');
    if (!button) return;

    const expanded = button.getAttribute('aria-expanded') !== 'true';

    if (expanded) {
      results.querySelectorAll('.description-toggle[aria-expanded="true"]')
        .forEach(openButton => {
          if (openButton === button) return;
          updateDescription(openButton, false);
        });
    }

    updateDescription(button, expanded);
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