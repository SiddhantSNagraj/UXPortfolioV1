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
  var S = 2.6, W = 680, H = 300, perf = 496, pad = 34;
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
  rr(0, 0, W, H, 18); x.fillStyle = bg; x.fill();
  // notches at the perforation
  x.globalCompositeOperation = 'destination-out';
  x.beginPath(); x.arc(perf, 0, 15, 0, 7); x.fill();
  x.beginPath(); x.arc(perf, H, 15, 0, 7); x.fill();
  x.globalCompositeOperation = 'source-over';
  // inner hairline frame
  x.strokeStyle = ink; x.lineWidth = 1.5; x.globalAlpha = 0.45;
  rr(8, 8, W - 16, H - 16, 12); x.stroke(); x.globalAlpha = 1;
  // perforation dashes
  x.setLineDash([2, 5]); x.globalAlpha = 0.55;
  x.beginPath(); x.moveTo(perf, 22); x.lineTo(perf, H - 22); x.stroke();
  x.setLineDash([]); x.globalAlpha = 1;
  x.fillStyle = ink;
  // top label
  x.textBaseline = 'alphabetic';
  x.font = '700 13px "Space Mono", monospace';
  x.fillText('✸  ADMIT  ONE', pad, 50);
  // big condensed title
  x.save(); x.translate(pad, 150); x.scale(0.82, 1);
  x.font = '900 90px Archivo, sans-serif'; x.fillText('PORTFOLIO', 0, 0); x.restore();
  // name
  x.font = '700 11px "Space Mono", monospace'; x.globalAlpha = 0.8;
  x.fillText('THIS  TICKET  ADMITS', pad, 186); x.globalAlpha = 1;
  x.font = '700 32px Archivo, sans-serif';
  x.fillText(name, pad, 220);
  x.globalAlpha = 0.45; x.lineWidth = 1.5;
  x.beginPath(); x.moveTo(pad, 230); x.lineTo(perf - 28, 230); x.stroke(); x.globalAlpha = 1;
  // meta row
  x.font = '400 12px "Space Mono", monospace';
  x.fillText('13 JUNE 2026', pad, 258);
  x.textAlign = 'right'; x.fillText('SIDDHANTNAGRAJ.COM', perf - 28, 258); x.textAlign = 'left';
  // barcode
  var bars = tkBars(46), cx = pad;
  for (var i = 0; i < bars.length && cx < perf - 28; i++) { x.fillRect(cx, 270, bars[i], 16); cx += bars[i] + 2; }
  // stub (rotated)
  x.save();
  x.translate(perf + (W - perf) / 2, H / 2);
  x.rotate(-Math.PI / 2);
  x.textAlign = 'center';
  x.save(); x.scale(0.86, 1); x.font = '900 30px Archivo, sans-serif'; x.fillText('PORTFOLIO', 0, -10); x.restore();
  x.font = '400 11px "Space Mono", monospace'; x.fillText('ADMIT ONE · MMXXVI', 0, 14);
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
