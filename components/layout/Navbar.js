'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Don't render on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-nav' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-nova-600 to-accent-cyan rotate-0 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-extrabold text-lg">N</span>
            </div>
          </div>
          <div>
            <span className="text-lg font-display font-bold tracking-tight">Novokraft</span>
            <div className="text-[10px] uppercase tracking-[3px] text-white/30 font-medium -mt-0.5">Limited</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? 'text-white bg-white/[0.08]'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-nova-500" />
              )}
            </Link>
          ))}
          <Link href="/contact" className="ml-4 btn-primary text-xs !px-5 !py-2.5 !rounded-xl">
            Start a Project <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 rounded-xl glass flex items-center justify-center"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong mx-4 mb-4 rounded-2xl p-4 animate-scale-in">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === link.href ? 'text-white bg-white/[0.08]' : 'text-white/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-xs justify-center w-full mt-3 !rounded-xl">
            Start a Project <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </nav>
  );
}
