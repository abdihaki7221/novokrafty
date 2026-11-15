'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CountUp } from '@/components/ui/Motion';

export function GlassCard({ children, className, hover = true, glow = false, ...props }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={hover ? onMove : undefined}
      className={cn(
        hover ? 'glass-hover spotlight-card' : 'glass',
        glow && 'border-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatCard({ value, label, icon }) {
  return (
    <div className="text-center px-6 py-4">
      {icon && <div className="text-nova-400 mb-2 flex justify-center">{icon}</div>}
      <div className="text-3xl md:text-4xl font-display font-bold text-white/95">
        <CountUp value={value} />
      </div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-white/35 mt-2 font-mono">{label}</div>
    </div>
  );
}

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-white/[0.05] text-white/60 border-white/[0.08]',
    primary: 'bg-nova-400/10 text-nova-300 border-nova-400/25',
    cyan: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
    success: 'bg-accent-mint/10 text-accent-mint border-accent-mint/20',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
