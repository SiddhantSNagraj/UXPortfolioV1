/* cursor.js — custom cursor system, switchable via data-cursor on <html>.
   Variants: 'off' (native), 'hover' (native arrow + accent ring on interactives),
   'precise' (1:1 dot + ring), 'crosshair' (full-bleed hairlines),
   'invert' (blend-mode blob), 'label' (precise dot + "View case" pill).
   The precise layer tracks the pointer 1:1 (no lag) so it never lies about
   position; only the decorative 'invert' blob trails. Native on touch. */

(function () {
  'use strict';
  var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch) return;  // never override on touch

  // precise layer — sits exactly on the pointer, every frame
  var cur = document.createElement('div');
  cur.className = 'curx';
  cur.innerHTML =
    '<span class="curx__ring"></span>' +
    '<span class="curx__dot"></span>' +
    '<span class="curx__cross curx__cross--x"></span>' +
    '<span class="curx__cross curx__cross--y"></span>' +
    '<span class="curx__arrow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.4 3.4 L20.4 9.6 L12.1 12.1 L9.6 20.4 Z"/></svg></span>' +
    '<span class="curx__label">View case <em>→</em></span>';
  document.body.appendChild(cur);

  // trailing layer — lags slightly, used only by the decorative 'invert' blob
  var trail = document.createElement('div');
  trail.className = 'curx-trail';
  trail.innerHTML = '<span class="curx-trail__blob"></span>';
  document.body.appendChild(trail);

  var px = window.innerWidth / 2, py = window.innerHeight / 2;  // precise (live) pos
  var x = px, y = py;                                           // trail (smoothed) pos
  var moved = false;

  window.addEventListener('mousemove', function (e) {
    px = e.clientX; py = e.clientY;
    if (!moved) { moved = true; document.documentElement.classList.add('curx-on'); }
  }, { passive: true });

  function tick() {
    // precise layer: exact, no smoothing
    cur.style.transform = 'translate(' + px + 'px,' + py + 'px)';
    // trailing layer: ease toward the pointer for a little character
    x += (px - x) * (reduced ? 1 : 0.18);
    y += (py - y) * (reduced ? 1 : 0.18);
    trail.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // hover state: ring/label react over interactive elements + project rows
  function isRow(el) { return el.closest && el.closest('.workrow'); }
  function isInteractive(el) {
    return el.closest && el.closest('a, button, .workrow, .csnav__toggle, [role="button"], input, .nav__theme, .recbtn, .gs-recbtn, .recsum button, .recsum a');
  }
  document.addEventListener('mouseover', function (e) {
    var t = e.target;
    document.documentElement.classList.toggle('curx-hot', !!isInteractive(t));
    document.documentElement.classList.toggle('curx-row', !!isRow(t));
  });
  // hide when leaving the window
  document.addEventListener('mouseleave', function () { cur.style.opacity = '0'; trail.style.opacity = '0'; });
  document.addEventListener('mouseenter', function () { cur.style.opacity = ''; trail.style.opacity = ''; });
  document.addEventListener('mousedown', function () { document.documentElement.classList.add('curx-down'); });
  document.addEventListener('mouseup', function () { document.documentElement.classList.remove('curx-down'); });
})();
