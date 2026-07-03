/* stickers.js — builds the 4 personality "sticker" SVGs for the hero photo hover.
   Plain JS (no JSX). Exposes window.buildHeroStickers(containerEl). */
(function () {
  var C = { cream:'#f2ece1', creamDk:'#d6cdba', orange:'#e6571d', orangeDk:'#b23c10',
    yellow:'#f7c14a', yellowDk:'#d69a2b', black:'#1b1a16', blackDk:'#0d0c0a' };
  var uid = 0;

  function grain(cid, w, h, op) {
    return '<rect x="-4" y="-4" width="'+(w+8)+'" height="'+(h+8)+'" clip-path="url(#'+cid+')" filter="url(#stkGrain)" opacity="'+(op||0.5)+'" style="mix-blend-mode:soft-light"/>';
  }
  function ast(x, y, color, sz) {
    sz = sz || 9;
    return '<g transform="translate('+x+' '+y+')" stroke="'+color+'" stroke-width="'+(sz*0.55)+'" stroke-linecap="round">' +
      '<line x1="'+(-sz)+'" y1="0" x2="'+sz+'" y2="0"/><line x1="0" y1="'+(-sz)+'" x2="0" y2="'+sz+'"/>' +
      '<line x1="'+(-sz*0.7)+'" y1="'+(-sz*0.7)+'" x2="'+(sz*0.7)+'" y2="'+(sz*0.7)+'"/><line x1="'+(-sz*0.7)+'" y1="'+(sz*0.7)+'" x2="'+(sz*0.7)+'" y2="'+(-sz*0.7)+'"/></g>';
  }

  function pixelStk() {
    var s=236, r=s/2, cx=r, cy=r, tr=r-30, idT='t'+(uid++), idB='b'+(uid++), cid='c'+(uid++);
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 '+s+' '+s+'">' +
      '<defs><path id="'+idT+'" fill="none" d="M '+(cx-tr)+' '+cy+' A '+tr+' '+tr+' 0 0 1 '+(cx+tr)+' '+cy+'"/>' +
      '<path id="'+idB+'" fill="none" d="M '+(cx-tr+7)+' '+cy+' A '+(tr-7)+' '+(tr-7)+' 0 0 0 '+(cx+tr-7)+' '+cy+'"/>' +
      '<clipPath id="'+cid+'"><circle cx="'+cx+'" cy="'+cy+'" r="'+(r-9)+'"/></clipPath></defs>' +
      '<circle cx="'+(cx+8)+'" cy="'+(cy+10)+'" r="'+(r-9)+'" fill="'+C.creamDk+'"/>' +
      '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r-9)+'" fill="'+C.cream+'" stroke="'+C.cream+'" stroke-width="8" paint-order="stroke"/>' +
      grain(cid, s, s) +
      '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r-44)+'" fill="none" stroke="'+C.black+'" stroke-width="1.6" stroke-dasharray="1.5 7" opacity="0.55"/>' +
      '<g transform="translate('+cx+' '+(cy+3)+') scale(1.5)" stroke="'+C.black+'" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M -18 -14 v-5 h5 M 13 -19 h5 v5 M 18 13 v5 h-5 M -13 18 h-5 v-5"/>' +
        '<path d="M -5 -5 L 11 2 L 4 5 L 8 12 L 5 14 L 1 7 L -5 11 Z" fill="'+C.black+'" stroke="none"/></g>' +
      '<path d="M '+(cx+30)+' '+(cy-30)+' l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 z" fill="'+C.orange+'"/>' +
      '<text font-family="Clash Display" font-weight="700" font-size="20" letter-spacing="1" fill="'+C.black+'"><textPath href="#'+idT+'" startOffset="50%" text-anchor="middle">PIXEL MICROMANAGER</textPath></text>' +
      '<text font-family="General Sans" font-weight="700" font-size="11.5" letter-spacing="3.5" fill="'+C.black+'"><textPath href="#'+idB+'" startOffset="50%" text-anchor="middle">1PX AT A TIME</textPath></text></svg>';
  }

  function scallopPath(cx, cy, R, n, d) {
    var p = '';
    for (var i = 0; i < n; i++) {
      var a1=(i/n)*2*Math.PI-Math.PI/2, a2=((i+1)/n)*2*Math.PI-Math.PI/2, am=(a1+a2)/2;
      var x1=cx+R*Math.cos(a1), y1=cy+R*Math.sin(a1), xm=cx+(R+d)*Math.cos(am), ym=cy+(R+d)*Math.sin(am), x2=cx+R*Math.cos(a2), y2=cy+R*Math.sin(a2);
      p += (i?'':'M '+x1.toFixed(1)+' '+y1.toFixed(1)+' ')+'Q '+xm.toFixed(1)+' '+ym.toFixed(1)+' '+x2.toFixed(1)+' '+y2.toFixed(1)+' ';
    }
    return p+'Z';
  }
  function cleanStk() {
    var s=252, cx=s/2, cy=s/2, cid='c'+(uid++), sp=scallopPath(cx, cy, 104, 12, 11);
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 '+s+' '+s+'">' +
      '<defs><clipPath id="'+cid+'"><path d="'+sp+'"/></clipPath></defs>' +
      '<path d="'+scallopPath(cx+8, cy+10, 104, 12, 11)+'" fill="'+C.yellowDk+'"/>' +
      '<path d="'+sp+'" fill="'+C.yellow+'" stroke="'+C.cream+'" stroke-width="7" paint-order="stroke"/>' +
      grain(cid, s, s) +
      '<circle cx="'+cx+'" cy="'+cy+'" r="86" fill="none" stroke="'+C.black+'" stroke-width="1.6" stroke-dasharray="1.5 6" opacity="0.5"/>' +
      '<text x="'+cx+'" y="'+(cy-14)+'" text-anchor="middle" font-family="Clash Display" font-weight="700" font-size="31" fill="'+C.black+'">CLEAN</text>' +
      '<text x="'+cx+'" y="'+(cy+18)+'" text-anchor="middle" font-family="Clash Display" font-weight="700" font-size="31" fill="'+C.black+'">DESK</text>' +
      '<text x="'+cx+'" y="'+(cy+47)+'" text-anchor="middle" font-family="General Sans" font-weight="700" font-size="12.5" letter-spacing="3" fill="'+C.black+'">EVANGELIST</text>' +
      ast(cx, cy-50, C.black, 8) + '</svg>';
  }

  function gymStk() {
    var w=364, h=196, cy=98, idT='t'+(uid++), idB='b'+(uid++), cid='c'+(uid++);
    var lensOuter = 'M 22 '+cy+' Q 182 2 342 '+cy+' Q 182 194 22 '+cy+' Z';
    var lensInner = 'M 46 '+cy+' Q 182 36 318 '+cy+' Q 182 160 46 '+cy+' Z';
    return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'">' +
      '<defs><clipPath id="'+cid+'"><path d="'+lensOuter+'"/></clipPath></defs>' +
      '<path d="'+lensOuter+'" fill="'+C.orangeDk+'" transform="translate(8 10)"/>' +
      '<path d="'+lensOuter+'" fill="'+C.orange+'" stroke="'+C.cream+'" stroke-width="8" paint-order="stroke"/>' +
      grain(cid, w, h, 0.5) +
      '<path d="'+lensInner+'" fill="none" stroke="'+C.cream+'" stroke-width="1.8" stroke-dasharray="1.5 6" opacity="0.55"/>' +
      '<defs><path id="'+idT+'" fill="none" d="M 96 '+(cy-4)+' Q 182 56 268 '+(cy-4)+'"/>' +
      '<path id="'+idB+'" fill="none" d="M 108 '+(cy+10)+' Q 182 150 256 '+(cy+10)+'"/></defs>' +
      '<g transform="translate(182 '+cy+')" stroke="'+C.black+'" stroke-width="3.6" stroke-linecap="round"><line x1="-18" y1="0" x2="18" y2="0"/><line x1="-18" y1="-10" x2="-18" y2="10"/><line x1="18" y1="-10" x2="18" y2="10"/><line x1="-25" y1="-6" x2="-25" y2="6"/><line x1="25" y1="-6" x2="25" y2="6"/></g>' +
      '<text font-family="Clash Display" font-weight="700" font-size="16" letter-spacing="1.5" fill="'+C.cream+'"><textPath href="#'+idT+'" startOffset="50%" text-anchor="middle">GYM ENTHUSIAST</textPath></text>' +
      '<text font-family="General Sans" font-weight="700" font-size="11.5" letter-spacing="3" fill="'+C.cream+'"><textPath href="#'+idB+'" startOffset="50%" text-anchor="middle">NO REST DAYS</textPath></text></svg>';
  }

  function horrorStk() {
    var w=276, h=256, idA='a'+(uid++), cid='c'+(uid++);
    var sil = 'M 30 232 V 140 A 108 108 0 0 1 246 140 V 232 A 8 8 0 0 1 238 240 H 38 A 8 8 0 0 1 30 232 Z';
    return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'">' +
      '<defs><clipPath id="'+cid+'"><path d="'+sil+'"/></clipPath></defs>' +
      '<path d="'+sil+'" fill="'+C.blackDk+'" transform="translate(7 9)"/>' +
      '<path d="'+sil+'" fill="'+C.black+'" stroke="'+C.cream+'" stroke-width="8" paint-order="stroke"/>' +
      grain(cid, w, h, 0.6) +
      '<defs><path id="'+idA+'" fill="none" d="M 66 144 A 72 72 0 0 1 210 144"/></defs>' +
      '<path d="M 46 224 V 140 A 92 92 0 0 1 230 140 V 224" fill="none" stroke="'+C.cream+'" stroke-width="1.6" stroke-dasharray="1.5 6" opacity="0.4"/>' +
      '<text font-family="Clash Display" font-weight="700" font-size="21" letter-spacing="1.5" fill="'+C.cream+'"><textPath href="#'+idA+'" startOffset="50%" text-anchor="middle">HORROR MOVIE</textPath></text>' +
      '<rect x="96" y="138" width="84" height="38" rx="19" fill="'+C.orange+'"/>' +
      '<text x="138" y="164" text-anchor="middle" font-family="Clash Display" font-weight="700" font-size="19" letter-spacing="1" fill="'+C.cream+'">ONLY</text>' +
      '<line x1="52" y1="194" x2="224" y2="194" stroke="'+C.cream+'" stroke-width="2" opacity="0.5"/>' +
      '<text x="138" y="220" text-anchor="middle" font-family="General Sans" font-weight="700" font-size="14" letter-spacing="3" fill="'+C.cream+'">CONNOISSEUR</text></svg>';
  }

  window.buildHeroStickers = function (container) {
    if (!container || container.dataset.built === '1') return;
    // shared grain filter (inject once into the document)
    if (!document.getElementById('stkGrain')) {
      var f = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      f.setAttribute('width', '0'); f.setAttribute('height', '0');
      f.setAttribute('aria-hidden', 'true');
      f.style.position = 'absolute';
      f.innerHTML = '<defs><filter id="stkGrain" x="0" y="0" width="100%" height="100%">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.9 0"/></filter></defs>';
      document.body.appendChild(f);
    }
    var builders = [pixelStk, gymStk, horrorStk, cleanStk];
    container.innerHTML = builders.map(function (fn, i) {
      return '<span class="hero__sticker hero__sticker--' + (i + 1) + '">' + fn() + '</span>';
    }).join('');
    container.dataset.built = '1';
  };
})();
