import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function About({ about }) {
  return (
    <section className="section" id="about">
      <div className="shell">
        <SectionHead eyebrow={about.eyebrow} title={about.title} />

        <div className="about">
          <Reveal className="card about__story">
            <p className="about__lead">{about.lead}</p>
            {about.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="prose">
                {text}
              </p>
            ))}
          </Reveal>

          <div className="about__facts">
            {about.facts.map((fact, i) => (
              <Reveal
                key={fact.label}
                className="card factCard"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <p className="mono-label">{fact.label}</p>
                <p className="factCard__value">{fact.value}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
