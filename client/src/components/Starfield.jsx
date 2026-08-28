import { useEffect, useRef } from 'react';

const COLOURS = ['#F0A03C', '#E0538F', '#7B5CFF', '#4EC5EC', '#3ED598'];

// Slow drifting specks behind the hero. Most are neutral; a few carry accent
// colour so the field reads as warm rather than as a screensaver.
export default function Starfield({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let specks = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(120, Math.round((width * height) / 12000));
      specks = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.09,
        vy: (Math.random() - 0.5) * 0.09,
        alpha: Math.random() * 0.5 + 0.18,
        colour: i % 7 === 0 ? COLOURS[i % COLOURS.length] : null,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const base = theme === 'light' ? '20, 22, 31' : '255, 255, 255';

      specks.forEach((speck) => {
        if (!still) {
          speck.x += speck.vx;
          speck.y += speck.vy;
          if (speck.x < 0) speck.x = width;
          if (speck.x > width) speck.x = 0;
          if (speck.y < 0) speck.y = height;
          if (speck.y > height) speck.y = 0;
        }
        ctx.beginPath();
        ctx.arc(speck.x, speck.y, speck.r, 0, Math.PI * 2);
        if (speck.colour) {
          ctx.globalAlpha = speck.alpha + 0.2;
          ctx.fillStyle = speck.colour;
        } else {
          ctx.globalAlpha = theme === 'light' ? speck.alpha * 0.5 : speck.alpha;
          ctx.fillStyle = `rgb(${base})`;
        }
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (!still) raf = requestAnimationFrame(draw);
    };

    seed();
    draw();

    const onResize = () => {
      seed();
      if (still) draw();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);

  return <canvas className="starfield" ref={canvasRef} aria-hidden="true" />;
}
