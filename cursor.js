/* cursor.js — custom cursor system, switchable via data-cursor on <html>.
   Variants: 'off' (native), 'invert' (blend-mode circle), 'label' (View case pill).
   Always native on touch / reduced-motion. */

(function () {
  'use strict';
  var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch) return;  // never override on touch

  // build the cursor node
  var cur = document.createElement('div');
  cur.className = 'curx';
  cur.innerHTML = '<span class="curx__dot"></span><span class="curx__label">View case <em>→</em></span>';
  document.body.appendChild(cur);

  var x = window.innerWidth / 2, y = window.innerHeight / 2;
  var tx = x, ty = y;
  var moved = false;

  window.addEventListener('mousemove', function (e) {
    tx = e.clientX; ty = e.clientY;
    if (!moved) { moved = true; document.documentElement.classList.add('curx-on'); }
  }, { passive: true });

  // smooth follow
  function tick() {
    x += (tx - x) * (reduced ? 1 : 0.22);
    y += (ty - y) * (reduced ? 1 : 0.22);
    cur.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // hover state: enlarge over interactive, show label over project rows
  function isRow(el) { return el.closest && el.closest('.workrow'); }
  function isInteractive(el) {
    return el.closest && el.closest('a, button, .workrow, .csnav__toggle, [role="button"], input, .nav__theme');
  }
  document.addEventListener('mouseover', function (e) {
    var t = e.target;
    document.documentElement.classList.toggle('curx-hot', !!isInteractive(t));
    document.documentElement.classList.toggle('curx-row', !!isRow(t));
  });
  // hide when leaving the window
  document.addEventListener('mouseleave', function () { cur.style.opacity = '0'; });
  document.addEventListener('mouseenter', function () { cur.style.opacity = ''; });
  document.addEventListener('mousedown', function () { document.documentElement.classList.add('curx-down'); });
  document.addEventListener('mouseup', function () { document.documentElement.classList.remove('curx-down'); });
})();
