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
})();
