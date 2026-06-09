/* HERO MARQUEE, auto-scrolling "AI-first capabilities + tools" band.
   Two counter-scrolling rows. Variant via <html data-marquee>:
     aifirst (default) · dual · chips
   Exported to window for home.jsx's Hero to mount. */

/* ---- full-colour brand logos (compact inline SVG) ---------------------- */
const TL = {
  Claude: (
    <svg viewBox="0 0 24 24" className="hmq-logo" aria-hidden="true">
      <g fill="#d97757" transform="translate(12 12)">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x="-1.15" y="-9" width="2.3" height="8.2" rx="1.15" transform={`rotate(${i * 45})`} />
        ))}
      </g>
    </svg>
  ),
  Cursor: (
    <svg viewBox="0 0 24 24" className="hmq-logo" aria-hidden="true">
      <path d="M12 2l9 5.2v9.6L12 22l-9-5.2V7.2z" fill="#0f0f0f" />
      <path d="M12 2l9 5.2-9 5.2V2z" fill="#5a5a5a" />
      <path d="M21 7.2v9.6L12 12z" fill="#363636" />
      <path d="M3 7.2l9 4.8v10L3 16.8z" fill="#1d1d1d" />
    </svg>
  ),
  'Google Antigravity': (
    <img src="assets/tools/antigravity.png" className="hmq-logo hmq-logo--wide" alt="" aria-hidden="true" />
  ),
  Figma: (
    <svg viewBox="0 0 38 57" className="hmq-logo" aria-hidden="true">
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  ),
  FigJam: (
    <svg viewBox="0 0 24 24" className="hmq-logo" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0d99ff" />
      <circle cx="8.5" cy="8.5" r="3" fill="#ff7237" />
      <circle cx="15.5" cy="8.5" r="3" fill="#ffc233" />
      <path d="M7 15c1.4 2.2 8.6 2.2 10 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Framer: (
    <svg viewBox="0 0 24 24" className="hmq-logo" aria-hidden="true">
      <path fill="#0055ff" d="M5 2h14v7h-7zM5 9h7l7 7H5zM5 16h7v7z" />
    </svg>
  ),
  Storybook: (
    <svg viewBox="0 0 24 24" className="hmq-logo" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#ff4785" />
      <path d="M15.6 5.2l-.13 2.2a.25.25 0 0 0 .4.2l.86-.66.73.55a.25.25 0 0 0 .4-.2l-.1-2.4zM13.9 11.3c0 .9 6.1.5 6.9-.13C20.8 6.4 18.2 4 13.7 3.8l-.16.01.13 2.6c1 1.3 2.6 1.3 2.6 2.1 0 .5-.6.6-1 .4-1-.4-1.5-.1-1.5.4z" fill="#fff" opacity=".95" />
    </svg>
  ),
  'Adobe XD': (
    <svg viewBox="0 0 24 24" className="hmq-logo" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#470137" />
      <text x="12" y="16.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10" fill="#ff61f6">Xd</text>
    </svg>
  ),
  Miro: (
    <svg viewBox="0 0 24 24" className="hmq-logo" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#ffd02f" />
      <g fill="#050038">
        <path d="M14.7 5h1.6l-1.1 5.3L17.6 5h1.6l-1 6 2.3-6h1.7l-2.6 9h-1.7l1-5.6L16.2 14h-1.6l1.1-6.2L13.2 14h-1.6z" transform="translate(-1.2 0) scale(.92)" />
      </g>
    </svg>
  ),
  Notion: (
    <img src="assets/tools/notion.png" className="hmq-logo" alt="" aria-hidden="true" />
  ),
};

/* AI tools lead the line, reinforces the AI-first positioning */
const HMQ_TOOLS = [
  ['Claude', true], ['Cursor', true], ['Google Antigravity', true],
  ['Figma', false], ['FigJam', false], ['Framer', false],
  ['Storybook', false], ['Adobe XD', false], ['Miro', false], ['Notion', false],
];
const HMQ_CAPS = ['AI-First Design', 'Design Systems', 'Prompt-to-Prototype', 'UX Research', 'Prototyping', 'Interaction Design', 'AI Workflows', 'Accessibility'];

function HmqCapSeq() {
  return (
    <div className="hmq__seq" aria-hidden="true">
      {HMQ_CAPS.map((c, i) => (
        <span className="hmq-cap" key={i}><span className="hmq-cap__star">✳</span>{c}</span>
      ))}
    </div>
  );
}
function HmqToolSeq() {
  return (
    <div className="hmq__seq" aria-hidden="true">
      <span className="hmq-ailead"><span className="hmq-ailead__spark">✦</span>AI-first stack</span>
      {HMQ_TOOLS.map(([t, ai], i) => (
        <span className={`hmq-tool ${ai ? 'is-ai' : ''}`} key={i}>
          {TL[t]}<span className="hmq-tool__name">{t}</span>
          {ai && <span className="hmq-tool__ai">AI</span>}
        </span>
      ))}
    </div>
  );
}

function HeroMarquee() {
  return (
    <div className="hmq" aria-label="AI-first capabilities and tools">
      <div className="hmq__row hmq__row--caps"><HmqCapSeq /><HmqCapSeq /></div>
      <div className="hmq__row hmq__row--tools hmq__row--rev"><HmqToolSeq /><HmqToolSeq /></div>
    </div>
  );
}

Object.assign(window, { HeroMarquee });
