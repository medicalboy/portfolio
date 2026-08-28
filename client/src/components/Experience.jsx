import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Experience({ experience }) {
  return (
    <section className="section" id="experience">
      <div className="shell">
        <SectionHead
          eyebrow={experience.eyebrow}
          title={experience.title}
          lead={experience.lead}
        />

        <div className="timeline">
          {experience.roles.map((role) => (
            <Reveal as="article" className="timeline__row" key={`${role.company}-${role.start}`}>
              <div className="timeline__rail" aria-hidden="true">
                <span className="timeline__node" />
              </div>

              <div className="card roleCard">
                <div className="roleCard__top">
                  <div>
                    <h3 className="roleCard__company">{role.company}</h3>
                    <p className="roleCard__title">
                      {role.title} <span className="dim">· {role.place}</span>
                    </p>
                  </div>
                  <div className="roleCard__when">
                    <p className="mono-label">
                      {role.start} — {role.end}
                    </p>
                    <p className="pill pill--quiet">
                      {role.months} mo · {role.type}
                    </p>
                  </div>
                </div>

                <p className="prose">{role.summary}</p>

                {role.points.length > 0 && (
                  <ul className="bullets">
                    {role.points.map((point) => (
                      <li key={point.slice(0, 24)} className="bullets__item">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {role.stack.length > 0 && (
                  <ul className="chips">
                    {role.stack.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
