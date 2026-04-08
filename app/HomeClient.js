'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Play, Star, CreditCard, Bot, Settings, Smartphone, Globe, Users, BarChart3, Puzzle, ChevronRight, Zap, Shield, Code2 } from 'lucide-react';
import { SectionTitle, AnimatedSection } from '@/components/ui/Section';
import { GlassCard, StatCard, Badge } from '@/components/ui/GlassCard';

const iconMap = {
  CreditCard, Bot, Settings, Smartphone, Globe, Users, BarChart3, Puzzle,
};

export default function HomeClient({ services, projects, testimonials, settings }) {
  return (
    <main>
      {/* ═══════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center section-padding pt-32">
        {/* Hero spotlight effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-[0.15]"
          style={{ background: 'conic-gradient(from 180deg at 50% 50%, rgba(76,110,245,0.4) 0deg, transparent 60deg, rgba(34,211,238,0.3) 120deg, transparent 180deg, rgba(168,85,247,0.2) 240deg, transparent 300deg, rgba(76,110,245,0.4) 360deg)', filter: 'blur(80px)' }} />

        <div className="container-narrow text-center relative">
          {/* Status Badge */}
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-mint animate-glow-pulse" />
              <span className="text-xs font-medium text-white/50 tracking-wide">Pioneering Digital Transformation Across Africa</span>
            </div>
          </AnimatedSection>

          {/* Main Heading */}
          <AnimatedSection delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.95] tracking-tight mb-8">
              <span className="block gradient-text">We Architect</span>
              <span className="block text-white/90 mt-2">Software That</span>
              <span className="block mt-2">
                <span className="relative inline-block">
                  <span className="gradient-text">Moves Needles</span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M1 5.5C40 2 80 2 100 4C120 6 160 4 199 2" stroke="url(#underline-grad)" strokeWidth="2" strokeLinecap="round" />
                    <defs><linearGradient id="underline-grad"><stop stopColor="#4263eb" /><stop offset="1" stopColor="#22d3ee" /></linearGradient></defs>
                  </svg>
                </span>
              </span>
            </h1>
          </AnimatedSection>

          {/* Subtitle */}
          <AnimatedSection delay={200}>
            <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              From fintech infrastructure to AI-powered agents, we engineer the systems
              that power East Africa's most ambitious companies.
            </p>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection delay={300}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base">
                Start Your Project <ArrowUpRight size={18} />
              </Link>
              <Link href="/projects" className="btn-outline text-base">
                View Our Work <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>

          {/* Tech Stack Ticker */}
          <AnimatedSection delay={500}>
            <div className="mt-20 flex flex-wrap justify-center gap-3">
              {['React', 'Next.js', 'Node.js', 'Python', 'Flutter', 'PostgreSQL', 'AWS', 'TensorFlow', 'Docker', 'Kubernetes'].map((tech, i) => (
                <span key={tech} className="glass text-xs text-white/30 px-4 py-2 rounded-full hover:text-white/50 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[4px] text-white/20">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* STATS BAR */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection>
        <section className="px-6 -mt-8 mb-16 relative z-10">
          <div className="max-w-5xl mx-auto glass-strong rounded-3xl py-8 px-4 border-glow">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard value="120+" label="Projects Delivered" />
              <StatCard value="45+" label="Active Clients" />
              <StatCard value="30+" label="Team Members" />
              <StatCard value="99.9%" label="Uptime SLA" />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* SERVICES */}
      {/* ═══════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle
              sub="Capabilities"
              title="Full-Spectrum Software Engineering"
              desc="We don't just write code. We architect systems that scale, delight users, and drive measurable business outcomes."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.slice(0, 6).map((service, i) => {
              const Icon = iconMap[service.icon] || Code2;
              return (
                <AnimatedSection key={service.id} delay={i * 80}>
                  <GlassCard className="p-8 h-full group">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nova-600/20 to-accent-cyan/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon size={22} className="text-nova-400" />
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-3 text-white/90">{service.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{service.description}</p>
                    {service.features?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {service.features.slice(0, 3).map(f => (
                          <Badge key={f}>{f}</Badge>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={600}>
            <div className="text-center mt-12">
              <Link href="/services" className="btn-outline">
                All Services <ChevronRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* WHY NOVOKRAFT (USP) */}
      {/* ═══════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle sub="Why Us" title="Built Different, By Design" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Zap, title: 'Ship Fast, Ship Right', desc: 'Agile sprints with production deploys every 2 weeks. No vaporware, no delays.', color: 'from-amber-500/20 to-amber-600/5' },
              { icon: Shield, title: 'Security-First Architecture', desc: 'SOC 2-aligned processes, encrypted at rest and in transit, pen-tested quarterly.', color: 'from-accent-mint/20 to-accent-mint/5' },
              { icon: Code2, title: 'Clean Code, Forever', desc: 'We write code your next team can maintain. Full documentation, CI/CD, zero tech debt.', color: 'from-nova-500/20 to-nova-600/5' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <GlassCard className="p-8 h-full text-center" glow>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5`}>
                    <item.icon size={24} className="text-white/80" />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* PROJECTS */}
      {/* ═══════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle sub="Portfolio" title="Projects That Speak Volumes" desc="Real solutions, shipped to production, driving results for real businesses." />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 120}>
                <GlassCard className="overflow-hidden group h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop'})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04040c] via-transparent to-transparent" />
                    <Badge variant="primary" className="absolute top-4 left-4">{project.category}</Badge>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="text-xl font-display font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed flex-1 mb-4">{project.description}</p>

                    {/* Tech Stack */}
                    {project.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.techStack.map(t => (
                          <span key={t} className="text-[11px] text-white/30 bg-white/[0.04] px-2.5 py-1 rounded-md">{t}</span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !text-xs !px-4 !py-2 !rounded-xl">
                          Live Demo <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.videoUrl && (
                        <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline !text-xs !px-4 !py-2 !rounded-xl">
                          <Play size={14} /> Tutorial
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="text-center mt-12">
              <Link href="/projects" className="btn-outline">View All Projects <ChevronRight size={16} /></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* TESTIMONIALS */}
      {/* ═══════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle sub="Testimonials" title="Trusted by Ambitious Companies" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 100}>
                <GlassCard className="p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating || 5 }).map((_, j) => (
                      <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed flex-1 mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nova-600 to-accent-cyan flex items-center justify-center text-sm font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-white/35">{t.role}{t.company ? `, ${t.company}` : ''}</div>
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CTA */}
      {/* ═══════════════════════════════════════ */}
      <section className="section-padding pb-32">
        <AnimatedSection>
          <div className="container-narrow">
            <div className="glass-strong rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border-glow">
              {/* Glow effects */}
              <div className="absolute top-0 right-0 w-60 h-60 opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(76,110,245,0.6), transparent 70%)' }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 opacity-15"
                style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.6), transparent 70%)' }} />

              <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text mb-5 relative z-10">
                Ready to Build Something<br />Extraordinary?
              </h2>
              <p className="text-base text-white/40 mb-8 max-w-lg mx-auto relative z-10">
                Let's turn your vision into production-grade reality. Tell us about your project.
              </p>
              <div className="flex flex-wrap gap-4 justify-center relative z-10">
                <Link href="/contact" className="btn-primary text-base">
                  Get In Touch <ArrowUpRight size={18} />
                </Link>
                <Link href="/about" className="btn-outline text-base">
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
