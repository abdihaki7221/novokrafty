'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * VideoPanel — a container with a muted, looping ambient video behind its children.
 * Video only plays when in viewport (saves battery/CPU) and is hidden for
 * prefers-reduced-motion users (poster stays as a static background).
 */
export function VideoPanel({ src, poster, className = '', overlay = true, children, ...props }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(vid);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`video-panel ${overlay ? '' : 'no-overlay'} ${className}`} {...props}>
      <video
        ref={videoRef}
        data-ambient
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={!overlay ? { zIndex: 0 } : undefined}
      />
      {children}
    </div>
  );
}

/** CountUp — animates a number (with prefix/suffix preserved, e.g. "120+", "99.9%") on first view. */
export function CountUp({ value, duration = 1600, className = '' }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = String(value).match(/^([^0-9]*)([0-9.,]+)(.*)$/);
    if (!match) { setDisplay(value); return; }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ''));
    const decimals = (numStr.split('.')[1] || '').length;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const current = (target * eased).toFixed(decimals);
        setDisplay(`${prefix}${Number(current).toLocaleString(undefined, { minimumFractionDigits: decimals })}${suffix}`);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>{display}</span>;
}

/** Marquee — infinite horizontal scroll of children (duplicated for a seamless loop). */
export function Marquee({ children, className = '' }) {
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        <div className="flex items-center gap-10 shrink-0">{children}</div>
        <div className="flex items-center gap-10 shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

/** Spotlight — tracks the cursor and feeds CSS vars for the radial highlight. */
export function Spotlight({ children, className = '', ...props }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight-card ${className}`} {...props}>
      {children}
    </div>
  );
}
