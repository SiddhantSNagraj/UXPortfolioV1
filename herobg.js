/* herobg.js — animated hero background, switchable via data-herobg on <html>.
   Variants: 'none' | 'constellation' | 'aurora' | 'grid' (CSS handles aurora/grid).
   Only 'constellation' uses canvas. Respects reduced-motion + touch (lighter). */

(function () {
  'use strict';
  var canvas = null, ctx = null, raf = 0, pts = [], W = 0, H = 0, running = false;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function accent() {
    var c = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    return c || '#f7c14a';
  }
  function inkRGB() {
    // dots tint: use a soft neutral that works on both themes
    var light = document.documentElement.getAttribute('data-theme') === 'light';
    return light ? '58,38,16' : '255,255,255';
  }

  function size() {
    if (!canvas) return;
    var host = canvas.parentElement;
    W = host.offsetWidth; H = host.offsetHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    var count = Math.min(64, Math.round(W * H / 24000));
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) count = Math.min(count, 30);
    pts = [];
    for (var i = 0; i < count; i++) {
      pts.push({ x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28 });
    }
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    var rgb = inkRGB(), acc = accent();
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    }
    // links
    for (var a = 0; a < pts.length; a++) {
      for (var b = a + 1; b < pts.length; b++) {
        var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 18000) {
          var o = (1 - d2 / 18000) * 0.32;
          ctx.strokeStyle = 'rgba(' + rgb + ',' + o.toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b].x, pts[b].y); ctx.stroke();
        }
      }
    }
    // dots
    for (var k = 0; k < pts.length; k++) {
      ctx.beginPath(); ctx.arc(pts[k].x, pts[k].y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = k % 7 === 0 ? acc : 'rgba(' + rgb + ',0.5)';
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    size(); seed();
    if (running) return;
    running = true;
    if (reduced) { frame(); running = false; cancelAnimationFrame(raf); return; } // draw one static frame
    frame();
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    if (ctx && canvas) ctx.clearRect(0, 0, W, H);
  }

  function apply() {
    var mode = document.documentElement.getAttribute('data-herobg') || 'none';
    if (mode === 'constellation') start();
    else stop();
  }
  // boot once the hero canvas exists (React mounts it)
  var tries = 0;
  var gi = setInterval(function () {
    if (document.getElementById('hero-canvas')) { clearInterval(gi); apply(); }
    else if (++tries > 50) clearInterval(gi);
  }, 120);

  window.addEventListener('resize', function () { if (running) { size(); seed(); } });

  // observe attribute changes (Tweaks panel toggles data-herobg)
  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ['data-herobg', 'data-theme'] });
})();
