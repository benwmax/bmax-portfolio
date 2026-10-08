/*
 * hooks.ts — motion + interaction primitives for the homepage explorations.
 *
 * Every effect here is gated on prefers-reduced-motion. The terminal aesthetic
 * leans on motion to feel alive, but the reduced-motion path always resolves to
 * the final, readable state immediately — motion is the garnish, never the meal.
 *
 * The typewriter / scramble / count-up / in-view hooks are animation *drivers*:
 * they reset their output state when their inputs change and then advance it from
 * a timer or observer. That reset is a deliberate synchronous setState inside the
 * effect — the one case react-hooks/set-state-in-effect is too strict for — so it
 * is disabled per-effect with this justification rather than silently suppressed.
 */
import { useEffect, useRef, useState } from 'react';

/**
 * True at the viewport width where the mobile chat overlay is the active
 * surface. Mirrors the `max-width: 760px` breakpoint in
 * MobileChatSurface.module.css — keep the two in sync. Reactive to resizes,
 * so a mid-conversation resize across the breakpoint updates correctly.
 */
export function useIsMobileViewport(): boolean {
  const query = '(max-width: 760px)';
  // Lazy init reads the current match up front so there's no setState in the
  // effect body — the effect only subscribes to later changes.
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && 'matchMedia' in window ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isMobile;
}

/** True when the user has asked the OS to reduce motion. Reactive to changes. */
export function usePrefersReducedMotion(): boolean {
  // Lazy init reads the current preference up front so there's no setState in the
  // effect body — the effect only subscribes to later changes.
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && 'matchMedia' in window
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Fires once when an element scrolls into view. Returns a ref to attach and a
 * boolean. With reduced motion (or no IntersectionObserver) it reports true
 * immediately so reveal animations never hide content.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = '0px 0px -10% 0px',
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') {
      // Reveal immediately — never hide content when motion is off / unsupported.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- deliberate reveal fallback
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced, rootMargin]);

  return [ref, inView];
}

/**
 * Types `text` out character by character once `start` is true. Reduced motion
 * returns the full string instantly. `done` flips when the string is complete —
 * used to swap a steady cursor for a blinking one.
 */
export function useTypewriter(text: string, start = true, speed = 38) {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    // Reset output for the new input, then advance it from the interval below.
    /* eslint-disable react-hooks/set-state-in-effect -- animation driver: reset-then-tick */
    if (reduced) {
      setOut(text);
      setDone(true);
      return;
    }
    setOut('');
    setDone(false);
    /* eslint-enable react-hooks/set-state-in-effect */
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, start, speed, reduced]);

  return { out, done };
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>*#%@';

/**
 * Resolves `text` from a scramble of random glyphs into the final string.
 * Each character locks in left-to-right. Reduced motion returns the final text.
 */
export function useScramble(text: string, start = true, perChar = 3) {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? text : '');

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- animation driver: final state when motion off
      setOut(text);
      return;
    }
    let frame = 0;
    const total = text.length * perChar;
    const id = window.setInterval(() => {
      frame += 1;
      const locked = Math.floor(frame / perChar);
      let s = '';
      for (let i = 0; i < text.length; i += 1) {
        if (i < locked || text[i] === ' ') s += text[i];
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (frame >= total) {
        setOut(text);
        window.clearInterval(id);
      }
    }, 28);
    return () => window.clearInterval(id);
  }, [text, start, perChar, reduced]);

  return out;
}

/**
 * Counts a numeric value up from 0 once `start` is true. `format` rebuilds the
 * original label (e.g. "$1B", "15+ yrs") around the animated number. Non-numeric
 * figures should not use this hook. Reduced motion shows the final value.
 */
export function useCountUp(target: number, start = true, duration = 1100) {
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- animation driver: final value when motion off
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      // easeOutExpo — fast then settles, feels like a readout locking on
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration, reduced]);

  return val;
}
