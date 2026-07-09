/* ABOUT + REVIEWS */

function Turntable() {
  const [playing, setPlaying] = React.useState(false);
  const [secs, setSecs] = React.useState(0);
  const [cover, setCover] = React.useState('');
  const audioRef = React.useRef(null);

  // real cover art via iTunes (no local Infinity image in assets) — same
  // source the ⌘K "now playing" uses; falls back to the gradient tile.
  React.useEffect(() => {
    const cb = '__tt_np_' + Math.random().toString(36).slice(2);
    const s = document.createElement('script');
    const timer = setTimeout(() => finish(''), 4500);
    function finish(url) { clearTimeout(timer); setCover(url); try { delete window[cb]; } catch (e) {} if (s.parentNode) s.parentNode.removeChild(s); }
    window[cb] = (d) => { const r = d && d.results && d.results[0]; finish(r && r.artworkUrl100 ? r.artworkUrl100.replace('100x100', '400x400') : ''); };
    s.src = 'https://itunes.apple.com/search?term=' + encodeURIComponent('The Band Camino Infinity') + '&entity=song&limit=1&callback=' + cb;
    s.onerror = () => finish('');
    document.head.appendChild(s);
    return () => { clearTimeout(timer); };
  }, []);

  // audio from assets: play on hover, stop + rewind on leave
  React.useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio('assets/music/Infinity.mp3');
      a.volume = 0.7; a.loop = true; audioRef.current = a;
    }
    const a = audioRef.current;
    if (playing) { try { a.currentTime = 0; } catch (e) {} a.play().catch(() => {}); }
    else { a.pause(); try { a.currentTime = 0; } catch (e) {} }
  }, [playing]);
  React.useEffect(() => () => { if (audioRef.current) audioRef.current.pause(); }, []);

  // elapsed-time readout
  React.useEffect(() => {
    if (!playing) { setSecs(0); return; }
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [playing]);
  const time = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
  return (
    <div className={'tt' + (playing ? ' is-playing' : '')}
         onMouseEnter={() => setPlaying(true)}
         onMouseLeave={() => setPlaying(false)}>
      <div className="tt__deck">
        <div className="tt__record" aria-hidden="true"><span className="tt__spindle"></span></div>
        <div className="tt__sleeve" aria-hidden="true">
          <div className="tt__art"><span className="tt__inf">∞</span><span className="tt__artname">The Band Camino</span></div>
          {cover ? <img className="tt__cover" src={cover} alt="" /> : null}
        </div>
        <div className="tt__arm" aria-hidden="true"><span className="tt__head"></span></div>
      </div>
      <div className="tt__meta">
        <span className="mono mono--accent tt__eyebrow">{playing ? '/ Now playing' : '/ On repeat'}</span>
        <span className="tt__title">Infinity</span>
        <span className="tt__artist">The Band Camino</span>
        <div className="tt__lcd">
          <span className="tt__play">{playing ? '❚❚' : '▶'}</span>
          <span className="tt__time">{time}</span>
          <span className="tt__eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        </div>
      </div>
    </div>
  );
}

function About({ profile, reviews }) {
  const facts = [
    ['50K+', 'People reached worldwide'],
    ['03', 'Products shipped, one taken 0→1'],
    ['05', 'Years in the messy middle'],
  ];
  const habits = [
    { n: '01', t: 'Systems over screens', d: 'I fix the source, not the symptom. On Greenstand I built one design system so two apps finally spoke the same language.', proof: 'Greenstand', id: 'greenstand' },
    { n: '02', t: 'Research earns the pixels', d: 'Opinions are cheap; tests aren’t. CoffeeHouse ran 24 usability sessions before I trusted a single flow.', proof: 'CoffeeHouse', id: 'coffeehouse' },
    { n: '03', t: 'Prototype to decide', d: 'I argue with prototypes, not slides. The fastest way to kill a weak idea is to feel it in your hand.', proof: 'Slack', id: 'slack' },
    { n: '04', t: 'Ship, then measure', d: 'Design isn’t done at handoff. APMC’s site is still live and in use two years after I moved on.', proof: 'APMC', id: 'apmc' },
  ];
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="block-head">
          <span className="pixel block-head__no">03</span>
          <div className="block-head__main">
            <span className="mono mono--accent">About</span>
            <h2 className="block-head__title display">Five years of<br />making it click</h2>
          </div>
        </div>

        <div className="about__grid">
          <Reveal className="about__lead">
            <p className="about__statement">
              I’m a product designer who believes the best work
              <em> disappears</em>. You don’t notice the design, you just
              get what you came for.
            </p>
            <p className="about__body">
              Over five years I’ve worked across design systems, marketing sites
              and mobile products, for non-profits scaling globally, B2B
              marketplaces chasing clarity, and consumer apps fighting for the
              morning rush. I like the messy middle: turning a vague problem and
              a wall of constraints into something that feels obvious in hindsight.
            </p>
            <p className="about__body">
              My north star is simple, and it’s on the wall:
              <span className="pixel about__pix"> Building things that make people’s days a little&nbsp;better.</span>
            </p>

            <figure className="about__mantra">
              <span className="mono mono--yellow about__mantra-eyebrow">The mantra I’ve always lived by</span>
              <blockquote className="about__mantra-quote">
                It ain’t about how hard you hit. It’s about how hard you can get hit and keep moving forward; how much you can take and keep moving forward. That’s how winning is done!
              </blockquote>
              <figcaption className="about__mantra-cite">Rocky Balboa, and honestly, how I treat feedback.</figcaption>
            </figure>

            {/* sign-off — fills the space under the mantra; switch via Tweaks */}
            <div className="signoff signoff--sign" aria-label="Signature">
              <span className="signoff__name">Siddhant</span>
              <svg className="signoff__underline" viewBox="0 0 240 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 8 C 46 2, 92 11, 138 6 S 214 2, 237 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
              <span className="signoff__tag mono">Boston, MA · still tinkering</span>
            </div>
            <div className="signoff signoff--vinyl" aria-label="On repeat">
              <Turntable />
            </div>
            <div className="signoff signoff--stamp" aria-label="Made with care">
              <div className="stamp" aria-hidden="true">
                <svg className="stamp__ring" viewBox="0 0 120 120">
                  <defs><path id="signoffStampPath" d="M60,16 a44,44 0 1,1 -0.01,0" /></defs>
                  <text><textPath href="#signoffStampPath" startOffset="0">· MADE WITH CARE · BOSTON, MA · DESIGNED &amp; BUILT BY SIDDHANT </textPath></text>
                </svg>
                <span className="stamp__mark">✷</span>
              </div>
            </div>
          </Reveal>

          <div className="about__side">
            <div className="about__photo">
              <Slot img="assets/siddhant-about.jpg" alt="Siddhant Nagraj" corner="ME" objectPosition="50% 32%" style={{ aspectRatio: '4/5' }} />
              <div className="abcl" aria-label="A few photos of me, hover to spread, click one to view">
                <div className="abcl__poster abp1"><img src="assets/about/poster-hozier.jpeg" alt="" /><span className="abcl__pcap">five o’clock somewhere</span></div>
                <div className="abcl__poster abp2"><img src="assets/about/poster-dietcoke.jpeg" alt="" /><span className="abcl__pcap">technically lunch</span></div>
                <div className="abcl__poster abp3"><img src="assets/about/poster-porsche.jpeg" alt="" /><span className="abcl__pcap">on repeat, sorry</span></div>
                <div className="abcl__poster abp4"><img src="assets/about/poster-norisk.jpeg" alt="" /><span className="abcl__pcap">the entire philosophy</span></div>
                <div className="abcl__poster abp5"><img src="assets/about/poster-oceanic.png" alt="" /><span className="abcl__pcap">my whole palette, basically</span></div>
                <div className="abcl__poster abp6"><img src="assets/about/poster-nectarine.png" alt="" /><span className="abcl__pcap">the warm half</span></div>
                <figure className="abcl__pol abc2"><img className="abcl__media" src="assets/about/p2-museum.jpg" alt="" /><figcaption className="abcl__cap">ink &amp; nerve</figcaption></figure>
                <figure className="abcl__pol abc3"><img className="abcl__media" src="assets/about/p3-coffee.jpg" alt="" /><figcaption className="abcl__cap">third place</figcaption></figure>
                <figure className="abcl__pol abc4"><img className="abcl__media" src="assets/about/p4-harley.jpg" alt="" /><figcaption className="abcl__cap">weekend</figcaption></figure>
                <figure className="abcl__pol abc5"><video className="abcl__media" src="assets/about/clip-video-2.mp4" muted loop playsInline autoPlay></video><figcaption className="abcl__cap">in motion</figcaption></figure>
                <figure className="abcl__pol abc1"><img className="abcl__media" src="assets/about/p1-city.jpg" alt="" /><figcaption className="abcl__cap">that’s me</figcaption></figure>
              </div>
            </div>
            <div className="about__facts">
              {facts.map(([n, l], i) => (
                <Reveal key={i} className="fact" delay={`d${i + 1}`}>
                  <span className="fact__n pixel">{n}</span>
                  <span className="fact__l mono">{l}</span>
                </Reveal>
              ))}
            </div>
            <div className="about__now">
              <span className="mono mono--accent about__now-k">/ Currently</span>
              <p className="about__now-line">Deep in space documentaries, new Figma features and progressive overloading.</p>
            </div>
          </div>
        </div>

        {/* how I work */}
        <div className="about__how">
          <div className="how__head">
            <span className="mono mono--accent">How I work</span>
            <h3 className="how__title display">Four habits I bring<br />to every project</h3>
          </div>
          <div className="how__grid">
            {habits.map((h, i) => (
              <a className="how" key={i} href={`#project/${h.id}`}>
                <span className="how__n pixel">{h.n}</span>
                <span className="how__t display">{h.t}</span>
                <span className="how__d">{h.d}</span>
                <span className="how__link mono">See it in {h.proof} →</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="reviews" id="reviews">
        <div className="wrap">
          <div className="reviews__head">
            <span className="mono mono--yellow">( What teammates say )</span>
            <h3 className="reviews__title display">Words from<br />the people I’ve built with</h3>
          </div>
          <div className="reviews__grid">
            {reviews.map((r, i) => (
              <Reveal key={i} className="quote" delay={`d${i % 3 + 1}`}>
                <span className="quote__mark" style={{ color: r.accent === 'yellow' ? 'var(--yellow-ink)' : 'var(--blue)' }}>“</span>
                <p className="quote__text">{r.quote}</p>
                <div className="quote__by">
                  <span className="quote__name">{r.name}</span>
                  <span className="mono">{r.role}, {r.company}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About });
