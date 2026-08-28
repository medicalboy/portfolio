import useTypewriter from '../hooks/useTypewriter.js';
import Starfield from './Starfield.jsx';

export default function Hero({ hero, person, theme }) {
  const role = useTypewriter(hero.roles, { type: 68, remove: 32, hold: 1800 });
  const command = useTypewriter(hero.terminal.commands, { type: 44, remove: 18, hold: 2600 });

  return (
    <section className="hero" id="top">
      <Starfield theme={theme} />
      <div className="hero__glow" aria-hidden="true" />

      <div className="shell hero__inner">
        <p className="status">
          <span className="status__dot" aria-hidden="true" />
          {hero.status}
        </p>

        <p className="hero__greeting">{hero.greeting}</p>
        <h1 className="hero__name">{hero.headline}</h1>

        <p className="hero__role">
          I'm{' '}
          <span className="hero__roleWord">
            {role}
            <span className="caret" aria-hidden="true" />
          </span>
        </p>

        <p className="terminal">
          <span className="terminal__path">{hero.terminal.path}</span>
          <span className="terminal__prompt">$</span>
          <span className="terminal__command">{command}</span>
          <span className="caret caret--mono" aria-hidden="true" />
        </p>

        <div className="hero__actions">
          <a className="button button--grad" href="#work">
            See my work →
          </a>
          <a className="button button--ghost" href={`mailto:${person.email}`}>
            Let's talk
          </a>
        </div>

        <p className="hero__statement">{hero.statement}</p>
      </div>
    </section>
  );
}
