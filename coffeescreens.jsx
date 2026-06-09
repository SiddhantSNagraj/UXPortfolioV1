/* COFFEEHOUSE — hero screens showcase using REAL exports.
   Three switchable layout variants: Stack · Fan · Strip. */

const { useState: useStateS } = React;

const HERO_SCREENS = [
  ['flow2/details.png', 'Customize'],
  ['flow2/dashboard.png', 'Home'],
  ['flow2/menu.png', 'Menu'],
  ['flow2/cart.png', 'Cart'],
  ['flow2/tracking.png', 'Track order'],
];

function PhotoPhone({ src, label, size = 'sm', showLabel = true }) {
  return (
    <div className={`cph cph--${size}`}>
      <div className="cph__frame">
        <div className="cph__screen">
          <div className="cph__notch" />
          <img className="cph__photo" src={'assets/coffee/' + src} alt={label} loading="lazy" />
        </div>
      </div>
      {showLabel && <span className="cph__label">{label}</span>}
    </div>
  );
}

const HERO_VARIANTS = ['Stack', 'Fan', 'Strip'];

function CoffeeScreens() {
  const [variant, setVariant] = useStateS('Strip');
  const [hero, ...rest] = HERO_SCREENS;

  return (
    <div className="cc-screens cph-stage" data-variant={variant.toLowerCase()}>
      <div className="cc-screens__bar">
        <span className="mono mono--accent">✳ High-fidelity screens — real CoffeeHouse design exports</span>
        <div className="cc-screens__switch">
          {HERO_VARIANTS.map((v) => (
            <button key={v} className={`cc-screens__sw ${variant === v ? 'is-on' : ''}`} onClick={() => setVariant(v)}>{v}</button>
          ))}
        </div>
      </div>

      {variant === 'Stack' && (
        <div className="cc-screens__stack">
          <Reveal className="cc-screens__hero"><PhotoPhone src={hero[0]} label={hero[1]} size="hero" /></Reveal>
          <div className="cc-screens__grid">
            {rest.map(([src, label], i) => (
              <Reveal key={src} delay={`d${i + 1}`}><PhotoPhone src={src} label={label} /></Reveal>
            ))}
          </div>
        </div>
      )}

      {variant === 'Fan' && (
        <div className="cc-screens__fan">
          {HERO_SCREENS.map(([src, label], i) => (
            <div className={`cc-screens__fanitem fan-${i}`} key={src}><PhotoPhone src={src} label={label} size="md" showLabel={false} /></div>
          ))}
        </div>
      )}

      {variant === 'Strip' && (
        <div className="cc-screens__strip">
          {HERO_SCREENS.map(([src, label], i) => (
            <div className={`cc-screens__stripitem si-${i % 2}`} key={src}><PhotoPhone src={src} label={label} size="md" /></div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CoffeeScreens, PhotoPhone });
