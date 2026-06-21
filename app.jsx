/* APP, state router (home + case studies) */

const { useState: useStateA, useEffect: useEffectA } = React;

function App() {
  const data = window.PORTFOLIO;
  const [route, setRoute] = useStateA({ view: 'home', id: null });
  const [activeSec, setActiveSec] = useStateA(null);
  const [hasNavigated, setHasNavigated] = useStateA(false);
  const [theme, setTheme] = useStateA(
    () => (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light') ? 'light' : 'dark'
  );

  useEffectA(() => {
    if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('sn-theme', theme); } catch (e) {}
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // hash routing so back/forward + reload work
  useEffectA(() => {
    const apply = () => {
      const h = window.location.hash.replace('#', '');
      if (h.startsWith('project/')) {
        const id = h.split('/')[1];
        if (data.projects.find((p) => p.id === id)) { setRoute({ view: 'case', id }); return; }
      }
      setRoute({ view: 'home', id: null });
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  // track active section on home for nav underline — scroll-position based so it
  // reflects the current section reliably (incl. jumps/fast scroll), unlike a
  // thin-band IntersectionObserver which can skip the trigger zone.
  useEffectA(() => {
    if (route.view !== 'home') return;
    const ids = ['work', 'about', 'contact'];
    let raf = 0;
    const compute = () => {
      const line = window.innerHeight * 0.4;
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSec(current);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(compute); };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [route.view]);

  const openProject = (id) => { setHasNavigated(true); window.location.hash = `project/${id}`; };
  const goHome = () => { setHasNavigated(true); window.location.hash = ''; };
  const onNav = (view, section) => {
    if (view === 'home') {
      if (route.view !== 'home') { window.location.hash = ''; if (section) setTimeout(() => scrollTo(section), 60); return; }
      if (section) scrollTo(section);
    }
  };
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  const project = route.id ? data.projects.find((p) => p.id === route.id) : null;

  return (
    <React.Fragment>
      <TopNav onNav={onNav} active={activeSec} solid={route.view === 'case'} theme={theme} onToggleTheme={toggleTheme} resumeUrl={data.profile.resume} />
      <TweaksUI />
      {route.view === 'home' ? (
        <main className={`route-view ${hasNavigated ? 'route-anim' : ''}`} key="home">
          <Hero projects={data.projects} onOpen={openProject} />
          <WorkIndex projects={data.projects} onOpen={openProject} />
          <About profile={data.profile} reviews={data.reviews} />
          <Contact profile={data.profile} />
        </main>
      ) : (
        <main className={`route-view ${hasNavigated ? 'route-anim' : ''}`} key={`case-${project ? project.id : 'x'}`}>
          {project && project.id === 'coffeehouse'
            ? <CoffeeCase project={project} projects={data.projects} onOpen={openProject} onHome={goHome} />
            : project && project.id === 'apmc'
            ? <ApmcCase project={project} projects={data.projects} onOpen={openProject} onHome={goHome} />
            : project && project.id === 'greenstand'
            ? <GreenstandCase project={project} projects={data.projects} onOpen={openProject} onHome={goHome} />
            : project && project.id === 'slack'
            ? <SlackCase project={project} projects={data.projects} onOpen={openProject} onHome={goHome} />
            : <CaseStudy project={project} projects={data.projects} onOpen={openProject} onHome={goHome} />}
          <Contact profile={data.profile} />
        </main>
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
