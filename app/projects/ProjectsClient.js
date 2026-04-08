'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SectionTitle, AnimatedSection } from '@/components/ui/Section';
import { GlassCard, Badge } from '@/components/ui/GlassCard';
import { ArrowUpRight, Play, Filter } from 'lucide-react';

export default function ProjectsClient({ projects }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const trackDemoClick = async (projectId) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'demo_click', projectId }),
      });
    } catch {}
  };

  return (
    <main className="pt-28">
      <section className="section-padding pt-16">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle sub="Portfolio" title="Solutions We've Shipped" desc="Every project is a partnership. Here are some of the systems we've built and deployed to production." />
          </AnimatedSection>

          {/* Filters */}
          <AnimatedSection delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === cat
                      ? 'bg-nova-600/25 text-nova-300 border border-nova-500/30'
                      : 'glass text-white/40 hover:text-white/60 hover:bg-white/[0.05]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 100}>
                <GlassCard className="overflow-hidden group h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04040c] via-[#04040c]/30 to-transparent" />
                    <Badge variant="primary" className="absolute top-4 left-4">{project.category}</Badge>
                    {project.featured && <Badge variant="cyan" className="absolute top-4 right-4">Featured</Badge>}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-display font-bold mb-3">{project.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed flex-1 mb-5">{project.description}</p>

                    {project.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.techStack.map(t => (
                          <span key={t} className="text-[11px] text-white/30 bg-white/[0.04] px-2.5 py-1 rounded-md font-mono">{t}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-3 mt-auto">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                          onClick={() => trackDemoClick(project.id)}
                          className="btn-primary !text-xs !px-5 !py-2.5 !rounded-xl">
                          Live Demo <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.videoUrl && (
                        <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline !text-xs !px-5 !py-2.5 !rounded-xl">
                          <Play size={14} /> Video Tutorial
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/30">No projects in this category yet.</div>
          )}
        </div>
      </section>
    </main>
  );
}
