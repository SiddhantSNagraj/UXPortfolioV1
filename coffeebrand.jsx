/* COFFEEHOUSE — native Error-Handling field states + Style Guide.
   CoffeeHouse's own brand: navy #003566, yellow #FFD60A, Kanit. Yellow sticky notes. */

const { useState: useStateCB } = React;

/* ---- field icons (state-colored via currentColor) ---------------------- */
const CBIcon = ({ type }) => {
  const p = {
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
    mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
    phone: 'M6 3h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z',
    lock: 'M6 10V8a6 6 0 1 1 12 0v2M5 10h14v10H5zM12 14v3',
    cal: 'M4 5h16v16H4zM4 9h16M9 3v4M15 3v4',
    shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Zm-3 9 2 2 4-4',
  }[type];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d={p} />
    </svg>
  );
};

const CB_FIELDS = [
  ['user', 'Name', 'Enter your name', 'John Patil', 'John1 Patil11', 'Invalid name'],
  ['mail', 'Email', 'Enter your email id', 'patil.j@northeastern.edu', 'patil.jnortheasten', 'Invalid email'],
  ['phone', 'Contact', 'Contact number', '+1 646 637 7172', '+1 645 659 984 6292', 'Invalid number'],
  ['lock', 'Password', 'Create password', '••••••••••••', '••••••••', 'Must include 0–9, $, @, #'],
  ['cal', 'Date of birth', 'mm / dd / yyyy', '04 / 27 / 1999', '27 / 24 / 1999', 'Invalid date'],
  ['shield', 'Confirm', 'Confirm password', '••••••••••••', '••••••', 'Passwords don’t match'],
];

function CBField({ icon, label, empty, valid, invalid, error }) {
  return (
    <div className="cbf">
      <span className="cbf__label">{label}</span>
      <div className="cbf__row cbf__row--empty">
        <span className="cbf__val">{empty}</span>
        <span className="cbf__ico"><CBIcon type={icon} /></span>
      </div>
      <div className="cbf__row cbf__row--valid">
        <span className="cbf__val">{valid}</span>
        <span className="cbf__ico"><CBIcon type={icon} /></span>
      </div>
      <div className="cbf__row cbf__row--invalid">
        <span className="cbf__val">{invalid}</span>
        <span className="cbf__err">{error}</span>
        <span className="cbf__ico"><CBIcon type={icon} /></span>
      </div>
    </div>
  );
}

function CBNote({ children, tone = 'y', rot = -2, className = '' }) {
  return <div className={`cbnote cbnote--${tone} ${className}`} style={{ '--rot': `${rot}deg` }}>{children}</div>;
}

function ErrorHandling() {
  return (
    <div className="cberr">
      <div className="cberr__legend">
        <span className="cberr__leg cberr__leg--e">Empty</span>
        <span className="cberr__leg cberr__leg--v">Valid</span>
        <span className="cberr__leg cberr__leg--i">Invalid</span>
      </div>
      <div className="cberr__grid">
        <CBField icon={CB_FIELDS[0][0]} label={CB_FIELDS[0][1]} empty={CB_FIELDS[0][2]} valid={CB_FIELDS[0][3]} invalid={CB_FIELDS[0][4]} error={CB_FIELDS[0][5]} />
        <CBField icon={CB_FIELDS[1][0]} label={CB_FIELDS[1][1]} empty={CB_FIELDS[1][2]} valid={CB_FIELDS[1][3]} invalid={CB_FIELDS[1][4]} error={CB_FIELDS[1][5]} />
        <CBNote tone="y" rot={-3} className="cberr__n1">State-aware icon shifts grey → navy → red as the field validates</CBNote>
        <CBField icon={CB_FIELDS[2][0]} label={CB_FIELDS[2][1]} empty={CB_FIELDS[2][2]} valid={CB_FIELDS[2][3]} invalid={CB_FIELDS[2][4]} error={CB_FIELDS[2][5]} />
        <CBField icon={CB_FIELDS[3][0]} label={CB_FIELDS[3][1]} empty={CB_FIELDS[3][2]} valid={CB_FIELDS[3][3]} invalid={CB_FIELDS[3][4]} error={CB_FIELDS[3][5]} />
        <CBNote tone="navy" rot={2} className="cberr__n2">Inline message names the exact fix — never a generic “error”</CBNote>
        <CBField icon={CB_FIELDS[4][0]} label={CB_FIELDS[4][1]} empty={CB_FIELDS[4][2]} valid={CB_FIELDS[4][3]} invalid={CB_FIELDS[4][4]} error={CB_FIELDS[4][5]} />
        <CBField icon={CB_FIELDS[5][0]} label={CB_FIELDS[5][1]} empty={CB_FIELDS[5][2]} valid={CB_FIELDS[5][3]} invalid={CB_FIELDS[5][4]} error={CB_FIELDS[5][5]} />
        <CBNote tone="y" rot={-2} className="cberr__n3">Real-time check on blur, so users fix as they go — not at submit</CBNote>
      </div>
    </div>
  );
}

/* ============================ STYLE GUIDE ================================= */
const SG_PALETTE = [['#003566', 'Navy', 'Primary'], ['#FFD60A', 'Yellow', 'Accent'], ['#E0E0E0', 'Grey', 'Surface'], ['#FFFFFF', 'White', 'Base']];
const SG_VARIANTS = ['Editorial', 'Swatch', 'Specimen'];

function Bean({ fill }) {
  return (
    <svg viewBox="0 0 80 80" width="100%" height="100%" aria-hidden="true">
      <g fill={fill === '#FFFFFF' ? 'none' : fill} stroke={fill === '#FFFFFF' ? '#cfcfcf' : 'none'} strokeWidth="2">
        <ellipse cx="40" cy="40" rx="22" ry="32" />
      </g>
      <path d="M40 9 C30 26 50 54 40 71" fill="none" stroke={fill === '#FFFFFF' ? '#cfcfcf' : '#ffffff'} strokeWidth="3" opacity={fill === '#FFFFFF' ? 1 : 0.85} />
    </svg>
  );
}

function StyleGuide() {
  const [v, setV] = useStateCB('Editorial');
  return (
    <div className={`sg sg--${v.toLowerCase()}`}>
      <div className="sg__bar">
        <span className="sg__brand">CoffeeHouse — Brand Kit</span>
        <div className="sg__switch">
          {SG_VARIANTS.map((x) => (
            <button key={x} className={`sg__sw ${v === x ? 'is-on' : ''}`} onClick={() => setV(x)}>{x}</button>
          ))}
        </div>
      </div>

      <div className="sg__body">
        {/* TYPE */}
        <div className="sg__block sg__type">
          <span className="sg__h">Typeface — Kanit</span>
          <div className="sg__specimen">
            <div className="sg__line"><span className="sg__wt">Regular</span><span className="sg__chars sg__chars--lc">abcdefghijklmnopqrstuvwxyz</span></div>
            <div className="sg__line"><span className="sg__wt">Medium</span><span className="sg__chars sg__chars--m">ABCDEFGHIJKLMNOPQRSTUVWXYZ</span></div>
            <div className="sg__line"><span className="sg__wt">SemiBold</span><span className="sg__chars sg__chars--sb">1234567890</span></div>
          </div>
          <div className="sg__aa">Aa</div>
        </div>

        {/* COLOR */}
        <div className="sg__block sg__color">
          <span className="sg__h">Color palette</span>
          <div className="sg__swatches">
            {SG_PALETTE.map(([hex, name, role]) => (
              <div className="sg__sw-card" key={hex}>
                <span className="sg__chip" style={{ background: hex, border: hex === '#FFFFFF' ? '1px solid #d8d8d8' : 'none' }}>
                  <span className="sg__bean"><Bean fill={hex} /></span>
                </span>
                <span className="sg__hex">{hex}</span>
                <span className="sg__role">{name} · {role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SPACING + RADIUS */}
        <div className="sg__block sg__space">
          <span className="sg__h">Spacing &amp; radius</span>
          <div className="sg__spacerow">
            {[4, 8, 16, 24, 32].map((s) => (
              <div className="sg__spaceitem" key={s}>
                <span className="sg__spacebox" style={{ width: s + 8, height: s + 8 }} />
                <span className="sg__spacelbl">{s}</span>
              </div>
            ))}
          </div>
          <div className="sg__radrow">
            {[['4', 4], ['8', 8], ['16', 16], ['Pill', 40]].map(([lbl, r]) => (
              <div className="sg__raditem" key={lbl}>
                <span className="sg__radbox" style={{ borderRadius: r }} />
                <span className="sg__spacelbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="sg__block sg__btns">
          <span className="sg__h">Buttons</span>
          <div className="sg__btnrow">
            <span className="sg__btn sg__btn--primary">Order now</span>
            <span className="sg__btn sg__btn--secondary">Add to cart</span>
            <span className="sg__btn sg__btn--ghost">View menu</span>
            <span className="sg__btn sg__btn--disabled">Sold out</span>
          </div>
        </div>
      </div>

      <CBNote tone="navy" rot={-3} className="sg__note">One typeface, four colors — enough range to feel warm, tight enough to stay consistent</CBNote>
    </div>
  );
}

Object.assign(window, { ErrorHandling, StyleGuide });
