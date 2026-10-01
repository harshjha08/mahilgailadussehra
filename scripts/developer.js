/* Developer identity page. Every visible fact comes from developerData below.
   REPLACE all demo values. Null a link / url / repository / image to hide it automatically. */
const developerData = {
  identity: {
    name: 'Harsh Jha', username: 'harshjha', handle: '@_harshjha08_', uid: 'HJ-DEV-001',
    title: 'Developer / Builder',
    tagline: 'Builds websites, digital archives and small systems that stay useful.',
    location: 'India', focus: 'Web experiences and cultural archives', availability: 'Open to select projects', status: 'Building',
    bio: 'Demo bio. Replace with a two-line statement of what you build and how.'
  },
  links: { // null = not rendered
    github: 'https://github.com/demo-harshjha', instagram: 'https://instagram.com/_harshjha08_',
    linkedin: 'https://linkedin.com/in/demo-harshjha', email: 'hello@example.com', website: null
  },
  stats: { yearsCoding: 4 }, // projects and technologies are counted automatically
  builds: [
    { code: 'WEB', title: 'Web experiences', text: 'Interactive sites and interfaces with a clear point of view.' },
    { code: 'CULTURE', title: 'Cultural archives', text: 'Digital records of local history, events and performers.' },
    { code: 'UTIL', title: 'Utility systems', text: 'Small, practical tools that solve one job well.' },
    { code: 'LAB', title: 'Experimental builds', text: 'Interface and technical experiments.' }
  ],
  // level: Core | Familiar | Exploring
  technologies: [
    { name: 'HTML', category: 'Frontend', level: 'Core', uses: ['Semantic page structure', 'Accessibility'], note: 'Demo note.' },
    { name: 'CSS', category: 'Frontend', level: 'Core', uses: ['Layout systems', 'Responsive design', 'Motion'], note: 'Demo note.' },
    { name: 'JavaScript', category: 'Frontend', level: 'Core', uses: ['Interaction', 'DOM systems', 'Search', 'Dynamic rendering', 'API integration'], note: 'Vanilla first; frameworks only when they earn their weight.' },
    { name: 'React', category: 'Frontend', level: 'Exploring', uses: ['Component experiments'], note: 'Demo note.' },
    { name: 'Git', category: 'Tools', level: 'Core', uses: ['Version control', 'Release history'], note: 'Demo note.' },
    { name: 'GitHub', category: 'Tools', level: 'Core', uses: ['Repositories', 'Project tracking'], note: 'Demo note.' },
    { name: 'VS Code', category: 'Tools', level: 'Core', uses: ['Daily editor'], note: 'Demo note.' },
    { name: 'Vercel', category: 'Platforms', level: 'Familiar', uses: ['Static hosting', 'Preview deployments'], note: 'Demo note.' },
    { name: 'Search Console', category: 'Platforms', level: 'Familiar', uses: ['Indexing', 'Search performance'], note: 'Demo note.' },
    { name: 'Formspree', category: 'Platforms', level: 'Familiar', uses: ['Contact forms on static sites'], note: 'Demo note.' },
    { name: 'Node.js', category: 'Backend', level: 'Familiar', uses: ['Scripts', 'Small APIs'], note: 'Demo note.' },
    { name: 'Firebase', category: 'Backend', level: 'Exploring', uses: ['Realtime data'], note: 'Demo note.' },
    { name: 'SQLite', category: 'Backend', level: 'Exploring', uses: ['Local data modelling'], note: 'Demo note.' },
    { name: 'Figma', category: 'Design', level: 'Familiar', uses: ['Layout planning'], note: 'Demo note.' },
    { name: 'Python', category: 'Backend', level: 'Familiar', uses: ['Data cleaning', 'Automation'], note: 'Demo note.' },
    { name: 'Google Fonts', category: 'Design', level: 'Familiar', uses: ['Type pairing'], note: 'Demo note.' }
  ],
  projects: [ // category: Web | Cultural | Utility | Experimental; status: Live | Building | Archived
    { title: 'Mahil Gaila Digital Archive', slug: 'mahil-gaila', category: 'Cultural', description: 'Demo: a searchable archive of a local Ramlila and Dussehra celebration.', year: '2026', status: 'Live', technologies: ['HTML', 'CSS', 'JavaScript', 'Vercel'], url: 'https://example.com/mahil-gaila', repository: null, image: 'https://picsum.photos/seed/dv1/600/450', featured: true },
    { title: 'Cast and Characters Archive', slug: 'cast-archive', category: 'Cultural', description: 'Demo: artist profiles linked to the characters they portray.', year: '2026', status: 'Live', technologies: ['HTML', 'CSS', 'JavaScript'], url: 'https://example.com/cast', repository: 'https://github.com/demo/cast', image: 'https://picsum.photos/seed/dv2/600/450', featured: true },
    { title: 'Local Events Calendar', slug: 'events', category: 'Web', description: 'Demo: a lightweight event listing for a neighbourhood.', year: '2025', status: 'Live', technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'], url: 'https://example.com/events', repository: null, image: 'https://picsum.photos/seed/dv3/600/450' },
    { title: 'Quick Invoice', slug: 'invoice', category: 'Utility', description: 'Demo: a single-page invoice generator.', year: '2025', status: 'Live', technologies: ['HTML', 'CSS', 'JavaScript'], url: 'https://example.com/invoice', repository: 'https://github.com/demo/invoice', image: null },
    { title: 'Contact Form Kit', slug: 'form-kit', category: 'Utility', description: 'Demo: drop-in contact form for static sites.', year: '2024', status: 'Live', technologies: ['HTML', 'JavaScript', 'Formspree'], url: null, repository: 'https://github.com/demo/form-kit', image: null },
    { title: 'Type Specimen Lab', slug: 'type-lab', category: 'Experimental', description: 'Demo: interactive typography experiments.', year: '2024', status: 'Archived', technologies: ['CSS', 'JavaScript', 'Google Fonts'], url: 'https://example.com/type', repository: null, image: 'https://picsum.photos/seed/dv6/600/450' },
    { title: 'Portfolio Redesign', slug: 'redesign', category: 'Web', description: 'Demo: a client site rebuilt for speed and search visibility.', year: '2024', status: 'Live', technologies: ['HTML', 'CSS', 'JavaScript', 'Search Console'], url: 'https://example.com/redesign', repository: null, image: 'https://picsum.photos/seed/dv7/600/450' },
    { title: 'Scroll Story Engine', slug: 'scroll', category: 'Experimental', description: 'Demo: a small engine for scroll-driven narratives.', year: '2025', status: 'Building', technologies: ['JavaScript', 'CSS', 'React'], url: null, repository: 'https://github.com/demo/scroll', image: null },
    { title: 'Data Cleaner', slug: 'cleaner', category: 'Utility', description: 'Demo: scripts that tidy archive spreadsheets into JSON.', year: '2025', status: 'Live', technologies: ['Python', 'Node.js', 'Git'], url: null, repository: 'https://github.com/demo/cleaner', image: null },
    { title: 'Heritage Map Prototype', slug: 'map', category: 'Experimental', description: 'Demo: a map of cultural sites with search.', year: '2026', status: 'Building', technologies: ['JavaScript', 'SQLite', 'Figma'], url: null, repository: null, image: null },
    { title: 'Community Notice Board', slug: 'notices', category: 'Web', description: 'Demo: a moderated notice board for a local group.', year: '2023', status: 'Archived', technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub'], url: 'https://example.com/notices', repository: null, image: 'https://picsum.photos/seed/dv11/600/450' }
  ],
  journey: [
    { date: '2022.03', commit: 'init/first-page', title: 'Started building', text: 'Demo: first static pages in HTML and CSS.' },
    { date: '2023.01', commit: 'feat/first-real-sites', title: 'First serious web projects', text: 'Demo: shipped the first sites for real users.' },
    { date: '2024.05', commit: 'feat/js-systems', title: 'Started building JavaScript systems', text: 'Demo: search, filtering and data-driven rendering.' },
    { date: '2025.02', commit: 'refactor/tooling', title: 'Adopted proper tooling', text: 'Demo: Git workflow, deployments, search indexing.' },
    { date: '2026.06', commit: 'launch/project-system', title: 'Project system launched', text: 'Demo: shared structure across all projects.' },
    { date: '2026.09', commit: 'build/cultural-archive', title: 'Building digital cultural archives', text: 'Demo: documenting local heritage online.' }
  ],
  principles: [
    { title: 'Build useful things.', text: 'If it does not help someone, it does not ship.' },
    { title: 'Design before decoration.', text: 'Structure and clarity come first; ornament follows.' },
    { title: 'Keep systems maintainable.', text: 'Data lives apart from markup so content can change without code changes.' },
    { title: 'Make information easy to find.', text: 'Search, links and structure over clever navigation.' },
    { title: 'Use technology where it improves the experience.', text: 'Plain HTML wins when it is enough.' }
  ],
  interests: ['Cultural preservation', 'Typography', 'Creative coding', 'Open web', 'Local history']
};

(function () {
  'use strict';
  const D = developerData, I = D.identity;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = v => v != null && String(v).trim() !== '';
  const norm = s => String(s == null ? '' : s).toLowerCase();
  const FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#1a1d21"/><path d="M0 0L400 300M400 0L0 300" stroke="#2c3036"/></svg>');
  const LEVEL = { Core: '■', Familiar: '◧', Exploring: '□' };
  const STATUS = { Live: '● Live', Building: '◐ Building', Archived: '○ Archived' };
  const CATS = ['All', 'Web', 'Cultural', 'Utility', 'Experimental'];
  const state = { filter: 'All', tech: null };
  const projectsOf = t => D.projects.filter(p => (p.technologies || []).includes(t));
  const linkList = () => [['GitHub', 'github', D.links.github], ['Instagram', 'instagram', D.links.instagram], ['LinkedIn', 'linkedin', D.links.linkedin],
    ['Email', 'email', has(D.links.email) ? 'mailto:' + D.links.email : null], ['Website', 'website', D.links.website]].filter(l => has(l[2]));

  document.addEventListener('error', e => { if (e.target.tagName === 'IMG' && e.target.src !== FALLBACK) { e.target.onerror = null; e.target.src = FALLBACK; } }, true);

  /* ---------- Render ---------- */
  function renderIdentity() {
    document.title = `${I.name} | Developer Profile`;
    $('dvNavStatus').textContent = I.availability;
    $('dvSigName').textContent = I.name;
    $('top').innerHTML = `<p class="dv-meta">SYSTEM / DEVELOPER PROFILE</p><h1 id="dvName">${esc(I.name)}</h1><p class="dv-tag">${esc(I.tagline)}</p>
      <div class="dv-uid"><span>UID <b>${esc(I.uid)}</b></span><span>STATUS <b>${esc(I.status)}</b></span><span>LOCATION <b>${esc(I.location)}</b></span><span>HANDLE <b>${esc(I.handle)}</b></span></div>`;
    const rows = [['Name', I.name], ['Username', I.username], ['Role', I.title], ['Based in', I.location], ['Current focus', I.focus], ['Availability', I.availability], ['Summary', I.bio]];
    $('dvSpec').innerHTML = rows.filter(r => has(r[1])).map(r => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join('');
  }
  function renderStats() { // doubles as the system manifest
    const s = D.stats || {};
    const rows = [['identity', 'loaded'], ['projects', D.projects.length], ['technologies', D.technologies.length], ['journey entries', D.journey.length], ['links', linkList().length + ' connected']];
    if (s.yearsCoding) rows.push(['years coding', s.yearsCoding]);
    $('dvManifest').innerHTML = `<h3>DEVELOPER_MANIFEST</h3>${rows.map(r => `<p><span>${r[0]}</span><span>${esc(r[1])}</span></p>`).join('')}<p class="ok">● OPERATIONAL</p>`;
  }
  function renderBuild() {
    $('dvBuild').innerHTML = D.builds.map(b => `<article><code>[${esc(b.code)}]</code><h3>${esc(b.title)}</h3><p>${esc(b.text)}</p></article>`).join('');
  }
  function renderTechnologies() {
    const cats = [...new Set(D.technologies.map(t => t.category))];
    $('dvStackList').innerHTML = cats.map(c => `<div class="dv-cat"><h3>${esc(c)}</h3><div class="dv-chips">${D.technologies.filter(t => t.category === c).map(t =>
      `<button class="dv-chip" data-tech="${esc(t.name)}" aria-pressed="false"><i aria-hidden="true">${LEVEL[t.level] || '□'}</i>${esc(t.name)}<span class="dv-sr" hidden> ${esc(t.level)}</span></button>`).join('')}</div></div>`).join('')
      + '<p class="dv-meta">■ Core &nbsp; ◧ Familiar &nbsp; □ Exploring</p>';
    selectTech(state.tech || (D.technologies[0] && D.technologies[0].name));
  }
  function selectTech(name) {
    const t = D.technologies.find(x => x.name === name);
    if (!t) { $('dvTech').innerHTML = '<p class="dv-meta">Select a technology.</p>'; return; }
    state.tech = name;
    document.querySelectorAll('.dv-chip').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tech === name)));
    const ps = projectsOf(name);
    $('dvTech').innerHTML = `<p class="dv-meta">${esc(t.category)} / ${LEVEL[t.level] || ''} ${esc(t.level)}</p><h3>${esc(t.name)}</h3>
      ${(t.uses || []).length ? `<h4>USED FOR</h4><ul>${t.uses.map(u => `<li>${esc(u)}</li>`).join('')}</ul>` : ''}
      <h4>PROJECTS</h4>${ps.length ? ps.map(p => `<button class="lk" data-project="${esc(p.slug)}">${esc(p.title)}</button>`).join('') : '<p class="dv-meta">No projects linked yet.</p>'}
      ${has(t.note) ? `<h4>NOTE</h4><p>${esc(t.note)}</p>` : ''}`;
  }
  function renderFilters() {
    $('dvFilters').innerHTML = CATS.map(c => `<button data-filter="${c}" aria-pressed="${c === state.filter}">${c.toUpperCase()}</button>`).join('');
  }
  function filterProjects() { return D.projects.filter(p => state.filter === 'All' || p.category === state.filter); }
  function renderProjects() {
    const list = filterProjects();
    $('dvProjCount').textContent = `${list.length} of ${D.projects.length} records`;
    $('dvProjects').innerHTML = list.length ? list.map((p, i) => `<li class="dv-proj" id="proj-${esc(p.slug)}">
      <span class="dv-no">${String(D.projects.indexOf(p) + 1).padStart(2, '0')}</span>
      <div><h3>${esc(p.title)}</h3>
      <div class="dv-rec"><span>TYPE <b>${esc(p.category)}</b></span><span>YEAR <b>${esc(p.year)}</b></span><span>STATUS <b>${STATUS[p.status] || esc(p.status)}</b></span></div>
      <div class="dv-rec"><span>STACK <b>${(p.technologies || []).map(esc).join(' / ') || 'n/a'}</b></span></div>
      <p>${esc(p.description)}</p>
      <div class="dv-btns">${has(p.url) ? `<a class="dv-btn pri" href="${esc(p.url)}" target="_blank" rel="noopener">OPEN PROJECT →</a>` : ''}${has(p.repository) ? `<a class="dv-btn" href="${esc(p.repository)}" target="_blank" rel="noopener">REPOSITORY</a>` : ''}</div></div>
      ${has(p.image) ? `<img class="dv-thumb" src="${esc(p.image)}" alt="Preview of ${esc(p.title)}" loading="lazy">` : ''}</li>`).join('')
      : '<li class="dv-empty">No records in this category.</li>';
  }
  function renderJourney() {
    $('dvJourney').innerHTML = D.journey.slice().reverse().map(j => `<li><time>${esc(j.date)}</time><div><code>commit: ${esc(j.commit)}</code><h3>${esc(j.title)}</h3><p>${esc(j.text)}</p></div></li>`).join('');
    $('dvPrinciples').innerHTML = D.principles.map((p, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><b>${esc(p.title)}</b><p>${esc(p.text)}</p></li>`).join('');
    $('dvInterests').textContent = (D.interests || []).join(', ');
  }
  function renderLinks() {
    const ls = linkList();
    $('dvFootprint').innerHTML = ls.length ? ls.map(l => `<li><a href="${esc(l[2])}" ${l[1] === 'email' ? '' : 'target="_blank" rel="noopener"'}>${l[0]} <span>${esc(l[2].replace(/^mailto:|^https?:\/\//, ''))}</span></a></li>`).join('') : '<li class="dv-meta">No public links yet.</li>';
    $('dvConnect').innerHTML = `<h3>Have a project, a site that needs building, or an idea worth documenting?</h3>
      ${has(D.links.email) ? `<a class="dv-btn pri" href="mailto:${esc(D.links.email)}?subject=Project%20enquiry">SEND MESSAGE</a>` : '<p class="dv-meta">Use the links on the right.</p>'}`;
    $('dvFooter').innerHTML = `<p class="dv-meta">DESIGNED / BUILT / MAINTAINED BY</p><p class="big">${esc(I.name)}</p><p class="dv-meta">© ${new Date().getFullYear()} · ● all systems operational</p>`;
  }
  function renderFrom() {
    const from = new URLSearchParams(location.search).get('from');
    if (!from) return;
    const p = D.projects.find(x => x.slug === from);
    $('dvFrom').textContent = "You're here from: " + (p ? p.title : from.replace(/[-_]/g, ' '));
    $('dvFrom').hidden = false;
  }

  /* ---------- Navigation actions ---------- */
  function goto(id) { const el = $(id); if (el) el.scrollIntoView(); if (el && !el.hasAttribute('tabindex')) { el.setAttribute('tabindex', '-1'); } if (el) el.focus({ preventScroll: true }); }
  function openProject(slug) {
    state.filter = 'All'; renderFilters(); renderProjects();
    const el = $('proj-' + slug); if (!el) return;
    el.scrollIntoView({ block: 'center' });
    el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 2200);
  }
  function setFilter(f) { state.filter = f; renderFilters(); renderProjects(); }

  /* ---------- Search + command palette ---------- */
  function buildIndex() {
    const items = [
      ['Go to identity', 'section', () => goto('identity')], ['View projects', 'section', () => goto('projects')], ['View stack', 'section', () => goto('stack')],
      ['View journey', 'section', () => goto('journey')], ['Contact developer', 'section', () => goto('connect')], ['Go home', 'section', () => goto('top')]
    ].map(([label, kind, run]) => ({ label, kind, run, key: norm(label) }));
    linkList().forEach(l => items.push({ label: 'Open ' + l[0], kind: 'link', key: norm('open ' + l[0]), run: () => { location.href = l[2]; } }));
    D.technologies.forEach(t => items.push({ label: t.name, kind: 'tech', key: norm([t.name, t.category, ...(t.uses || [])].join(' ')), run: () => { goto('stack'); selectTech(t.name); } }));
    D.projects.forEach(p => items.push({ label: p.title, kind: 'project', key: norm([p.title, p.category, p.description, ...(p.technologies || [])].join(' ')), run: () => openProject(p.slug) }));
    return items;
  }
  function searchDeveloperData(q) {
    const toks = norm(q).split(/\s+/).filter(Boolean), idx = buildIndex();
    return (toks.length ? idx.filter(i => toks.every(t => i.key.includes(t))) : idx.filter(i => i.kind !== 'tech' && i.kind !== 'project')).slice(0, 30);
  }
  const pal = { open: false, sel: 0, list: [], last: null };
  function renderPalette() {
    pal.list = searchDeveloperData($('dvPalIn').value);
    pal.sel = 0;
    $('dvPalList').innerHTML = pal.list.length ? pal.list.map((it, i) => `<li role="option" id="pal-${i}" data-i="${i}" aria-selected="${i === 0}"><span>${esc(it.label)}</span><small>${it.kind}</small></li>`).join('') : '<li role="presentation">Nothing matches. Try a project or technology name.</li>';
  }
  function moveSel(d) {
    if (!pal.list.length) return;
    pal.sel = (pal.sel + d + pal.list.length) % pal.list.length;
    document.querySelectorAll('#dvPalList li').forEach((li, i) => li.setAttribute('aria-selected', String(i === pal.sel)));
    const el = $('pal-' + pal.sel); if (el) el.scrollIntoView({ block: 'nearest' });
  }
  function openPalette() { pal.last = document.activeElement; $('dvPal').hidden = false; pal.open = true; $('dvPalIn').value = ''; renderPalette(); $('dvPalIn').focus(); }
  function closePalette() { if (!pal.open) return; $('dvPal').hidden = true; pal.open = false; if (pal.last && pal.last.focus) pal.last.focus(); }
  function runPalette(i) { const it = pal.list[i]; if (!it) return; closePalette(); it.run(); }

  /* ---------- Terminal ---------- */
  function renderTerminal() {
    const out = $('dvTermOut');
    const print = (t, cls) => { const d = document.createElement('div'); if (cls) d.className = cls; d.textContent = t; out.appendChild(d); out.scrollTop = out.scrollHeight; };
    const cmds = {
      help: () => 'commands: help, whoami, role, focus, status, stack, projects, contact, clear',
      whoami: () => I.username, role: () => I.title.toLowerCase(), focus: () => I.focus.toLowerCase(), status: () => I.availability.toLowerCase(),
      stack: () => ['Core', 'Familiar', 'Exploring'].map(l => `${l.toLowerCase().padEnd(10)}${D.technologies.filter(t => t.level === l).map(t => t.name).join(', ') || '-'}`).join('\n'),
      projects: () => D.projects.map((p, i) => `${String(i + 1).padStart(2, '0')} ${p.title} [${p.status}]`).join('\n'),
      contact: () => linkList().map(l => `${l[0].padEnd(10)}${l[2].replace(/^mailto:/, '')}`).join('\n') || 'no public contact links'
    };
    print('type "help" to list commands');
    $('dvTermForm').addEventListener('submit', e => {
      e.preventDefault();
      const input = $('dvTermIn'), raw = input.value.trim(), cmd = norm(raw);
      input.value = '';
      if (!raw) return;
      if (cmd === 'clear') { out.textContent = ''; return; }
      print('$ ' + raw, 'cmd');
      cmds[cmd] ? print(cmds[cmd]()) : print(`command not found: ${raw}. Type "help".`, 'err');
    });
    $('dvTerm').addEventListener('click', () => { if (!getSelection().toString()) $('dvTermIn').focus(); });
  }

  /* ---------- Events ---------- */
  function bindEvents() {
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-tech],[data-filter],[data-project],[data-close],#dvPaletteBtn,#dvBurger,.dv-links a,#dvPalList li[data-i]');
      if (!t) return;
      if (t.dataset.tech) selectTech(t.dataset.tech);
      else if (t.dataset.filter) setFilter(t.dataset.filter);
      else if (t.dataset.project) openProject(t.dataset.project);
      else if (t.hasAttribute('data-close')) closePalette();
      else if (t.id === 'dvPaletteBtn') openPalette();
      else if (t.id === 'dvBurger') { const o = $('dvLinks').classList.toggle('open'); t.setAttribute('aria-expanded', String(o)); }
      else if (t.matches('.dv-links a')) { $('dvLinks').classList.remove('open'); $('dvBurger').setAttribute('aria-expanded', 'false'); }
      else if (t.dataset.i != null) runPalette(+t.dataset.i);
    });
    $('dvPalIn').addEventListener('input', renderPalette);
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && norm(e.key) === 'k') { e.preventDefault(); pal.open ? closePalette() : openPalette(); return; }
      if (!pal.open) { if (e.key === 'Escape') { $('dvLinks').classList.remove('open'); $('dvBurger').setAttribute('aria-expanded', 'false'); } return; }
      if (e.key === 'Escape') closePalette();
      else if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); runPalette(pal.sel); }
      else if (e.key === 'Tab') e.preventDefault(); // keep focus in the palette input
    });
    // Highlight the current section in the nav
    if ('IntersectionObserver' in window) {
      const links = [...document.querySelectorAll('.dv-links a')];
      const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id)); }), { rootMargin: '-40% 0px -55% 0px' });
      links.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) io.observe(s); });
    }
  }

  function init() {
    renderIdentity(); renderStats(); renderBuild(); renderTechnologies(); renderFilters(); renderProjects();
    renderJourney(); renderLinks(); renderTerminal(); renderFrom(); bindEvents();
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();