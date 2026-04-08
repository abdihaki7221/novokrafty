'use client';

import { cn } from '@/lib/utils';

export function GlassCard({ children, className, hover = true, glow = false, ...props }) {
  return (
    <div
      className={cn(
        hover ? 'glass-hover' : 'glass',
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
      <div className="text-3xl md:text-4xl font-display font-extrabold gradient-text">{value}</div>
      <div className="text-xs uppercase tracking-[2px] text-white/30 mt-2 font-medium">{label}</div>
    </div>
  );
}

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-white/[0.06] text-white/60 border-white/[0.08]',
    primary: 'bg-nova-600/20 text-nova-300 border-nova-500/25',
    cyan: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
    success: 'bg-accent-mint/10 text-accent-mint border-accent-mint/20',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
