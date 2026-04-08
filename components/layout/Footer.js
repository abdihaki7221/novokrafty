'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Shield, Award, Lock } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="relative z-10 border-t border-white/[0.04] bg-[rgba(4,4,12,0.6)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-nova-600 to-accent-cyan flex items-center justify-center">
                <span className="text-white font-display font-extrabold text-base">N</span>
              </div>
              <span className="text-lg font-display font-bold">Novokraft</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              Engineering the digital backbone of tomorrow's enterprises. From Nairobi to the world.
            </p>
            <div className="flex gap-3">
              {['LinkedIn', 'X', 'GitHub', 'YouTube'].map(s => (
                <span key={s} className="glass text-xs text-white/40 px-3 py-1.5 rounded-lg cursor-pointer hover:text-white/60 hover:bg-white/[0.06] transition-all">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-[3px] text-white/25 font-semibold mb-5">Company</h4>
            {['About', 'Services', 'Projects', 'Careers', 'Contact'].map(link => (
              <Link key={link} href={`/${link.toLowerCase()}`} className="block text-sm text-white/40 hover:text-white/70 transition-colors py-1.5">
                {link}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[3px] text-white/25 font-semibold mb-5">Solutions</h4>
            {['Fintech', 'Mobile Dev', 'Web Dev', 'AI & Chatbots', 'ERP Systems', 'CRM Platforms'].map(s => (
              <span key={s} className="block text-sm text-white/40 py-1.5">{s}</span>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[3px] text-white/25 font-semibold mb-5">Contact</h4>
            <div className="space-y-3 text-sm text-white/40">
              <p>Westlands, Nairobi, Kenya</p>
              <p>info@novokraft.co.ke</p>
              <p>+254 707 332 229</p>
              <p className="pt-2 text-white/25">Mon–Fri, 8AM–6PM EAT</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-white/25">© 2026 Novokraft Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[
              { icon: Lock, label: 'SSL Secured' },
              { icon: Shield, label: 'ISO 27001' },
              { icon: Award, label: 'GDPR' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[11px] text-white/20">
                <Icon size={12} /> {label}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-white/25">
            <span className="cursor-pointer hover:text-white/40 transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-white/40 transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-white/40 transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
