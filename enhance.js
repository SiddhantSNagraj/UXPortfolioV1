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
    '': 'Siddhant Nagraj · Portfolio',
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

  /* ---- 3b. deep-link section scroll ----
     /about and /contact are rewritten to index.html (see vercel.json), so a
     visitor who guesses/types those URLs — or follows an old #about link —
     lands on the homepage and gets scrolled to the matching section instead
     of a 404. Runs once, and backs off the moment the visitor scrolls. */
  (function () {
    var SECTIONS = { work: 1, about: 1, contact: 1 };
    var path = (location.pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    var hash = (location.hash || '').replace(/^#\/?/, '').replace(/\/+$/, '').toLowerCase();
    var target = SECTIONS[path] ? path : (SECTIONS[hash] ? hash : null);
    if (!target) return;

    function navOffset() {
      var n = document.querySelector('.nav, nav, header');
      if (!n) return 0;
      var p = getComputedStyle(n).position;
      return (p === 'fixed' || p === 'sticky') ? n.offsetHeight + 12 : 0;
    }
    function jump() {
      var el = document.getElementById(target);
      if (!el) return false;
      var y = el.getBoundingClientRect().top + window.pageYOffset - navOffset();
      window.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
      return true;
    }

    var tries = 0, userScrolled = false;
    function onUser() { userScrolled = true; }
    window.addEventListener('wheel', onUser, { passive: true, once: true });
    window.addEventListener('touchmove', onUser, { passive: true, once: true });
    window.addEventListener('keydown', onUser, { once: true });

    var si = setInterval(function () {
      if (userScrolled) { clearInterval(si); return; }
      if (jump()) {
        clearInterval(si);
        // correct for late layout shifts (fonts, images loading in above)
        setTimeout(function () { if (!userScrolled) jump(); }, 500);
      } else if (++tries > 50) {
        clearInterval(si);
      }
    }, 100);
  })();

  /* ---- 3c. keep URLs clean if the visitor landed on a rewritten
     /about or /contact path, then navigated. Only touches that exact
     segment and preserves the directory base — so it's a harmless no-op
     when the site is served from a subpath (editor preview, local build)
     rather than the domain root. ---- */
  window.addEventListener('hashchange', function () {
    if (!location.hash) return;
    if (!/\/(about|contact)\/?$/i.test(location.pathname)) return;
    var base = location.pathname.replace(/\/(about|contact)\/?$/i, '/');
    history.replaceState(null, '', base + location.hash);
  });

  /* ---- 4. role cycler: hover the hero role to cycle playful titles ---- */
  (function () {
    var roles = ['Product Designer', 'Problem Untangler', 'Pixel Diplomat', 'Flow Architect', 'Systems Thinker', 'Coffee → UI Converter'];
    var i = 0, el, hoverLock = false;
    var gi = setInterval(function () {
      el = document.getElementById('hero-role');
      if (el) {
        clearInterval(gi);
        var orig = el.textContent;
        el.addEventListener('mouseenter', function () {
          if (hoverLock) return; hoverLock = true;
          i = (i + 1) % roles.length;
          el.style.opacity = '0';
          el.style.transform = 'translateY(7px)';
          setTimeout(function () {
            el.textContent = roles[i];
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            setTimeout(function () { hoverLock = false; }, 300);
          }, 280);
        });
        // restore the real title when the cursor leaves entirely
        el.addEventListener('mouseleave', function () {
          if (i === 0) return;
          setTimeout(function () {
            if (el.matches(':hover')) return;
            i = 0; el.style.opacity = '0'; el.style.transform = 'translateY(7px)';
            setTimeout(function () { el.textContent = orig; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 280);
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

  /* ---- 7. About photo cluster: click a polaroid to bring it forward + enlarge ---- */
  (function () {
    document.addEventListener('click', function (e) {
      var card = e.target.closest && e.target.closest('.abcl__pol, .abcl__poster');
      var cluster = card ? card.closest('.abcl') : null;
      // click outside any focused card clears focus everywhere
      if (!card) {
        document.querySelectorAll('.abcl.focus-on').forEach(function (c) {
          c.classList.remove('focus-on');
          c.querySelectorAll('.is-front').forEach(function (p) { p.classList.remove('is-front'); });
        });
        return;
      }
      e.stopPropagation();
      var wasFront = card.classList.contains('is-front');
      cluster.querySelectorAll('.is-front').forEach(function (p) { p.classList.remove('is-front'); });
      if (wasFront) { cluster.classList.remove('focus-on'); return; }
      card.classList.add('is-front');
      cluster.classList.add('focus-on');
      var v = card.querySelector('video'); if (v) { try { v.play(); } catch (err) {} }
    });
  })();

  /* ---- 8. About cluster: spread as it scrolls into view (not just on hover) ---- */
  (function () {
    function syncSpread() {
      var cl = document.querySelector('.abcl');
      if (!cl) return;
      if (document.documentElement.getAttribute('data-aboutphotos') !== 'cluster') { cl.classList.remove('spread'); return; }
      var r = cl.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      // arrange mode locks the spread open — don't fight it
      if (cl.classList.contains('arranging')) return;
      // spread once the cluster's centre enters the comfortable middle band of the viewport
      var mid = r.top + r.height / 2;
      var inView = mid < vh * 0.82 && mid > vh * 0.18;
      cl.classList.toggle('spread', inView);
    }
    var raf = 0;
    function onScroll() { syncSpread(); cancelAnimationFrame(raf); raf = requestAnimationFrame(syncSpread); }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    setTimeout(syncSpread, 400);
  })();

  /* ---- 9. ARRANGE MODE (gated): #arrange-photos lets you drag/rotate the
     About cluster cards, then copy the resulting CSS. Never runs on a normal load. ---- */
  (function () {
    function start() {
      var cl = document.querySelector('.abcl');
      if (!cl) { setTimeout(start, 300); return; }
      // force cluster visible + spread + locked (no auto-collapse / focus)
      document.documentElement.setAttribute('data-aboutphotos', 'cluster');
      cl.classList.add('spread', 'arranging');
      cl.scrollIntoView({ block: 'center' });

      var cards = [].slice.call(cl.querySelectorAll('.abcl__pol, .abcl__poster'));
      var state = {}; // class -> {x,y,rot,scale}
      cards.forEach(function (c) {
        var key = [].slice.call(c.classList).find(function (n) { return /^abc\d$/.test(n) || /^abp\d$/.test(n); });
        c.dataset.key = key;
        state[key] = { x: 0, y: 0, rot: 0, scale: c.classList.contains('abcl__poster') ? 0.9 : 1 };
        apply(c);
      });
      function apply(c) {
        var s = state[c.dataset.key];
        c.style.transition = 'none';
        c.style.transform = 'translate(calc(-50% + ' + s.x + 'px), calc(-50% + ' + s.y + 'px)) rotate(' + s.rot + 'deg) scale(' + s.scale + ')';
        c.style.zIndex = c.dataset.z || c.style.zIndex;
      }
      // drag
      var drag = null, sx = 0, sy = 0, ox = 0, oy = 0;
      cl.addEventListener('pointerdown', function (e) {
        var c = e.target.closest('.abcl__pol, .abcl__poster'); if (!c) return;
        e.preventDefault(); drag = c; c.setPointerCapture(e.pointerId);
        var s = state[c.dataset.key]; sx = e.clientX; sy = e.clientY; ox = s.x; oy = s.y;
        c.style.zIndex = 999;
      });
      cl.addEventListener('pointermove', function (e) {
        if (!drag) return; var s = state[drag.dataset.key];
        s.x = ox + (e.clientX - sx); s.y = oy + (e.clientY - sy); apply(drag);
      });
      cl.addEventListener('pointerup', function (e) { if (drag) { drag.releasePointerCapture(e.pointerId); drag = null; } });
      // wheel = rotate; shift+wheel = scale
      cl.addEventListener('wheel', function (e) {
        var c = e.target.closest('.abcl__pol, .abcl__poster'); if (!c) return;
        e.preventDefault(); var s = state[c.dataset.key];
        if (e.shiftKey) { s.scale = Math.max(0.4, Math.min(2, s.scale + (e.deltaY < 0 ? 0.04 : -0.04))); }
        else { s.rot += (e.deltaY < 0 ? 2 : -2); }
        apply(c);
      }, { passive: false });

      // panel
      var panel = document.createElement('div');
      panel.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:99999;background:#161618;color:#f2f1ec;border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:12px 16px;font:12px/1.4 ui-monospace,monospace;box-shadow:0 16px 40px rgba(0,0,0,.6);';
      panel.innerHTML = '<b>Arrange mode</b> · drag to move · wheel = rotate · shift+wheel = scale &nbsp; <button id="arrcopy" style="font:inherit;background:#f7c14a;color:#1a1407;border:none;border-radius:7px;padding:6px 12px;cursor:pointer;font-weight:700;">Copy CSS</button> <span id="arrmsg" style="margin-left:8px;color:#9fb;"></span>';
      document.body.appendChild(panel);
      document.getElementById('arrcopy').addEventListener('click', function () {
        // emit spread-state CSS using each card's measured % offsets within the cluster
        var W = cl.clientWidth, H = cl.clientHeight, out = [];
        cards.forEach(function (c) {
          var s = state[c.dataset.key];
          out.push('.abcl:is(:hover,.spread) .' + c.dataset.key +
            ' { transform: translate(calc(-50% + ' + Math.round(s.x) + 'px), calc(-50% + ' + Math.round(s.y) +
            'px)) rotate(' + s.rot + 'deg) scale(' + s.scale.toFixed(2) + '); }');
        });
        var css = out.join('\n');
        navigator.clipboard.writeText(css).then(function () {
          document.getElementById('arrmsg').textContent = 'Copied! paste it back in chat';
        }, function () {
          document.getElementById('arrmsg').textContent = 'see console';
        });
        console.log('=== ARRANGE CSS ===\n' + css);
      });
    }
    // expose on demand; auto-run only if URL hash requests it
    window.__arrangePhotos = start;
    if (location.hash === '#arrange-photos') start();
  })();
})();
