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
    { label: 'Toggle inspect mode (G)', kind: 'Action', act: function () { window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g' })); } },
    { label: 'Toggle Retro Slate theme ✦', kind: 'Secret', act: function () { window.__toggleVibe(); } },
    { label: 'A note for fellow designers', kind: 'Secret', act: function () { window.__openDesignerNote(); } },
  ];

  /* secret letter — a quiet note for other designers who find this via ⌘K */
  window.__openDesignerNote = function () {
    if (document.querySelector('.dnote')) return;
    var ov = document.createElement('div');
    ov.className = 'dnote';
    ov.innerHTML =
      '<div class="dnote__scrim"></div>' +
      '<div class="dnote__card" role="dialog" aria-label="A note for fellow designers">' +
        '<div class="dnote__kicker mono">( For whoever opened this with ⌘K )</div>' +
        '<div class="dnote__body">' +
          '<p>If you found this, you probably build things too.</p>' +
          '<p>A quick, honest note, designer to designer: I know what it feels like right now, trying to keep up with every new AI tool that drops and you “should” be using before you’ve even finished reading about the last one, the imposter syndrome that shows up when you open a blank Figma file, the job search that makes you feel like a spreadsheet row, and refining the same portfolio for the hundredth time because you just saw someone else’s work and quietly spiraled.</p>' +
          '<p>I have done all of that; I’m still doing some of it. Comparison is the tax we pay for caring about the craft, and it’s loudest in the people who are actually good.</p>' +
          '<p>So here’s the thing I keep having to relearn: your work does not have to be louder than theirs, it just has to be honestly yours. Tools come and go. Taste doesn’t.</p>' +
          '<p>Keep going. Keep building. You’re closer than it feels.</p>' +
        '</div>' +
        '<div class="dnote__sign">— Siddhant</div>' +
        '<button class="dnote__close mono" aria-label="Close">Close ✕</button>' +
      '</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add('is-in'); });
    function bye() { ov.classList.remove('is-in'); setTimeout(function () { ov.remove(); }, 380); document.removeEventListener('keydown', onEsc); }
    function onEsc(e) { if (e.key === 'Escape') bye(); }
    ov.querySelector('.dnote__scrim').addEventListener('click', bye);
    ov.querySelector('.dnote__close').addEventListener('click', bye);
    document.addEventListener('keydown', onEsc);
  };

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
    var next = on ? 'default' : 'retroslate';
    d.setAttribute('data-vibe', next);
    try { localStorage.setItem('sn-vibe', next); } catch (e) {}
    if (typeof window.__applyTweaks === 'function') {
      // let the tweaks layer re-apply everything (respects the user's chosen
      // hero font, palette, etc. rather than snapping back to a hardcoded default)
      window.__applyTweaks();
    } else {
      // fallback for before the React tweaks layer has mounted
      if (next === 'default') {
        Object.keys(INK).forEach(function (k) { s.setProperty(k, INK[k]); });
        s.removeProperty('--display');
      } else {
        Object.keys(RETRO).forEach(function (k) { s.setProperty(k, RETRO[k]); });
      }
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

  var ov, input, paneNav, paneItems, rows = [], active = 0, filtered = [];
  var CATS = ['Work', 'Navigate', 'Actions', 'Hidden'];
  var KIND2CAT = { 'Project': 'Work', 'Go': 'Navigate', 'Section': 'Navigate', 'Action': 'Actions', 'Secret': 'Hidden' };
  var activeCat = 0, searching = false;
  function catOf(it) { return KIND2CAT[it.kind] || 'Actions'; }
  function itemsInCat(c) { return ITEMS.filter(function (i) { return catOf(i) === c; }); }

  function build() {
    ov = document.createElement('div');
    ov.className = 'cmdk cmdk--twin';
    ov.innerHTML =
      '<div class="cmdk__scrim"></div>' +
      '<div class="cmdk__panel" role="dialog" aria-label="Command menu">' +
        '<div class="cmdk__inbox"><span class="cmdk__prompt mono">⌘K</span>' +
        '<input class="cmdk__input" placeholder="Jump to a project, section, or action…" aria-label="Search commands" /></div>' +
        '<div class="cmdk__twin">' +
          '<div class="cmdk__nav" role="tablist"></div>' +
          '<div class="cmdk__items" role="listbox"></div>' +
        '</div>' +
        '<div class="cmdk__hint mono"><span>↑↓ items</span><span>Tab switch group</span><span>↵ select</span><span>esc close</span></div>' +
      '</div>';
    document.body.appendChild(ov);
    input = ov.querySelector('.cmdk__input');
    paneNav = ov.querySelector('.cmdk__nav');
    paneItems = ov.querySelector('.cmdk__items');
    ov.querySelector('.cmdk__scrim').addEventListener('click', close);
    input.addEventListener('input', function () { render(input.value); });
    input.addEventListener('keydown', onKeys);
    render('');
  }

  function render(q) {
    q = (q || '').trim().toLowerCase();
    searching = !!q;
    // left nav (hidden while searching — results span all groups)
    paneNav.innerHTML = '';
    paneNav.style.display = searching ? 'none' : '';
    if (!searching) {
      CATS.forEach(function (c, ci) {
        if (!itemsInCat(c).length) return;
        var b = document.createElement('button');
        b.className = 'cmdk__cat' + (ci === activeCat ? ' is-active' : '') + (c === 'Hidden' ? ' cmdk__cat--secret' : '');
        b.innerHTML = '<span class="cmdk__catdot"></span>' + (c === 'Hidden' ? '✦ Hidden' : c);
        b.addEventListener('click', function () { activeCat = ci; render(input.value); });
        b.addEventListener('mousemove', function () { if (activeCat !== ci) { activeCat = ci; render(input.value); } });
        paneNav.appendChild(b);
      });
    }
    // right items
    if (searching) {
      filtered = ITEMS.filter(function (i) { return i.label.toLowerCase().indexOf(q) >= 0 || i.kind.toLowerCase().indexOf(q) >= 0; });
    } else {
      filtered = itemsInCat(CATS[activeCat]);
    }
    active = 0;
    paneItems.innerHTML = '';
    rows = filtered.map(function (it, i) {
      var r = document.createElement('button');
      r.className = 'cmdk__row' + (i === 0 ? ' is-active' : '');
      var secret = catOf(it) === 'Hidden';
      r.innerHTML = '<span class="cmdk__lbl">' + it.label + '</span><span class="cmdk__kind mono' + (secret ? ' cmdk__kind--secret' : '') + '">' + it.kind + '</span>';
      r.addEventListener('click', function () { run(it); });
      r.addEventListener('mousemove', function () { setActive(i); });
      paneItems.appendChild(r);
      return r;
    });
    if (!filtered.length) { paneItems.innerHTML = '<div class="cmdk__empty mono">No matches</div>'; }
  }

  function setActive(i) { if (rows[active]) rows[active].classList.remove('is-active'); active = i; if (rows[active]) rows[active].classList.add('is-active'); }
  function cycleCat(dir) {
    if (searching) return;
    var n = CATS.length, tries = 0, ci = activeCat;
    do { ci = (ci + dir + n) % n; tries++; } while (!itemsInCat(CATS[ci]).length && tries < n);
    activeCat = ci; render(input.value);
  }
  function onKeys(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (active < rows.length - 1) { setActive(active + 1); rows[active].scrollIntoView({ block: 'nearest' }); } }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (active > 0) { setActive(active - 1); rows[active].scrollIntoView({ block: 'nearest' }); } }
    else if (e.key === 'Tab') { e.preventDefault(); cycleCat(e.shiftKey ? -1 : 1); }
    else if (e.key === 'ArrowRight' && !searching) { e.preventDefault(); cycleCat(1); }
    else if (e.key === 'ArrowLeft' && !searching) { e.preventDefault(); cycleCat(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[active]) run(filtered[active]); }
    else if (e.key === 'Escape') { close(); }
  }
  function run(it) { close(); setTimeout(it.act, 80); }
  function open() { if (!ov) build(); ov.classList.add('is-open'); input.value = ''; activeCat = 0; render(''); setTimeout(function () { input.focus(); }, 30); }
  function close() { if (ov) ov.classList.remove('is-open'); }

  window.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); ov && ov.classList.contains('is-open') ? close() : open(); }
  });
  window.__openCmdK = open;
})();

/* smart discoverability hint — re-tries across visits until they actually use ⌘K */
(function () {
  var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
  if (isTouch) return; // desktop only

  var USED = 'sn-cmdk-used';     // set once they open the palette
  var SEEN = 'sn-cmdk-hint-seen'; // how many times we've shown the hint
  function used() { try { return !!localStorage.getItem(USED); } catch (e) { return false; } }
  function seenCount() { try { return parseInt(localStorage.getItem(SEEN) || '0', 10); } catch (e) { return 0; } }
  function bumpSeen() { try { localStorage.setItem(SEEN, String(seenCount() + 1)); } catch (e) {} }
  function markUsed() { try { localStorage.setItem(USED, '1'); } catch (e) {} }

  // once the palette is opened anywhere, remember it (and kill any visible hint)
  var realOpen = window.__openCmdK;
  window.__openCmdK = function () { markUsed(); var t = document.querySelector('.cmdk-hint'); if (t) t.classList.remove('is-in'); return realOpen && realOpen(); };
  window.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) markUsed();
  });

  function show() {
    if (used() || document.querySelector('.cmdk-hint')) return;
    var t = document.createElement('div');
    t.className = 'cmdk-hint';
    t.innerHTML = '<span class="cmdk-hint__txt">Tip \u2014 press</span><b>\u2318</b><b>K</b><span class="cmdk-hint__txt">to jump anywhere on this site</span><button class="cmdk-hint__x" aria-label="Dismiss">\u00d7</button>';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('is-in'); });
    function bye() { t.classList.remove('is-in'); setTimeout(function () { t.remove(); }, 400); }
    t.querySelector('.cmdk-hint__x').addEventListener('click', function (e) { e.stopPropagation(); markUsed(); bye(); });
    t.addEventListener('click', function (e) { if (e.target.classList.contains('cmdk-hint__x')) return; window.__openCmdK && window.__openCmdK(); bye(); });
    bumpSeen();
    setTimeout(function () { if (!used()) bye(); }, 14000);
  }

  // show on this visit only if they've never used it and we've shown it < 4 times
  window.addEventListener('load', function () {
    if (used() || seenCount() >= 4) return;
    setTimeout(show, 2400);
  });
})();
