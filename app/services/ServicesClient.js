'use client';

import Link from 'next/link';
import { SectionTitle, AnimatedSection } from '@/components/ui/Section';
import { GlassCard, Badge } from '@/components/ui/GlassCard';
import { CreditCard, Bot, Settings, Smartphone, Globe, Users, BarChart3, Puzzle, Code2, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const iconMap = { CreditCard, Bot, Settings, Smartphone, Globe, Users, BarChart3, Puzzle };

export default function ServicesClient({ services }) {
  return (
    <main className="pt-28">
      <section className="section-padding pt-16">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle sub="Our Services" title="End-to-End Software Capabilities" desc="From ideation to deployment and beyond — we cover the entire product lifecycle with battle-tested engineering." />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code2;
              return (
                <AnimatedSection key={service.id} delay={i * 80}>
                  <GlassCard className="p-10 h-full group" glow>
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-nova-600/20 to-accent-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <Icon size={26} className="text-nova-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                        <p className="text-sm text-white/45 leading-relaxed mb-5">{service.description}</p>
                        {service.features?.length > 0 && (
                          <div className="space-y-2">
                            {service.features.map(f => (
                              <div key={f} className="flex items-center gap-2 text-sm text-white/35">
                                <CheckCircle2 size={14} className="text-accent-mint/60 flex-shrink-0" />
                                {f}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Process Section */}
          <AnimatedSection delay={200}>
            <div className="mt-24">
              <SectionTitle sub="Our Process" title="How We Work" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {[
                  { step: '01', title: 'Discovery', desc: 'Deep-dive into your business, users, and technical landscape.' },
                  { step: '02', title: 'Architecture', desc: 'System design, tech stack selection, and sprint planning.' },
                  { step: '03', title: 'Build & Iterate', desc: 'Agile development with bi-weekly demos and feedback loops.' },
                  { step: '04', title: 'Launch & Scale', desc: 'Production deployment, monitoring, and continuous optimization.' },
                ].map((item, i) => (
                  <AnimatedSection key={i} delay={i * 100}>
                    <GlassCard className="p-8 text-center relative">
                      <span className="text-4xl font-display font-extrabold gradient-text opacity-30">{item.step}</span>
                      <h4 className="text-base font-display font-semibold mt-3 mb-2">{item.title}</h4>
                      <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                    </GlassCard>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={400}>
            <div className="text-center mt-20 pb-16">
              <GlassCard className="p-12 inline-block" glow>
                <h3 className="text-2xl font-display font-bold gradient-text mb-3">Need a Custom Solution?</h3>
                <p className="text-sm text-white/40 mb-6">Let's discuss your project requirements.</p>
                <Link href="/contact" className="btn-primary">Start a Conversation <ArrowUpRight size={16} /></Link>
              </GlassCard>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
