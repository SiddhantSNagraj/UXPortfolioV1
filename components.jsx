/* Shared components — exported to window for cross-file use */

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

/* reveal-on-scroll wrapper — robust: never leaves content hidden ----------- */
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
        SN<span className="reg">®</span>
      </button>
      <div className="nav__links">
        <a className={`nav__link hide-sm ${active === 'work' ? 'is-active' : ''}`} onClick={() => onNav('home', 'work')}>Work</a>
        <a className={`nav__link hide-sm ${active === 'about' ? 'is-active' : ''}`} onClick={() => onNav('home', 'about')}>About</a>
        <a className="nav__link hide-sm" onClick={() => onNav('home', 'contact')}>Contact</a>
        {resumeUrl ? <a className="nav__link" href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume ↓</a> : null}
        <button className="nav__theme" onClick={onToggleTheme} aria-label="Toggle light or dark mode" title="Toggle theme">
          <span className="nav__themedot" />
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </nav>
  );
}

/* contact + footer --------------------------------------------------------- */
function Contact({ profile }) {
  const [hover, setHover] = useState(false);
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="mono mono--accent" style={{ marginBottom: 28 }}>( CONTACT ) — OPEN TO PRODUCT DESIGN ROLES</div>
        <a
          href={`mailto:${profile.email}`}
          className="contact__big"
          style={{ display: 'block', color: hover ? 'var(--yellow)' : 'var(--ink)', transition: 'color .4s var(--ease)' }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Let’s<br />talk.
        </a>
        <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <a className="btn btn--yellow" href={`mailto:${profile.email}`}>{profile.email} <span className="arr">→</span></a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span className="arr">↗</span></a>
          {profile.resume ? <a className="btn" href={profile.resume} target="_blank" rel="noopener noreferrer">Resume <span className="arr">↓</span></a> : null}
        </div>

        <hr className="hr" style={{ marginTop: 64 }} />
        <div className="foot">
          <div className="foot__links">
            <span className="pixel" style={{ fontSize: 22 }}>SIDDHANT NAGRAJ®</span>
            <span className="mono" style={{ marginTop: 8 }}>Product Designer — based in {profile.location}</span>
          </div>
          <div className="col" style={{ alignItems: 'flex-end', gap: 6 }}>
            <span className="mono">© 2026 — Designed &amp; built in the dark</span>
            <span className="mono mono--ink">{profile.philosophy.toUpperCase()}</span>
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
            <span className="marquee__star">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Slot, Reveal, TopNav, Contact, Marquee });
