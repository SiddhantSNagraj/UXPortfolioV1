/* enhance.js — small craft touches (vanilla, no React dependency)
   1. Time-aware hero greeting
   2. Count-up animation for stat numbers (works on dynamically-mounted case studies) */

(function () {
  'use strict';

  /* ---- 1. time-aware greeting ---- */
  function setGreeting() {
    var el = document.getElementById('hero-greeting');
    if (!el) return;
    var h = new Date().getHours();
    var g = h < 5 ? 'Hello, night owl'
          : h < 12 ? 'Good morning'
          : h < 17 ? 'Good afternoon'
          : h < 21 ? 'Good evening'
          : 'Good evening';
    el.textContent = '( ' + g + ' )';
  }
  // poll briefly until React renders the hero
  var tries = 0;
  var gi = setInterval(function () {
    setGreeting();
    if (document.getElementById('hero-greeting') || ++tries > 40) clearInterval(gi);
  }, 120);

  /* ---- 2. count-up stats ---- */
  var STAT_SELECTOR = '.gs-bigstat__n, .cc-bigstat__n, .cc-iter__n, .am-stat__n';
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCount(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    var raw = el.textContent.trim();
    var m = raw.match(/(\d+(?:\.\d+)?)/);
    if (!m) return;                       // no number (AA, Most, Days...) -> leave as-is
    var numStr = m[1];
    var target = parseFloat(numStr);
    var decimals = numStr.indexOf('.') >= 0 ? (numStr.split('.')[1].length) : 0;
    var pre = raw.slice(0, m.index);
    var post = raw.slice(m.index + numStr.length);
    if (prefersReduced) return;           // keep final value, no motion
    var dur = 1100, start = null;
    function frame(t) {
      if (start === null) start = t;
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);  // easeOutCubic
      var val = (target * eased).toFixed(decimals);
      el.textContent = pre + val + post;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = pre + target.toFixed(decimals) + post;
    }
    requestAnimationFrame(frame);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.4 });

  function scan() {
    document.querySelectorAll(STAT_SELECTOR).forEach(function (el) {
      if (!el.dataset.counted && !el.dataset.observed) {
        el.dataset.observed = '1';
        io.observe(el);
      }
    });
  }

  // initial + watch for case studies mounting/unmounting
  scan();
  var root = document.getElementById('root') || document.body;
  var mo = new MutationObserver(function () {
    // reset flags for freshly-mounted nodes is unnecessary; just scan new ones
    scan();
  });
  mo.observe(root, { childList: true, subtree: true });

  /* ---- 3. per-route page titles + Vercel Analytics virtual pageviews ----
     Hash routing means Vercel's auto-tracking only ever sees "/".
     On every hash change we update document.title and report a virtual
     pageview so the dashboard shows /project/<id> paths. */
  var TITLES = {
    '': 'Siddhant Nagraj · Product Designer',
    'project/greenstand': 'Greenstand, Roots Design System · Siddhant Nagraj',
    'project/apmc': 'APMC Website Redesign · Siddhant Nagraj',
    'project/coffeehouse': 'CoffeeHouse Mobile App · Siddhant Nagraj',
    'project/slack': 'Slack, Reimagined · Siddhant Nagraj'
  };
  // queue stub so calls made before the insights script loads are kept
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

  function routeChanged(isInitial) {
    var h = location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
    document.title = TITLES[h] || TITLES[''];
    // initial "/" view is auto-tracked by the script; only report extra
    // views for in-app navigation, or a deep-link landing on a case study.
    if (!isInitial || h) {
      var path = '/' + h;
      try { window.va('pageview', { route: path, path: path }); } catch (e) {}
    }
  }
  window.addEventListener('hashchange', function () { routeChanged(false); });
  routeChanged(true);

  /* ---- 4. role cycler: hover the hero role to cycle playful titles ---- */
  (function () {
    var roles = ['Product Designer', 'Problem Untangler', 'Pixel Diplomat', 'Flow Architect', 'Systems Thinker', 'Coffee → UI Converter'];
    var i = 0, el, hoverLock = false;
    var gi = setInterval(function () {
      el = document.getElementById('hero-role');
      if (el) {
        clearInterval(gi);
        var orig = el.textContent;
        el.style.transition = 'opacity .18s ease';
        el.addEventListener('mouseenter', function () {
          if (hoverLock) return; hoverLock = true;
          i = (i + 1) % roles.length;
          el.style.opacity = '0';
          setTimeout(function () {
            el.textContent = roles[i];
            el.style.opacity = '1';
            setTimeout(function () { hoverLock = false; }, 200);
          }, 180);
        });
        // restore the real title when the cursor leaves entirely
        el.addEventListener('mouseleave', function () {
          if (i === 0) return;
          setTimeout(function () {
            if (el.matches(':hover')) return;
            i = 0; el.style.opacity = '0';
            setTimeout(function () { el.textContent = orig; el.style.opacity = '1'; }, 180);
          }, 1400);
        });
      }
    }, 120);
  })();

  /* ---- 5. inspect mode: press G for a Figma-style component inspector ---- */
  (function () {
    var on = false, root = null, box = null, cur = null;
    // overlay chrome + layout wrappers that aren't "components" worth inspecting
    // (typography utilities like mono/pixel ride along on real components, so
    // they must NOT be in here)
    var SKIP = /^(wrap|sr-only|inspect|gridov|cmdk|cmdktog|cursor|tweak)$/;

    function px(v) { var n = parseFloat(v); return n > 0 ? n : 0; }

    // climb to the nearest meaningful component: a classed, non-inline element
    // of real size (skips raw text spans, utility wrappers and overlay chrome)
    function meaningful(el) {
      while (el && el.nodeType === 1 && el !== document.body && el !== document.documentElement) {
        if (el.classList.length) {
          var skip = false;
          el.classList.forEach(function (c) { if (SKIP.test(c)) skip = true; });
          if (!skip) {
            var cs = getComputedStyle(el);
            var tag = el.tagName;
            var inlineOk = (tag === 'IMG' || tag === 'BUTTON' || tag === 'A' || tag === 'SVG');
            if (cs.display !== 'none' && (cs.display !== 'inline' || inlineOk)) {
              var r = el.getBoundingClientRect();
              if (r.width >= 28 && r.height >= 16) return el;
            }
          }
        }
        el = el.parentElement;
      }
      return null;
    }

    function build() {
      root = document.createElement('div');
      root.className = 'inspect';
      root.innerHTML =
        '<div class="inspect__box">' +
          '<i class="inspect__pad inspect__pad--t"></i>' +
          '<i class="inspect__pad inspect__pad--b"></i>' +
          '<i class="inspect__pad inspect__pad--l"></i>' +
          '<i class="inspect__pad inspect__pad--r"></i>' +
          '<span class="inspect__dim"></span>' +
        '</div>' +
        '<div class="inspect__hint">Inspect · press G to hide</div>';
      document.body.appendChild(root);
      box = root.querySelector('.inspect__box');
    }

    function paint(el) {
      if (!el) { root.classList.remove('has-target'); return; }
      var r = el.getBoundingClientRect();
      var cs = getComputedStyle(el);
      box.style.transform = 'translate(' + r.left + 'px,' + r.top + 'px)';
      box.style.width = r.width + 'px';
      box.style.height = r.height + 'px';
      var pt = px(cs.paddingTop), pr = px(cs.paddingRight), pb = px(cs.paddingBottom), pl = px(cs.paddingLeft);
      var t = box.children[0], b = box.children[1], l = box.children[2], rr = box.children[3];
      t.style.height = pt + 'px';
      b.style.height = pb + 'px';
      l.style.width = pl + 'px'; l.style.top = pt + 'px'; l.style.bottom = pb + 'px';
      rr.style.width = pr + 'px'; rr.style.top = pt + 'px'; rr.style.bottom = pb + 'px';
      box.children[4].textContent = Math.round(r.width) + '  ×  ' + Math.round(r.height);
      box.classList.toggle('inspect__box--below', r.top < 30);
      root.classList.add('has-target');
    }

    function onMove(e) { if (on) { cur = meaningful(e.target); paint(cur); } }
    function onScroll() { if (on && cur) paint(cur); }

    window.addEventListener('keydown', function (e) {
      if (e.key !== 'g' && e.key !== 'G') return;
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      on = !on;
      if (on && !root) build();
      document.body.classList.toggle('is-inspecting', on);
      root.classList.toggle('is-on', on);
      if (!on) { root.classList.remove('has-target'); cur = null; }
      if (on) {
        document.addEventListener('mousemove', onMove);
        window.addEventListener('scroll', onScroll, true);
      } else {
        document.removeEventListener('mousemove', onMove);
        window.removeEventListener('scroll', onScroll, true);
      }
    });
  })();

  /* ---- 6. spotlight row-hover: feed cursor x/y into --mx/--my on the row ---- */
  (function () {
    document.addEventListener('pointermove', function (e) {
      if (document.documentElement.getAttribute('data-rowhover') !== 'spotlight') return;
      var row = e.target.closest && e.target.closest('.workrow');
      if (!row) return;
      var r = row.getBoundingClientRect();
      row.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      row.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    }, { passive: true });
  })();
})();
