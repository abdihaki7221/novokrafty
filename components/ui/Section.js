'use client';

import { useRef, useEffect, useState } from 'react';

export function SectionTitle({ sub, title, desc, align = 'center' }) {
  const centered = align === 'center';
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {sub && (
        <div className={`kicker mb-5 ${centered ? 'justify-center' : ''}`}>
          <span className="w-1.5 h-1.5 bg-nova-400" aria-hidden="true" />
          {sub}
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-display font-bold text-white/95 leading-[1.05] tracking-tight">
        {title}
      </h2>
      {desc && (
        <p className={`mt-5 text-base text-white/45 max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>
          {desc}
        </p>
      )}
    </div>
  );
}

export function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
