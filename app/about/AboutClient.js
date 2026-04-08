'use client';

import { SectionTitle, AnimatedSection } from '@/components/ui/Section';
import { GlassCard, StatCard } from '@/components/ui/GlassCard';
import { Target, Eye, Heart, Users, Linkedin, Twitter, Github, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutClient({ settings, team, partners }) {
  const s = settings || {};
  return (
    <main className="pt-28">
      {/* Hero */}
      <section className="section-padding pt-16">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle sub="About Novokraft" title="The Story Behind the Code" desc="We're not just developers. We're craftspeople obsessed with building software that transforms how businesses operate." />
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 pb-20">
        <div className="container-narrow grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection delay={100}>
            <GlassCard className="p-10 h-full" glow>
              <div className="w-12 h-12 rounded-2xl bg-nova-600/15 flex items-center justify-center mb-6">
                <Target size={22} className="text-nova-400" />
              </div>
              <h3 className="text-xs uppercase tracking-[3px] text-nova-400 font-semibold mb-4">Our Mission</h3>
              <p className="text-base text-white/55 leading-relaxed">{s.mission || 'We engineer the digital backbone of tomorrow\'s enterprises.'}</p>
            </GlassCard>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <GlassCard className="p-10 h-full" glow>
              <div className="w-12 h-12 rounded-2xl bg-accent-cyan/15 flex items-center justify-center mb-6">
                <Eye size={22} className="text-accent-cyan" />
              </div>
              <h3 className="text-xs uppercase tracking-[3px] text-accent-cyan font-semibold mb-4">Our Vision</h3>
              <p className="text-base text-white/55 leading-relaxed">{s.vision || 'To become Africa\'s most trusted technology partner.'}</p>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 pb-20">
        <div className="container-narrow">
          <AnimatedSection>
            <GlassCard className="p-10">
              <div className="flex items-center gap-3 mb-8">
                <Heart size={20} className="text-accent-rose" />
                <h3 className="text-xs uppercase tracking-[3px] text-white/40 font-semibold">Our Values</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {(s.values || ['Engineering Excellence', 'Client-First Thinking', 'Relentless Innovation', 'Radical Transparency']).map((v, i) => (
                  <AnimatedSection key={i} delay={i * 80}>
                    <span className="px-6 py-3 rounded-full border border-nova-500/20 bg-nova-600/10 text-nova-300 text-sm font-medium">
                      {v}
                    </span>
                  </AnimatedSection>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-20">
        <div className="container-narrow">
          <AnimatedSection>
            <div className="glass-strong rounded-3xl py-10 px-4 border-glow">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard value="120+" label="Projects Delivered" />
                <StatCard value="45+" label="Active Clients" />
                <StatCard value="30+" label="Engineers" />
                <StatCard value="99.9%" label="Uptime SLA" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="section-padding">
          <div className="container-narrow">
            <AnimatedSection>
              <SectionTitle sub="Leadership" title="Meet the Team" />
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <AnimatedSection key={member.id} delay={i * 100}>
                  <GlassCard className="p-8 text-center">
                    <div className="w-20 h-20 rounded-full mx-auto mb-5 bg-gradient-to-br from-nova-600 to-accent-cyan flex items-center justify-center overflow-hidden">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
                      )}
                    </div>
                    <h3 className="text-lg font-display font-bold">{member.name}</h3>
                    <p className="text-sm text-nova-400 mb-3">{member.role}</p>
                    {member.bio && <p className="text-xs text-white/40 leading-relaxed mb-4">{member.bio}</p>}
                    <div className="flex justify-center gap-3">
                      {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors"><Linkedin size={16} /></a>}
                      {member.twitter && <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors"><Twitter size={16} /></a>}
                      {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors"><Github size={16} /></a>}
                    </div>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      {partners.length > 0 && (
        <section className="section-padding">
          <div className="container-narrow">
            <AnimatedSection>
              <SectionTitle sub="Partners" title="Companies We Work With" />
            </AnimatedSection>
            <div className="flex flex-wrap justify-center gap-5">
              {partners.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 60}>
                  <GlassCard className="px-8 py-5 flex items-center gap-3">
                    {p.logo && <img src={p.logo} alt={p.name} className="h-8 opacity-60" />}
                    <span className="text-sm text-white/50 font-medium">{p.name}</span>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <p className="text-xs uppercase tracking-[4px] text-white/25 mb-8 font-semibold">Technologies We Master</p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Next.js', 'Node.js', 'Python', 'Django', 'Flutter', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'TensorFlow', 'LangChain', 'GraphQL'].map((t, i) => (
              <AnimatedSection key={t} delay={i * 40}>
                <span className="glass px-5 py-2.5 rounded-full text-sm text-white/35 hover:text-white/55 hover:bg-white/[0.05] transition-all cursor-default">{t}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pb-32">
        <AnimatedSection>
          <div className="container-narrow text-center">
            <GlassCard className="p-12 md:p-16" glow>
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">Want to Join Our Journey?</h2>
              <p className="text-white/40 mb-8">We're always looking for talented engineers and thinkers.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/careers" className="btn-primary">View Open Roles <ArrowUpRight size={16} /></Link>
                <Link href="/contact" className="btn-outline">Get in Touch</Link>
              </div>
            </GlassCard>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
