'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Play, Star, CreditCard, Bot, Settings, Smartphone, Globe, Users, BarChart3, Puzzle, ChevronRight, Zap, Shield, Code2 } from 'lucide-react';
import { SectionTitle, AnimatedSection } from '@/components/ui/Section';
import { GlassCard, StatCard, Badge } from '@/components/ui/GlassCard';
import { VideoPanel, Marquee } from '@/components/ui/Motion';

const iconMap = {
  CreditCard, Bot, Settings, Smartphone, Globe, Users, BarChart3, Puzzle,
};

// Project slug → generated ambient loop
const PROJECT_VIDEOS = {
  aquaflow: '/videos/aquaflow.mp4',
  gorayo: '/videos/gorayo.mp4',
  etims: '/videos/etims.mp4',
};
const PROJECT_POSTERS = {
  aquaflow: '/videos/aquaflow.jpg',
  gorayo: '/videos/gorayo.jpg',
  etims: '/videos/etims.jpg',
};

const SETTINGS_FALLBACK = {
  heroBadge: 'Software studio — Nairobi, Kenya',
  heroTitleLine1: 'We build the', heroTitleLine2: 'systems behind', heroTitleHighlight: 'serious business',
  heroSubtitle: "Fintech infrastructure, ERPs and AI agents — engineered in Nairobi, shipped to production for companies across East Africa.",
  heroCtaPrimary: 'Start your project', heroCtaSecondary: 'See the work',
  techStack: ['React', 'Next.js', 'Node.js', 'Python', 'Flutter', 'PostgreSQL', 'AWS', 'TensorFlow', 'Docker', 'Kubernetes'],
  stat1Value: '120+', stat1Label: 'Projects Delivered', stat2Value: '45+', stat2Label: 'Active Clients',
  stat3Value: '30+', stat3Label: 'Team Members', stat4Value: '99.9%', stat4Label: 'Uptime SLA',
  servicesSubtitle: 'Capabilities', servicesTitle: 'Full-spectrum software engineering',
  servicesDesc: "We don't just write code. We architect systems that scale, hold up under load, and pay for themselves.",
  projectsSubtitle: 'Portfolio', projectsTitle: 'Shipped, not promised',
  projectsDesc: 'Real systems in production, billing real money and moving real inventory.',
  testimonialsSubtitle: 'Testimonials', testimonialsTitle: 'What clients say when it ships',
  ctaTitle: 'Have a system in mind?',
  ctaDesc: "Tell us what you're trying to build. We'll reply with an honest read on scope, cost and timeline.",
  ctaButton: 'Get in touch',
};

const EASE = [0.16, 1, 0.3, 1];

function HeroLine({ children, delay }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function HomeClient({ services, projects, testimonials, settings }) {
  const reduceMotion = useReducedMotion();
  const s = { ...SETTINGS_FALLBACK, ...(settings || {}) };
  const techStack = (s.techStack && s.techStack.length) ? s.techStack : SETTINGS_FALLBACK.techStack;
  const stats = [
    { value: s.stat1Value, label: s.stat1Label },
    { value: s.stat2Value, label: s.stat2Label },
    { value: s.stat3Value, label: s.stat3Label },
    { value: s.stat4Value, label: s.stat4Label },
  ];

  return (
    <main id="main">
      {/* ═══════════════════════════════════════ */}
      {/* HERO — full-bleed ambient video         */}
      {/* ═══════════════════════════════════════ */}
      <VideoPanel
        src="/videos/hero.mp4"
        poster="/videos/hero.jpg"
        className="min-h-[100dvh] flex items-end"
      >
        <section className="w-full section-padding pt-36 pb-20 relative">
          <div className="container-narrow">
            {/* Status badge */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="inline-flex items-center gap-3 glass !rounded-full px-5 py-2 mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-nova-400 animate-glow-pulse" />
              <span className="text-xs font-mono text-white/55 tracking-wider uppercase">{s.heroBadge}</span>
            </motion.div>

            {/* Headline — left-aligned, oversized, line-mask reveal */}
            <h1 className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[13vw] sm:text-6xl md:text-7xl lg:text-[5.6rem] max-w-5xl mb-8">
              <HeroLine delay={0.15}><span className="text-white/95">{s.heroTitleLine1}</span></HeroLine>
              <HeroLine delay={0.27}><span className="text-white/95">{s.heroTitleLine2}</span></HeroLine>
              <HeroLine delay={0.39}><span className="text-lime">{s.heroTitleHighlight}</span></HeroLine>
            </h1>

            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
                className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed font-light"
              >
                {s.heroSubtitle}
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact" className="btn-primary text-base">
                  {s.heroCtaPrimary} <ArrowUpRight size={18} />
                </Link>
                <Link href="/projects" className="btn-outline text-base">
                  {s.heroCtaSecondary} <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>

            {/* Tech marquee */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="mt-16 border-t border-white/[0.06] pt-6"
            >
              <Marquee>
                {techStack.map((tech) => (
                  <span key={tech} className="flex items-center gap-10">
                    <span className="font-mono text-sm text-white/30 whitespace-nowrap">{tech}</span>
                    <span className="w-1 h-1 bg-nova-400/50 rounded-full" />
                  </span>
                ))}
              </Marquee>
            </motion.div>
          </div>
        </section>
      </VideoPanel>

      {/* ═══════════════════════════════════════ */}
      {/* STATS BAR                               */}
      {/* ═══════════════════════════════════════ */}
      <AnimatedSection>
        <section className="px-6 -mt-10 mb-16 relative z-10">
          <div className="max-w-5xl mx-auto glass-strong rounded-3xl py-8 px-4 border-glow">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((st, i) => (<StatCard key={i} value={st.value} label={st.label} />))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ═══════════════════════════════════════ */}
      {/* SERVICES — bento grid                   */}
      {/* ═══════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle align="left" sub={s.servicesSubtitle} title={s.servicesTitle} desc={s.servicesDesc} />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {services.slice(0, 5).map((service, i) => {
              const Icon = iconMap[service.icon] || Code2;
              const spans = ['md:col-span-4', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2'];
              const isFeature = i === 0;
              return (
                <AnimatedSection key={service.id} delay={i * 80} className={spans[i] || 'md:col-span-2'}>
                  <GlassCard className="h-full group overflow-hidden">
                    {isFeature ? (
                      <VideoPanel src="/videos/ai.mp4" poster="/videos/ai.jpg" className="h-full rounded-[inherit]">
                        <div className="p-8 md:p-10 relative z-10 h-full flex flex-col justify-end min-h-[280px]">
                          <div className="w-12 h-12 rounded-2xl bg-nova-400/10 border border-nova-400/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                            <Icon size={22} className="text-nova-400" />
                          </div>
                          <h3 className="text-2xl font-display font-semibold mb-3 text-white/95">{service.title}</h3>
                          <p className="text-sm text-white/50 leading-relaxed max-w-md">{service.description}</p>
                          {service.features?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {service.features.slice(0, 4).map(f => (<Badge key={f}>{f}</Badge>))}
                            </div>
                          )}
                        </div>
                      </VideoPanel>
                    ) : (
                      <div className="p-8 h-full">
                        <div className="w-12 h-12 rounded-2xl bg-nova-400/10 border border-nova-400/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                          <Icon size={22} className="text-nova-400" />
                        </div>
                        <h3 className="text-lg font-display font-semibold mb-3 text-white/90">{service.title}</h3>
                        <p className="text-sm text-white/45 leading-relaxed">{service.description}</p>
                        {service.features?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {service.features.slice(0, 3).map(f => (<Badge key={f}>{f}</Badge>))}
                          </div>
                        )}
                      </div>
                    )}
                  </GlassCard>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={500}>
            <div className="mt-12">
              <Link href="/services" className="btn-outline">
                All services <ChevronRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* WHY NOVOKRAFT — numbered rows           */}
      {/* ═══════════════════════════════════════ */}
      <section className="section-padding !pt-0">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle align="left" sub="Why us" title="Built different, by design" />
          </AnimatedSection>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {[
              { n: '01', icon: Zap, title: 'Ship fast, ship right', desc: 'Agile sprints with production deploys every two weeks. No vaporware, no surprises.' },
              { n: '02', icon: Shield, title: 'Security-first architecture', desc: 'SOC 2-aligned processes, encrypted at rest and in transit, pen-tested quarterly.' },
              { n: '03', icon: Code2, title: 'Code your next team can read', desc: 'Full documentation, CI/CD, and no shortcuts your future engineers will curse.' },
            ].map((item, i) => (
              <AnimatedSection key={item.n} delay={i * 100}>
                <div className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[120px_1fr_auto] items-center gap-6 py-8 px-2 hover:bg-white/[0.02] transition-colors duration-300">
                  <span className="font-mono text-sm text-nova-400/70">{item.n}</span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-white/90 group-hover:text-lime transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed mt-1 max-w-xl">{item.desc}</p>
                  </div>
                  <item.icon size={22} className="text-white/20 group-hover:text-nova-400 transition-colors duration-300 hidden sm:block" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* PROJECTS — ambient video cards          */}
      {/* ═══════════════════════════════════════ */}
      <section className="section-padding !pt-0">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle align="left" sub={s.projectsSubtitle} title={s.projectsTitle} desc={s.projectsDesc} />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => {
              const vid = PROJECT_VIDEOS[project.slug];
              return (
                <AnimatedSection key={project.id} delay={i * 120} className={i === 0 ? 'lg:col-span-2' : ''}>
                  <GlassCard className="overflow-hidden group h-full flex flex-col">
                    {/* Media: generated motion loop, falling back to still image */}
                    <div className="relative h-56 overflow-hidden">
                      {vid ? (
                        <VideoPanel src={vid} poster={PROJECT_POSTERS[project.slug]} className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]" />
                      ) : (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${project.image || '/videos/ai.jpg'})` }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07090b] via-transparent to-transparent" />
                      <Badge variant="primary" className="absolute top-4 left-4 z-10">{project.category}</Badge>
                    </div>

                    {/* Content */}
                    <div className="p-7 flex-1 flex flex-col">
                      <h3 className="text-xl font-display font-bold mb-2 text-white/95">{project.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed flex-1 mb-4">{project.description}</p>

                      {project.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.techStack.map(t => (
                            <span key={t} className="font-mono text-[11px] text-white/35 bg-white/[0.04] px-2.5 py-1 rounded-md">{t}</span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3 mt-auto">
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !text-xs !px-4 !py-2">
                            Live demo <ArrowUpRight size={14} />
                          </a>
                        )}
                        {project.videoUrl && (
                          <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline !text-xs !px-4 !py-2">
                            <Play size={14} /> Walkthrough
                          </a>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-12">
              <Link href="/projects" className="btn-outline">All projects <ChevronRight size={16} /></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* TESTIMONIALS — offset grid              */}
      {/* ═══════════════════════════════════════ */}
      <section className="section-padding !pt-0">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle align="left" sub={s.testimonialsSubtitle} title={s.testimonialsTitle} />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 100} className={i % 2 === 1 ? 'md:translate-y-8' : ''}>
                <GlassCard className="p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-4" aria-label={`${t.rating || 5} out of 5 stars`}>
                    {Array.from({ length: t.rating || 5 }).map((_, j) => (
                      <Star key={j} size={14} className="fill-nova-400 text-nova-400" />
                    ))}
                  </div>
                  <p className="text-[15px] text-white/60 leading-relaxed flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-nova-400/15 border border-nova-400/25 flex items-center justify-center text-sm font-bold text-nova-300">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/85">{t.name}</div>
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
      {/* CTA — ambient video closer              */}
      {/* ═══════════════════════════════════════ */}
      <section className="section-padding pb-32 !pt-0">
        <AnimatedSection>
          <div className="container-narrow">
            <VideoPanel src="/videos/hero.mp4" poster="/videos/hero.jpg" className="rounded-3xl border border-white/[0.08]">
              <div className="p-12 md:p-20 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white/95 mb-5 tracking-tight">
                  {s.ctaTitle}
                </h2>
                <p className="text-base text-white/50 mb-9 max-w-lg mx-auto">
                  {s.ctaDesc}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/contact" className="btn-primary text-base">
                    {s.ctaButton} <ArrowUpRight size={18} />
                  </Link>
                  <Link href="/about" className="btn-outline text-base">
                    About the team
                  </Link>
                </div>
              </div>
            </VideoPanel>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
