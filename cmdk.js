/* cmdk.js — ⌘K / Ctrl-K command palette. Vanilla, no React.
   Jumps to projects + scrolls to sections + toggles theme. */
(function () {
  'use strict';
  var ITEMS = [
    { label: 'Home', kind: 'Go', act: function () { location.hash = ''; window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'Greenstand, Roots Design System', kind: 'Project', act: function () { location.hash = 'project/greenstand'; } },
    { label: 'APMC, Website Redesign', kind: 'Project', act: function () { location.hash = 'project/apmc'; } },
    { label: 'CoffeeHouse, Mobile App', kind: 'Project', act: function () { location.hash = 'project/coffeehouse'; } },
    { label: 'Slack, Reimagined', kind: 'Project', act: function () { location.hash = 'project/slack'; } },
    { label: 'Selected work', kind: 'Section', act: function () { jump('#work'); } },
    { label: 'About', kind: 'Section', act: function () { jump('#about'); } },
    { label: 'Contact', kind: 'Section', act: function () { jump('#contact'); } },
    { label: 'Email Siddhant', kind: 'Action', act: function () { location.href = 'mailto:siddhantsnagraj@outlook.com'; } },
    { label: 'Open LinkedIn', kind: 'Action', act: function () { window.open('https://www.linkedin.com/in/siddhantnagraj/', '_blank'); } },
    { label: 'Toggle light / dark', kind: 'Action', act: function () { var b = document.querySelector('.themetog'); if (b) b.click(); } },
    { label: 'Toggle layout grid (G)', kind: 'Action', act: function () { window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g' })); } },
    { label: 'Toggle Retro Slate theme ✦', kind: 'Secret', act: function () { window.__toggleVibe(); } },
  ];

  /* public retro-vibe toggle (easter egg) — persists to localStorage so it
     survives navigation and the React tweaks layer respects it. */
  var RETRO = {
    '--blue': '#d6442c', '--accent': '#d6442c', '--yellow': '#f0a818',
    '--display': "'Playfair Display', Georgia, serif",
    '--pixel-blk': "'DM Serif Display', Georgia, serif",
    '--hero-weight': '400', '--hero-ls': '-0.01em',
    '--hero-size': 'clamp(54px, 14.5vw, 224px)', '--hero-lh': '0.9'
  };
  var INK = {
    '--blue': '#2b6fff', '--accent': '#2b6fff', '--yellow': '#f7c14a',
    '--pixel-blk': "'Archivo',system-ui,sans-serif",
    '--hero-weight': '900', '--hero-ls': '-0.035em',
    '--hero-size': 'clamp(46px, 12.5vw, 186px)', '--hero-lh': '0.88'
  };
  window.__toggleVibe = function () {
    var d = document.documentElement, s = d.style;
    var on = d.getAttribute('data-vibe') !== 'default';
    if (on) {
      d.setAttribute('data-vibe', 'default');
      Object.keys(INK).forEach(function (k) { s.setProperty(k, INK[k]); });
      s.removeProperty('--display');
      try { localStorage.setItem('sn-vibe', 'default'); } catch (e) {}
    } else {
      d.setAttribute('data-vibe', 'retroslate');
      Object.keys(RETRO).forEach(function (k) { s.setProperty(k, RETRO[k]); });
      try { localStorage.setItem('sn-vibe', 'retroslate'); } catch (e) {}
    }
  };
  // secret: triple-click the SN logo to flip the vibe
  (function () {
    var n = 0, timer;
    document.addEventListener('click', function (e) {
      var brand = e.target.closest && e.target.closest('.nav__brand');
      if (!brand) return;
      n++; clearTimeout(timer);
      if (n >= 3) { n = 0; window.__toggleVibe(); }
      else timer = setTimeout(function () { n = 0; }, 600);
    });
  })();
  function jump(sel) {
    if (location.hash.indexOf('project/') >= 0) { location.hash = ''; }
    setTimeout(function () { var el = document.querySelector(sel); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, location.hash ? 300 : 0);
  }

  var ov, input, list, rows = [], active = 0, filtered = ITEMS.slice();
  function build() {
    ov = document.createElement('div');
    ov.className = 'cmdk';
    ov.innerHTML =
      '<div class="cmdk__scrim"></div>' +
      '<div class="cmdk__panel" role="dialog" aria-label="Command menu">' +
        '<div class="cmdk__inbox"><span class="cmdk__prompt mono">⌘K</span>' +
        '<input class="cmdk__input" placeholder="Jump to a project, section, or action…" aria-label="Search commands" /></div>' +
        '<div class="cmdk__list" role="listbox"></div>' +
        '<div class="cmdk__hint mono"><span>↑↓ navigate</span><span>↵ select</span><span>esc close</span></div>' +
      '</div>';
    document.body.appendChild(ov);
    input = ov.querySelector('.cmdk__input');
    list = ov.querySelector('.cmdk__list');
    ov.querySelector('.cmdk__scrim').addEventListener('click', close);
    input.addEventListener('input', function () { render(input.value); });
    input.addEventListener('keydown', onKeys);
    render('');
  }
  function render(q) {
    q = (q || '').trim().toLowerCase();
    filtered = q ? ITEMS.filter(function (i) { return i.label.toLowerCase().indexOf(q) >= 0 || i.kind.toLowerCase().indexOf(q) >= 0; }) : ITEMS.slice();
    active = 0;
    list.innerHTML = '';
    rows = filtered.map(function (it, i) {
      var r = document.createElement('button');
      r.className = 'cmdk__row' + (i === 0 ? ' is-active' : '');
      r.innerHTML = '<span class="cmdk__lbl">' + it.label + '</span><span class="cmdk__kind mono">' + it.kind + '</span>';
      r.addEventListener('click', function () { run(it); });
      r.addEventListener('mousemove', function () { setActive(i); });
      list.appendChild(r);
      return r;
    });
    if (!filtered.length) { list.innerHTML = '<div class="cmdk__empty mono">No matches</div>'; }
  }
  function setActive(i) { if (rows[active]) rows[active].classList.remove('is-active'); active = i; if (rows[active]) rows[active].classList.add('is-active'); }
  function onKeys(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (active < rows.length - 1) { setActive(active + 1); rows[active].scrollIntoView({ block: 'nearest' }); } }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (active > 0) { setActive(active - 1); rows[active].scrollIntoView({ block: 'nearest' }); } }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[active]) run(filtered[active]); }
    else if (e.key === 'Escape') { close(); }
  }
  function run(it) { close(); setTimeout(it.act, 80); }
  function open() { if (!ov) build(); ov.classList.add('is-open'); input.value = ''; render(''); setTimeout(function () { input.focus(); }, 30); }
  function close() { if (ov) ov.classList.remove('is-open'); }

  window.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); ov && ov.classList.contains('is-open') ? close() : open(); }
  });
  window.__openCmdK = open;
})();

/* one-time discoverability hint for the command palette */
(function () {
  try { if (localStorage.getItem('sn-cmdk-hint')) return; } catch (e) {}
  var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
  function show() {
    var t = document.createElement('div');
    t.className = 'cmdk-hint';
    var keys = isTouch ? '<b>Menu</b>' : '<b>\u2318</b><b>K</b>';
    t.innerHTML = '<span class="cmdk-hint__txt">' + (isTouch ? 'Tap to jump around' : 'Press') + '</span>' + (isTouch ? '' : keys) + '<span class="cmdk-hint__txt">to jump around</span><button class="cmdk-hint__x" aria-label="Dismiss">\u00d7</button>';
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('is-in'); });
    function bye(){ t.classList.remove('is-in'); setTimeout(function(){ t.remove(); }, 400); try { localStorage.setItem('sn-cmdk-hint','1'); } catch(e){} }
    t.querySelector('.cmdk-hint__x').addEventListener('click', bye);
    t.addEventListener('click', function(e){ if (e.target.classList.contains('cmdk-hint__x')) return; if (window.__openCmdK) window.__openCmdK(); bye(); });
    setTimeout(bye, 9000);
  }
  if (isTouch) return; // keep it desktop-only; mobile has no ⌘K
  window.addEventListener('load', function(){ setTimeout(show, 2600); });
})();
