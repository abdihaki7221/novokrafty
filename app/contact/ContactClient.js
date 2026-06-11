'use client';

import { useState } from 'react';
import { SectionTitle, AnimatedSection } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Send, MapPin, Mail, Phone, Clock, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';

const FALLBACK = {
  contactSubtitle: 'Contact',
  contactTitle: "Let's Start a Conversation",
  contactDesc: "Tell us about your project and we'll get back to you immediately.",
  contactMode: 'whatsapp',
  whatsappNumber: '+254707332229',
  whatsappMessage: "Hi Novokraft, I'd like to discuss a project.",
  contactLocation: 'Westlands, Nairobi, Kenya',
  contactLocationSub: 'East Africa',
  email: 'info@novokraft.co.ke',
  contactEmailSub: 'We reply immediately',
  phone: '+254 707 332 229',
  contactPhoneSub: 'Mon–Fri, 8AM–6PM',
  contactHoursValue: 'Monday — Friday',
  contactHoursSub: '8:00 AM — 6:00 PM EAT',
  showSocials: false,
  linkedin: '', twitter: '', github: '', youtube: '',
};

function buildWhatsAppLink(number, message) {
  const clean = (number || '').replace(/[^0-9]/g, '');
  const text = encodeURIComponent(message || '');
  return `https://wa.me/${clean}?text=${text}`;
}

export default function ContactClient({ settings }) {
  const s = { ...FALLBACK, ...(settings || {}) };
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

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
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const waLink = buildWhatsAppLink(s.whatsappNumber, s.whatsappMessage);
  const isWhatsApp = s.contactMode !== 'form';

  const socials = [
    s.linkedin && { label: 'LinkedIn', url: s.linkedin },
    s.twitter && { label: 'X / Twitter', url: s.twitter },
    s.github && { label: 'GitHub', url: s.github },
    s.youtube && { label: 'YouTube', url: s.youtube },
  ].filter(Boolean);

  return (
    <main className="pt-28">
      <section className="section-padding pt-16">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionTitle sub={s.contactSubtitle} title={s.contactTitle} desc={s.contactDesc} />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
            {/* Main panel */}
            <AnimatedSection delay={100} className="lg:col-span-3">
              {isWhatsApp ? (
                /* ── WHATSAPP MODE ── */
                <GlassCard className="p-8 md:p-12 text-center h-full flex flex-col items-center justify-center" glow>
                  <div className="w-20 h-20 rounded-full bg-[#25D366]/15 flex items-center justify-center mb-6">
                    <MessageCircle size={36} className="text-[#25D366]" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">Chat With Us on WhatsApp</h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-md">
                    Skip the forms. Message us directly on WhatsApp and we'll respond immediately to discuss your project.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-white transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 10px 40px rgba(37,211,102,0.25)' }}
                  >
                    <MessageCircle size={20} /> Chat on WhatsApp
                  </a>
                  <p className="text-xs text-white/25 mt-5">{s.whatsappNumber}</p>
                </GlassCard>
              ) : (
                /* ── FORM MODE ── */
                <GlassCard className="p-8 md:p-10" glow>
                  {status === 'sent' ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-accent-mint/15 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 size={28} className="text-accent-mint" />
                      </div>
                      <h3 className="text-xl font-display font-bold mb-2">Message Sent!</h3>
                      <p className="text-sm text-white/40">We'll get back to you immediately.</p>
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
                        <textarea required value={form.message} onChange={update('message')} rows={5} className="glass-input w-full px-4 py-3 text-sm resize-y" placeholder="Tell us about your project..." />
                      </div>
                      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center !py-4">
                        {status === 'sending' ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send Message</>}
                      </button>
                      {status === 'error' && <p className="text-xs text-accent-rose text-center">Something went wrong. Please try again.</p>}
                      {/* WhatsApp alternative even in form mode */}
                      <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-[#25D366] hover:underline pt-2">
                        <MessageCircle size={16} /> Or chat with us on WhatsApp
                      </a>
                    </form>
                  )}
                </GlassCard>
              )}
            </AnimatedSection>

            {/* Info Cards */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: MapPin, label: 'Location', value: s.contactLocation, sub: s.contactLocationSub },
                { icon: Mail, label: 'Email', value: s.email, sub: s.contactEmailSub },
                { icon: Phone, label: 'Phone', value: s.phone, sub: s.contactPhoneSub },
                { icon: Clock, label: 'Working Hours', value: s.contactHoursValue, sub: s.contactHoursSub },
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

              {/* Socials only if enabled AND at least one link */}
              {s.showSocials && socials.length > 0 && (
                <AnimatedSection delay={600}>
                  <GlassCard className="p-6">
                    <div className="text-[10px] uppercase tracking-[2px] text-white/30 font-medium mb-4">Follow Us</div>
                    <div className="flex flex-wrap gap-2">
                      {socials.map(soc => (
                        <a key={soc.label} href={soc.url} target="_blank" rel="noopener noreferrer" className="glass text-xs text-white/40 px-4 py-2 rounded-full cursor-pointer hover:text-white/60 hover:bg-white/[0.06] transition-all">{soc.label}</a>
                      ))}
                    </div>
                  </GlassCard>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
