/* ticket.jsx — bold retro "ADMIT ONE" ticket for the contact footer.
   Inspired by NYC transit / Sunset Groove / Shackleton ticket design.
   Visitors type their name and download a personalized PNG ticket.
   Color theme switches via data-ticket on <html>. */

const { useState: useStateTK } = React;

const TK_THEMES = {
  sunset: { bg: '#cf4a2c', ink: '#fdf6e3' },
  cobalt: { bg: '#2f55e0', ink: '#f3efe4' },
  forest: { bg: '#1f6f4a', ink: '#f3efe4' },
  noir:   { bg: '#1a1a1a', ink: '#f7c14a' },
};

/* deterministic barcode bars (shared look with canvas) */
function tkBars(n) {
  var out = [], seed = 11;
  for (var i = 0; i < n; i++) { seed = (seed * 1103515245 + 12345) & 0x7fffffff; out.push((seed % 3) + 1); }
  return out;
}

function renderTicketCanvas(name, theme) {
  // matches the on-site ticket: scalloped edges both sides, wavy left lines,
  // PORTFOLIO title, name line, meta row, barcode, rotated stub.
  var S = 2.6, W = 680, H = 300, perf = 484, pad = 40, scallop = 13;
  var cv = document.createElement('canvas');
  cv.width = W * S; cv.height = H * S;
  var x = cv.getContext('2d');
  x.scale(S, S);
  var bg = theme.bg, ink = theme.ink;
  function rr(rx, ry, rw, rh, r) {
    x.beginPath();
    x.moveTo(rx + r, ry);
    x.arcTo(rx + rw, ry, rx + rw, ry + rh, r);
    x.arcTo(rx + rw, ry + rh, rx, ry + rh, r);
    x.arcTo(rx, ry + rh, rx, ry, r);
    x.arcTo(rx, ry, rx + rw, ry, r);
    x.closePath();
  }
  // body
  rr(0, 0, W, H, 14); x.fillStyle = bg; x.fill();
  // scalloped semicircle cut-outs along BOTH side edges
  x.globalCompositeOperation = 'destination-out';
  for (var sy = scallop; sy < H; sy += 26) {
    x.beginPath(); x.arc(0, sy, scallop, 0, 7); x.fill();
    x.beginPath(); x.arc(W, sy, scallop, 0, 7); x.fill();
  }
  x.globalCompositeOperation = 'source-over';
  // perforation dashes before the stub
  x.strokeStyle = ink; x.setLineDash([2, 5]); x.globalAlpha = 0.5; x.lineWidth = 1.5;
  x.beginPath(); x.moveTo(perf, 20); x.lineTo(perf, H - 20); x.stroke();
  x.setLineDash([]); x.globalAlpha = 1;
  // decorative wavy double-lines down the left margin
  x.strokeStyle = ink; x.globalAlpha = 0.5; x.lineWidth = 2;
  [22, 30].forEach(function (wx) {
    x.beginPath();
    for (var wy = 28; wy <= H - 28; wy += 2) {
      var dx = wx + Math.sin(wy / 5.5) * 3.4;
      if (wy === 28) x.moveTo(dx, wy); else x.lineTo(dx, wy);
    }
    x.stroke();
  });
  x.globalAlpha = 1;
  x.fillStyle = ink;
  var lx = pad + 18;
  // top label
  x.textBaseline = 'alphabetic';
  x.font = '700 12px "Space Mono", monospace';
  x.fillText('✸  ADMIT  ONE', lx, 48);
  // big title
  x.save(); x.translate(lx, 138); x.scale(0.86, 1);
  x.font = '900 84px Archivo, sans-serif'; x.fillText('PORTFOLIO', 0, 0); x.restore();
  // name
  x.font = '700 10px "Space Mono", monospace'; x.globalAlpha = 0.8;
  x.fillText('THIS  TICKET  ADMITS', lx, 176); x.globalAlpha = 1;
  x.font = '700 30px Archivo, sans-serif';
  x.fillText(name, lx, 210);
  x.globalAlpha = 0.45; x.lineWidth = 1.5;
  x.beginPath(); x.moveTo(lx, 220); x.lineTo(perf - 26, 220); x.stroke(); x.globalAlpha = 1;
  // meta row
  x.font = '400 11px "Space Mono", monospace';
  x.fillText('13 JUNE 2026', lx, 250);
  x.textAlign = 'right'; x.fillText('SIDDHANTNAGRAJ.COM', perf - 26, 250); x.textAlign = 'left';
  // barcode
  var bars = tkBars(44), cx = lx;
  for (var i = 0; i < bars.length && cx < perf - 26; i++) { x.fillRect(cx, 264, bars[i], 16); cx += bars[i] + 2; }
  // rotated stub
  x.save();
  x.translate(perf + (W - perf) / 2, H / 2);
  x.rotate(-Math.PI / 2);
  x.textAlign = 'center';
  x.save(); x.scale(0.86, 1); x.font = '900 28px Archivo, sans-serif'; x.fillText('PORTFOLIO', 0, -8); x.restore();
  x.font = '400 10px "Space Mono", monospace'; x.fillText('ADMIT ONE · MMXXVI', 0, 14);
  x.restore();
  return cv;
}

function FooterTicket() {
  const [name, setName] = useStateTK('');
  function onName(e) { setName(e.target.value.replace(/[^\p{L}\p{N}\s.'-]/gu, '').slice(0, 16)); }
  function download() {
    var key = document.documentElement.getAttribute('data-ticket') || 'sunset';
    var theme = TK_THEMES[key] || TK_THEMES.sunset;
    var go = function () {
      var cv = renderTicketCanvas((name || 'GUEST').toUpperCase(), theme);
      cv.toBlob(function (blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'portfolio-ticket' + (name ? '-' + name.toLowerCase().replace(/\s+/g, '-') : '') + '.png';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      }, 'image/png');
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  }
  return (
    <div className="footticket">
      <div className="tkn">
        <div className="tkn__main">
          <div className="tkn__top mono"><span className="tkn__sun">✸</span> ADMIT ONE</div>
          <div className="tkn__title">PORTFOLIO</div>
          <label className="tkn__name">
            <span className="tkn__namelabel mono">This ticket admits</span>
            <input className="tkn__nameinput" value={name} onChange={onName} placeholder="write your name…" aria-label="Your name" spellCheck={false} />
          </label>
          <div className="tkn__meta mono"><span>13 JUNE 2026</span><span>SIDDHANTNAGRAJ.COM</span></div>
          <div className="tkn__barrow"><span className="tkn-bars">{tkBars(40).map((w, i) => <i key={i} style={{ width: w + 'px' }} />)}</span></div>
        </div>
        <div className="tkn__stub">
          <span className="tkn__stubtitle">PORTFOLIO</span>
          <span className="mono tkn__stubmeta">ADMIT ONE · MMXXVI</span>
        </div>
      </div>
      <button className="tkn__dl mono" onClick={download} type="button">↓ Make it yours — download your ticket</button>
    </div>
  );
}

Object.assign(window, { FooterTicket });
