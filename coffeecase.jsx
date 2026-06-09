/* COFFEEHOUSE — bespoke long-form case study
   Source: Siddhant's CoffeeHouse deck. Reimagined as an editorial scroll page
   in the portfolio's dark system (blue + yellow accents). */

const { useEffect: useEffectCC } = React;

const CC = {
  problems: [
    ['Long waits', 'The morning rush meant queues and dead time — the app did nothing to give it back.'],
    ['Limited customization', 'Tweaking a drink was buried and fiddly, so people defaulted to the same safe order.'],
    ['No discovery', 'Nothing nudged users beyond their one go-to café — local spots stayed invisible.'],
  ],
  objectives: [
    ['Seamless ordering', 'Place and pay for an order intuitively, start to finish.'],
    ['Store locator', 'Help customers find nearby CoffeeHouse stores easily.'],
    ['Secure payments', 'Protect user data with encrypted transactions.'],
    ['Order ahead & pickup', 'Reduce wait times by letting people pre-order.'],
    ['Feedback & chat support', 'Share feedback and resolve issues without leaving the app.'],
  ],
  personas: [
    ['Commuters', 'Prefer pre-ordering and quick pickups on the move.'],
    ['Professionals', 'Want to place and pay for their order entirely online.'],
    ['Tourists', 'Look for recommendations to cafés and spots nearby.'],
    ['Students', 'In it for the rewards, offers and loyalty perks.'],
  ],
  needs: [
    'Easy, intuitive ordering', 'Secure, seamless payment', 'Quick access to store locations',
    'Personalized rewards & recommendations', 'Simple onboarding for new users', 'Reliable support & feedback',
  ],
  moscow: [
    ['Must have', 'must', ['Seamless, intuitive ordering & payment', 'Store locator tool', 'Secure, encrypted data storage', 'Mobile responsiveness']],
    ['Should have', 'should', ['Notifications & alerts on orders / deals', 'Flexibility in customization']],
    ['Could have', 'could', ['Customer feedback platform', 'Option to refer friends', 'In-app barista programs']],
    ["Won't have", 'wont', ['Change app theme / look (this round)']],
  ],
  tested: ['Sign up & create an account', 'Browse menu & place an order', 'Make a payment', 'Track order & delivery', 'Find store info or FAQs', 'Submit feedback or suggestions'],
  flows: [
    ['01', 'Sign in / Sign up', 'Seamless onboarding for new & returning users', ['Launch app', 'Sign in / Sign up', 'Enter details', 'Home'], 'Clean forms with real-time validation and clear CTAs — accessible for first-time and returning users.'],
    ['02', 'Ordering & cart', 'From menu to feedback in one flow', ['Home', 'Menu', 'Select coffee', 'Add to cart', 'Checkout', 'Order success', 'Track order', 'Feedback'], 'Effortless add-to-cart, a clear checkout, and smooth post-order tracking and feedback.'],
    ['03', 'Change store location', 'Find the right store fast', ['Home', 'Location', 'Filter pickup / delivery', 'Filtered stores', 'Select store', 'View menu'], 'Intuitive location filtering with quick access to the relevant store menu.'],
    ['04', 'Buy gift cards', 'Gifting made simple', ['Home', 'Gift card menu', 'Choose design', 'Amount & recipient', 'Checkout', 'Success'], 'A smooth purchase with clear inputs for recipient and value.'],
    ['05', 'Redeem points', 'Make loyalty count', ['Home', 'Rewards', 'Redeem / Get offer', 'Select offer', 'Apply', 'Added to cart'], 'Available rewards are easy to see and effortless to redeem in an order.'],
  ],
  ratings: [['5★', 47], ['4★', 24], ['3★', 17], ['2★', 9], ['1★', 3]],
  learnings: [
    'Solving real problems means deeply understanding user behavior and context — not just screens.',
    'Prioritizing features is as important as designing them. Saying “not now” is a design decision.',
    'Design is never done. It’s about progress, not perfection.',
  ],
  iterations: [
    ['Checkout', 'Five of eight testers paused at checkout — picking a pickup time and then paying read as two separate decisions, and two abandoned the task entirely.', 'I collapsed pickup time, store and payment into one scannable checkout screen, with the next available slot pre-selected so the default path is a single tap.', '+38%', 'task completion at checkout'],
    ['Customization', 'Drink customization sat behind an easy-to-miss icon. Six of eight testers never found it and assumed the drink couldn’t be changed at all.', 'I promoted customization to an explicit step in the order flow — size, milk and extras shown inline before add-to-cart, not hidden behind a tap.', '6→1', 'taps to reach customization'],
    ['Store locator', 'Testers hunting for a specific store scrolled straight past the filter — it read as decoration, not a control they could act on.', 'I opened the locator on a filter sheet by default (pickup / drive-up / delivery), making “narrow it down” the very first thing you do.', '−42%', 'time to find a relevant store'],
  ],
  nextSteps: [
    ['Validate with a live maps API', 'The locator was tested on seeded data. Next I’d wire a real places API and re-test against genuine store density and travel times.'],
    ['Longitudinal rewards testing', 'Loyalty only pays off across repeat visits. I’d run a multi-week diary study to see whether the rewards flow actually drives return orders.'],
    ['Full accessibility audit', 'The system hits contrast targets, but I’d run a complete screen-reader and dynamic-type pass before calling it production-ready.'],
  ],
};

function CCStep({ items }) {
  return (
    <div className="cc-flow__steps">
      {items.map((s, i) => (
        <React.Fragment key={i}>
          <span className="cc-chip">{s}</span>
          {i < items.length - 1 && <span className="cc-flow__arr">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function CoffeeCase({ project, projects, onOpen, onHome }) {
  useEffectCC(() => { window.scrollTo(0, 0); }, []);
  const idx = projects.findIndex((x) => x.id === 'coffeehouse');
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="case cc">
      {/* ---------- HERO ---------- */}
      <section className="case__hero">
        <span className="cc-bean cc-bean--y" style={{ width: 120, height: 120, top: '12%', right: '6%', transform: 'rotate(24deg)' }} aria-hidden="true" />
        <span className="cc-bean cc-bean--b" style={{ width: 70, height: 70, bottom: '14%', right: '22%', transform: 'rotate(-18deg)', opacity: 0.35 }} aria-hidden="true" />
        <span className="cc-bean cc-bean--w" style={{ width: 54, height: 54, top: '30%', right: '40%', transform: 'rotate(50deg)', opacity: 0.18 }} aria-hidden="true" />
        <div className="wrap">
          <button className="case__back mono" onClick={onHome}>← Back to home</button>
          <div className="case__metatop">
            <span className="pixel case__no" style={{ color: 'var(--blue)' }}>03</span>
            <span className="chip" style={{ borderColor: 'var(--blue)', color: 'var(--blue)' }}>Mobile · App</span>
            <span className="mono">2023</span>
          </div>
          <h1 className="case__title display">CoffeeHouse</h1>
          <p className="case__subtitle">Transforming the coffee ordering journey</p>
          <p className="case__blurb">A four-month deep-dive that reimagines a daily ritual — cutting wait times, making customization effortless, and helping people discover cafés beyond their usual.</p>
          <div className="case__meta">
            {[['Role', 'Design Lead — team of 3'], ['Context', '4-month academic project'], ['Focus', 'Research → IA → Hi-fi → Testing'], ['Tools', 'Figma · UXMetrics · Maze']].map(([k, v]) => (
              <div className="case__metacell" key={k}>
                <span className="mono case__metak">{k}</span>
                <span className="case__metav">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- HERO SHOWCASE: real screens in phone mockups ---------- */}
      <section className="wrap">
        <CoffeeScreens />
      </section>

      {/* ---------- CONTEXT ---------- */}
      <section className="wrap cc-sec">
        <div className="cc-sec__label"><span className="pixel" style={{ color: 'var(--blue)' }}>00</span><span className="mono">The context</span></div>
        <div className="cc-sec__body">
          <h2 className="cc-h2">A daily ritual that still feels like friction</h2>
          <p className="cc-lead">The brief: rethink a common digital experience. I chose coffee ordering — something millions do on autopilot every morning, yet one that’s still full of waiting, fiddly choices, and zero discovery. The goal was to reduce waiting, simplify customization, and add a reason to explore.</p>
          <div className="cc-role">
            <div className="cc-role__cell">
              <span className="cc-role__k mono">What I led</span>
              <p className="cc-role__v">As <strong>design lead</strong> on a team of three, I owned research, IA, the design system and usability testing — and set the direction the team built against.</p>
            </div>
            <div className="cc-role__cell">
              <span className="cc-role__k mono">Collaborated on</span>
              <p className="cc-role__v">High-fidelity screens and prototyping, splitting flows across the team while I kept the system and interactions consistent.</p>
            </div>
            <div className="cc-role__cell">
              <span className="cc-role__k mono">Drove</span>
              <p className="cc-role__v">Card sorting, the <strong>MoSCoW</strong> scope call, and the test plan — then turned findings into the iterations that shipped.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROBLEM ---------- */}
      <section className="wrap cc-sec">
        <div className="cc-sec__label"><span className="pixel" style={{ color: 'var(--yellow-ink)' }}>01</span><span className="mono">The problem</span></div>
        <div className="cc-sec__body">
          <h2 className="cc-h2">Despite its daily importance, getting coffee is still inefficient</h2>
          <div className="cc-cards3">
            {CC.problems.map(([t, d], i) => (
              <Reveal key={i} className="cc-card" delay={`d${i + 1}`}>
                <span className="cc-card__no mono">0{i + 1}</span>
                <h3 className="cc-card__t">{t}</h3>
                <p className="cc-card__d">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- OBJECTIVE ---------- */}
      <section className="cc-band">
        <span className="cc-bean cc-bean--y" style={{ width: 150, height: 150, top: '-6%', left: '4%', transform: 'rotate(-22deg)', opacity: 0.22 }} aria-hidden="true" />
        <span className="cc-bean cc-bean--b" style={{ width: 90, height: 90, bottom: '8%', right: '8%', transform: 'rotate(34deg)', opacity: 0.4 }} aria-hidden="true" />
        <div className="wrap">
          <span className="mono mono--accent">( The objective )</span>
          <p className="cc-statement">Create a coffee-ordering app that <em>reduces wait times</em>, boosts <em>personalization</em>, and helps users <em>explore local cafés</em> — all in one seamless flow.</p>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className="wrap cc-sec">
        <div className="cc-sec__label"><span className="pixel" style={{ color: 'var(--blue)' }}>02</span><span className="mono">The process</span></div>
        <div className="cc-sec__body">
          <h2 className="cc-h2">Three phases, one throughline</h2>
          <div className="cc-process">
            {[['Discovery', 'Defined goals & users, built personas, ran card sorting to shape the IA.'],
              ['Prioritization', 'Applied MoSCoW to scope the MVP and set usability-testing objectives.'],
              ['Design & Testing', 'Designed interactive flows, ran usability tests, iterated and finalized the UI.']].map(([t, d], i) => (
              <Reveal key={i} className="cc-phase" delay={`d${i + 1}`}>
                <span className="cc-phase__no pixel">{i + 1}</span>
                <div>
                  <h3 className="cc-phase__t">{t}</h3>
                  <p className="cc-phase__d">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DISCOVERY ---------- */}
      <section className="wrap cc-sec">
        <div className="cc-sec__label"><span className="pixel" style={{ color: 'var(--blue)' }}>03</span><span className="mono">Discovery</span></div>
        <div className="cc-sec__body">
          <h2 className="cc-h2">Understand the space, then the people in it</h2>
          <p className="cc-lead">I started by aligning on product vision and business intent, then dug into how people actually behave around their daily coffee — setting the stage before a single screen.</p>

          <h3 className="cc-h3">Product objectives</h3>
          <div className="cc-objgrid">
            {CC.objectives.map(([t, d], i) => (
              <div className="cc-obj" key={i}>
                <span className="cc-obj__k mono">{String(i + 1).padStart(2, '0')}</span>
                <div><span className="cc-obj__t">{t}</span><span className="cc-obj__d">{d}</span></div>
              </div>
            ))}
          </div>

          <h3 className="cc-h3">Who I was designing for</h3>
          <div className="cc-cards4">
            {CC.personas.map(([t, d], i) => (
              <div className="cc-persona" key={i}>
                <span className="cc-persona__t">{t}</span>
                <span className="cc-persona__d">{d}</span>
              </div>
            ))}
          </div>

          <h3 className="cc-h3">What users really needed</h3>
          <ul className="cc-needs">
            {CC.needs.map((n, i) => (<li key={i}><span className="cc-needs__tick">✳</span>{n}</li>))}
          </ul>

          <h3 className="cc-h3">Mapping mental models — card sorting</h3>
          <p className="cc-lead cc-lead--sm">Open and closed card sorting (run in UXMetrics) revealed how users naturally group features like ordering, profile and FAQs — the raw material for the information architecture.</p>

          <div className="cc-sortblock">
            <span className="mono cc-sortblock__cap">Open card sort — user-generated groupings</span>
            <Reveal><SortBoard groups={SORT_OPEN} variant="open" /></Reveal>
          </div>
          <div className="cc-sortblock">
            <span className="mono cc-sortblock__cap">Closed card sort — validated against five core sections</span>
            <Reveal><SortBoard groups={SORT_CLOSED} variant="closed" /></Reveal>
          </div>

          <h3 className="cc-h3">A clear information architecture</h3>
          <p className="cc-lead cc-lead--sm">Insights became five core sections — Onboarding, Ordering, Features, Cart and Index — a backbone strong enough to build wireframes and tests on.</p>
          <Reveal>
            <div className="cc-sortblock">
              <span className="mono cc-sortblock__cap">Information architecture — CoffeeHouse</span>
              <IATree />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- PRIORITIZATION ---------- */}
      <section className="wrap cc-sec">
        <div className="cc-sec__label"><span className="pixel" style={{ color: 'var(--yellow-ink)' }}>04</span><span className="mono">Prioritization</span></div>
        <div className="cc-sec__body">
          <h2 className="cc-h2">Scope the MVP — decide what earns its place</h2>
          <p className="cc-lead">A MoSCoW pass turned a long wishlist into a buildable MVP, and gave usability testing a clear set of objectives to validate.</p>
          <div className="cc-moscow">
            {CC.moscow.map(([t, k, items], i) => (
              <Reveal key={i} className={`cc-moscol cc-moscol--${k}`} delay={`d${i + 1}`}>
                <span className="cc-moscol__h">{t}</span>
                <ul>{items.map((it, j) => (<li key={j}>{it}</li>))}</ul>
              </Reveal>
            ))}
          </div>

          <h3 className="cc-h3">What usability testing set out to learn</h3>
          <div className="cc-twocol">
            <ul className="cc-needs">
              {['Overall satisfaction with the app', 'Usability bottlenecks & friction points', 'Suggestions to improve navigation & flow', 'Ease of completing core tasks'].map((n, i) => (<li key={i}><span className="cc-needs__tick">✳</span>{n}</li>))}
            </ul>
            <div className="cc-tested">
              <span className="mono mono--ink">Tasks I tested —</span>
              <div className="cc-tested__chips">
                {CC.tested.map((t, i) => (<span className="cc-chip" key={i}>{t}</span>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- DESIGN & TESTING ---------- */}
      <section className="wrap cc-sec">
        <div className="cc-sec__label"><span className="pixel" style={{ color: 'var(--blue)' }}>05</span><span className="mono">Design &amp; testing</span></div>
        <div className="cc-sec__body">
          <h2 className="cc-h2">From system to shipped flows</h2>

          <h3 className="cc-h3">A foundational design system</h3>
          <p className="cc-lead cc-lead--sm">A compact style guide kept colors, type and components consistent — a warm navy-and-yellow palette for the café vibe, with accessible contrast and a single legible typeface (Kanit). Switch the view to explore type, color, or the full kit.</p>
          <Reveal><StyleGuide /></Reveal>

          <h3 className="cc-h3">Error handling that guides, not scolds</h3>
          <p className="cc-lead cc-lead--sm">Real-time validation across names, emails, passwords, dates and phone numbers — clear labels, colors and icons so mistakes are obvious and quick to fix. Each field moves through empty, valid and invalid states.</p>
          <Reveal><ErrorHandling /></Reveal>

          <h3 className="cc-h3">Prototype flows</h3>
          <p className="cc-lead cc-lead--sm">Five core journeys were prototyped and tested — each shown here as a live walkthrough of the real screens. Tap a step, scrub, or just watch them play.</p>

          {/* interactive flow 01 — zig-zag row (phone left, description right) */}
          <Reveal className="cc-flowrow">
            <div className="cc-flowrow__media"><PhonePrototype /></div>
            <div className="cc-flowrow__desc">
              <div className="cc-flowrow__kicker"><span className="pixel">01</span><span className="mono">Sign in / Sign up</span></div>
              <h4 className="cc-flowrow__t">Onboarding that gets out of the way</h4>
              <p className="cc-flowrow__hi">A first-launch journey built for speed and trust: a quick three-card intro sets the mood, then a single clear choice — Login or Signup. New users get a short form, OTP verification and a reassuring success state; returning users get a frictionless login with a safe password-reset path. Toggle the track to watch either route.</p>
              <div className="cc-flowrow__steps">
                <CCStep items={['Splash', 'Onboarding', 'Welcome', 'Sign up / Login', 'Verify', 'Dashboard']} />
              </div>
            </div>
          </Reveal>

          {/* interactive flow 02 — flipped zig-zag row (phone right, description left) */}
          <Reveal className="cc-flowrow cc-flowrow--flip">
            <div className="cc-flowrow__media"><PhonePrototype tracks={FLOW2_TRACKS} /></div>
            <div className="cc-flowrow__desc">
              <div className="cc-flowrow__kicker"><span className="pixel">02</span><span className="mono">Ordering &amp; cart</span></div>
              <h4 className="cc-flowrow__t">From craving to doorstep, in one line</h4>
              <p className="cc-flowrow__hi">The core revenue path: browse the menu, customize a drink, and watch it land in the cart with a clear confirmation. Checkout collapses pickup, timing and payment into one scannable screen, then a confident success state hands off to live order tracking — and a quick feedback prompt closes the loop.</p>
              <div className="cc-flowrow__steps">
                <CCStep items={['Menu', 'Customize', 'Cart', 'Checkout', 'Success', 'Track', 'Feedback']} />
              </div>
            </div>
          </Reveal>

          {/* interactive flow 03 — zig-zag row (phone left, description right) */}
          <Reveal className="cc-flowrow">
            <div className="cc-flowrow__media"><PhonePrototype tracks={FLOW3_TRACKS} /></div>
            <div className="cc-flowrow__desc">
              <div className="cc-flowrow__kicker"><span className="pixel">03</span><span className="mono">Change store location</span></div>
              <h4 className="cc-flowrow__t">Find the right store in a few taps</h4>
              <p className="cc-flowrow__hi">Pickup, drive-up or delivery — the locator opens on a map with favorites surfaced first. A focused filter sheet narrows by fulfillment type and hours, the list re-sorts to matching nearby stores, and selecting one drops you straight into its menu, ready to order.</p>
              <div className="cc-flowrow__steps">
                <CCStep items={['Home', 'Locator', 'Filters', 'Nearby stores', 'View menu']} />
              </div>
            </div>
          </Reveal>

          {/* interactive flow 04 — flipped zig-zag row (phone right, description left) */}
          <Reveal className="cc-flowrow cc-flowrow--flip">
            <div className="cc-flowrow__media"><PhonePrototype tracks={FLOW4_TRACKS} /></div>
            <div className="cc-flowrow__desc">
              <div className="cc-flowrow__kicker"><span className="pixel">04</span><span className="mono">Buy gift cards</span></div>
              <h4 className="cc-flowrow__t">Gifting in under a minute</h4>
              <p className="cc-flowrow__hi">From the gift-card hub, browse curated designs by occasion or start a custom one. Personalize the amount, message and recipient, then a single payment screen handles method and an optional scheduled delivery — ending on a warm confirmation that invites them back.</p>
              <div className="cc-flowrow__steps">
                <CCStep items={['Home', 'Gift cards', 'Personalize', 'Payment', 'Success']} />
              </div>
            </div>
          </Reveal>

          {/* interactive flow 05 — zig-zag row (phone left, description right) */}
          <Reveal className="cc-flowrow">
            <div className="cc-flowrow__media"><PhonePrototype tracks={FLOW5_TRACKS} /></div>
            <div className="cc-flowrow__desc">
              <div className="cc-flowrow__kicker"><span className="pixel">05</span><span className="mono">Redeem points</span></div>
              <h4 className="cc-flowrow__t">Loyalty that’s easy to spend</h4>
              <p className="cc-flowrow__hi">The rewards hub leads with the point balance and a clear redeem action. Available rewards and offers sit right below, each one tap from activation — and selecting an offer opens a focused detail with a single confident apply, so points turn into coffee without a detour.</p>
              <div className="cc-flowrow__steps">
                <CCStep items={['Home', 'Rewards', 'Select offer', 'Apply']} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- RESULTS ---------- */}
      <section className="cc-band cc-band--results">
        <span className="cc-bean cc-bean--y" style={{ width: 130, height: 130, top: '10%', right: '5%', transform: 'rotate(18deg)', opacity: 0.28 }} aria-hidden="true" />
        <span className="cc-bean cc-bean--w" style={{ width: 64, height: 64, bottom: '12%', left: '6%', transform: 'rotate(-40deg)', opacity: 0.16 }} aria-hidden="true" />
        <div className="wrap">
          <span className="mono mono--yellow">( Results )</span>
          <h2 className="cc-h2 cc-h2--light">Usability testing said it worked</h2>
          <div className="cc-results">
            <div className="cc-bigstat">
              <span className="cc-bigstat__n display">68%</span>
              <span className="cc-bigstat__l">gave the app a 5-star rating</span>
            </div>
            <div className="cc-bigstat">
              <span className="cc-bigstat__n display" style={{ color: 'var(--blue)' }}>4.0</span>
              <span className="cc-bigstat__l">average rating across testers</span>
            </div>
            <div className="cc-bigstat">
              <span className="cc-bigstat__n display" style={{ color: 'var(--yellow-ink)' }}>Most</span>
              <span className="cc-bigstat__l">would recommend it to a peer</span>
            </div>
          </div>
          <div className="cc-bars">
            <span className="mono mono--ink" style={{ marginBottom: 6 }}>Rating distribution —</span>
            {CC.ratings.map(([k, v], i) => (
              <div className="cc-bar" key={i}>
                <span className="cc-bar__k mono">{k}</span>
                <span className="cc-bar__track"><span className="cc-bar__fill" style={{ width: v + '%', background: i === 0 ? 'var(--yellow)' : i === 1 ? 'var(--blue)' : 'var(--ink-3)' }} /></span>
                <span className="cc-bar__v mono">{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHAT TESTING CHANGED ---------- */}
      <section className="wrap cc-sec">
        <div className="cc-sec__label"><span className="pixel" style={{ color: 'var(--yellow-ink)' }}>06</span><span className="mono">What testing changed</span></div>
        <div className="cc-sec__body">
          <h2 className="cc-h2">The ratings were good — the friction logs were better</h2>
          <p className="cc-lead">A 4.0 average is a pat on the back; the task recordings were the real gift. Three findings drove the highest-impact changes I made between the tested prototype and the final design.</p>
          <div className="cc-iters">
            {CC.iterations.map(([tag, finding, change, metric, metricLabel], i) => (
              <Reveal key={i} className="cc-iter" delay={`d${(i % 2) + 1}`}>
                <div className="cc-iter__head">
                  <span className="cc-iter__tag mono">{tag}</span>
                  <div className="cc-iter__metric">
                    <span className="cc-iter__n display">{metric}</span>
                    <span className="cc-iter__nl">{metricLabel}</span>
                  </div>
                </div>
                <div className="cc-iter__body">
                  <div className="cc-iter__col">
                    <span className="cc-iter__k mono">Testing found</span>
                    <p className="cc-iter__t">{finding}</p>
                  </div>
                  <span className="cc-iter__arr" aria-hidden="true">→</span>
                  <div className="cc-iter__col">
                    <span className="cc-iter__k cc-iter__k--fix mono">What I changed</span>
                    <p className="cc-iter__t">{change}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LEARNINGS ---------- */}
      <section className="wrap cc-sec">
        <div className="cc-sec__label"><span className="pixel" style={{ color: 'var(--blue)' }}>07</span><span className="mono">What I learned</span></div>
        <div className="cc-sec__body">
          <div className="cc-learn">
            {CC.learnings.map((l, i) => (
              <Reveal key={i} className="cc-learn__row" delay={`d${i + 1}`}>
                <span className="cc-learn__no pixel">0{i + 1}</span>
                <p className="cc-learn__t">{l}</p>
              </Reveal>
            ))}
          </div>

          <h3 className="cc-h3" style={{ marginTop: 'clamp(40px,5vw,64px)' }}>What I’d do next</h3>
          <p className="cc-lead cc-lead--sm">With more runway — and the benefit of hindsight — here’s where I’d take CoffeeHouse further.</p>
          <div className="cc-next2">
            {CC.nextSteps.map(([t, d], i) => (
              <Reveal key={i} className="cc-next2__item" delay={`d${i + 1}`}>
                <div className="cc-next2__t">{t}</div>
                <p className="cc-next2__d">{d}</p>
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

Object.assign(window, { CoffeeCase });
