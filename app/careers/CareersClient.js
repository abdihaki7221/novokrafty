'use client';

import Link from 'next/link';
import { SectionTitle, AnimatedSection } from '@/components/ui/Section';
import { GlassCard, Badge } from '@/components/ui/GlassCard';
import { MapPin, Clock, Briefcase, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function CareersClient({ careers }) {
  return (
    <main className="pt-28">
      <section className="section-padding pt-16">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle sub="Careers" title="Build the Future With Us" desc="We're looking for talented engineers, designers, and thinkers who want to create software that matters." />
          </AnimatedSection>

          {careers.length === 0 ? (
            <AnimatedSection>
              <GlassCard className="p-16 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-display font-bold mb-2">No Open Positions Right Now</h3>
                <p className="text-white/40 mb-6">We're always interested in hearing from talented people.</p>
                <Link href="/contact" className="btn-primary">Send Us Your CV <ArrowUpRight size={16} /></Link>
              </GlassCard>
            </AnimatedSection>
          ) : (
            <div className="space-y-5">
              {careers.map((career, i) => (
                <AnimatedSection key={career.id} delay={i * 80}>
                  <GlassCard className="p-8 group">
                    <div className="flex flex-wrap items-start justify-between gap-6">
                      <div className="flex-1 min-w-[280px]">
                        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-nova-300 transition-colors">{career.title}</h3>
                        <p className="text-sm text-white/45 leading-relaxed mb-4">{career.description}</p>

                        <div className="flex flex-wrap gap-3 mb-4">
                          <Badge variant="primary"><Briefcase size={12} className="mr-1" />{career.department}</Badge>
                          <Badge><Clock size={12} className="mr-1" />{career.type}</Badge>
                          <Badge><MapPin size={12} className="mr-1" />{career.location}</Badge>
                        </div>

                        {career.requirements?.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                            {career.requirements.map((r, j) => (
                              <div key={j} className="flex items-center gap-2 text-xs text-white/35">
                                <CheckCircle2 size={12} className="text-accent-mint/50 flex-shrink-0" />{r}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <Link href="/contact" className="btn-primary !text-sm flex-shrink-0">
                        Apply Now <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* Perks */}
          <AnimatedSection delay={300}>
            <div className="mt-20">
              <SectionTitle sub="Why Join" title="Perks & Culture" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { emoji: '🌍', title: 'Remote-First', desc: 'Work from anywhere in East Africa. Async communication, flexible hours.' },
                  { emoji: '📚', title: 'Learning Budget', desc: 'Annual stipend for courses, conferences, books, and certifications.' },
                  { emoji: '🚀', title: 'Ship Real Products', desc: 'No busywork. You\'ll build systems used by thousands of real users.' },
                ].map((perk, i) => (
                  <AnimatedSection key={i} delay={i * 100}>
                    <GlassCard className="p-8 text-center">
                      <div className="text-3xl mb-4">{perk.emoji}</div>
                      <h4 className="text-base font-display font-semibold mb-2">{perk.title}</h4>
                      <p className="text-xs text-white/40 leading-relaxed">{perk.desc}</p>
                    </GlassCard>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
