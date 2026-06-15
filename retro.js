/* retro.js — extra retro-vibe ephemera, only active when data-vibe starts "retro".
   #2 sunburst seal (CSS), #3 section stamps, #5 downloadable tour poster, #13 certified badge.
   Watches data-vibe so toggling on/off injects + removes cleanly. */
(function () {
  'use strict';
  var STAMPS = ['ORIGINAL', 'SELECTED \u2726', 'APPROVED', 'NO. 26', 'CERTIFIED'];
  var ROT = [-7, 5, -4, 8, -6];
  var injected = false;

  function isRetro() { var v = document.documentElement.getAttribute('data-vibe') || ''; return v.indexOf('retro') === 0; }

  function injectStamps() {
    var labels = document.querySelectorAll('.gs-sec__label, .am-sec__label, .cc-sec__label, .sl-sec__label, .block-head');
    labels.forEach(function (lab, i) {
      if (lab.querySelector('.rstamp')) return;
      var s = document.createElement('span');
      s.className = 'rstamp';
      s.style.setProperty('--rot', ROT[i % ROT.length] + 'deg');
      s.textContent = STAMPS[i % STAMPS.length];
      lab.appendChild(s);
    });
  }
  function removeStamps() { document.querySelectorAll('.rstamp').forEach(function (s) { s.remove(); }); }

  function injectPosterBtn() {
    var foot = document.querySelector('.footticket');
    if (!foot || foot.querySelector('.retro-poster-btn')) return;
    var btn = document.createElement('button');
    btn.className = 'retro-poster-btn mono';
    btn.type = 'button';
    btn.textContent = '\u2726 Download the tour poster';
    btn.addEventListener('click', downloadPoster);
    foot.appendChild(btn);
  }
  function removePosterBtn() { var b = document.querySelector('.retro-poster-btn'); if (b) b.remove(); }

  function apply() {
    if (isRetro()) { injectStamps(); injectPosterBtn(); injected = true; }
    else if (injected) { removeStamps(); removePosterBtn(); injected = false; }
  }

  /* ---- #5 tour poster (A3-ish portrait, canvas) ---- */
  function downloadPoster() {
    var go = function () {
      var S = 2, W = 600, H = 850;
      var cv = document.createElement('canvas'); cv.width = W * S; cv.height = H * S;
      var x = cv.getContext('2d'); x.scale(S, S);
      var paper = '#0c0c0e', ink = '#f1ead8', red = '#d6442c', gold = '#f0a818';
      x.fillStyle = paper; x.fillRect(0, 0, W, H);
      // grain
      x.globalAlpha = 0.05;
      for (var g = 0; g < 5000; g++) { x.fillStyle = Math.random() > .5 ? '#fff' : '#000'; x.fillRect(Math.random() * W, Math.random() * H, 1, 1); }
      x.globalAlpha = 1;
      // frame
      x.strokeStyle = ink; x.lineWidth = 2; x.globalAlpha = .5; x.strokeRect(20, 20, W - 40, H - 40);
      x.lineWidth = 1; x.strokeRect(26, 26, W - 52, H - 52); x.globalAlpha = 1;
      // top label
      x.fillStyle = gold; x.textAlign = 'center';
      x.font = '700 13px "Space Mono", monospace'; x.fillText('\u2726  L I V E   I N   M M X X V I  \u2726', W / 2, 64);
      // name
      x.fillStyle = ink; x.font = '400 78px "Playfair Display", Georgia, serif';
      x.fillText('SIDDHANT', W / 2, 150);
      x.strokeStyle = gold; x.lineWidth = 1.4; x.font = '400 78px "Playfair Display", Georgia, serif';
      x.strokeText('NAGRAJ', W / 2, 228); x.fillStyle = 'transparent';
      // subtitle
      x.fillStyle = red; x.font = '700 15px "Space Mono", monospace';
      x.fillText('THE PRODUCT DESIGN TOUR', W / 2, 268);
      // divider
      x.strokeStyle = ink; x.globalAlpha = .4; x.lineWidth = 1;
      x.beginPath(); x.moveTo(60, 296); x.lineTo(W - 60, 296); x.stroke(); x.globalAlpha = 1;
      // lineup
      var acts = [['01', 'GREENSTAND', 'Roots Design System', '2025'],
                  ['02', 'APMC', 'Website Redesign', '2023'],
                  ['03', 'COFFEEHOUSE', 'Mobile Ordering App', '2023'],
                  ['04', 'SLACK', 'Reimagined Concept', '2026']];
      var y = 350;
      acts.forEach(function (a) {
        x.textAlign = 'left'; x.fillStyle = gold; x.font = '700 16px "Space Mono", monospace'; x.fillText(a[0], 64, y);
        x.fillStyle = ink; x.font = '400 36px "Playfair Display", Georgia, serif'; x.fillText(a[1], 100, y + 4);
        x.fillStyle = ink; x.globalAlpha = .7; x.font = '400 12px "Space Mono", monospace'; x.fillText(a[2].toUpperCase(), 100, y + 26); x.globalAlpha = 1;
        x.textAlign = 'right'; x.fillStyle = red; x.font = '700 14px "Space Mono", monospace'; x.fillText(a[3], W - 64, y + 4);
        x.strokeStyle = ink; x.globalAlpha = .25; x.beginPath(); x.moveTo(64, y + 50); x.lineTo(W - 64, y + 50); x.stroke(); x.globalAlpha = 1;
        y += 96;
      });
      // footer
      x.textAlign = 'center'; x.fillStyle = gold; x.font = '700 12px "Space Mono", monospace';
      x.fillText('\u2726 CERTIFIED HUMAN-MADE \u2726 NO TEMPLATES \u2726', W / 2, H - 90);
      x.fillStyle = ink; x.globalAlpha = .8; x.font = '400 12px "Space Mono", monospace';
      x.fillText('SIDDHANTNAGRAJ.COM', W / 2, H - 64); x.globalAlpha = 1;
      cv.toBlob(function (blob) {
        var url = URL.createObjectURL(blob), a = document.createElement('a');
        a.href = url; a.download = 'siddhant-nagraj-tour-poster.png';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      }, 'image/png');
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  }

  var mo = new MutationObserver(apply);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-vibe'] });
  // also re-scan when the DOM mounts (React renders async) while retro is on
  var dmo = new MutationObserver(function () { if (isRetro()) { injectStamps(); injectPosterBtn(); } });
  window.addEventListener('load', function () {
    dmo.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
    setTimeout(apply, 400);
  });
})();
