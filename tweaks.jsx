/* TWEAKS, accent, highlight, background tone, hero pixel style */

const ACCENT_SETS = { 'Custom': null, 'Midnight & Marigold': 'henderson', 'Oceanic & Nectarine': 'oceanic', 'Modern Atelier': 'atelier', 'Avant-Garde Press': 'press', 'Mid-Century Archive': 'archive', 'Cobalt & Marigold': 'cobalt', 'Pine & Coral': 'pine', 'Indigo & Chartreuse': 'indigo', 'Slate & Apricot': 'slate', 'Teal & Rose': 'teal', 'Mimosa & Wine': 'mimosa', 'Spicy & Teal': 'spicy' };

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "vibe": "Default",
  "accentSet": "Oceanic & Nectarine",
  "accent": "#2b6fff",
  "highlight": "#f7c14a",
  "heroFont": "Gambetta",
  "monoFont": "General Sans",
  "heroType": "Classic",
  "ticket": "Sunset",
  "scheme": "Ink",
  "avatarHover": "Stickers",
  "stickerLayout": "Corners",
  "tagLayout": "Crown",
  "fanStyle": "Bloom",
  "apmcHover": "Display",
  "gsHover": "Tokens",
  "gsFlow": "Solid",
  "slHero": "Trio",
  "navStyle": "Panel",
  "topNav": "Island",
  "recBtn": "Stamp Double",
  "cursorStyle": "Arrow",
  "retroCursor": "Diamond",
  "heroBg": "None",
  "navShell": "Pill",
  "marquee": "Off",
  "heroStack": "Circles",
  "artifact": "Sticky",
  "rowHover": "Diagonal",
  "retroRowHover": "Ink",
  "noteLayout": "Below",
  "noteColor": "Classic",
  "caseReveal": "Editorial",
  "heroStatus": "Slash",
  "footerBadge": "Hidden",
  "workLayout": "Outcome",
  "aboutPhotos": "Cluster",
  "aboutSpread": "Cross"
}/*EDITMODE-END*/;

// Scroll-reveal treatment for case studies (Option 2 = editorial clip wipe)
const REVEAL_STYLES = {
  'Editorial': 'clip',   // magazine clip-path wipe
  'Fade up': 'fade',     // the original opacity + rise
  'Off': 'off',          // no entrance motion
};

// "Open to opportunities" hero status treatment
const HERO_STATUS = {
  'Pulse': 'pulse',       // original pill + pulsing green dot
  'Steady dot': 'steady', // same pill, solid dot, no flashing
  'Stamp': 'stamp',       // outlined uppercase label, no dot
  'Brackets': 'bracket',  // ( Open to opportunities ), no pill/dot
  'Asterisk': 'asterisk', // ✳ marker, no pill/dot
  'Underline': 'underline', // accent underline, no pill/dot
  'Slash': 'slash',       // OPEN TO WORK / 2026, editorial year-stamp
};

// Footer rotating seal badge — show it or remove it entirely.
const FOOTER_BADGE = { 'Show': 'show', 'Hidden': 'hidden' };

// Home work-list layout: editorial index, index + at-a-glance outcome, or card grid.
const WORK_LAYOUT = { 'Index': 'index', 'Outcome': 'outcome', 'Descriptive': 'descriptive', 'Editorial': 'editorial', 'Cards': 'cards' };

// About photo treatment: single portrait, or an interactive polaroid cluster.
const ABOUT_PHOTOS = { 'Single': 'single', 'Cluster': 'cluster' };

// How the polaroid cluster reveals on hover (only applies in Cluster mode).
const ABOUT_SPREAD = { 'Cross': 'cross', 'Fan': 'fan', 'Cascade': 'cascade', 'Scatter': 'scatter' };

const AVATAR_HOVER = {
  'Fusion': 'fusion',           // color + spinning rings + orbit text
  'Fusion Glow': 'fusionglow',  // color + soft glow halo + orbit text
  'Fusion + Tag': 'fusiontip',  // color + rings + orbit text + tagline
  'Comic': 'comic',             // roles burst out as comic speech bubbles
  'Reveal': 'reveal',
  'Orbit': 'orbit',
  'Spotlight': 'spotlight',
  'Duotone': 'duotone',
  'Stickers': 'stickers',
};

// Arrangement of the comic personality tags around the photo.
const TAG_LAYOUTS = {
  'Crown': 'crown',          // original burst — one above, two below, one to the left
  'Clock': 'clock',          // spread around the circle
  'Triangle': 'triangle',    // one below centre, two at the top corners
  'Left stack': 'leftstack', // stacked down the left of the photo
  'Right stack': 'rightstack', // stacked down the right of the photo
};

// CoffeeHouse work-row hover: how the 3-phone fan blooms out.
const FAN_STYLES = { 'Bloom': 'bloom' };

// Placement of the personality stickers around the photo (Stickers hover variant).
const STICKER_LAYOUTS = {
  'Corners': 'corners',   // one tucked into each corner (default)
  'Stacked': 'stacked',   // all four down the left, face fully clear
  'Crown': 'crown',       // arced across the top
  'Compass': 'compass',   // top / left / bottom / right
  'Huddle': 'huddle',     // piled around the lower half like a sticker sheet
  'Orbit': 'orbit',       // even ring that revolves around the photo on hover
};

// APMC work-row hover: which flat-screen treatment appears.
const APMC_HOVER = { 'Display': 'display' };

// Greenstand work-row hover: which Roots treatment pops up.
const GS_HOVER = { 'Board': 'board', 'Scatter': 'scatter', 'Grid': 'grid', 'Tokens': 'tokens' };

// Recruiter-mode toggle button style (case studies).
const REC_BTN = { 'Stamp': 'stamp', 'Stamp Box': 'stampbox', 'Stamp Round': 'stampround', 'Stamp Double': 'stampdouble', 'Bracket': 'bracket', 'Underline': 'underline', 'Ticket': 'ticket', 'Pill': 'pill' };

// Greenstand user-flow diagram style.
const GS_FLOW = { 'Solid': 'solid', 'Blueprint': 'blueprint' };

// Slack hero showpiece, iPhone mockup arrangement.
const SL_HERO = { 'Trio': 'trio', 'Fan': 'fan', 'Stagger': 'stagger' };

// Case-study section menu design.
const NAV_STYLES = { 'Panel': 'panel', 'Numbered': 'numbered', 'Filled': 'filled', 'Ticks': 'ticks' };

// Top navigation-bar layout.
const TOP_NAV = { 'Blend': 'blend', 'Floating': 'floating', 'Island': 'island', 'Bar': 'bar', 'Tabs': 'tabs', 'Outline': 'outline', 'Masthead': 'masthead', 'Index': 'index', 'Rule': 'rule', 'Wordmark': 'wordmark', 'Bracket': 'bracket' };

// Custom cursor style.
const CURSOR_STYLES = { 'Arrow': 'arrow', 'Hover ring': 'hover', 'Precise': 'precise', 'Crosshair': 'crosshair', 'Invert': 'invert', 'Label': 'label', 'Off': 'off' };

// Retro-mode cursor shape (only applies when Vibe is Retro + cursor = Label).
const RETRO_CURSORS = { 'Diamond': 'diamond', 'Crosshair': 'crosshair', 'Target': 'target', 'Asterisk': 'asterisk', 'Stamp': 'stamp', 'Dot': 'dot', 'Ring': 'ring', 'Square': 'square', 'Plus': 'plus' };

// Hero background animation.
const HERO_BG = { 'None': 'none', 'Constellation': 'constellation' };

// Hero name type treatment.
const HERO_TYPE = { 'Classic': 'classic', 'Duotone': 'duotone', 'Offset': 'offset', 'Bleed': 'bleed' };

// Footer "thanks for visiting" ticket micrographic.
const TICKETS = { 'Sunset': 'sunset', 'Cobalt': 'cobalt', 'Forest': 'forest', 'Noir': 'noir', 'None': 'none' };

// Case-study section menu shell (overall launcher form).
const NAV_SHELLS = { 'Pill': 'pill', 'FAB': 'fab', 'Top bar': 'topbar', 'Rail': 'rail' };

// Hero capabilities-and-tools marquee layout.
const MARQUEE = { 'AI-first': 'aifirst', 'Dual rail': 'dual', 'Chips': 'chips', 'Caps only': 'capsonly', 'Off': 'off' };

// "My stack" circle badges under the Product Designer tag.
const HERO_STACK = { 'Circles': 'circles', 'Hidden': 'hidden' };

// APMC research artifacts (affinity map + priority matrix) visual style.
const ARTIFACT_STYLES = { 'Sticky': 'sticky', 'Whiteboard': 'whiteboard', 'On-brand': 'brand' };

// Post-it note placement around wireframe + final design frames.
const NOTE_LAYOUTS = { 'Below': 'below', 'Scattered': 'scattered', 'Side': 'side', 'Fanned': 'fanned' };

// Post-it note color palette.
const NOTE_COLORS = { 'Classic': 'classic', 'Warm': 'warm', 'Cool': 'cool', 'Bold': 'bold', 'Mono': 'mono' };

// Work list row hover aesthetic.
const ROW_HOVER = { 'Fill': 'fill', 'Swipe': 'swipe', 'Frame': 'frame', 'Marker': 'marker', 'Aurora': 'aurora', 'Beam': 'beam', 'Curtain': 'curtain', 'Diagonal': 'diagonal', 'Ripple': 'ripple', 'Lift': 'lift', 'Split': 'split', 'Zoom': 'zoom', 'Glass': 'glass', 'Pop': 'pop', 'Duotone': 'duotone', 'Sticker': 'sticker', 'Burst': 'burst', 'Ink': 'ink', 'Wash': 'wash', 'Drip': 'drip', 'Tint': 'tint', 'Cushion': 'cushion', 'Glint': 'glint', 'Drape': 'drape' };

// Retro-mode row hover (only applies when Vibe is Retro). Vintage-inspired.
const RETRO_ROW_HOVER = { 'Ink': 'ink', 'Scanlines': 'scanlines', 'VHS': 'vhs', 'Marquee': 'marquee', 'Risograph': 'riso', 'Sunburst': 'sunburst', 'Lava': 'lava', 'Sunset': 'sunset', 'Bevel': 'bevel', 'Pinstripe': 'pinstripe' };

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
  'General Sans':{ stack: "'General Sans',system-ui,sans-serif",                weight: 600, ls: '-0.025em', size: 'clamp(46px, 12.5vw, 186px)',lh: 0.9 },
  'Clash':     { stack: "'Clash Display',system-ui,sans-serif",              weight: 700, ls: '-0.02em',  size: 'clamp(48px, 13vw, 200px)',  lh: 0.9 },
  'Cabinet':   { stack: "'Cabinet Grotesk',system-ui,sans-serif",           weight: 800, ls: '-0.03em',  size: 'clamp(48px, 13vw, 200px)',  lh: 0.9 },
  'Sentient':  { stack: "'Sentient',Georgia,serif",                          weight: 700, ls: '-0.012em', size: 'clamp(50px, 13.5vw, 210px)', lh: 0.92 },
  'Zodiak':    { stack: "'Zodiak',Georgia,serif",                            weight: 900, ls: '-0.005em', size: 'clamp(50px, 13.5vw, 210px)', lh: 0.92 },
  'Gambetta':  { stack: "'Gambetta',Georgia,serif",                          weight: 700, ls: '-0.01em',  size: 'clamp(48px, 12.6vw, 192px)',  lh: 0.9 },
  'Grotesk':   { stack: "'Archivo',system-ui,sans-serif",                    weight: 900, ls: '-0.035em', size: 'clamp(46px, 12.5vw, 186px)',lh: 0.88 },
  'Familjen':  { stack: "'Familjen Grotesk',system-ui,sans-serif",           weight: 700, ls: '-0.025em', size: 'clamp(48px, 13vw, 196px)',  lh: 0.9 },
  'Geometric': { stack: "'Space Grotesk',system-ui,sans-serif",             weight: 700, ls: '-0.03em',  size: 'clamp(48px, 13vw, 196px)',  lh: 0.9 },
  'Editorial': { stack: "'Syne',system-ui,sans-serif",                       weight: 800, ls: '-0.02em',  size: 'clamp(50px, 14vw, 208px)',  lh: 0.9 },
  'Condensed': { stack: "'Oswald',system-ui,sans-serif",                     weight: 700, ls: '-0.005em', size: 'clamp(56px, 15.5vw, 236px)', lh: 0.86 },
  'Poster':    { stack: "'Anton',system-ui,sans-serif",                      weight: 400, ls: '-0.01em',  size: 'clamp(54px, 16vw, 240px)',  lh: 0.84 },
  'Tall':      { stack: "'Big Shoulders Display',system-ui,sans-serif",      weight: 800, ls: '-0.01em',  size: 'clamp(60px, 17vw, 252px)',  lh: 0.82 },
  'Bebas':     { stack: "'Bebas Neue',system-ui,sans-serif",                 weight: 400, ls: '0.005em', size: 'clamp(62px, 17.5vw, 264px)', lh: 0.82 },
  'Round':     { stack: "'Unbounded',system-ui,sans-serif",                  weight: 800, ls: '-0.02em',  size: 'clamp(44px, 11.5vw, 176px)',lh: 0.94 },
  'Serif':     { stack: "'Fraunces',Georgia,serif",                          weight: 900, ls: '-0.015em', size: 'clamp(48px, 13.5vw, 202px)', lh: 0.9 },
  'Garamond':  { stack: "'EB Garamond',Georgia,serif",                       weight: 500, ls: '-0.005em', size: 'clamp(54px, 14.8vw, 224px)', lh: 0.86 },
};

// Label / mono typeface — drives the --mono token used by every eyebrow, chip,
// pill, caption and technical label. Curated to read as an intentional design
// choice (not the vibe-coded Space Mono default). Mix of refined monospaces and
// a few editorial label-sans that pair with Archivo. `g` = Google Fonts query
// (null = already loaded in index.html).
const MONO_FONTS = {
  'General Sans':     { stack: "'General Sans',system-ui,sans-serif",       g: null },
  'IBM Plex Mono':    { stack: "'IBM Plex Mono',ui-monospace,monospace",    g: 'IBM+Plex+Mono:wght@400;500;600;700' },
  'DM Mono':          { stack: "'DM Mono',ui-monospace,monospace",          g: 'DM+Mono:wght@300;400;500' },
  'Spline Sans Mono': { stack: "'Spline Sans Mono',ui-monospace,monospace", g: 'Spline+Sans+Mono:wght@400;500;600;700' },
  'JetBrains Mono':   { stack: "'JetBrains Mono',ui-monospace,monospace",   g: 'JetBrains+Mono:wght@400;500;700' },
  'Geist Mono':       { stack: "'Geist Mono',ui-monospace,monospace",       g: 'Geist+Mono:wght@400;500;700' },
  'Martian Mono':     { stack: "'Martian Mono',ui-monospace,monospace",     g: 'Martian+Mono:wght@400;500;700' },
  'Overpass Mono':    { stack: "'Overpass Mono',ui-monospace,monospace",    g: 'Overpass+Mono:wght@400;500;600;700' },
  'Red Hat Mono':     { stack: "'Red Hat Mono',ui-monospace,monospace",     g: 'Red+Hat+Mono:wght@400;500;700' },
  'Anonymous Pro':    { stack: "'Anonymous Pro',ui-monospace,monospace",    g: 'Anonymous+Pro:wght@400;700' },
  'Azeret Mono':      { stack: "'Azeret Mono',ui-monospace,monospace",      g: 'Azeret+Mono:wght@400;500;700' },
  'Sometype Mono':    { stack: "'Sometype Mono',ui-monospace,monospace",    g: 'Sometype+Mono:wght@400;500;700' },
  'Fragment Mono':    { stack: "'Fragment Mono',ui-monospace,monospace",    g: 'Fragment+Mono' },
  'Archivo Caps':     { stack: "'Archivo',system-ui,sans-serif",            g: null },
  'Space Grotesk':    { stack: "'Space Grotesk',system-ui,sans-serif",      g: null },
  'Syne':             { stack: "'Syne',system-ui,sans-serif",              g: null },
};

// Inject a Google Fonts <link> for the chosen mono font on demand (only loads
// what's selected). No-op for fonts already in the static <head> link.
function ensureMonoFont(spec) {
  if (!spec || !spec.g) return;
  const id = 'mfont-' + spec.g.split(':')[0];
  if (document.getElementById(id)) return;
  const l = document.createElement('link');
  l.id = id; l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=' + spec.g + '&display=swap';
  document.head.appendChild(l);
}

function TweaksUI() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const apply = () => {
    const r = document.documentElement.style;
    const aset = ACCENT_SETS[t.accentSet];
    if (aset) {
      // cohesive Pantone palette: CSS (data-accentset) owns --accent/--yellow and
      // the light-mode ink variant, so clear any inline overrides that would win.
      document.documentElement.setAttribute('data-accentset', aset);
      r.removeProperty('--blue'); r.removeProperty('--accent'); r.removeProperty('--yellow');
    } else {
      document.documentElement.removeAttribute('data-accentset');
      r.setProperty('--blue', t.accent);
      r.setProperty('--accent', t.accent);
      r.setProperty('--yellow', t.highlight);
    }
    document.documentElement.setAttribute('data-scheme', SCHEMES[t.scheme] || 'ink');
    const hf = HERO_FONTS[t.heroFont] || HERO_FONTS['Grotesk'];
    r.setProperty('--pixel-blk', hf.stack);
    r.setProperty('--hero-weight', String(hf.weight));
    r.setProperty('--hero-ls', hf.ls);
    r.setProperty('--hero-size', hf.size);
    r.setProperty('--hero-lh', String(hf.lh));
    const mf = MONO_FONTS[t.monoFont] || MONO_FONTS['IBM Plex Mono'];
    ensureMonoFont(mf);
    r.setProperty('--mono', mf.stack);
    document.documentElement.setAttribute('data-avhover', AVATAR_HOVER[t.avatarHover] || 'reveal');
    document.documentElement.setAttribute('data-stklayout', STICKER_LAYOUTS[t.stickerLayout] || 'corners');
    document.documentElement.setAttribute('data-taglayout', TAG_LAYOUTS[t.tagLayout] || 'crown');
    document.documentElement.setAttribute('data-fan', FAN_STYLES[t.fanStyle] || 'bloom');
    document.documentElement.setAttribute('data-apmchover', APMC_HOVER[t.apmcHover] || 'display');
    document.documentElement.setAttribute('data-gshover', GS_HOVER[t.gsHover] || 'board');
    document.documentElement.setAttribute('data-recbtn', REC_BTN[t.recBtn] || 'stampdouble');
    document.documentElement.setAttribute('data-flowstyle', GS_FLOW[t.gsFlow] || 'solid');
    document.documentElement.setAttribute('data-slhero', SL_HERO[t.slHero] || 'trio');
    document.documentElement.setAttribute('data-csnav', NAV_STYLES[t.navStyle] || 'panel');
    document.documentElement.setAttribute('data-nav', TOP_NAV[t.topNav] || 'blend');
    document.documentElement.setAttribute('data-cursor', CURSOR_STYLES[t.cursorStyle] || 'off');
    document.documentElement.setAttribute('data-retrocursor', RETRO_CURSORS[t.retroCursor] || 'diamond');
    document.documentElement.setAttribute('data-herobg', HERO_BG[t.heroBg] || 'none');
    document.documentElement.setAttribute('data-herotype', HERO_TYPE[t.heroType] || 'classic');
    document.documentElement.setAttribute('data-ticket', TICKETS[t.ticket] || 'sunset');
    document.documentElement.setAttribute('data-csnavshell', NAV_SHELLS[t.navShell] || 'pill');
    document.documentElement.setAttribute('data-marquee', MARQUEE[t.marquee] || 'chips');
    document.documentElement.setAttribute('data-herostack', HERO_STACK[t.heroStack] || 'circles');
    document.documentElement.setAttribute('data-artifact', ARTIFACT_STYLES[t.artifact] || 'sticky');
    document.documentElement.setAttribute('data-rowhover', ROW_HOVER[t.rowHover] || 'fill');
    document.documentElement.setAttribute('data-retrorow', RETRO_ROW_HOVER[t.retroRowHover] || 'ink');
    document.documentElement.setAttribute('data-notelayout', NOTE_LAYOUTS[t.noteLayout] || 'below');
    document.documentElement.setAttribute('data-notecolor', NOTE_COLORS[t.noteColor] || 'classic');
    document.documentElement.setAttribute('data-reveal', REVEAL_STYLES[t.caseReveal] || 'clip');
    document.documentElement.setAttribute('data-herostatus', HERO_STATUS[t.heroStatus] || 'pulse');
    document.documentElement.setAttribute('data-footerbadge', FOOTER_BADGE[t.footerBadge] || 'show');
    document.documentElement.setAttribute('data-worklayout', WORK_LAYOUT[t.workLayout] || 'index');
    document.documentElement.setAttribute('data-aboutphotos', ABOUT_PHOTOS[t.aboutPhotos] || 'single');
    document.documentElement.setAttribute('data-aboutspread', ABOUT_SPREAD[t.aboutSpread] || 'cross');

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
    };
    apply();
    // expose so the public retro toggle (cmdk / logo easter egg) can re-run the
    // full tweak apply — restoring the user's configured hero font etc. instead
    // of hardcoding a default when leaving retro.
    window.__applyTweaks = apply;
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
      <TweakSelect label="Label font" value={t.monoFont}
        options={Object.keys(MONO_FONTS)}
        onChange={(v) => setTweak('monoFont', v)} />
      <TweakSelect label="Name treatment" value={t.heroType}
        options={Object.keys(HERO_TYPE)}
        onChange={(v) => setTweak('heroType', v)} />
      <TweakSection label="Navigation" />
      <TweakSelect label="Top nav layout" value={t.topNav}
        options={Object.keys(TOP_NAV)}
        onChange={(v) => setTweak('topNav', v)} />
      <TweakSelect label="Footer ticket" value={t.ticket}
        options={Object.keys(TICKETS)}
        onChange={(v) => setTweak('ticket', v)} />
      <TweakSection label="Photo hover" />
      <TweakSelect label="Avatar effect" value={t.avatarHover}
        options={Object.keys(AVATAR_HOVER)}
        onChange={(v) => setTweak('avatarHover', v)} />
      <TweakSelect label="Sticker layout" value={t.stickerLayout}
        options={Object.keys(STICKER_LAYOUTS)}
        onChange={(v) => setTweak('stickerLayout', v)} />
      <TweakSelect label="Tag layout" value={t.tagLayout}
        options={Object.keys(TAG_LAYOUTS)}
        onChange={(v) => setTweak('tagLayout', v)} />
      <TweakSection label="Motion" />
      <TweakSelect label="Hero status" value={t.heroStatus}
        options={Object.keys(HERO_STATUS)}
        onChange={(v) => setTweak('heroStatus', v)} />
      <TweakSelect label="Footer badge" value={t.footerBadge}
        options={Object.keys(FOOTER_BADGE)}
        onChange={(v) => setTweak('footerBadge', v)} />
      <TweakSelect label="Case study reveal" value={t.caseReveal}
        options={Object.keys(REVEAL_STYLES)}
        onChange={(v) => setTweak('caseReveal', v)} />
      <TweakSection label="Work hover" />
      <TweakSelect label="Work layout" value={t.workLayout}
        options={Object.keys(WORK_LAYOUT)}
        onChange={(v) => setTweak('workLayout', v)} />
      <TweakSelect label="About photos" value={t.aboutPhotos}
        options={Object.keys(ABOUT_PHOTOS)}
        onChange={(v) => setTweak('aboutPhotos', v)} />
      <TweakSelect label="Photo reveal" value={t.aboutSpread}
        options={Object.keys(ABOUT_SPREAD)}
        onChange={(v) => setTweak('aboutSpread', v)} />
      <TweakSelect label="Row hover" value={t.rowHover}
        options={Object.keys(ROW_HOVER)}
        onChange={(v) => setTweak('rowHover', v)} />
      <TweakSelect label="Row hover (retro)" value={t.retroRowHover}
        options={Object.keys(RETRO_ROW_HOVER)}
        onChange={(v) => setTweak('retroRowHover', v)} />
      <TweakSelect label="Greenstand hover" value={t.gsHover}
        options={Object.keys(GS_HOVER)}
        onChange={(v) => setTweak('gsHover', v)} />
      <TweakSelect label="Recruiter button" value={t.recBtn}
        options={Object.keys(REC_BTN)}
        onChange={(v) => setTweak('recBtn', v)} />
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
      <TweakSelect label="Retro cursor" value={t.retroCursor}
        options={Object.keys(RETRO_CURSORS)}
        onChange={(v) => setTweak('retroCursor', v)} />
      <TweakSelect label="Hero background" value={t.heroBg}
        options={Object.keys(HERO_BG)}
        onChange={(v) => setTweak('heroBg', v)} />
      <TweakSelect label="Menu shell" value={t.navShell}
        options={Object.keys(NAV_SHELLS)}
        onChange={(v) => setTweak('navShell', v)} />
      <TweakSelect label="Hero marquee" value={t.marquee}
        options={Object.keys(MARQUEE)}
        onChange={(v) => setTweak('marquee', v)} />
      <TweakSelect label="My stack badges" value={t.heroStack}
        options={Object.keys(HERO_STACK)}
        onChange={(v) => setTweak('heroStack', v)} />
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
      <TweakSelect label="Accent palette" value={t.accentSet}
        options={Object.keys(ACCENT_SETS)}
        onChange={(v) => setTweak('accentSet', v)} />
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
