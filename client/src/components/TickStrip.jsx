// Real outcome classes from the cricket paper, drawn as a sequence.
// Bar height encodes runs; a wicket is the full-height dark bar.
const TONES = {
  0: 'dot',
  1: 'run',
  2: 'run',
  3: 'run',
  4: 'boundary',
  5: 'boundary',
  6: 'boundary',
  W: 'wicket',
};

export function DeliveryStrip({ deliveries, legend }) {
  return (
    <figure className="deliveries">
      <div className="deliveries__strip" aria-hidden="true">
        {[...deliveries].map((ball, i) => (
          <span key={i} className={`tick tick--${TONES[ball] ?? 'dot'}`} />
        ))}
      </div>
      <figcaption className="deliveries__foot">
        <span className="mono-label">One tick per delivery</span>
        <ul className="legend">
          {legend.map((item) => (
            <li key={item.label} className="legend__item">
              <span className={`legend__swatch tick--${item.key}`} />
              {item.label}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

export default DeliveryStrip;
