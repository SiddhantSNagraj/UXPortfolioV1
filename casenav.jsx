/* CASE SECTION NAV, floating "contents" menu for long case studies.
   Auto-discovers sections via a selector, reads each section's label from its
   first .mono (or a data-navlabel), highlights the active one on scroll, and
   smooth-scrolls on click. Styled like a jump-menu; works on all screen sizes.
   Inherits the host case's --accent. */

const { useState: useStateCN, useEffect: useEffectCN, useRef: useRefCN } = React;

function CaseSectionNav({ sectionSelector }) {
  const [sections, setSections] = useStateCN([]);
  const [active, setActive] = useStateCN(0);
  const [open, setOpen] = useStateCN(false);
  const secRef = useRefCN([]);

  // discover sections + track active by scroll position (deterministic)
  useEffectCN(() => {
    const els = [...document.querySelectorAll(sectionSelector)].filter((el) => !el.hasAttribute('data-navskip'));
    const secs = els.map((el, i) => {
      if (!el.id) el.id = 'cnsec-' + i;
      let label = el.getAttribute('data-navlabel');
      if (!label) {
        const mono = el.querySelector('.mono');
        label = mono ? mono.textContent : 'Section ' + (i + 1);
      }
      label = label.replace(/[()✳·]/g, ' ').replace(/\s+/g, ' ').trim();
      return { id: el.id, label, el };
    });
    secRef.current = secs;
    setSections(secs);

    const compute = () => {
      const line = 130; // a section becomes "active" once its top passes this y
      let idx = 0;
      for (let i = 0; i < secs.length; i += 1) {
        if (secs[i].el.getBoundingClientRect().top <= line) idx = i;
      }
      setActive(idx);
    };
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; compute(); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    compute();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionSelector]);

  // close on Esc
  useEffectCN(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // reading time (computed once from the article) + top scroll-progress bar
  const [mins, setMins] = useStateCN(0);
  useEffectCN(() => {
    const article = document.querySelector('.case');
    if (article) {
      const words = (article.innerText || '').trim().split(/\s+/).length;
      setMins(Math.max(1, Math.round(words / 200)));
    }
    const bar = document.createElement('div');
    bar.className = 'caseprog';
    const fill = document.createElement('div');
    fill.className = 'caseprog__fill';
    bar.appendChild(fill);
    document.body.appendChild(bar);
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      fill.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      bar.remove();
    };
  }, [sectionSelector]);

  const jump = (s) => {
    setOpen(false);
    const targetTop = () => s.el.getBoundingClientRect().top + window.scrollY - 74;
    window.scrollTo({ top: targetTop(), behavior: 'smooth' });
    // Re-aim as lazy-loaded media shifts the page height, so long jumps land true.
    let tries = 0;
    const correct = () => {
      tries += 1;
      const want = targetTop();
      if (Math.abs(window.scrollY - want) > 4) {
        window.scrollTo({ top: want, behavior: tries > 3 ? 'auto' : 'smooth' });
      }
      if (tries < 7) setTimeout(correct, 230);
    };
    setTimeout(correct, 280);
  };

  if (sections.length < 3) return null;
  const current = sections[active] || sections[0];

  return (
    <div className={`csnav ${open ? 'is-open' : ''}`}>
      <button className="csnav__scrim" aria-label="Close section menu" tabIndex={-1} onClick={() => setOpen(false)} />
      <div className="csnav__panel" role="menu" aria-label="Jump to section">
        <div className="csnav__head mono">Sections{mins ? ` · ${mins} min read` : ''}</div>
        <div className="csnav__list">
          {sections.map((s, i) => (
            <button
              key={s.id}
              className={`csnav__item ${i === active ? 'is-active' : ''}`}
              role="menuitem"
              onClick={() => jump(s)}
            >
              <span className="csnav__bar" aria-hidden="true" />
              <span className="csnav__num mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="csnav__lbl">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
      <button className="csnav__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Toggle section menu">
        <span className="csnav__bars" aria-hidden="true"><i /><i /><i /></span>
        <span className="csnav__current">{current.label}</span>
        <span className="csnav__count mono">{active + 1}/{sections.length}</span>
      </button>
    </div>
  );
}

Object.assign(window, { CaseSectionNav });
