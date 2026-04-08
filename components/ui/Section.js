'use client';

import { useRef, useEffect, useState } from 'react';

export function SectionTitle({ sub, title, desc, align = 'center' }) {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}>
      {sub && (
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-nova-500 to-transparent" />
          <span className="text-xs uppercase tracking-[4px] font-semibold text-nova-400">{sub}</span>
          <div className="w-8 h-px bg-gradient-to-l from-nova-500 to-transparent" />
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text leading-tight">{title}</h2>
      {desc && <p className="mt-4 text-base text-white/40 max-w-2xl mx-auto leading-relaxed">{desc}</p>}
    </div>
  );
}

export function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
