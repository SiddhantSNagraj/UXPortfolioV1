/* COFFEEHOUSE — interactive auto-play prototype flow (Sign in / Sign up)
   Real screen exports in the minimal thin-frame phone, looping with
   pause + scrub controls and a New-user / Returning track toggle. */

const { useState: useStateF, useEffect: useEffectF, useRef: useRefF } = React;

const FLOW_TRACKS = {
  'New user': [
    ['flow/splash.png', 'Splash'],
    ['flow/onb1.png', 'Onboarding — choose'],
    ['flow/onb2.png', 'Onboarding — loyalty'],
    ['flow/onb3.png', 'Onboarding — relax'],
    ['flow/welcome.png', 'Welcome'],
    ['flow/signup.png', 'Sign up'],
    ['flow/verify.png', 'Verification'],
    ['flow/congrats.png', 'Success'],
    ['flow/dashboard.png', 'Dashboard'],
  ],
  'Returning': [
    ['flow/splash.png', 'Splash'],
    ['flow/welcome.png', 'Welcome'],
    ['flow/login.png', 'Login'],
    ['flow/forgot.png', 'Forgot password'],
    ['flow/verify.png', 'Verification'],
    ['flow/dashboard.png', 'Dashboard'],
  ],
};

const FLOW2_TRACKS = {
  'Ordering & cart': [
    ['flow2/dashboard.png', 'Home'],
    ['flow2/menu.png', 'Drinks menu'],
    ['flow2/details.png', 'Customize drink'],
    ['flow2/added.png', 'Added to cart'],
    ['flow2/cart.png', 'Cart'],
    ['flow2/checkout.png', 'Checkout'],
    ['flow2/success.png', 'Order placed'],
    ['flow2/tracking.png', 'Track order'],
    ['flow2/tracking2.png', 'Order status'],
    ['flow2/feedback.png', 'Feedback'],
  ],
};

const FLOW3_TRACKS = {
  'Change store location': [
    ['flow3/home.png', 'Home'],
    ['flow3/location.png', 'Store locator'],
    ['flow3/filters.png', 'Select filters'],
    ['flow3/filtered.png', 'Filtered stores'],
    ['flow3/menu.png', 'View menu'],
  ],
};

const FLOW4_TRACKS = {
  'Buy gift cards': [
    ['flow4/home.png', 'Home'],
    ['flow4/cards.png', 'Gift cards'],
    ['flow4/create.png', 'Personalize'],
    ['flow4/payment.png', 'Payment'],
    ['flow4/success.png', 'Success'],
  ],
};

const FLOW5_TRACKS = {
  'Redeem points': [
    ['flow5/home.png', 'Home'],
    ['flow5/rewards.png', 'Rewards & offers'],
    ['flow5/offer.png', 'Activate offer'],
  ],
};

const STEP_MS = 1900;

function PhonePrototype({ tracks = FLOW_TRACKS }) {
  const trackKeys = Object.keys(tracks);
  const [track, setTrack] = useStateF(trackKeys[0]);
  const [i, setI] = useStateF(0);
  const [playing, setPlaying] = useStateF(true);
  const [progress, setProgress] = useStateF(0); // 0..1 within current step
  const screens = tracks[track] || tracks[trackKeys[0]];
  const raf = useRefF(0);
  const start = useRefF(0);

  // preload
  useEffectF(() => {
    Object.values(tracks).flat().forEach(([src]) => { const im = new Image(); im.src = 'assets/coffee/' + src; });
  }, [tracks]);

  // autoplay engine (rAF for smooth scrubber)
  useEffectF(() => {
    if (!playing) return;
    let active = true;
    start.current = performance.now() - progress * STEP_MS;
    const tick = (now) => {
      if (!active) return;
      const p = (now - start.current) / STEP_MS;
      if (p >= 1) {
        setI((v) => (v + 1) % screens.length);
        start.current = now;
        setProgress(0);
      } else {
        setProgress(p);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { active = false; cancelAnimationFrame(raf.current); };
    // eslint-disable-next-line
  }, [playing, i, track]);

  // reset when track changes
  useEffectF(() => { setI(0); setProgress(0); }, [track]);

  const go = (n) => { setI((n + screens.length) % screens.length); setProgress(0); start.current = performance.now(); };

  return (
    <div className="cph-stage cfp">
      {trackKeys.length > 1 && (
        <div className="cfp__track-toggle">
          {trackKeys.map((k) => (
            <button key={k} className={`cfp__tt ${track === k ? 'is-on' : ''}`} onClick={() => setTrack(k)}>{k}</button>
          ))}
        </div>
      )}

      <div className="cph cfp__phone">
        <div className="cph__frame">
          <div className="cph__screen">
            <div className="cph__notch" />
            {screens.map(([src, label], idx) => (
              <img
                key={src + idx}
                className="cfp__img"
                src={'assets/coffee/' + src}
                alt={label}
                loading="eager"
                style={{ opacity: idx === i ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* current label */}
      <div className="cfp__nowlabel">
        <span className="mono mono--accent">{String(i + 1).padStart(2, '0')}</span>
        <span className="cfp__nowname">{screens[i][1]}</span>
        <span className="mono cfp__count">{i + 1} / {screens.length}</span>
      </div>

      {/* scrubber */}
      <div className="cfp__scrub">
        {screens.map((s, idx) => (
          <button key={idx} className="cfp__seg" onClick={() => go(idx)} aria-label={`Go to ${s[1]}`}>
            <span className="cfp__seg-fill" style={{ width: idx < i ? '100%' : idx === i ? `${progress * 100}%` : '0%' }} />
          </button>
        ))}
      </div>

      {/* transport */}
      <div className="cfp__transport">
        <button className="cfp__btn" onClick={() => go(i - 1)} aria-label="Previous">‹</button>
        <button className="cfp__btn cfp__btn--play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
          {playing
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7z" /></svg>}
        </button>
        <button className="cfp__btn" onClick={() => go(i + 1)} aria-label="Next">›</button>
      </div>
    </div>
  );
}

Object.assign(window, { PhonePrototype, FLOW_TRACKS, FLOW2_TRACKS, FLOW3_TRACKS, FLOW4_TRACKS, FLOW5_TRACKS });
