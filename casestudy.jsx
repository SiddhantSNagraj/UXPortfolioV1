/* CASE STUDY detail page */

const { useEffect: useEffectC } = React;

function CaseStudy({ project, projects, onOpen, onHome }) {
  useEffectC(() => { window.scrollTo(0, 0); }, [project.id]);
  const p = project;
  const accent = p.accent === 'yellow' ? 'var(--yellow-ink)' : 'var(--blue)';
  const idx = projects.findIndex((x) => x.id === p.id);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="case">
      {/* hero */}
      <section className="case__hero">
        <div className="wrap">
          <button className="case__back mono" onClick={onHome}>← Back to home</button>

          <div className="case__metatop">
            <span className="pixel case__no" style={{ color: accent }}>{p.no}</span>
            <span className="chip" style={{ borderColor: accent, color: accent }}>{p.tag}</span>
            <span className="mono">{p.year}</span>
          </div>

          <h1 className="case__title display">{p.title}</h1>
          <p className="case__subtitle">{p.subtitle}</p>
          <p className="case__blurb">{p.blurb}</p>

          <div className="case__meta">
            {Object.entries(p.meta).map(([k, v]) => (
              <div className="case__metacell" key={k}>
                <span className="mono case__metak">{k}</span>
                <span className="case__metav">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cover */}
      <section className="wrap">
        <Slot label={p.cover} corner={`FIG. 01`} style={{ aspectRatio: '16/9' }} className="case__cover" />
      </section>

      {/* stat band */}
      <section className="case__stats">
        <div className="wrap case__statsrow">
          <span className="mono mono--ink case__statslabel">Impact,</span>
          {p.stat.map(([n, l], i) => (
            <div className="case__stat" key={i}>
              <span className="case__statn display" style={{ color: i === 1 ? accent : 'var(--ink)' }}>{n}</span>
              <span className="mono case__statl">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* overview */}
      <section className="wrap case__overview">
        <span className="mono mono--accent">( Overview )</span>
        <p className="case__overtext">{p.overview}</p>
      </section>

      {/* body sections */}
      <div className="case__body">
        {p.sections.map((s, i) => {
          if (s.kind === 'text') {
            return (
              <section className="wrap case__sec" key={i}>
                <div className="case__seclabel">
                  <span className="pixel" style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="mono">{s.label}</span>
                </div>
                <div className="case__sectext">
                  <h2 className="case__sechead">{s.heading}</h2>
                  <p className="case__secbody">{s.body}</p>
                </div>
              </section>
            );
          }
          if (s.kind === 'image') {
            return (
              <section className="wrap case__figwrap" key={i}>
                <Slot label={s.caption} corner={`FIG. ${String(i + 1).padStart(2, '0')}`} style={{ aspectRatio: '16/9' }} />
                <span className="mono case__figcap">{s.caption}</span>
              </section>
            );
          }
          if (s.kind === 'split') {
            return (
              <section className="wrap case__split" key={i}>
                <div>
                  <Slot label={s.caption} style={{ aspectRatio: '4/3' }} />
                  <span className="mono case__figcap">{s.caption}</span>
                </div>
                <div>
                  <Slot label={s.caption2} style={{ aspectRatio: '4/3' }} />
                  <span className="mono case__figcap">{s.caption2}</span>
                </div>
              </section>
            );
          }
          return null;
        })}
      </div>

      {/* next project */}
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

Object.assign(window, { CaseStudy });
