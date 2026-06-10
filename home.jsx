/* HOME, hero + work index */

const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

/* ---- HERO --------------------------------------------------------------- */
function Hero({ projects, onOpen }) {
  const stripRef = useRefH(null);
  const heroRef = useRefH(null);

  useEffectH(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const hero = heroRef.current;
        if (!hero) return;
        const y = window.scrollY;
        const h = hero.offsetHeight;
        const p = Math.max(0, Math.min(1.4, y / h));         // 0..1.4
        const head = hero.querySelector('.hero__head');
        if (head) head.style.transform = `translateY(${y * -0.12}px)`;
        if (head) head.style.opacity = String(Math.max(0, 1 - p * 0.9));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // varying heights for the strip cards
  const cards = [
    { h: 300, w: 240, p: projects[0] },
    { h: 420, w: 340, p: projects[1] },
    { h: 250, w: 300, p: projects[2] },
    { h: 380, w: 280, p: projects[0] },
    { h: 320, w: 460, p: projects[1] },
    { h: 270, w: 240, p: projects[2] },
  ];

  return (
    <header className="hero" ref={heroRef}>
      <div className="hero__head wrap">
        <div className="hero__eyebrow">
          <span className="mono mono--ink" id="hero-greeting">( Hello )</span>
          <span className="mono">5 Years · Product Design</span>
          <span className="mono mono--accent hero__status"><span className="hero__status-dot" />Open to opportunities</span>
        </div>

        <div className="hero__namerow">
          <h1 className="hero__name">
            <span className="hero__pix">SIDDHANT</span>
            <span className="hero__pix hero__pix--out">NAGRAJ</span>
          </h1>

          <div className="hero__avatar" tabIndex={0} aria-label="Siddhant Nagraj">
            <span className="hero__avatar-ring" aria-hidden="true"></span>
            <span className="hero__avatar-ring hero__avatar-ring--2" aria-hidden="true"></span>
            <img className="hero__avatar-img" src="assets/siddhant-opt.png" alt="Siddhant Nagraj" />
            <span className="hero__avatar-duo" aria-hidden="true"></span>
            <span className="hero__avatar-dot" aria-hidden="true"></span>
            <svg className="hero__avatar-orbit" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <path id="avatarOrbitPath" d="M50,50 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"></path>
              </defs>
              <text>
                <textPath xlinkHref="#avatarOrbitPath" href="#avatarOrbitPath" startOffset="0" textLength="270" lengthAdjust="spacing">
                  PIXEL MICROMANAGER · GYM ENTHUSIAST · HORROR MOVIE CONNOISSEUR
                </textPath>
              </text>
            </svg>
            <div className="hero__avatar-tip" aria-hidden="true">
              <span className="hero__avatar-tipline">Pixel Micromanager</span>
              <span className="hero__avatar-tipline">Gym Enthusiast</span>
              <span className="hero__avatar-tipline">Horror Movie Connoisseur</span>
            </div>
            <div className="hero__avatar-comic" aria-hidden="true">
              <span className="hero__comic-bubble hero__comic-bubble--1">Pixel Micromanager</span>
              <span className="hero__comic-bubble hero__comic-bubble--2">Gym Enthusiast</span>
              <span className="hero__comic-bubble hero__comic-bubble--3">Horror Movie Connoisseur</span>
            </div>
          </div>
        </div>

        <div className="hero__sub">
          <div className="hero__role display">Product&nbsp;Designer</div>
          <p className="hero__phil">
            <span className="mono mono--yellow">✳</span> Creating experiences <em>people like</em>, systems,
            sites &amp; products built with clarity, taste, and a little obsession.
          </p>
        </div>
      </div>

      <div className="hero__stripwrap">
        <div className="hero__scrollcue mono">
          <span>Capabilities &amp; tools</span>
          <span className="hero__scrollcue-line" />
          <span>Work ↓</span>
        </div>
        <HeroMarquee />
      </div>
    </header>
  );
}

/* ---- APMC PEEK, flat-screen treatments using the husky logo ------------
   Controlled by <html data-apmchover="display|panel|poster">. */
function ApmcPeek() {
  return (
    <span className="workrow__apmc" aria-hidden="true">
      {/* A, flat-screen monitor on a slim stand */}
      <span className="apk apk--display">
        <span className="apk-mon">
          <span className="apk-mon__screen">
            <img src="assets/apmc/display-screen.png" alt="" />
          </span>
          <span className="apk-mon__neck" />
          <span className="apk-mon__foot" />
        </span>
      </span>

      {/* B, minimal floating panel (no stand) */}
      <span className="apk apk--panel">
        <span className="apk-panel">
          <img src="assets/apmc/husky-wide.png" alt="" />
          <span className="apk-panel__cap">
            <span className="apk-panel__club">Aspiring Product Managers Club</span>
            <span className="apk-panel__sub">Protothon 5.0 · Northeastern</span>
          </span>
        </span>
      </span>

      {/* C, graphic poster: cut-out husky on a brand panel */}
      <span className="apk apk--poster">
        <span className="apk-poster">
          <img src="assets/apmc/husky-cut.png" alt="" />
          <span className="apk-poster__club">Aspiring Product<br />Managers Club</span>
          <span className="apk-poster__sub">Protothon 5.0</span>
        </span>
      </span>
    </span>
  );
}

/* ---- GREENSTAND PEEK, switchable hover treatments ----------------------
   Controlled by <html data-gshover="board|scatter|grid|tokens"> (default board). */
const GS_TOKENS = ['var(--gs-200)', 'var(--gs-300)', 'var(--gs-400)', 'var(--gs-500)', 'var(--gs-600)', 'var(--gs-700)', 'var(--gs-800)'];

function GreenstandPeek() {
  return (
    <span className="workrow__gs" aria-hidden="true">
      {/* A, mini component board (default) */}
      <span className="gspk gspk--board">
        <span className="gsp-board">
          <span className="gsp-hd">
            <span className="gsp-hd__t">Roots · Components</span>
            <span className="gsp-hd__dots"><i /><i /><i /></span>
          </span>
          <span className="gsp-brow">
            <span className="gsp-b gsp-b--p">Plant a tree</span>
            <span className="gsp-b gsp-b--s">Map</span>
          </span>
          <span className="gsp-fld"><span className="ph">Grower name</span><span className="car" /></span>
          <span className="gsp-ctlrow">
            <span className="gsp-tog" /><span className="lab">Verified</span>
            <span className="gsp-chip">Mapped</span>
          </span>
          <span className="gsp-tokens">
            {GS_TOKENS.map((c, i) => (<i key={i} style={{ background: c }} />))}
          </span>
        </span>
      </span>

      {/* B, scatter: individual components pop in around the centre */}
      <span className="gspk gspk--scatter">
        <span className="gss gss--btn gss--1">Plant a tree</span>
        <span className="gss gss--field gss--2"><span className="ph">Grower name</span><span className="car" /></span>
        <span className="gss gss--tokens gss--3">
          <i style={{ background: 'var(--gs-300)' }} />
          <i style={{ background: 'var(--gs-500)' }} />
          <i style={{ background: 'var(--gs-600)' }} />
          <i style={{ background: 'var(--gs-800)' }} />
        </span>
        <span className="gss gss--toggle gss--4"><span className="t" /><span className="lab">Verified</span></span>
        <span className="gss gss--chip gss--5">Mapped</span>
      </span>

      {/* C, Storybook tile grid */}
      <span className="gspk gspk--grid">
        <span className="gsg">
          <span className="gsg__hd">
            <span className="gsg__t">Roots · Library</span>
            <span className="gsg__c">150+ components</span>
          </span>
          <span className="gsg__grid">
            <span className="gsg__tile"><span className="gsg-mini-b">Button</span><span className="gsg__tl">Button</span></span>
            <span className="gsg__tile"><span className="gsg-mini-f" /><span className="gsg__tl">Input</span></span>
            <span className="gsg__tile"><span className="gsg-mini-t" /><span className="gsg__tl">Toggle</span></span>
            <span className="gsg__tile"><span className="gsg-mini-c"><i style={{ background: 'var(--gs-400)' }} /><i style={{ background: 'var(--gs-600)' }} /><i style={{ background: 'var(--gs-800)' }} /></span><span className="gsg__tl">Tokens</span></span>
          </span>
        </span>
      </span>

      {/* D, palette-forward token card */}
      <span className="gspk gspk--tokens">
        <span className="gst">
          <span className="gst__hd">
            <span className="gst__t">Roots · Tokens</span>
            <span className="gst__chip">7+ greens → 1</span>
          </span>
          <span className="gst__scale">
            {['200','300','400','500','600','700','800'].map((n, i) => (<i key={i} style={{ background: GS_TOKENS[i] }}>{n}</i>))}
          </span>
          <span className="gst__row">
            <span className="gst__b">Plant a tree</span>
            <span className="gst__sem">
              <i style={{ background: 'var(--gs-success)' }} />
              <i style={{ background: 'var(--gs-warning)' }} />
              <i style={{ background: 'var(--gs-error)' }} />
              <i style={{ background: 'var(--gs-info)' }} />
            </span>
          </span>
        </span>
      </span>
    </span>
  );
}

/* ---- SLACK PEEK, iPhone-mockup fan (distinct from Coffee's bloom) ----- */
const SLACK_FAN = [
  ['assets/slack/hi-dms.png', 'Direct Messages'],
  ['assets/slack/hi-home.png', 'Home'],
  ['assets/slack/hi-you.png', 'Profile'],
];

function SlackPeek() {
  return (
    <span className="workrow__slfan" aria-hidden="true">
      {SLACK_FAN.map(([src, label], i) => (
        <span className={`slfan-ph slfan-ph--${i}`} key={src}>
          <span className="slfan-ph__island" />
          <img src={src} alt={label} loading="lazy" />
        </span>
      ))}
    </span>
  );
}

/* ---- WORK INDEX --------------------------------------------------------- */
const COFFEE_FAN = [
  ['assets/coffee/flow2/dashboard.png', 'Home'],
  ['assets/coffee/flow2/details.png', 'Customize'],
  ['assets/coffee/flow2/checkout.png', 'Checkout'],
];

function CoffeeFan() {
  return (
    <span className="workrow__fan" aria-hidden="true">
      {COFFEE_FAN.map(([src, label], i) => (
        <span className={`wf-phone wf-phone--${i}`} key={src}>
          <img src={src} alt={label} loading="lazy" />
        </span>
      ))}
    </span>
  );
}

function WorkIndex({ projects, onOpen }) {
  const [hovered, setHovered] = useStateH(null);

  const trackMouse = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const fx = ((e.clientX - r.left) / r.width - 0.5) * 2;   // -1..1
    const fy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty('--fx', fx.toFixed(3));
    el.style.setProperty('--fy', fy.toFixed(3));
  };

  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="block-head">
          <span className="pixel block-head__no">02</span>
          <div className="block-head__main">
            <span className="mono mono--accent">( Selected Work )</span>
            <h2 className="block-head__title display">Things I’ve<br />shipped</h2>
          </div>
          <span className="mono block-head__count">{String(projects.length).padStart(2, '0')}, Projects</span>
        </div>

        <div className="worklist" onMouseLeave={() => setHovered(null)}>
          {projects.map((p) => {
            const isCoffee = p.id === 'coffeehouse';
            const isApmc   = p.id === 'apmc';
            const isGreen  = p.id === 'greenstand';
            const isSlack  = p.id === 'slack';
            const chipColor = isApmc ? '#ff6666' : isGreen ? 'var(--gs-400)' : isSlack ? 'var(--sl-lilac)' : isCoffee ? 'var(--yellow-ink)' : p.accent === 'yellow' ? 'var(--yellow-ink)' : 'var(--blue)';
            return (
              <button
                key={p.id}
                className={`workrow ${isCoffee ? 'workrow--fan' : ''} ${isApmc ? 'workrow--apmc' : ''} ${isGreen ? 'workrow--gs' : ''} ${isSlack ? 'workrow--sl' : ''} ${hovered && hovered !== p.id ? 'is-dim' : ''}`}
                style={{ '--rowtheme': p.theme, '--rowbg': p.rowbg, '--rowtext': p.rowtext }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseMove={(isCoffee || isApmc || isGreen || isSlack) ? trackMouse : undefined}
                onClick={() => onOpen(p.id)}
              >
                <span className="workrow__fill" aria-hidden="true" />
                <span className="workrow__no pixel">{p.no}</span>
                <span className="workrow__title">
                  <span className="workrow__name">{p.title}</span>
                  <span className="workrow__sub">{p.subtitle}</span>
                </span>
                <span className="workrow__tags">
                  <span className="chip" style={{ borderColor: chipColor, color: chipColor }}>{p.tag}</span>
                  <span className="mono">{p.year}</span>
                </span>
                <span className="workrow__cta mono">View case <span className="arr">→</span></span>

                {isCoffee ? <CoffeeFan />
                  : isApmc  ? <ApmcPeek />
                  : isGreen ? <GreenstandPeek />
                  : isSlack ? <SlackPeek />
                  : (
                    <span className="workrow__peek" style={{ '--pk': p.accent === 'yellow' ? 'var(--yellow)' : 'var(--blue)' }}>
                      <Slot label={p.cover} />
                    </span>
                  )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, WorkIndex, CoffeeFan, ApmcPeek, GreenstandPeek, SlackPeek });
