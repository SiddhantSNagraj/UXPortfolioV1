/* SLACK, "Reimagined" concept / playground case study.
   Self-initiated mobile redesign. Real wireframe → hi-fi process pulled from
   the Figma file. Honestly framed: a craft + POV piece, no client, no metrics. */

const { useEffect: useEffectSL } = React;

const SL = {
  problems: [
    ['Clutter', 'Too much packed into every screen, the eye never gets to rest.'],
    ['Overwhelming', 'New users meet a wall of channels, threads and menus all at once.'],
    ['Complex', 'Core actions hide behind nested menus and long-press gestures.'],
    ['Unorganized', 'DMs, channels, saved items and people each follow a different mental model.'],
    ['Notifications', 'Everything pings at the same volume, so nothing actually feels important.'],
    ['Inconsistent', 'Spacing, icons and hierarchy drift from one screen to the next.'],
  ],
  wireframes: [
    ['wf-splash.png', 'Sign-in options'],
    ['wf-onboarding1.png', 'Onboarding · welcome'],
    ['wf-onboarding2.png', 'Onboarding · features'],
    ['wf-login.png', 'Login'],
    ['wf-workspaces.png', 'Workspaces'],
    ['wf-search.png', 'Search'],
    ['wf-flagged.png', 'Flagged'],
    ['wf-you.png', 'Profile'],
  ],
  hifi: [
    ['hi-login.png', '01', 'Login'],
    ['hi-home.png', '02', 'Home · channels'],
    ['hi-dms.png', '03', 'Direct Messages'],
    ['hi-search.png', '04', 'Search'],
    ['hi-flagged.png', '05', 'Flagged'],
    ['hi-workspaces.png', '06', 'Workspaces'],
    ['hi-you.png', '07', 'You · profile'],
  ],
  decisions: [
    ['Bottom tab bar', 'The biggest fix. Five core destinations, Home, DM’s, Search, Flags, You, sit in a persistent bottom bar, so the whole app is one tap away instead of buried behind a hamburger menu.'],
    ['One calm dark surface', 'A single, consistent dark theme with generous spacing and a clear type hierarchy. The screen finally has room to breathe, and the eye knows where to land.'],
    ['A real search hub', 'Search gets its own tab, Browse People, Channels and Workspaces, so finding something stops being a treasure hunt through menus.'],
    ['Flagged, in one place', 'Saved people and channels collected under a single Flags tab, so the things you actually care about aren’t scattered across the app.'],
    ['A cleaner workspace switcher', 'Hopping between Mavericks, Apple, Nike and the rest becomes a calm, logo-led list instead of a cramped rail of tiny squares.'],
    ['Restrained accent', 'Slack’s yellow anchors just one job, the New Chat action and key CTAs, while pink and green unread badges carry only enough colour to signal what truly needs you.'],
  ],
  nextSteps: [
    ['Test the navigation model', 'The bottom bar is my bet that flattening navigation helps. I’d run a first-click and tree-test to confirm people genuinely find things faster.'],
    ['Pressure-test at scale', 'My concept uses a handful of channels and workspaces. I’d validate the hierarchy holds up for power users living in dozens of each.'],
    ['Respect the muscle memory', 'Millions know today’s Slack cold. I’d study which changes truly help versus which just break familiarity, and earn each one.'],
  ],
};

function SlackCase({ project, projects, onOpen, onHome }) {
  useEffectSL(() => { window.scrollTo(0, 0); }, []);
  const idx = projects.findIndex((x) => x.id === 'slack');
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="case sl">
      <CaseSectionNav sectionSelector=".sl-sec, .sl-band" />
      {/* ---------- HERO ---------- */}
      <section className="case__hero">
        <div className="wrap">
          <button className="case__back mono" onClick={onHome}>← Back to home</button>
          <div className="case__metatop">
            <span className="pixel case__no" style={{ color: 'var(--sl-lilac)' }}>04</span>
            <span className="sl-ribbon"><span className="sl-ribbon__dot" />Concept · Self-initiated</span>
            <span className="mono">2026</span>
          </div>
          <h1 className="case__title display">Slack</h1>
          <p className="case__subtitle">Reimagined, a self-initiated mobile redesign for clearer navigation &amp; calmer UI</p>
          <p className="case__blurb">No brief, no client, no metrics, just a designer scratching an itch. I’ve always found Slack <strong>confusing to navigate</strong>, so I redesigned the mobile app end to end: from problem framing and lo-fi wireframes to a full hi-fi system built on one idea, make the things that matter easy to reach.</p>
          <div className="case__meta">
            {[['Type', 'Concept · Playground'], ['Focus', 'Mobile navigation & UI'], ['Platform', 'iOS · dark mode'], ['Tools', 'Figma']].map(([k, v]) => (
              <div className="case__metacell" key={k}>
                <span className="mono case__metak">{k}</span>
                <span className="case__metav">{v}</span>
              </div>
            ))}
          </div>
          <p className="sl-disclaimer">An independent concept made for practice, not affiliated with, endorsed by, or commissioned by Slack. All trademarks belong to their owners.</p>
        </div>
      </section>

      <CaseTLDR items={[
        ['The itch', 'Slack\u2019s mobile navigation always felt confusing to me, so I redesigned it for fun.'],
        ['My role', 'Self-initiated concept: solo, no brief, no client, pure craft and point of view.'],
        ['What I made', '8 wireframes to 7 hi-fi screens, built around a bottom tab bar and one calm dark surface.'],
        ['The honest part', 'No research claims here. I state my POV and exactly what I\u2019d validate next.'],
      ]} />

      {/* ---------- HERO SHOWPIECE ---------- */}
      <section className="wrap">
        <div className="sl-hero3">
          <div className="sl-ip sl-hero3__ph sl-hero3__ph--side sl-hero3__ph--l">
            <span className="sl-ip__btn" aria-hidden="true" />
            <div className="sl-ip__screen"><span className="sl-ip__island" aria-hidden="true" /><img src="assets/slack/hi-dms.png" alt="Redesigned Direct Messages screen" loading="eager" /></div>
          </div>
          <div className="sl-ip sl-hero3__ph sl-hero3__ph--c">
            <span className="sl-ip__btn" aria-hidden="true" />
            <div className="sl-ip__screen"><span className="sl-ip__island" aria-hidden="true" /><img src="assets/slack/hi-home.png" alt="Redesigned Home / channels screen" loading="eager" /></div>
          </div>
          <div className="sl-ip sl-hero3__ph sl-hero3__ph--side sl-hero3__ph--r">
            <span className="sl-ip__btn" aria-hidden="true" />
            <div className="sl-ip__screen"><span className="sl-ip__island" aria-hidden="true" /><img src="assets/slack/hi-you.png" alt="Redesigned profile screen" loading="eager" /></div>
          </div>
        </div>
      </section>

      {/* ---------- THE ITCH ---------- */}
      <section className="wrap sl-sec">
        <div className="sl-sec__label"><span className="pixel" style={{ color: 'var(--sl-lilac)' }}>00</span><span className="mono">The itch</span></div>
        <div className="sl-sec__body">
          <h2 className="sl-h2">Why I bothered</h2>
          <p className="sl-lead">Slack is built for the way teams work, but as a collaborative tool, it lives or dies on efficiency, clarity and feel. It’s the app I spend my day in and the one I fight with most. This wasn’t a research project; it was me trusting a gut feeling enough to design through it. I started by naming what actually makes it feel harder than it should.</p>
          <div className="sl-probtags">
            {SL.problems.map(([t]) => (
              <span className="sl-probtag" key={t}><span className="sl-probtag__x">✕</span>{t}</span>
            ))}
          </div>
          <h3 className="sl-h3">Unpacking each one</h3>
          <div className="sl-probs">
            {SL.problems.map(([t, d]) => (
              <div className="sl-prob" key={t}>
                <span className="sl-prob__k">{t}</span>
                <span className="sl-prob__d">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- POV BAND ---------- */}
      <section className="sl-band">
        <div className="wrap">
          <span className="mono mono--plum">( My point of view )</span>
          <p className="sl-statement">A workspace should make the <em>next thing you need</em> the easiest thing to reach, everything else can wait <em>quietly</em>.</p>
        </div>
      </section>

      {/* ---------- WIREFRAMES ---------- */}
      <section className="wrap sl-sec">
        <div className="sl-sec__label"><span className="pixel" style={{ color: 'var(--sl-lilac)' }}>01</span><span className="mono">Wireframes</span></div>
        <div className="sl-sec__body">
          <h2 className="sl-h2">Structure first, in lo-fi</h2>
          <p className="sl-lead">Before any colour or polish, I sketched the whole flow in lo-fi, sign-in, onboarding, and the core screens, to lock the navigation model and hierarchy while they were still cheap to change.</p>
          <div className="sl-phonegrid">
            {SL.wireframes.map(([src, label], i) => (
              <Reveal key={i} className="sl-phone sl-phone--wf" delay={`d${(i % 4) + 1}`}>
                <div className="sl-phone__scr"><img src={`assets/slack/${src}`} alt={`${label} wireframe`} loading="lazy" /></div>
                <div className="sl-phone__cap"><span className="sl-phone__n">WF</span><span className="sl-phone__t">{label}</span></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- HI-FI ---------- */}
      <section className="wrap sl-sec">
        <div className="sl-sec__label"><span className="pixel" style={{ color: 'var(--sl-lilac)' }}>02</span><span className="mono">The redesign</span></div>
        <div className="sl-sec__body">
          <h2 className="sl-h2">Same Slack, fewer decisions per glance</h2>
          <p className="sl-lead">I kept what people know, the aubergine, the channel model, the rhythm of conversation, and spent my energy on hierarchy and navigation: what floats up, what tucks away, and where colour earns its place.</p>
          <div className="sl-phonegrid">
            {SL.hifi.map(([src, n, label], i) => (
              <Reveal key={i} className="sl-phone" delay={`d${(i % 4) + 1}`}>
                <div className="sl-phone__scr"><img src={`assets/slack/${src}`} alt={`${label}, redesigned screen`} loading="lazy" /></div>
                <div className="sl-phone__cap"><span className="sl-phone__n">{n}</span><span className="sl-phone__t">{label}</span></div>
              </Reveal>
            ))}
          </div>

          <h3 className="sl-h3">The decisions behind it</h3>
          <div className="sl-decgrid">
            {SL.decisions.map(([t, d], i) => (
              <Reveal key={i} className="sl-decrow" delay={`d${(i % 3) + 1}`}>
                <span className="sl-decrow__n">0{i + 1}</span>
                <div>
                  <div className="sl-decrow__t">{t}</div>
                  <p className="sl-decrow__d">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHAT I'D VALIDATE NEXT ---------- */}
      <section className="wrap sl-sec">
        <div className="sl-sec__label"><span className="pixel" style={{ color: 'var(--sl-lilac)' }}>03</span><span className="mono">If this were real</span></div>
        <div className="sl-sec__body">
          <h2 className="sl-h2">What I’d validate next</h2>
          <p className="sl-lead">This is a concept, and I’d be the first to say a redesign without research is just a strong opinion. If I took it further, here’s how I’d earn the changes.</p>
          <div className="sl-next2" style={{ marginTop: 'clamp(20px,2.5vw,30px)' }}>
            {SL.nextSteps.map(([t, d], i) => (
              <Reveal key={i} className="sl-next2__item" delay={`d${i + 1}`}>
                <div className="sl-next2__t">{t}</div>
                <p className="sl-next2__d">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NEXT ---------- */}
      <section className="case__next" onClick={() => onOpen(next.id)}>
        <div className="wrap case__nextrow">
          <div>
            <span className="mono mono--accent">( Next project )</span>
            <h2 className="case__nexttitle display">{next.title}</h2>
            <span className="case__nextsub">{next.subtitle}</span>
          </div>
          <span className="case__nextarr">→</span>
        </div>
      </section>
    </article>
  );
}

Object.assign(window, { SlackCase });
