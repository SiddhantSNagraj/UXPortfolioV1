/* TWEAKS, accent, highlight, background tone, hero pixel style */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "vibe": "Default",
  "accent": "#2b6fff",
  "highlight": "#f7c14a",
  "heroFont": "Grotesk",
  "heroType": "Classic",
  "ticket": "Sunset",
  "scheme": "Ink",
  "avatarHover": "Comic",
  "tagLayout": "Clock",
  "fanStyle": "Bloom",
  "apmcHover": "Display",
  "gsHover": "Tokens",
  "gsFlow": "Solid",
  "slHero": "Trio",
  "navStyle": "Panel",
  "cursorStyle": "Label",
  "heroBg": "None",
  "navShell": "Pill",
  "marquee": "Chips",
  "artifact": "Sticky",
  "rowHover": "Swipe",
  "noteLayout": "Below",
  "noteColor": "Classic"
}/*EDITMODE-END*/;

const AVATAR_HOVER = {
  'Fusion': 'fusion',           // color + spinning rings + orbit text
  'Fusion Glow': 'fusionglow',  // color + soft glow halo + orbit text
  'Fusion + Tag': 'fusiontip',  // color + rings + orbit text + tagline
  'Comic': 'comic',             // roles burst out as comic speech bubbles
  'Reveal': 'reveal',
  'Orbit': 'orbit',
  'Spotlight': 'spotlight',
  'Duotone': 'duotone',
};

// Arrangement of the three comic personality tags around the photo.
const TAG_LAYOUTS = {
  'Clock': 'clock',          // spread around the circle
};

// CoffeeHouse work-row hover: how the 3-phone fan blooms out.
const FAN_STYLES = { 'Bloom': 'bloom' };

// APMC work-row hover: which flat-screen treatment appears.
const APMC_HOVER = { 'Display': 'display' };

// Greenstand work-row hover: which Roots treatment pops up.
const GS_HOVER = { 'Board': 'board', 'Scatter': 'scatter', 'Grid': 'grid', 'Tokens': 'tokens' };

// Greenstand user-flow diagram style.
const GS_FLOW = { 'Solid': 'solid', 'Blueprint': 'blueprint' };

// Slack hero showpiece, iPhone mockup arrangement.
const SL_HERO = { 'Trio': 'trio', 'Fan': 'fan', 'Stagger': 'stagger' };

// Case-study section menu design.
const NAV_STYLES = { 'Panel': 'panel', 'Numbered': 'numbered', 'Filled': 'filled', 'Ticks': 'ticks' };

// Custom cursor style.
const CURSOR_STYLES = { 'Off': 'off', 'Invert': 'invert', 'Label': 'label' };

// Hero background animation.
const HERO_BG = { 'None': 'none', 'Constellation': 'constellation' };

// Hero name type treatment.
const HERO_TYPE = { 'Classic': 'classic', 'Duotone': 'duotone', 'Offset': 'offset', 'Bleed': 'bleed' };

// Footer "thanks for visiting" ticket micrographic.
const TICKETS = { 'Sunset': 'sunset', 'Cobalt': 'cobalt', 'Forest': 'forest', 'Noir': 'noir', 'None': 'none' };

// Case-study section menu shell (overall launcher form).
const NAV_SHELLS = { 'Pill': 'pill', 'FAB': 'fab', 'Top bar': 'topbar', 'Rail': 'rail' };

// Hero capabilities-and-tools marquee layout.
const MARQUEE = { 'AI-first': 'aifirst', 'Dual rail': 'dual', 'Chips': 'chips' };

// APMC research artifacts (affinity map + priority matrix) visual style.
const ARTIFACT_STYLES = { 'Sticky': 'sticky', 'Whiteboard': 'whiteboard', 'On-brand': 'brand' };

// Post-it note placement around wireframe + final design frames.
const NOTE_LAYOUTS = { 'Below': 'below', 'Scattered': 'scattered', 'Side': 'side', 'Fanned': 'fanned' };

// Post-it note color palette.
const NOTE_COLORS = { 'Classic': 'classic', 'Warm': 'warm', 'Cool': 'cool', 'Bold': 'bold', 'Mono': 'mono' };

// Work list row hover aesthetic.
const ROW_HOVER = { 'Fill': 'fill', 'Swipe': 'swipe', 'Frame': 'frame', 'Marker': 'marker', 'Glow': 'glow', 'Brush': 'brush' };

// Overall site vibe. Retro swaps palette, serif display fonts, and texture.
const VIBES = { 'Default': 'default', 'Retro ’70s': 'retro', 'Retro Slate': 'retroslate' };

// Color schemes, each a hand-tuned dark+light palette (see schemes.css).
const SCHEMES = {
  'Ink': 'ink',           // warm charcoal & bone, editorial neutral
  'Espresso': 'espresso', // roasted brown & cream, cozy
  'Newsprint': 'newsprint', // aged sepia paper, vintage
  'Dusk': 'dusk',         // blue-violet night & lavender morning
  'Forest': 'forest',     // deep pine & sage, organic
  'Rosewood': 'rosewood', // aubergine & blush, moody
};

const BG_TONES = {
  ink:  { '--bg': '#0b0b0c', '--bg-2': '#111113', '--surface': '#161618', '--surface-2': '#1d1d20' },
  warm: { '--bg': '#0d0b09', '--bg-2': '#141110', '--surface': '#1a1715', '--surface-2': '#221d1a' },
  cool: { '--bg': '#090b0d', '--bg-2': '#0f1214', '--surface': '#141719', '--surface-2': '#1a1f22' },
};

// Hero-name typeface options. Each carries the font stack + tuning so the
// big headline stays balanced (tracking / line-height / optical size).
const HERO_FONTS = {
  'Grotesk':   { stack: "'Archivo',system-ui,sans-serif",                    weight: 900, ls: '-0.035em', size: 'clamp(46px, 12.5vw, 186px)',lh: 0.88 },
  'Poster':    { stack: "'Anton',system-ui,sans-serif",                      weight: 400, ls: '-0.01em',  size: 'clamp(54px, 16vw, 240px)',  lh: 0.84 },
  'Tall':      { stack: "'Big Shoulders Display',system-ui,sans-serif",      weight: 800, ls: '-0.01em',  size: 'clamp(60px, 17vw, 252px)',  lh: 0.82 },
  'Editorial': { stack: "'Syne',system-ui,sans-serif",                       weight: 800, ls: '-0.02em',  size: 'clamp(50px, 14vw, 208px)',  lh: 0.9 },
  'Bebas':     { stack: "'Bebas Neue',system-ui,sans-serif",                 weight: 400, ls: '0.005em', size: 'clamp(62px, 17.5vw, 264px)', lh: 0.82 },
  'Condensed': { stack: "'Oswald',system-ui,sans-serif",                     weight: 700, ls: '-0.005em', size: 'clamp(56px, 15.5vw, 236px)', lh: 0.86 },
  'Serif':     { stack: "'Playfair Display',Georgia,serif",                  weight: 900, ls: '-0.01em',  size: 'clamp(48px, 13.5vw, 202px)', lh: 0.9 },
  'Geometric': { stack: "'Space Grotesk',system-ui,sans-serif",             weight: 700, ls: '-0.03em',  size: 'clamp(48px, 13vw, 196px)',  lh: 0.9 },
  'Round':     { stack: "'Unbounded',system-ui,sans-serif",                  weight: 800, ls: '-0.02em',  size: 'clamp(44px, 11.5vw, 176px)',lh: 0.94 },
};

function TweaksUI() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--blue', t.accent);
    r.setProperty('--accent', t.accent);
    r.setProperty('--yellow', t.highlight);
    document.documentElement.setAttribute('data-scheme', SCHEMES[t.scheme] || 'ink');
    const hf = HERO_FONTS[t.heroFont] || HERO_FONTS['Grotesk'];
    r.setProperty('--pixel-blk', hf.stack);
    r.setProperty('--hero-weight', String(hf.weight));
    r.setProperty('--hero-ls', hf.ls);
    r.setProperty('--hero-size', hf.size);
    r.setProperty('--hero-lh', String(hf.lh));
    document.documentElement.setAttribute('data-avhover', AVATAR_HOVER[t.avatarHover] || 'reveal');
    document.documentElement.setAttribute('data-taglayout', TAG_LAYOUTS[t.tagLayout] || 'crown');
    document.documentElement.setAttribute('data-fan', FAN_STYLES[t.fanStyle] || 'bloom');
    document.documentElement.setAttribute('data-apmchover', APMC_HOVER[t.apmcHover] || 'display');
    document.documentElement.setAttribute('data-gshover', GS_HOVER[t.gsHover] || 'board');
    document.documentElement.setAttribute('data-flowstyle', GS_FLOW[t.gsFlow] || 'solid');
    document.documentElement.setAttribute('data-slhero', SL_HERO[t.slHero] || 'trio');
    document.documentElement.setAttribute('data-csnav', NAV_STYLES[t.navStyle] || 'panel');
    document.documentElement.setAttribute('data-cursor', CURSOR_STYLES[t.cursorStyle] || 'off');
    document.documentElement.setAttribute('data-herobg', HERO_BG[t.heroBg] || 'none');
    document.documentElement.setAttribute('data-herotype', HERO_TYPE[t.heroType] || 'classic');
    document.documentElement.setAttribute('data-ticket', TICKETS[t.ticket] || 'sunset');
    document.documentElement.setAttribute('data-csnavshell', NAV_SHELLS[t.navShell] || 'pill');
    document.documentElement.setAttribute('data-marquee', MARQUEE[t.marquee] || 'chips');
    document.documentElement.setAttribute('data-artifact', ARTIFACT_STYLES[t.artifact] || 'sticky');
    document.documentElement.setAttribute('data-rowhover', ROW_HOVER[t.rowHover] || 'fill');
    document.documentElement.setAttribute('data-notelayout', NOTE_LAYOUTS[t.noteLayout] || 'below');
    document.documentElement.setAttribute('data-notecolor', NOTE_COLORS[t.noteColor] || 'classic');

    // ---- overall vibe (retro overrides accent + display fonts) ----
    // a public visitor toggle (cmdk / logo easter egg) persists to 'sn-vibe'
    // and takes precedence over the authoring default so it isn't stomped.
    let vibe = VIBES[t.vibe] || 'default';
    try { const ov = localStorage.getItem('sn-vibe'); if (ov === 'default' || ov === 'retro' || ov === 'retroslate') vibe = ov; } catch (e) {}
    document.documentElement.setAttribute('data-vibe', vibe);
    if (vibe === 'retro' || vibe === 'retroslate') {
      r.setProperty('--blue', '#d6442c');
      r.setProperty('--accent', '#d6442c');
      r.setProperty('--yellow', '#f0a818');
      r.setProperty('--display', "'Playfair Display', Georgia, serif");
      r.setProperty('--pixel-blk', "'DM Serif Display', Georgia, serif");
      r.setProperty('--hero-weight', '400');
      r.setProperty('--hero-ls', '-0.01em');
      r.setProperty('--hero-size', 'clamp(54px, 14.5vw, 224px)');
      r.setProperty('--hero-lh', '0.9');
    } else {
      r.removeProperty('--display');
    }
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Theme" />
      <TweakSelect label="Vibe" value={t.vibe}
        options={Object.keys(VIBES)}
        onChange={(v) => setTweak('vibe', v)} />
      <TweakSection label="Color scheme" />
      <TweakSelect label="Palette" value={t.scheme}
        options={Object.keys(SCHEMES)}
        onChange={(v) => setTweak('scheme', v)} />
      <TweakSection label="Hero typeface" />
      <TweakSelect label="Name font" value={t.heroFont}
        options={Object.keys(HERO_FONTS)}
        onChange={(v) => setTweak('heroFont', v)} />
      <TweakSelect label="Name treatment" value={t.heroType}
        options={Object.keys(HERO_TYPE)}
        onChange={(v) => setTweak('heroType', v)} />
      <TweakSelect label="Footer ticket" value={t.ticket}
        options={Object.keys(TICKETS)}
        onChange={(v) => setTweak('ticket', v)} />
      <TweakSection label="Photo hover" />
      <TweakSelect label="Avatar effect" value={t.avatarHover}
        options={Object.keys(AVATAR_HOVER)}
        onChange={(v) => setTweak('avatarHover', v)} />
      <TweakSection label="Work hover" />
      <TweakSelect label="Row hover" value={t.rowHover}
        options={Object.keys(ROW_HOVER)}
        onChange={(v) => setTweak('rowHover', v)} />
      <TweakSelect label="Greenstand hover" value={t.gsHover}
        options={Object.keys(GS_HOVER)}
        onChange={(v) => setTweak('gsHover', v)} />
      <TweakSelect label="Greenstand flow" value={t.gsFlow}
        options={Object.keys(GS_FLOW)}
        onChange={(v) => setTweak('gsFlow', v)} />
      <TweakSelect label="Slack hero" value={t.slHero}
        options={Object.keys(SL_HERO)}
        onChange={(v) => setTweak('slHero', v)} />
      <TweakSelect label="Section menu" value={t.navStyle}
        options={Object.keys(NAV_STYLES)}
        onChange={(v) => setTweak('navStyle', v)} />
      <TweakSelect label="Custom cursor" value={t.cursorStyle}
        options={Object.keys(CURSOR_STYLES)}
        onChange={(v) => setTweak('cursorStyle', v)} />
      <TweakSelect label="Hero background" value={t.heroBg}
        options={Object.keys(HERO_BG)}
        onChange={(v) => setTweak('heroBg', v)} />
      <TweakSelect label="Menu shell" value={t.navShell}
        options={Object.keys(NAV_SHELLS)}
        onChange={(v) => setTweak('navShell', v)} />
      <TweakSelect label="Hero marquee" value={t.marquee}
        options={Object.keys(MARQUEE)}
        onChange={(v) => setTweak('marquee', v)} />
      <TweakSelect label="APMC artifacts" value={t.artifact}
        options={Object.keys(ARTIFACT_STYLES)}
        onChange={(v) => setTweak('artifact', v)} />
      <TweakSection label="Post-it notes" />
      <TweakSelect label="Placement" value={t.noteLayout}
        options={Object.keys(NOTE_LAYOUTS)}
        onChange={(v) => setTweak('noteLayout', v)} />
      <TweakSelect label="Colors" value={t.noteColor}
        options={Object.keys(NOTE_COLORS)}
        onChange={(v) => setTweak('noteColor', v)} />
      <TweakSection label="Accent" />
      <TweakColor label="Primary pop" value={t.accent}
        options={['#c75b39', '#10897e', '#2b6fff', '#a8324a', '#6c5ce7', '#1f8a5b', '#c2410c', '#e0457b']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakColor label="Highlight" value={t.highlight}
        options={['#ffe14d', '#f7c14a', '#c8ff4d', '#7cf5c4', '#34e3c2', '#ff7a3c', '#ff5a8a', '#c9a4ff', '#ff9f1c']}
        onChange={(v) => setTweak('highlight', v)} />
    </TweaksPanel>
  );
}

Object.assign(window, { TweaksUI });
