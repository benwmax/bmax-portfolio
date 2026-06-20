import { useRef, useEffect } from 'react';
import { usePrefersReducedMotion } from './hooks';

/**
 * PhosphorCanvas — the animated backdrop for the "Phosphor Grid" exploration.
 *
 * Two layers, drawn in palette green on the warm-dark page:
 *   1. A synthwave perspective grid on the lower half — horizontal rules that
 *      rush toward the viewer and vertical rules fanning from a horizon point.
 *   2. A field of phosphor particles drifting upward, twinkling as they fade.
 *
 * The horizon point parallaxes a few pixels toward the cursor for depth.
 * With prefers-reduced-motion the canvas paints exactly one static frame and
 * stops — no animation loop is ever started.
 */
export function PhosphorCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // pointer offset, eased toward target for smooth parallax
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    type Particle = { x: number; y: number; vy: number; r: number; a: number; tw: number };
    let particles: Particle[] = [];

    // Arrow consts (not function declarations) so TS keeps the non-null
    // narrowing of `canvas`/`ctx` from the guards above inside these closures.
    const makeParticle = (initial: boolean): Particle => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      vy: 0.15 + Math.random() * 0.55,
      r: 0.6 + Math.random() * 1.6,
      a: 0.15 + Math.random() * 0.5,
      tw: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // particle count scales with area, capped for perf
      const count = Math.min(90, Math.floor((w * h) / 14000));
      particles = Array.from({ length: count }, () => makeParticle(true));
    };

    const drawGrid = (time: number) => {
      const horizonY = h * 0.62 + pointer.y * 0.01;
      const cx = w / 2 + pointer.x * 0.02;

      // horizon glow
      const glow = ctx.createRadialGradient(cx, horizonY, 0, cx, horizonY, w * 0.5);
      glow.addColorStop(0, 'rgba(0, 224, 84, 0.10)');
      glow.addColorStop(1, 'rgba(0, 224, 84, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, horizonY - h * 0.25, w, h);

      ctx.lineWidth = 1;

      // horizontal lines rushing forward — log-spaced rows scrolling with time
      const rows = 22;
      const speed = reduced ? 0 : (time * 0.00006) % 1;
      for (let i = 0; i < rows; i += 1) {
        const t = (i + speed) / rows;
        const p = t * t; // perspective bunching toward horizon
        const y = horizonY + p * (h - horizonY);
        const alpha = 0.04 + t * 0.22;
        ctx.strokeStyle = `rgba(0, 224, 84, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // vertical lines fanning from the horizon point
      const cols = 24;
      for (let i = 0; i <= cols; i += 1) {
        const f = (i / cols - 0.5) * 2; // -1..1
        const xBottom = cx + f * w * 1.4;
        ctx.strokeStyle = `rgba(0, 224, 84, ${0.05 + Math.abs(f) * 0.06 + 0.05})`;
        ctx.beginPath();
        ctx.moveTo(cx, horizonY);
        ctx.lineTo(xBottom, h);
        ctx.stroke();
      }
    };

    const drawParticles = (time: number) => {
      for (const pt of particles) {
        if (!reduced) {
          pt.y -= pt.vy;
          pt.tw += 0.04;
          if (pt.y < -10) Object.assign(pt, makeParticle(false));
        }
        const twinkle = reduced ? 1 : 0.6 + 0.4 * Math.sin(pt.tw);
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 94, ${pt.a * twinkle})`;
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }
      void time;
    };

    let raf = 0;
    const frame = (time: number) => {
      // ease pointer toward target
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      ctx.clearRect(0, 0, w, h);
      drawGrid(time);
      drawParticles(time);

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX - w / 2;
      pointer.ty = e.clientY - h / 2;
    };

    resize();
    window.addEventListener('resize', resize);
    if (!reduced) window.addEventListener('pointermove', onPointer);

    if (reduced) {
      frame(0); // single static paint
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
