/* Shared components, exported to window for cross-file use */

const { useState, useEffect, useRef } = React;

/* image / striped placeholder ---------------------------------------------- */
function Slot({ label, corner, style, className = '', img, alt, objectPosition, children }) {
  return (
    <div className={`slot ${img ? 'slot--filled' : ''} ${className}`} style={style}>
      {corner && <span className="slot__corner">{corner}</span>}
      {img && <img className="slot__img" src={img} alt={alt || label || ''} style={objectPosition ? { objectPosition } : null} />}
      {children}
      {!img && <span className="slot__tag">◳ {label}</span>}
    </div>
  );
}

/* reveal-on-scroll wrapper, robust: never leaves content hidden ----------- */
function Reveal({ children, className = '', delay = '', as = 'div', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add('in');
    // already in (or above) the viewport at mount → show immediately
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95) { show(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(); io.unobserve(el); } });
    }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    // safety net: never let an element stay hidden
    const t = setTimeout(show, 1600);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${delay} ${className}`} {...rest}>{children}</Tag>;
}

/* top navigation ----------------------------------------------------------- */
function TopNav({ onNav, active, solid, theme, onToggleTheme, resumeUrl }) {
  return (
    <nav className={`nav ${solid ? 'nav--solid' : ''}`}>
      <button className="nav__brand" onClick={() => onNav('home')} aria-label="Home">
        sn<span className="dot">.</span>
      </button>
      <div className="nav__links">
        <a className={`nav__link hide-sm ${active === 'work' ? 'is-active' : ''}`} href="#work" onClick={(e) => { e.preventDefault(); onNav('home', 'work'); }}>Work</a>
        <a className={`nav__link hide-sm ${active === 'about' ? 'is-active' : ''}`} href="#about" onClick={(e) => { e.preventDefault(); onNav('home', 'about'); }}>About</a>
        <a className={`nav__link hide-sm ${active === 'contact' ? 'is-active' : ''}`} href="#contact" onClick={(e) => { e.preventDefault(); onNav('home', 'contact'); }}>Contact</a>
        {resumeUrl ? <a className="nav__link" href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume ↓</a> : null}
        <button className={`themetog ${theme === 'light' ? 'is-light' : ''}`} onClick={onToggleTheme} aria-label="Toggle light or dark mode" title="Toggle theme" role="switch" aria-checked={theme === 'light'}>
          <span className="themetog__ico themetog__ico--moon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="13" height="13"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="currentColor"/></svg>
          </span>
          <span className="themetog__ico themetog__ico--sun" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="13" height="13"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><line x1="12" y1="2.5" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21.5" y2="12"/><line x1="5.2" y1="5.2" x2="6.9" y2="6.9"/><line x1="17.1" y1="17.1" x2="18.8" y2="18.8"/><line x1="5.2" y1="18.8" x2="6.9" y2="17.1"/><line x1="17.1" y1="6.9" x2="18.8" y2="5.2"/></g></svg>
          </span>
          <span className="themetog__knob" aria-hidden="true" />
        </button>
        <button className="retrotog" onClick={() => window.__toggleVibe && window.__toggleVibe()} title="Try the retro theme" aria-label="Toggle retro theme">
          <span className="retrotog__star" aria-hidden="true">✦</span>
          <span className="retrotog__txt">Retro</span>
        </button>
      </div>
    </nav>
  );
}

/* contact + footer --------------------------------------------------------- */

/* Guestbook — visitors press a personal monogram seal onto the wall.
   Persists to localStorage so a returning visitor still sees their mark and
   the wall fills over time. Seeded with a few "others" the first time. */
const GB_COLORS = ['#f7c14a', '#e0503a', '#f2f1ec', '#9fb8d8'];
const GB_SEEDS = [
  { ini: 'AK', loc: 'Berlin', x: 9, y: 30, c: '#e0503a', r: -7 },
  { ini: 'M.R', loc: 'Tokyo', x: 82, y: 44, c: '#9fb8d8', r: 6 },
  { ini: 'JL', loc: 'NYC', x: 26, y: 70, c: '#f2f1ec', r: -3 },
  { ini: 'PD', loc: 'London', x: 67, y: 74, c: '#f7c14a', r: 9 },
  { ini: 'SV', loc: 'Bangalore', x: 47, y: 44, c: '#f7c14a', r: -5 },
];

function GuestSeal({ s, idx }) {
  const tp = `gbtp${idx}`, bp = `gbbp${idx}`;
  return (
    <span className={`gbseal${s.isNew ? ' gbseal--new' : ''}`} style={{ left: `${s.x}%`, top: `${s.y}%`, '--c': s.c, '--r': `${s.r}deg` }}>
      <svg viewBox="0 0 74 74" aria-hidden="true">
        <defs>
          <path id={tp} d="M11,37 A26,26 0 0 1 63,37" />
          <path id={bp} d="M63,37 A26,26 0 0 1 11,37" />
        </defs>
        <circle className="gbseal__ring" cx="37" cy="37" r="33" />
        <circle className="gbseal__ringthin" cx="37" cy="37" r="28" />
        <text className="gbseal__ini" x="37" y="38">{s.ini}</text>
        <text className="gbseal__curve"><textPath href={`#${tp}`} startOffset="50%" textAnchor="middle">{(s.loc || '').toUpperCase()}</textPath></text>
        <text className="gbseal__curve"><textPath href={`#${bp}`} startOffset="50%" textAnchor="middle">· MMXXVI ·</textPath></text>
      </svg>
    </span>
  );
}

function Guestbook() {
  const KEY = 'sn-guestbook-v1';
  const [seals, setSeals] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (saved && Array.isArray(saved) && saved.length) return saved;
    } catch (e) {}
    return GB_SEEDS.slice();
  });
  const [ini, setIni] = useState('');
  const [loc, setLoc] = useState('');
  const wallRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(seals.slice(-60).map(({ isNew, ...r }) => r))); } catch (e) {}
  }, [seals]);

  const makeSeal = (x, y) => ({
    ini: (ini.trim() || 'SN').toUpperCase().slice(0, 3),
    loc: loc.trim().slice(0, 14),
    x, y,
    c: GB_COLORS[Math.floor(Math.random() * GB_COLORS.length)],
    r: +(Math.random() * 22 - 11).toFixed(1),
    mine: true, isNew: true,
  });

  const pressAt = (e) => {
    if (e.target.closest('.gb__form') || e.target.closest('.gb__clear')) return;
    const r = wallRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setSeals((s) => [...s, makeSeal(Math.max(6, Math.min(94, x)), Math.max(10, Math.min(90, y)))]);
  };
  const pressRandom = () => setSeals((s) => [...s, makeSeal(18 + Math.random() * 64, 22 + Math.random() * 36)]);
  const clearMine = () => setSeals((s) => s.filter((x) => !x.mine));

  return (
    <section className="gb-sec" id="guestbook">
      <div className="wrap">
        <div className="gb">
          <div className="gb__head">
            <span className="mono mono--accent">✦ GUESTBOOK</span>
            <span className="gb__count mono">{seals.length} have signed</span>
          </div>
          <p className="gb__lead">Leave your mark. Type your initials, pick where you’re from, and press your seal anywhere on the wall.</p>
          <div className="gb__stage">
            <div className="gb__wall" ref={wallRef} onPointerDown={pressAt}>
              {seals.map((s, i) => <GuestSeal key={i} s={s} idx={i} />)}
              <span className="gb__ghost mono">Click anywhere to press your seal</span>
              <button className="gb__clear mono" onClick={clearMine} type="button">Clear mine</button>
            </div>
            <div className="gb__form" onPointerDown={(e) => e.stopPropagation()}>
              <input className="gb__ini" maxLength={3} value={ini} onChange={(e) => setIni(e.target.value)} placeholder="SN" aria-label="Your initials" />
              <input className="gb__loc" maxLength={14} value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="where from?" aria-label="Where you're from" />
              <button className="gb__go mono" onClick={pressRandom} type="button">Press ✦</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuestbookOverlay() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.__openGuestbook = () => setOpen(true);
    return () => { try { delete window.__openGuestbook; } catch (e) {} };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="gb-ov" role="dialog" aria-modal="true" aria-label="Guestbook">
      <div className="gb-ov__scrim" onClick={() => setOpen(false)} />
      <div className="gb-ov__panel">
        <button className="gb-ov__close mono" type="button" onClick={() => setOpen(false)} aria-label="Close guestbook">Close ✕</button>
        <Guestbook />
      </div>
    </div>
  );
}

function Contact({ profile }) {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyEmail = (e) => {
    e.preventDefault();
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(profile.email).then(done).catch(() => { window.location.href = `mailto:${profile.email}`; });
    } else {
      const ta = document.createElement('textarea');
      ta.value = profile.email; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (err) { window.location.href = `mailto:${profile.email}`; }
      document.body.removeChild(ta);
    }
  };
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="mono mono--accent" style={{ marginBottom: 28 }}>04 · CONTACT, OPEN TO PRODUCT DESIGN ROLES</div>
        <div className="contact__split">
          <div className="contact__left">
            <a
              href={`mailto:${profile.email}`}
              className="contact__big"
              style={{ display: 'block', color: hover ? 'var(--yellow)' : 'var(--ink)', transition: 'color .4s var(--ease)' }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Let’s<br />talk.
            </a>
            <p className="contact__signoff">…and build something <em>people like</em>.</p>
            <div className="contact__icons" style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <a className="btn btn--icon btn--yellow" href="https://cal.com/siddhantnagraj" target="_blank" rel="noopener noreferrer" aria-label="Book a call on Cal.com" title="Book a call">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 2.5v4M16 2.5v4" /><circle cx="12" cy="14.5" r="1.4" fill="currentColor" stroke="none" /></svg>
              </a>
              <a className="btn btn--icon" href={`mailto:${profile.email}`} onClick={copyEmail} aria-label={`Copy email address ${profile.email}`} title={copied ? 'Copied!' : 'Copy email'} data-copied={copied ? 'true' : null}>
                {copied ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>
                )}
              </a>
              <a className="btn btn--icon" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C20.4 8.75 21 11 21 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" /></svg>
              </a>
              {profile.resume ? (
                <a className="btn btn--icon" href={profile.resume} target="_blank" rel="noopener noreferrer" aria-label="Download resume" title="Resume">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 19.5h14" /></svg>
                </a>
              ) : null}
            </div>
          </div>
          <FooterTicket />
        </div>

        <hr className="hr" style={{ marginTop: 64 }} />
        <div className="foot">
          <div className="foot__links">
            <span className="pixel" style={{ fontSize: 22 }}>SIDDHANT NAGRAJ®</span>
            <span className="mono" style={{ marginTop: 8 }}>Product Designer, based in {profile.location}</span>
            <a className="mono colophon" href="colophon-system.html">Built from scratch · Read how this was made →</a>
          </div>
          <div className="foot__right">
            <div className="foot__meta">
              <span className="mono">© 2026 · Made by a human, typos &amp; all</span>
              <span className="mono mono--ink">{profile.philosophy.toUpperCase()}</span>
            </div>
            <span className="seal" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="seal__svg">
                <defs><path id="sealpath" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" /></defs>
                <text className="seal__text"><textPath href="#sealpath" startOffset="0">★ OPEN TO OPPORTUNITIES ★ PORTFOLIO MMXXVI&nbsp;</textPath></text>
              </svg>
              <span className="seal__core mono">SN<br /><b>26</b></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* marquee strip ------------------------------------------------------------ */
function Marquee({ items, speed = 36 }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" style={{ animationDuration: `${speed}s` }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="marquee__item">
            <span className="display" style={{ fontSize: 'clamp(34px,6vw,84px)', fontWeight: 800 }}>{t}</span>
            <span className="marquee__star">✳︎</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* 30-second TL;DR card for case studies ------------------------------------ */
function CaseTLDR({ items }) {
  return (
    <section className="wrap tldr" aria-label="30-second summary">
      <div className="tldr__card">
        <span className="tldr__tag mono">( The 30-second version )</span>
        <div className="tldr__grid">
          {items.map(([k, v], i) => (
            <div className="tldr__cell" key={i}>
              <span className="tldr__k mono">{k}</span>
              <p className="tldr__v">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Slot, Reveal, TopNav, Contact, Marquee, CaseTLDR, Guestbook, GuestbookOverlay });
