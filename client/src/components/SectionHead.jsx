export default function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className="head">
      <p className="eyebrow">
        <span className="eyebrow__rule" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="head__title">{title}</h2>
      {lead && <p className="head__lead">{lead}</p>}
    </div>
  );
}
