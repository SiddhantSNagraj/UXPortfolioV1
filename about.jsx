/* ABOUT + REVIEWS */

function About({ profile, reviews }) {
  const facts = [
    ['05', 'Years designing products'],
    ['03', 'Disciplines, systems, web, mobile'],
    ['∞', 'Pixels sweated'],
  ];
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="block-head">
          <span className="pixel block-head__no">03</span>
          <div className="block-head__main">
            <span className="mono mono--accent">( About )</span>
            <h2 className="block-head__title display">Five years of<br />making it click</h2>
          </div>
        </div>

        <div className="about__grid">
          <Reveal className="about__lead">
            <p className="about__statement">
              I’m a product designer who believes the best work
              <em> disappears</em>, you don’t notice the design, you just
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
              <span className="pixel about__pix"> Creating experiences people&nbsp;like.</span>
            </p>

            <figure className="about__mantra">
              <span className="mono mono--yellow about__mantra-eyebrow">The mantra I’ve always lived by</span>
              <blockquote className="about__mantra-quote">
                It ain’t about how hard you hit. It’s about how hard you can get hit and keep moving forward; how much you can take and keep moving forward. That’s how winning is done!
              </blockquote>
              <figcaption className="about__mantra-cite">, Rocky Balboa</figcaption>
            </figure>
          </Reveal>

          <div className="about__side">
            <Slot img="assets/siddhant.png" alt="Siddhant Nagraj" corner="ME" objectPosition="50% 25%" style={{ aspectRatio: '4/5' }} />
            <div className="about__facts">
              {facts.map(([n, l], i) => (
                <Reveal key={i} className="fact" delay={`d${i + 1}`}>
                  <span className="fact__n pixel">{n}</span>
                  <span className="fact__l mono">{l}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* approach pills */}
        <div className="about__approach">
          <span className="mono mono--ink" style={{ marginRight: 8 }}>How I work,</span>
          {['Systems thinking', 'Research-led', 'Prototype to decide', 'Ship & measure', 'Sweat the type'].map((t, i) => (
            <span className="pill" key={i}>{t}</span>
          ))}
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
