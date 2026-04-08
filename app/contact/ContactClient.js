'use client';

import { useState } from 'react';
import { SectionTitle, AnimatedSection } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Send, MapPin, Mail, Phone, Clock, CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <main className="pt-28">
      <section className="section-padding pt-16">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle sub="Contact" title="Let's Start a Conversation" desc="Tell us about your project and we'll get back to you within 24 hours." />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
            {/* Form */}
            <AnimatedSection delay={100} className="lg:col-span-3">
              <GlassCard className="p-8 md:p-10" glow>
                {status === 'sent' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent-mint/15 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={28} className="text-accent-mint" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2">Message Sent!</h3>
                    <p className="text-sm text-white/40">We'll get back to you within 24 hours.</p>
                    <button onClick={() => setStatus('idle')} className="btn-outline mt-6 !text-sm">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">Your Name *</label>
                        <input required value={form.name} onChange={update('name')} className="glass-input w-full px-4 py-3 text-sm" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">Email *</label>
                        <input required type="email" value={form.email} onChange={update('email')} className="glass-input w-full px-4 py-3 text-sm" placeholder="john@company.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">Phone</label>
                        <input value={form.phone} onChange={update('phone')} className="glass-input w-full px-4 py-3 text-sm" placeholder="+254 700 000 000" />
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">Company</label>
                        <input value={form.company} onChange={update('company')} className="glass-input w-full px-4 py-3 text-sm" placeholder="Your Company" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">Subject</label>
                      <input value={form.subject} onChange={update('subject')} className="glass-input w-full px-4 py-3 text-sm" placeholder="Project Inquiry" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">Message *</label>
                      <textarea required value={form.message} onChange={update('message')} rows={5} className="glass-input w-full px-4 py-3 text-sm resize-y" placeholder="Tell us about your project, timeline, and goals..." />
                    </div>
                    <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center !py-4">
                      {status === 'sending' ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send Message</>}
                    </button>
                    {status === 'error' && <p className="text-xs text-accent-rose text-center">Something went wrong. Please try again.</p>}
                  </form>
                )}
              </GlassCard>
            </AnimatedSection>

            {/* Info Cards */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: MapPin, label: 'Location', value: 'Westlands, Nairobi, Kenya', sub: 'East Africa' },
                { icon: Mail, label: 'Email', value: 'info@novokraft.co.ke', sub: 'We reply within 24hrs' },
                { icon: Phone, label: 'Phone', value: '+254 707 332 229', sub: 'Mon–Fri, 8AM–6PM' },
                { icon: Clock, label: 'Working Hours', value: 'Monday — Friday', sub: '8:00 AM — 6:00 PM EAT' },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={200 + i * 80}>
                  <GlassCard className="p-6 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-nova-600/15 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-nova-400" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[2px] text-white/30 font-medium">{item.label}</div>
                      <div className="text-sm font-semibold mt-0.5">{item.value}</div>
                      <div className="text-xs text-white/30 mt-0.5">{item.sub}</div>
                    </div>
                  </GlassCard>
                </AnimatedSection>
              ))}

              <AnimatedSection delay={600}>
                <GlassCard className="p-6">
                  <div className="text-[10px] uppercase tracking-[2px] text-white/30 font-medium mb-4">Follow Us</div>
                  <div className="flex flex-wrap gap-2">
                    {['LinkedIn', 'X / Twitter', 'GitHub', 'YouTube'].map(s => (
                      <span key={s} className="glass text-xs text-white/40 px-4 py-2 rounded-full cursor-pointer hover:text-white/60 hover:bg-white/[0.06] transition-all">{s}</span>
                    ))}
                  </div>
                </GlassCard>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
