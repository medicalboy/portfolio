import { useEffect, useState } from 'react';
import Portal from './components/Portal.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';

// `?theme=light` forces a theme for this visit; otherwise use whatever the
// pre-paint script in index.html already applied.
const readTheme = () => {
  try {
    const asked = new URLSearchParams(window.location.search).get('theme');
    if (asked === 'light' || asked === 'dark') return asked;
  } catch (error) {
    /* fall through */
  }
  return document.documentElement.dataset.theme || 'dark';
};

// The portal shows once per browser tab, not on every scroll-back.
// `?skip` links straight past it — handy for sharing a deep link.
const readPortalSeen = () => {
  try {
    if (new URLSearchParams(window.location.search).has('skip')) return true;
    return sessionStorage.getItem('portalSeen') === '1';
  } catch (error) {
    return false;
  }
};

export default function App() {
  const [profile, setProfile] = useState(null);
  const [failed, setFailed] = useState(false);
  const [theme, setTheme] = useState(readTheme);
  const [entered, setEntered] = useState(readPortalSeen);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      /* private browsing — the theme just will not persist */
    }
  }, [theme]);

  useEffect(() => {
    let live = true;
    fetch('/api/profile.json')
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data) => live && setProfile(data))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, []);

  const enter = () => {
    setEntered(true);
    try {
      sessionStorage.setItem('portalSeen', '1');
    } catch (error) {
      /* nothing to do */
    }
  };

  if (failed) {
    return (
      <main className="state">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow__rule" aria-hidden="true" />
            Content service offline
          </p>
          <h1 className="state__title">The page has nothing to show yet.</h1>
          <p className="prose">
            The site reads its content from the Node API. Start it, then reload this page:
          </p>
          <pre className="state__code">npm run dev:server</pre>
        </div>
      </main>
    );
  }

  if (!entered) return <Portal onEnter={enter} />;

  if (!profile) {
    return (
      <main className="state">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow__rule" aria-hidden="true" />
            Loading
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Nav
        person={profile.person}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />
      <main>
        <Hero hero={profile.hero} person={profile.person} theme={theme} />
        <About about={profile.about} />
        <Experience experience={profile.experience} />
        <Projects projects={profile.projects} />
        <Skills skills={profile.skills} education={profile.education} />
        <Contact contact={profile.contact} person={profile.person} />
      </main>
    </>
  );
}
