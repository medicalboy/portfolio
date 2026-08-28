import { useEffect, useState } from 'react';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Types each string in `words`, holds it, deletes it, moves to the next.
 * Under reduced motion it simply shows the first string.
 */
export default function useTypewriter(words, { type = 70, remove = 34, hold = 1900 } = {}) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(reduced() ? (words[0]?.length ?? 0) : 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced() || words.length === 0) return undefined;

    const word = words[index % words.length];

    if (!deleting && length === word.length) {
      const timer = setTimeout(() => setDeleting(true), hold);
      return () => clearTimeout(timer);
    }

    if (deleting && length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return undefined;
    }

    const timer = setTimeout(
      () => setLength((n) => n + (deleting ? -1 : 1)),
      deleting ? remove : type
    );
    return () => clearTimeout(timer);
  }, [words, index, length, deleting, type, remove, hold]);

  const current = words[index % words.length] ?? '';
  return current.slice(0, length);
}
