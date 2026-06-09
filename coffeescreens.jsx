/* COFFEEHOUSE, hero screens showcase using REAL exports.
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
  return (
    <div className="cc-screens cph-stage" data-variant="strip">
      <div className="cc-screens__bar">
        <span className="mono mono--accent">✳ High-fidelity screens, real CoffeeHouse design exports</span>
      </div>

      <div className="cc-screens__strip">
        {HERO_SCREENS.map(([src, label], i) => (
          <div className={`cc-screens__stripitem si-${i % 2}`} key={src}><PhotoPhone src={src} label={label} size="md" /></div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { CoffeeScreens, PhotoPhone });
