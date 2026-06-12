/* APMC, Northeastern Protothon 5.0 website redesign case study */

const { useEffect: useEffectAM } = React;

const AM = {
  phases: [
    ['01', 'Understand', ['User research', 'User interviews (11+)', 'Community forum analysis', 'Persona creation']],
    ['02', 'Explore', ['Insight clustering', 'Mapping user needs', 'Feature brainstorming', 'Feature prioritization']],
    ['03', 'Execution', ['Lo-fi sketches', 'Mid-fi wireframes', 'Hi-fi UI on Wix + Figma', 'Usability testing']],
  ],
  interviews: [
    ['📋', 'Info was scattered', 'Users struggled to find schedules and event details, key info was buried or unclear.'],
    ['⚠️', 'Participation felt risky', 'Students feared missing deadlines; faculty lacked clarity on their role.'],
    ['❓', 'Vague CTA language', 'Unclear call-to-action copy left users uncertain of next steps.'],
  ],
  pulse: [
    'Real-time questions in FB groups revealed exactly what users couldn\'t find on the site.',
    'Peer replies filling gaps showed students had become unofficial help desks, a gap the site should own.',
    'Discussions hinted at missed opportunities to convert interest into actual event signups.',
  ],
  priority: [
    ['High', ['About Us', 'Home Page', 'Events Page', 'Contact us & Social Media', 'Meet the Team', 'Videos & images of the club', 'Sign up / Sign in', 'Resources 1.0 + RSVP Events', 'Viewing other members']],
    ['Medium', ['Resources 2.0', 'Newsletter', 'Resume Review', { label: 'Protothon', sub: ['Problem Statement', 'Booking mentors', 'Qualifier slot', 'Finale Ticket'] }, 'Resources for Protothon']],
    ['Low', ['Blog / testimonials / videos', 'Guest Blog', 'Mock interviews', 'Product case studies']],
  ],
  userMap: [
    ['New User', [
      ['Events & programs by the club', 'base'], ['Current team & contacting them', 'base'], ['About the club', 'base'],
      ['Individual space for events', 'key'], ['Club resources & community help', 'base'], ['Sign up as a member', 'base'],
      ['Student hub', 'key'], ['Social media', 'base'], ['Contact us', 'base'], ['Student support', 'key'],
    ]],
    ['Both', [
      ['Future events & RSVP', 'base'], ['Previous events', 'base'], ['PM 101 resources', 'key'], ['Newsletter', 'key'],
    ]],
    ['Existing User', [
      ['Feed', 'base'], ['Resume review', 'key'], ['Summer / Fall internship', 'key'], ['View other members', 'base'],
      ['Interview prep material', 'base'], ['Mock interview', 'key'], ['PM study material / guidelines', 'cut'],
      ['Resources library', 'idea'], ['Course & certification', 'idea'], ['Guest blogs', 'base'], ['Product showcases, compare products', 'idea'],
    ]],
  ],
  exec: [
    ['Mid-fidelity wireframes', 'Refined the information architecture and tested the homepage → schedule → registration path to cut drop-off before committing to visuals.', 'assets/apmc/wireframes.png'],
    ['An early direction', 'A first full-fidelity pass, a bold, photo-driven hero and clearer event framing that I put in front of users.', 'assets/apmc/v1-home.png'],
    ['The final website', 'Shipped on Wix: a warm, photo-led homepage with prominent CTAs, a clear program lineup, and the 400+ member community front and center.', 'assets/apmc/cover.png'],
    ['Program &amp; judges detail', 'Deeper pages, Protothon details, judges, and rewards, all built on the same visual system for consistency.', 'assets/apmc/judges.png'],
  ],
  improvements: [
    ['01', 'Clearer visual hierarchy', 'Used real photography and typographic contrast to guide users through content naturally, eliminating the visual noise of the old site.'],
    ['02', 'Accessible event info', 'Moved upcoming events to the top and made RSVP easier to find and act on, the most critical action now has the most prominent placement.'],
    ['03', 'Unified brand language', 'Replaced conflicting styles with a cohesive visual system rooted in Northeastern\'s identity. One design language, across every page.'],
  ],
  metrics: [
    ['695', '', 'Sessions tracked during usability testing'],
    ['6.5k', '', 'Total clicks analysed across the flow'],
    ['4', '', 'Rage clicks, the interface rarely fought users'],
    ['3:48m', '', 'Average time on page'],
    ['47.8%', '↑', 'Average scroll depth, pushed key content earlier'],
    ['36.2%', '↓', 'Drop-off rate, led me to simplify registration'],
  ],
  learnings: [
    'Balancing speed with UX quality in a real launch scenario, when the event is in 3 months, every decision is a trade-off.',
    'Rapid testing with real users uncovers critical gaps that no amount of internal review finds.',
    'Cross-functional collaboration was the single biggest factor in shipping on time, design doesn\'t ship alone.',
  ],
  outcomes: [
    ['Shipped on deadline', 'Delivered the full redesign in the 3-month window, kickoff to live, in time for Protothon 5.0.'],
    ['Became the club\'s platform', 'Adopted as APMC\'s permanent home, not a one-off event page. Every program the club runs now lives on the system I designed.'],
    ['Still live, 2+ years on', 'In continuous use across multiple Protothon cycles, two years after I left the club, with no redesign needed.'],
  ],
  nextSteps: [
    ['Instrument analytics from day one', 'I added Hotjar after launch. Next time I\'d define success metrics and event tracking before the build, so conversion is measurable from the first visit.'],
    ['Pressure-test the mobile timeline', 'The horizontal timeline shines on desktop; on small screens it needs a dedicated round of testing I didn\'t have time for.'],
    ['Document a reusable component library', 'Wix limited true components. A documented system would let the next club lead ship new events solo, without rebuilding patterns.'],
  ],
  wfNotes: [
    [
      ['Photo-letter hero', 'Spells APMC in event photos, not stock art. Community-first signal before a single line of copy.'],
      ['Staggered programs grid', 'Alternating card heights break monotony of flat rows, adds rhythm without extra visual weight.'],
      ['Empty events kept in', 'Honest empty state vs. hiding the section, sets expectation so users know where to return.'],
    ],
    [
      ['Two CTAs above fold', 'Register deck + Book slot side by side, the two jobs users come to do, visible immediately.'],
      ['Horizontal timeline', 'Dates as a milestone rail, same info as a bullet list but a fraction of the words.'],
      ['Logos before the brief', 'Social proof before commitment lowers hesitation, who\'s involved matters as much as what.'],
    ],
  ],
  finalNotes: [
    [
      ['Real photos in the letters', 'Tested against illustrations in user sessions, real people won 2:1. Warmth over polish.'],
      ['Dark hero anchors hierarchy', 'High contrast pushes both CTA buttons to the foreground. Dark also hides seam between letter photos.'],
      ['Red from NU\'s identity', 'Pulled directly from Northeastern\'s brand, instantly familiar without needing to explain the club.'],
    ],
    [
      ['Red problem-statement card', 'Isolated highlight so it cannot be scrolled past unread. The brief is the whole event.'],
      ['Mentor logos lifted up', 'Heatmaps showed cold engagement below the fold, logos moved up after testing; click rate doubled.'],
      ['Consistent photo-led system', 'Same visual language across every deep page: judges, prizes, resources, feels like one product.'],
    ],
  ],
};

function ApmcCase({ project, projects, onOpen, onHome }) {
  useEffectAM(() => { window.scrollTo(0, 0); }, []);
  const idx = projects.findIndex((x) => x.id === 'apmc');
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="case am">
      <CaseSectionNav sectionSelector=".am-sec, .am-band" />
      {/* HERO */}
      <section className="case__hero am-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="wrap am-hero__wrap">
          <div className="am-hero__left">
            <button className="case__back mono" onClick={onHome}>← Back to home</button>
            <div className="case__metatop">
              <span className="pixel case__no" style={{ color: 'var(--yellow-ink)' }}>02</span>
              <span className="chip" style={{ borderColor: 'var(--yellow-ink)', color: 'var(--yellow-ink)' }}>Web · UX</span>
              <span className="mono">2023</span>
            </div>
            <h1 className="case__title display">APMC</h1>
            <p className="case__subtitle">Website Redesign, Northeastern Protothon 5.0</p>
            <p className="case__blurb">A full UX redesign of a university club's event website, from buried information and vague CTAs to a clear, conversion-driven experience that launched for Protothon 5.0. <a className="am-live" href="https://www.apmcneu.com/" target="_blank" rel="noreferrer"><span className="am-live__dot" />Still live &amp; in use today ↗</a>, two years after I left APMC.</p>
            <div className="am-herocta">
              <a className="am-visit" href="https://www.apmcneu.com/" target="_blank" rel="noreferrer">Visit the live site <span className="am-visit__url">apmcneu.com</span> <span className="am-visit__arr">↗</span></a>
            </div>
          </div>

          {/* device strip */}
          <div className="am-hero__devices">
            <div className="am-hero__floor">
              <div className="am-hlaptop">
                <div className="am-hlaptop__screen">
                  <div className="am-hlaptop__view">
                    <img src="assets/apmc/final-home-web.jpg" alt="APMC homepage" loading="eager" />
                  </div>
                </div>
                <div className="am-hlaptop__chin" />
                <div className="am-hlaptop__base" />
              </div>
              <div className="am-hphone">
                <div className="am-hphone__frame">
                  <div className="am-hphone__notch" />
                  <div className="am-hphone__view">
                    <img src="assets/apmc/final-protothon-web.jpg" alt="APMC Protothon page" loading="eager" />
                  </div>
                  <div className="am-hphone__bar" />
                </div>
              </div>
            </div>
          </div>

          <div className="case__meta" style={{ marginTop: 'clamp(28px,4vw,48px)' }}>
            {[['Role', 'Lead Product Designer'], ['Context', 'Aspiring Product Managers Club · Northeastern'], ['Timeline', '3 months, kickoff to launch'], ['Tools', 'Figma · Wix · Heatmaps']].map(([k, v]) => (
              <div className="case__metacell" key={k}>
                <span className="mono case__metak">{k}</span>
                <span className="case__metav">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="am-band" data-navskip="true" style={{ marginTop: 'clamp(40px,6vw,80px)' }}>
        <div className="wrap am-band__inner">
          {[['450+', 'Sessions from launch'], ['700+', 'Daily active users'], ['2 yrs+', 'Still live &amp; in use today']].map(([n, l], i) => (
            <Reveal key={i} className="am-stat" delay={`d${i + 1}`}>
              <span className="am-stat__n" style={{ color: i === 1 ? 'var(--ink)' : 'var(--accent)' }}>{n}</span>
              <span className="am-stat__l">{l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <CaseTLDR items={[
        ['The problem', 'The club\u2019s event site buried schedules and CTAs, so visitors couldn\u2019t tell what Protothon was or how to join.'],
        ['My role', 'Lead Product Designer, research through launch in 3 months, with 2 club designers and 3 engineers.'],
        ['What shipped', 'A conversion-driven redesign built on Wix, validated with usability tests and heatmaps.'],
        ['The outcome', '450+ sessions at launch, 700+ daily active users, still the club\u2019s live site 2 years on.'],
      ]} />

      {/* CONTEXT */}
      <section className="wrap am-sec">
        <div className="am-sec__label"><span className="pixel">00</span><span className="mono">Context</span></div>
        <div className="am-sec__body">
          <h2 className="am-h2">A student club, a real event, a tight deadline</h2>
          <p className="am-lead">Sept 2023. The Aspiring Product Managers Club at Northeastern University needed a full redesign of their event website for Protothon 5.0, a hackathon bringing together students, judges, sponsors and faculty. The old site wasn't keeping up with the event's ambition. The redesign I shipped is <strong>still the club's live site two years on</strong>, now running Protothon 6.0.</p>
          <div className="am-role">
            <div className="am-role__cell">
              <span className="am-role__k">What I led</span>
              <p className="am-role__v"><strong>End-to-end UX</strong>, research, IA, wireframes, usability testing, and the shipped build on Wix.</p>
            </div>
            <div className="am-role__cell">
              <span className="am-role__k">Collaborated on</span>
              <p className="am-role__v">Visual direction with <strong>2 club designers</strong>; content and event logic with the Protothon organizing team.</p>
            </div>
            <div className="am-role__cell">
              <span className="am-role__k">Worked with</span>
              <p className="am-role__v">Club leadership, faculty advisors, and <strong>11+ interview participants</strong> across students and staff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="wrap am-sec">
        <div className="am-sec__label"><span className="pixel" style={{ color: 'var(--yellow-ink)' }}>01</span><span className="mono">The problem</span></div>
        <div className="am-sec__body">
          <h2 className="am-h2">The site was making the event look small</h2>
          <p className="am-lead">The old APMC site had three compounding problems, any one alone would cost signups. Together they made the event harder to discover, understand, and join. Here it is, annotated.</p>

          <Reveal className="am-probmap">
            {/* left column callouts */}
            <div className="am-probmap__col am-probmap__col--left">
              <div className="am-prob am-prob--1">
                <span className="am-prob__num">1</span>
                <div>
                  <span className="am-prob__t">Cluttered, flat navigation</span>
                  <p className="am-prob__d">Seven peer links crammed across the top, schedules, registration and key info were buried with no hierarchy or clear path.</p>
                  <span className="am-prob__ref">→ top navigation bar</span>
                </div>
              </div>
              <div className="am-prob am-prob--3">
                <span className="am-prob__num">3</span>
                <div>
                  <span className="am-prob__t">A dead-end events section</span>
                  <p className="am-prob__d">The one place people came to act read “No upcoming events at the moment”, no CTA, no next step, no reason to sign up.</p>
                  <span className="am-prob__ref">→ community / events block</span>
                </div>
              </div>
            </div>

            {/* centered screenshot with pins */}
            <div className="am-probmap__shot">
              <img src="assets/apmc/old-site.png" alt="The original APMC website homepage before the redesign" loading="lazy" />
              <span className="am-pin am-pin--1" style={{ top: '3.5%', left: '62%' }}>1</span>
              <span className="am-pin am-pin--2" style={{ top: '42%', left: '50%' }}>2</span>
              <span className="am-pin am-pin--3" style={{ top: '88%', left: '50%' }}>3</span>
            </div>

            {/* right column callouts */}
            <div className="am-probmap__col am-probmap__col--right">
              <div className="am-prob am-prob--2">
                <span className="am-prob__num">2</span>
                <div>
                  <span className="am-prob__t">Off-brand, inconsistent visuals</span>
                  <p className="am-prob__d">Loud stock illustrations and clashing styles undercut the event’s credibility, it looked like a club page, not a flagship hackathon.</p>
                  <span className="am-prob__ref">→ hero &amp; Protothon block</span>
                </div>
              </div>
              <div className="am-prob am-prob--note">
                <p className="am-prob__d am-prob__d--quiet">Net effect: visitors couldn’t tell <em>what</em> Protothon was, <em>when</em> it ran, or <em>how</em> to join, so most simply left.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OBJECTIVE BAND */}
      <section className="am-band" style={{ position: 'relative', overflow: 'hidden' }}>
        <img className="am-husky am-husky--obj" src="assets/apmc/husky-mark.png" alt="" aria-hidden="true" />
        <div className="wrap">
          <span className="mono mono--accent">( The objective )</span>
          <p className="am-h2" style={{ marginTop: 20, maxWidth: '26ch', fontSize: 'clamp(26px,3.4vw,48px)' }}>Redesign the site to boost engagement, drive signups, and lower bounce, in time for Protothon 5.0.</p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="wrap am-sec">
        <div className="am-sec__label"><span className="pixel">02</span><span className="mono">Process</span></div>
        <div className="am-sec__body">
          <h2 className="am-h2">Three phases, three weeks, one launch</h2>
          <div className="am-phases" style={{ marginTop: 8 }}>
            {AM.phases.map(([no, t, steps]) => (
              <Reveal key={no} className="am-phase">
                <span className="am-phase__no">{no}</span>
                <div className="am-phase__t">{t}</div>
                <ul className="am-phase__steps">
                  {steps.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* UNDERSTAND */}
      <section className="wrap am-sec">
        <div className="am-sec__label"><span className="pixel">03</span><span className="mono">Understand</span></div>
        <div className="am-sec__body">
          <h2 className="am-h2">Two weeks of listening before a single pixel</h2>
          <p className="am-lead">Dived into an intensive 2-week research sprint: 11+ user interviews with students and faculty, college forum analysis, and persona creation to map behavior patterns.</p>

          <h3 className="am-h3">What interviews revealed</h3>
          <div className="am-insights">
            {AM.interviews.map(([icon, t, d], i) => (
              <Reveal key={i} className="am-insight" delay={`d${i + 1}`}>
                <span className="am-insight__icon">{icon}</span>
                <div className="am-insight__t">{t}</div>
                <p className="am-insight__d">{d}</p>
              </Reveal>
            ))}
          </div>

          <h3 className="am-h3">Community pulse, Facebook groups</h3>
          <p className="am-lead am-lead--sm">Real users in public forums were doing the site's job for it, answering each other's questions. That told me exactly where the site was failing.</p>
          <div className="am-pulse">
            {AM.pulse.map((p, i) => (
              <Reveal key={i} className="am-pulse__item" delay={`d${i + 1}`}>
                <span className="am-pulse__dot">✳</span>
                <span>{p}</span>
              </Reveal>
            ))}
          </div>

          <h3 className="am-h3">The community I designed for</h3>
          <p className="am-lead am-lead--sm">Not abstract personas on a slide, a real, 400+ member club of Northeastern students chasing product careers. Designing for them meant designing for their energy.</p>
          <Reveal>
            <div className="am-community">
              <div className="am-community__photo">
                <img src="assets/apmc/community.png" alt="APMC members gathered at a Protothon event" loading="lazy" />
              </div>
              <div className="am-community__side">
                <img className="am-community__seal" src="assets/apmc/seal.png" alt="Northeastern University seal" loading="lazy" />
                <p className="am-community__note">Aspiring Product Managers Club, Northeastern University, Boston. A student-run community of 400+ aspiring PMs.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="wrap am-sec">
        <div className="am-sec__label"><span className="pixel" style={{ color: 'var(--yellow-ink)' }}>04</span><span className="mono">Explore</span></div>
        <div className="am-sec__body">
          <h2 className="am-h2">Too many insights, I needed a way to cut through</h2>
          <p className="am-lead">I clustered raw needs by user type, then ran a team brainstorm to score every feature by impact, turning a messy wishlist into a clear build order.</p>

          <h3 className="am-h3">Mapping user needs</h3>
          <p className="am-lead am-lead--sm">An affinity map split needs across <strong>new</strong> members, <strong>returning</strong> members, and the <strong>overlap</strong>, so the IA could serve both first-timers and regulars.</p>
          <Reveal>
            <div className="am-artifact">
              <div className="am-artifact__bar">
                <span className="am-artifact__file mono">affinity-map · user-needs.fig</span>
                <div className="am-legend">
                  <span className="am-legend__i"><span className="am-key am-key--key" />Key need</span>
                  <span className="am-legend__i"><span className="am-key am-key--idea" />New idea</span>
                  <span className="am-legend__i"><span className="am-key am-key--cut" />Deprioritized</span>
                </div>
              </div>
              <div className="am-affinity">
                {AM.userMap.map(([group, items]) => (
                  <div className="am-aff__col" key={group}>
                    <span className="am-aff__head">{group}</span>
                    <div className="am-aff__cards">
                      {items.map(([label, kind], j) => (
                        <span className={`am-card am-card--${kind}`} key={j}>{label}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <h3 className="am-h3">Prioritizing features for impact</h3>
          <p className="am-lead am-lead--sm">A High / Medium / Low pass scoped the MVP, what had to ship for Protothon 5.0, what could wait, and what was a nice-to-have.</p>
          <Reveal>
            <div className="am-artifact">
              <div className="am-artifact__bar">
                <span className="am-artifact__file mono">priority-matrix · mvp-scope.fig</span>
              </div>
              <div className="am-priority">
                {AM.priority.map(([label, items], i) => (
                  <div key={label} className={`am-pricol am-pricol--${['high','med','low'][i]}`}>
                    <div className="am-pricol__h">{label} priority</div>
                    <ul>
                      {items.map((it, j) => (
                        typeof it === 'string'
                          ? <li key={j}>{it}</li>
                          : <li key={j} className="am-pricol__group">{it.label}
                              <ul className="am-pricol__sub">{it.sub.map((s) => <li key={s}>{s}</li>)}</ul>
                            </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WIREFRAMES */}
      <section className="wrap am-sec">
        <div className="am-sec__label"><span className="pixel">05</span><span className="mono">Wireframes</span></div>
        <div className="am-sec__body">
          <h2 className="am-h2">Mapping the whole structure before any visuals</h2>
          <p className="am-lead">Before committing to type, colour, or photography, I wireframed both key pages end to end, locking information architecture, hierarchy, and CTA placement in low fidelity. Structural problems surfaced early, while they were still cheap to fix.</p>
          <div className="am-show">
            {[
              ['Homepage', 'apmc.northeastern.edu', 'assets/apmc/wf-home.png', 0],
              ['Protothon page', 'apmc.northeastern.edu/protothon', 'assets/apmc/wf-protothon.png', 1],
            ].map(([name, url, src, ni], i) => (
              <Reveal key={i} className="am-showcol" delay={`d${i + 1}`}>
                <div className="am-showcol__head">
                  <span className="am-showcol__pill am-showcol__pill--wf">Wireframe</span>
                  <span className="am-showcol__name">{name}</span>
                  <span className="am-showcol__rule" />
                </div>
                <div className="am-showwrap">
                  <div className="am-frame am-frame--wf">
                    <div className="am-frame__bar"><span className="am-frame__dot" /><span className="am-frame__dot" /><span className="am-frame__dot" /><span className="am-frame__url">{url}</span></div>
                    <div className="am-frame__view"><img src={src} alt={`${name}, full low-fidelity wireframe`} loading="lazy" /></div>
                  </div>
                  <div className="am-stickies">
                    {AM.wfNotes[ni].map(([t, d], j) => (
                      <div key={j} className="am-sticky"><b>{t}</b>{d}</div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL DESIGN */}
      <section className="wrap am-sec">
        <div className="am-sec__label"><span className="pixel" style={{ color: 'var(--yellow-ink)' }}>06</span><span className="mono">Final design</span></div>
        <div className="am-sec__body">
          <h2 className="am-h2">The shipped site, built on Wix, live today</h2>
          <p className="am-lead">The same skeleton, now in full fidelity: a warm, photo-led system rooted in Northeastern's identity, with the 400+ member community and the most important actions pushed to the top of every page.</p>
          <div className="am-show">
            {[
              ['Homepage', 'apmcneu.com', 'assets/apmc/final-home-web.jpg', 0],
              ['Protothon page', 'apmcneu.com/protothon', 'assets/apmc/final-protothon-web.jpg', 1],
            ].map(([name, url, src, ni], i) => (
              <Reveal key={i} className="am-showcol" delay={`d${i + 1}`}>
                <div className="am-showcol__head">
                  <span className="am-showcol__pill am-showcol__pill--final">Final</span>
                  <span className="am-showcol__name">{name}</span>
                  <span className="am-showcol__rule" />
                </div>
                <div className="am-showwrap">
                  <div className="am-frame am-frame--final">
                    <div className="am-frame__bar"><span className="am-frame__dot" /><span className="am-frame__dot" /><span className="am-frame__dot" /><span className="am-frame__url">{url}</span></div>
                    <div className="am-frame__view"><img src={src} alt={`${name}, full final shipped design`} loading="lazy" /></div>
                  </div>
                  <div className="am-stickies">
                    {AM.finalNotes[ni].map(([t, d], j) => (
                      <div key={j} className={`am-sticky am-sticky--final`}><b>{t}</b>{d}</div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <h3 className="am-h3">What I improved</h3>
          <div className="am-impr">
            {AM.improvements.map(([no, t, d]) => (
              <Reveal key={no} className="am-impr__row">
                <span className="am-impr__no">{no}</span>
                <div>
                  <div className="am-impr__t">{t}</div>
                  <p className="am-impr__d">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <h3 className="am-h3">Usability testing, what the data told me</h3>
          <p className="am-lead am-lead--sm">I ran Hotjar across the live Protothon site, click maps and scroll depth showing where attention, and friction, actually landed. Three screens drove the biggest changes.</p>
          <Reveal>
            <div className="am-heatgrid">
              <figure className="am-heatfig am-heatfig--reg">
                <div className="am-heatfig__frame">
                  <img src="assets/apmc/heatmap.png" alt="Click heatmap of the Protothon registration screen" loading="lazy" />
                </div>
                <figcaption className="am-heatfig__note">
                  <span className="mono am-heatfig__tag">01 · Registration screen</span>
                  <p>Clicks bunched on the top nav and the red register CTA. The problem-statement copy in the middle ran cold, people skim straight to the action.</p>
                </figcaption>
              </figure>
              <figure className="am-heatfig am-heatfig--res">
                <div className="am-heatfig__frame">
                  <img src="assets/apmc/heatmap-resources.png" alt="Click heatmap of the Resources cards" loading="lazy" />
                </div>
                <figcaption className="am-heatfig__note">
                  <span className="mono am-heatfig__tag">02 · Resources cards</span>
                  <p>The middle “Previous Decks” card ran hottest, teams wanted prior examples first, so I led the lineup with it.</p>
                </figcaption>
              </figure>
              <figure className="am-heatfig am-heatfig--judges">
                <div className="am-heatfig__frame">
                  <img src="assets/apmc/heatmap-judges.png" alt="Scroll-depth heatmap of the Judges and rules section" loading="lazy" />
                </div>
                <figcaption className="am-heatfig__note">
                  <span className="mono am-heatfig__tag">03 · Judges &amp; rules, scroll depth</span>
                  <p>Engagement fell off sharply below the judges row. The rules panel and prize icons sat in a cold zone, so I tightened the page and lifted the essentials higher.</p>
                </figcaption>
              </figure>
            </div>
          </Reveal>
          <div className="am-metrics" style={{ marginTop: 'clamp(20px,2.5vw,32px)' }}>
            {AM.metrics.map(([n, arr, d], i) => (
              <Reveal key={i} className="am-metric" delay={`d${i + 1}`}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span className="am-metric__n" style={{ color: ['var(--accent)', 'var(--ink)', 'var(--accent)', 'var(--ink)', 'var(--accent)', 'var(--ink)'][i] }}>{n}</span>
                  <span className="am-metric__arrow">{arr}</span>
                </div>
                <p className="am-metric__d">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="wrap am-sec">
        <div className="am-sec__label"><span className="pixel" style={{ color: 'var(--yellow-ink)' }}>07</span><span className="mono">Outcomes</span></div>
        <div className="am-sec__body">
          <h2 className="am-h2">The redesign didn't just launch, it stuck</h2>
          <p className="am-lead">The clearest measure of a club site isn't launch-day polish, it's whether the next team keeps using it. This one outlived my time at APMC.</p>
          <div className="am-out">
            {AM.outcomes.map(([t, d], i) => (
              <Reveal key={i} className="am-out__card" delay={`d${i + 1}`}>
                <div className="am-out__t">{t}</div>
                <p className="am-out__d">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNINGS */}
      <section className="wrap am-sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <img className="am-husky am-husky--learn" src="assets/apmc/husky-mark.png" alt="" aria-hidden="true" />
        <div className="am-sec__label"><span className="pixel">08</span><span className="mono">Learnings</span></div>
        <div className="am-sec__body">
          <div className="am-learn">
            {AM.learnings.map((l, i) => (
              <Reveal key={i} className="am-learn__row" delay={`d${i + 1}`}>
                <span className="am-learn__no">0{i + 1}</span>
                <p className="am-learn__t">{l}</p>
              </Reveal>
            ))}
          </div>

          <h3 className="am-h3" style={{ marginTop: 'clamp(36px,4.5vw,60px)' }}>What I'd do next</h3>
          <p className="am-lead am-lead--sm">With more time, and the benefit of hindsight, here's where I'd take it further.</p>
          <div className="am-next2">
            {AM.nextSteps.map(([t, d], i) => (
              <Reveal key={i} className="am-next2__item" delay={`d${i + 1}`}>
                <div className="am-next2__t">{t}</div>
                <p className="am-next2__d">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT */}
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

Object.assign(window, { ApmcCase });
