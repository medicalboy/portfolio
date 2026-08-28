import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

const ACCENTS = ['orange', 'pink', 'violet', 'cyan', 'green', 'orange'];

export default function Skills({ skills, education }) {
  return (
    <section className="section" id="skills">
      <div className="shell">
        <SectionHead eyebrow={skills.eyebrow} title={skills.title} />

        <div className="skills">
          {skills.groups.map((group, i) => (
            <Reveal
              key={group.label}
              className={`card skillCard skillCard--${ACCENTS[i % ACCENTS.length]}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <p className="mono-label">{group.label}</p>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="education">
          {education.map((entry) => (
            <Reveal key={entry.degree} className="card eduCard">
              <p className="mono-label">{entry.period}</p>
              <h3 className="eduCard__degree">{entry.degree}</h3>
              <p className="eduCard__school">{entry.school}</p>
              {entry.note && <p className="eduCard__note">{entry.note}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
