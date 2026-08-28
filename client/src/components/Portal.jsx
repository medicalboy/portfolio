import { useEffect, useState } from 'react';

// Concentric arcs turning at different speeds around a glowing core.
// Each arc is one circle with a gap in its dash pattern.
const RINGS = [
  { r: 188, colour: 'var(--orange)', dash: '900 400', width: 3 },
  { r: 162, colour: 'var(--violet)', dash: '620 400', width: 3 },
  { r: 132, colour: 'var(--orange)', dash: '520 310', width: 2.5 },
  { r: 104, colour: 'var(--pink)', dash: '380 270', width: 2.5 },
  { r: 76, colour: 'var(--violet)', dash: '300 180', width: 2 },
  { r: 52, colour: 'var(--green)', dash: '120 210', width: 2 },
];

const SPECKS = [
  { cx: 92, cy: 300, r: 4, colour: 'var(--violet)' },
  { cx: 306, cy: 118, r: 4, colour: 'var(--orange)' },
  { cx: 138, cy: 78, r: 2.5, colour: 'var(--pink)' },
  { cx: 330, cy: 268, r: 3, colour: 'var(--orange)' },
  { cx: 214, cy: 356, r: 2.5, colour: 'var(--violet)' },
];

export default function Portal({ onEnter }) {
  const [leaving, setLeaving] = useState(false);

  const leave = () => {
    setLeaving(true);
    setTimeout(onEnter, 620);
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Enter' || event.key === 'Escape') leave();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className={`portal ${leaving ? 'is-leaving' : ''}`}>
      <div className="portal__stage">
        <svg className="portal__rings" viewBox="0 0 400 400" aria-hidden="true">
          {RINGS.map((ring, i) => (
            <circle
              key={ring.r}
              className={`ring ring--${i + 1}`}
              cx="200"
              cy="200"
              r={ring.r}
              fill="none"
              stroke={ring.colour}
              strokeWidth={ring.width}
              strokeDasharray={ring.dash}
              strokeLinecap="round"
            />
          ))}
          {SPECKS.map((speck) => (
            <circle
              key={`${speck.cx}-${speck.cy}`}
              cx={speck.cx}
              cy={speck.cy}
              r={speck.r}
              fill={speck.colour}
            />
          ))}
        </svg>

        <button type="button" className="portal__orb" onClick={leave}>
          Enter
        </button>
      </div>

      <p className="portal__hint">
        <span className="grad-text">Click</span> the portal to enter
      </p>

      <button type="button" className="portal__skip" onClick={leave}>
        Skip →
      </button>
    </div>
  );
}
