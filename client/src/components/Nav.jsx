import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function Moon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Sun() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
      </g>
    </svg>
  );
}

export default function Nav({ person, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)}>
          wilson<span className="wordmark__dot">.</span>
        </a>

        <button
          type="button"
          className="iconButton"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Moon /> : <Sun />}
        </button>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((link) => (
            <a key={link.id} className="nav__link" href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="nav__cta" href={`mailto:${person.email}`}>
          Hire me
        </a>

        <button
          type="button"
          className={`burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="drawer">
          {LINKS.map((link, i) => (
            <a
              key={link.id}
              className="drawer__link"
              href={`#${link.id}`}
              style={{ animationDelay: `${i * 55}ms` }}
              onClick={() => setOpen(false)}
            >
              <span className="drawer__index">0{i + 1}</span>
              {link.label}
            </a>
          ))}
          <a className="button button--grad drawer__cta" href={`mailto:${person.email}`}>
            {person.email}
          </a>
        </div>
      )}
    </header>
  );
}
