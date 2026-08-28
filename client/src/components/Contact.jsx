import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';

export default function Contact({ contact, person }) {
  const year = new Date().getFullYear();

  const rows = [
    { label: 'Email', value: person.email, href: `mailto:${person.email}` },
    { label: 'Phone', value: person.phone, href: `tel:${person.phone.replace(/\s/g, '')}` },
    { label: 'LinkedIn', value: 'wilson-li', href: person.linkedin, external: true },
    { label: 'CV', value: 'Download PDF', href: person.cv, download: true },
  ];

  return (
    <section className="section section--contact" id="contact">
      <div className="shell">
        <SectionHead eyebrow={contact.eyebrow} title={contact.title} lead={contact.lead} />

        <Reveal className="card contactCard">
          <a className="button button--grad button--wide" href={`mailto:${person.email}`}>
            Email me →
          </a>

          <ul className="contactList">
            {rows.map((row) => (
              <li className="contactList__row" key={row.label}>
                <span className="mono-label">{row.label}</span>
                <a
                  className="contactList__value"
                  href={row.href}
                  {...(row.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  {...(row.download ? { download: true } : {})}
                >
                  {row.value}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <footer className="footer">
          <span className="mono-label">
            © {year} {person.name} · {person.location}
          </span>
          <a className="mono-label footer__top" href="#top">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
