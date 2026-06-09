/* GREENSTAND — Roots live component gallery (GSKit)
   Real, natively-rendered design-system components with a tab switcher.
   Shared into window for the case study to mount. */

const { useState: useStateGSK } = React;

/* ---- small presentational helpers -------------------------------------- */
function GsBtn({ variant = 'primary', state, children }) {
  const cls = `gsbtn gsbtn--${variant} ${state === 'focus' ? 'is-focus' : ''} ${state === 'disabled' ? 'is-disabled' : ''}`;
  return <button className={cls} disabled={state === 'disabled'}>{children}</button>;
}

function GsField({ label, state, value, placeholder, msg }) {
  return (
    <div className={`gsfield gsfield--${state || 'default'}`}>
      <span className="gsfield__l">{label}</span>
      <div className="gsfield__box">
        {value ? <span className="val">{value}</span> : <span className="ph">{placeholder}</span>}
        {state === 'error' && <span className="gsfield__ico" style={{ background: 'var(--gs-error)' }}>!</span>}
        {state === 'valid' && <span className="gsfield__ico" style={{ background: 'var(--gs-success)' }}>✓</span>}
      </div>
      {msg && <span className="gsfield__msg">{msg}</span>}
    </div>
  );
}

/* ---- the gallery ------------------------------------------------------- */
const GSK_TABS = ['Foundations', 'Components', 'States & A11y'];

const GS_SCALE = [
  ['50', 'var(--gs-50)', '#0c3122'], ['100', 'var(--gs-100)', '#0c3122'], ['200', 'var(--gs-200)', '#0c3122'],
  ['300', 'var(--gs-300)', '#0c3122'], ['400', 'var(--gs-400)', '#06251a'], ['500', 'var(--gs-500)', '#fff'],
  ['600', 'var(--gs-600)', '#fff'], ['700', 'var(--gs-700)', '#fff'], ['800', 'var(--gs-800)', '#fff'], ['900', 'var(--gs-900)', '#fff'],
];
const GS_SEM = [
  ['Success', 'var(--gs-success)', '#2A9460'], ['Warning', 'var(--gs-warning)', '#D99A2B'],
  ['Error', 'var(--gs-error)', '#D2503C'], ['Info', 'var(--gs-info)', '#2F7FB5'],
];
const GS_TYPE = [
  ['Display', '38px', 'Plant a tree, map the planet', 800],
  ['Heading', '26px', 'Verified growers worldwide', 700],
  ['Title', '19px', 'TreeTracker field capture', 600],
  ['Body', '15px', 'Every tree is geo-tagged, time-stamped and reviewed before a credit is issued.', 400],
  ['Caption', '12px', 'Last synced 2 minutes ago', 500],
];

function GSKit() {
  const [tab, setTab] = useStateGSK(0);
  return (
    <div className="gsk">
      <div className="gsk__tabs">
        {GSK_TABS.map((t, i) => (
          <button key={t} className={`gsk__tab ${tab === i ? 'is-active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>
      <div className="gsk__stage">
        {tab === 0 && (
          <div className="gsk__panel">
            <div className="gsk__group">
              <span className="gsk__gl">Primary scale — one green, ten steps (replacing 7+ ad-hoc greens)</span>
              <div className="gsk-scale">
                {GS_SCALE.map(([n, bg, fg]) => (
                  <span key={n} className="gsk-scale__c" style={{ background: bg, color: fg }}>{n}</span>
                ))}
              </div>
              <span className="gsk__cap">gs-600 is the primary action color · AA-tested on white and on gs-900</span>
            </div>
            <div className="gsk__group">
              <span className="gsk__gl">Semantic tokens</span>
              <div className="gsk-sem">
                {GS_SEM.map(([n, v, h]) => (
                  <div key={n} className="gsk-sem__c">
                    <div className="gsk-sem__sw" style={{ background: v }} />
                    <div className="gsk-sem__m"><span className="gsk-sem__n">{n}</span><span className="gsk-sem__h">{h}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="gsk__group">
              <span className="gsk__gl">Type scale — one family, clear hierarchy</span>
              <div className="gsk-type">
                {GS_TYPE.map(([k, sz, sample, w]) => (
                  <div key={k} className="gsk-type__row">
                    <span className="gsk-type__k">{k} · {sz}</span>
                    <span className="gsk-type__s" style={{ fontSize: sz, fontWeight: w }}>{sample}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div className="gsk__panel">
            <div className="gsk__group">
              <span className="gsk__gl">Buttons — unified from fragmented variants across both apps</span>
              <div className="gsk__row">
                <GsBtn variant="primary">Plant a tree</GsBtn>
                <GsBtn variant="secondary">View map</GsBtn>
                <GsBtn variant="tertiary">Skip</GsBtn>
                <GsBtn variant="primary" state="disabled">Disabled</GsBtn>
              </div>
            </div>
            <div className="gsk__row" style={{ gap: 'clamp(20px,3vw,40px)', alignItems: 'flex-start' }}>
              <div className="gsk__group">
                <span className="gsk__gl">Text fields</span>
                <div className="gsk__row" style={{ alignItems: 'flex-start' }}>
                  <GsField label="Grower name" state="default" placeholder="Enter name" />
                  <GsField label="Email" state="valid" value="amara@greenstand.org" />
                  <GsField label="Trees planted" state="error" value="-12" msg="Must be a positive number" />
                </div>
              </div>
            </div>
            <div className="gsk__row" style={{ gap: 'clamp(20px,3vw,40px)', alignItems: 'flex-start' }}>
              <div className="gsk__group">
                <span className="gsk__gl">Selection controls</span>
                <div className="gsk__row" style={{ gap: 22 }}>
                  <div className="gsk-ctl"><span className="gstog is-on" /><span>Sync on Wi-Fi</span></div>
                  <div className="gsk-ctl"><span className="gstog" /><span>Offline mode</span></div>
                  <div className="gsk-ctl"><span className="gscheck is-on">✓</span><span>Verified</span></div>
                  <div className="gsk-ctl"><span className="gscheck" /><span>Draft</span></div>
                  <div className="gsk-ctl"><span className="gsradio is-on" /><span>Hectares</span></div>
                  <div className="gsk-ctl"><span className="gsradio" /><span>Acres</span></div>
                </div>
              </div>
            </div>
            <div className="gsk__row" style={{ gap: 'clamp(20px,3vw,40px)', alignItems: 'flex-start' }}>
              <div className="gsk__group">
                <span className="gsk__gl">Chips & badges</span>
                <div className="gsk__row">
                  <span className="gschip gschip--solid">Mapped</span>
                  <span className="gschip gschip--soft">Pending</span>
                  <span className="gschip gschip--success">● Verified</span>
                  <span className="gschip gschip--warning">● In review</span>
                  <span className="gschip gschip--error">● Rejected</span>
                </div>
              </div>
              <div className="gsk__group">
                <span className="gsk__gl">Card — TreeTracker grower</span>
                <div className="gscard">
                  <div className="gscard__media"><span className="gscard__badge">Verified plot</span></div>
                  <div className="gscard__body">
                    <span className="gscard__t">Amara’s Grove</span>
                    <div className="gscard__meta"><span className="gscard__av" /><span className="gscard__sub">Kakamega, Kenya</span></div>
                    <div className="gscard__stats">
                      <div className="gsk__stack"><span className="gscard__sn">1,204</span><span className="gscard__sl">Trees</span></div>
                      <div className="gsk__stack"><span className="gscard__sn">98%</span><span className="gscard__sl">Survival</span></div>
                      <div className="gsk__stack"><span className="gscard__sn">14ha</span><span className="gscard__sl">Area</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 2 && (
          <div className="gsk__panel">
            <div className="gsk__group">
              <span className="gsk__gl">Every component ships with all interaction states</span>
              <div className="gsk-matrix">
                <span className="gsk-matrix__h" />
                <span className="gsk-matrix__h">Default</span>
                <span className="gsk-matrix__h">Hover</span>
                <span className="gsk-matrix__h">Focus</span>
                <span className="gsk-matrix__h">Disabled</span>

                <span className="gsk-matrix__c gsk-matrix__rh">Primary</span>
                <span className="gsk-matrix__c"><GsBtn variant="primary">Plant</GsBtn></span>
                <span className="gsk-matrix__c"><button className="gsbtn gsbtn--primary" style={{ background: 'var(--gs-700)' }}>Plant</button></span>
                <span className="gsk-matrix__c"><GsBtn variant="primary" state="focus">Plant</GsBtn></span>
                <span className="gsk-matrix__c"><GsBtn variant="primary" state="disabled">Plant</GsBtn></span>

                <span className="gsk-matrix__c gsk-matrix__rh">Secondary</span>
                <span className="gsk-matrix__c"><GsBtn variant="secondary">Map</GsBtn></span>
                <span className="gsk-matrix__c"><button className="gsbtn gsbtn--secondary" style={{ background: 'var(--gs-900)' }}>Map</button></span>
                <span className="gsk-matrix__c"><GsBtn variant="secondary" state="focus">Map</GsBtn></span>
                <span className="gsk-matrix__c"><GsBtn variant="secondary" state="disabled">Map</GsBtn></span>

                <span className="gsk-matrix__c gsk-matrix__rh">Field</span>
                <span className="gsk-matrix__c"><div className="gsfield" style={{ width: 120 }}><div className="gsfield__box"><span className="ph">Name</span></div></div></span>
                <span className="gsk-matrix__c"><div className="gsfield" style={{ width: 120 }}><div className="gsfield__box" style={{ borderColor: 'var(--gs-n300)' }}><span className="val">Name</span></div></div></span>
                <span className="gsk-matrix__c"><div className="gsfield gsfield--focus" style={{ width: 120 }}><div className="gsfield__box"><span className="val">Name</span></div></div></span>
                <span className="gsk-matrix__c"><div className="gsfield gsfield--disabled" style={{ width: 120 }}><div className="gsfield__box"><span className="ph">Name</span></div></div></span>
              </div>
            </div>
            <div className="gsk__group">
              <span className="gsk__gl">WCAG AA contrast — verified, not assumed</span>
              <div className="gsk-aa">
                <div className="gsk-aa__c" style={{ background: 'var(--gs-600)', color: '#fff' }}>
                  <span className="gsk-aa__t">White on gs-600</span>
                  <div className="gsk-aa__r"><span>Body text</span><span className="gsk-aa__pass">✓ 5.13:1 AA</span></div>
                </div>
                <div className="gsk-aa__c" style={{ background: 'var(--gs-900)', color: 'var(--gs-200)' }}>
                  <span className="gsk-aa__t">gs-200 on gs-900</span>
                  <div className="gsk-aa__r"><span>Body text</span><span className="gsk-aa__pass">✓ 9.4:1 AAA</span></div>
                </div>
                <div className="gsk-aa__c" style={{ background: 'var(--gs-50)', color: 'var(--gs-700)' }}>
                  <span className="gsk-aa__t">gs-700 on gs-50</span>
                  <div className="gsk-aa__r"><span>Body text</span><span className="gsk-aa__pass" style={{ background: 'rgba(0,0,0,.12)' }}>✓ 6.2:1 AA</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { GSKit, GsBtn, GsField });
