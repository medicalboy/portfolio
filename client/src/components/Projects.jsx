import { useCallback, useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead.jsx';
import { DeliveryStrip } from './TickStrip.jsx';

export default function Projects({ projects }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = [...track.children];
    const middle = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let best = Infinity;
    cards.forEach((card, i) => {
      const centre = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(centre - middle);
      if (distance < best) {
        best = distance;
        closest = i;
      }
    });
    setIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    track.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      track.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const goTo = (next) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(projects.items.length - 1, next));
    const card = track.children[clamped];
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  return (
    <section className="section section--work" id="work">
      <div className="shell">
        <SectionHead eyebrow={projects.eyebrow} title={projects.title} lead={projects.lead} />
      </div>

      <div className="carousel">
        <div className="carousel__track" ref={trackRef}>
          {projects.items.map((project, i) => (
            <article className={`card workCard workCard--${project.accent}`} key={project.name}>
              <div className="workCard__head">
                <span className="workCard__index">0{i + 1}</span>
                <span className="workCard__emoji" aria-hidden="true">
                  {project.emoji}
                </span>
              </div>

              <p className="mono-label">
                {project.kind} · {project.period}
              </p>
              <h3 className="workCard__name">{project.name}</h3>
              <p className="workCard__thesis">{project.thesis}</p>
              <p className="prose">{project.body}</p>

              {project.metrics && (
                <dl className="metrics">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="metrics__cell">
                      <dt className="metrics__value">{metric.value}</dt>
                      <dd className="metrics__label">{metric.label}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {project.deliveries && (
                <DeliveryStrip
                  deliveries={project.deliveries}
                  legend={project.deliveryLegend}
                />
              )}

              <ul className="chips">
                {project.stack.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>

              {project.reference && (
                <a
                  className="workCard__link"
                  href={project.reference.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {project.reference.label} →
                </a>
              )}
              {project.live && (
                <a
                  className="workCard__demo"
                  href={project.live.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {project.live.label} →
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="carousel__controls">
          <button
            type="button"
            className="roundButton"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous project"
          >
            ←
          </button>

          <div className="dots">
            {projects.items.map((project, i) => (
              <button
                key={project.name}
                type="button"
                className={`dot ${i === index ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${project.name}`}
                aria-current={i === index}
              />
            ))}
          </div>

          <button
            type="button"
            className="roundButton"
            onClick={() => goTo(index + 1)}
            disabled={index === projects.items.length - 1}
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
