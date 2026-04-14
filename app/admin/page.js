'use client';

import { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, LogOut, LayoutDashboard, FolderOpen, Settings, Briefcase, Users, MessageSquare, Star, Handshake, BarChart3, TrendingUp, MousePointerClick, Globe, ChevronRight, Plus, Pencil, Trash2, X, Check, Loader2, ArrowUpRight, Lock, UserPlus, KeyRound, AlertTriangle } from 'lucide-react';

// ─── API Helper ───
async function api(path, opts = {}) {
  const res = await fetch(path, { ...opts, headers: { 'Content-Type': 'application/json', ...opts.headers } });
  const data = await res.json().catch(() => ({ error: `HTTP ${res.status} ${res.statusText}` }));
  if (!res.ok) throw new Error(data.error || data.message || `API error ${res.status}`);
  return data;
}

// ─── Glassmorphic Admin UI Components ───
function Glass({ children, className = '', ...props }) {
  return <div className={`bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-2xl ${className}`} {...props}>{children}</div>;
}

function Input({ label, value, onChange, type = 'text', placeholder = '', multiline = false, className = '' }) {
  const base = 'w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/90 text-sm outline-none transition-all focus:border-blue-500/50 focus:bg-white/[0.06] placeholder:text-white/20';
  return (
    <div className={className}>
      {label && <label className="block text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">{label}</label>}
      {multiline ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} className={`${base} resize-y`} placeholder={placeholder} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} className={base} placeholder={placeholder} />}
    </div>
  );
}

function Btn({ children, onClick, primary, danger, small, disabled, className = '' }) {
  const base = 'inline-flex items-center gap-2 font-semibold transition-all duration-300 rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';
  const size = small ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm';
  const style = danger ? 'bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/25' : primary ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/20' : 'bg-white/[0.06] text-white/60 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white/80';
  return <button onClick={onClick} disabled={disabled} className={`${base} ${size} ${style} ${className}`}>{children}</button>;
}

function Toast({ message, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-[200] bg-blue-600/90 backdrop-blur-xl text-white px-6 py-3 rounded-xl text-sm font-medium shadow-xl shadow-blue-500/20 animate-slide-up flex items-center gap-2">
      <Check size={16} /> {message}
    </div>
  );
}

// ═══════════════════════════════════════
// LOGIN SCREEN
// ═══════════════════════════════════════
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // login | forgot | reset-done
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api('/api/auth', { method: 'POST', body: JSON.stringify({ email, password }) });
      if (res.success) onLogin(res.admin);
      else setError(res.error || 'Invalid credentials');
    } catch (err) { setError(err.message || 'Invalid email or password'); }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await api('/api/auth/reset', { method: 'PUT', body: JSON.stringify({ email, newPassword }) });
      if (res.success) { setMode('reset-done'); }
      else setError(res.error || 'Reset failed');
    } catch (err) { setError(err.message || 'Failed to reset password'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#04040c' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, rgba(76,110,245,0.8), transparent 70%)' }} />
      </div>

      <Glass className="w-full max-w-md p-10 relative z-10">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Syne, system-ui' }}>Novokraft Admin</h1>
          <p className="text-sm text-white/30 mt-1">
            {mode === 'login' && 'Sign in to manage your website'}
            {mode === 'forgot' && 'Reset your admin password'}
            {mode === 'reset-done' && 'Password updated successfully'}
          </p>
        </div>

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-5">
            <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="admin@novokraft.com" />
            <div className="relative">
              <Input label="Password" type={showPass ? 'text' : 'password'} value={password} onChange={setPassword} placeholder="••••••••••" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 text-white/30 hover:text-white/50 transition-colors">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</div>}
            <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
            <button type="button" onClick={() => { setMode('forgot'); setError(''); }} className="w-full text-center text-xs text-white/30 hover:text-blue-400 transition-colors mt-2">
              Forgot your password?
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <Input label="Admin Email" type="email" value={email} onChange={setEmail} placeholder="admin@novokraft.com" />
            <Input label="New Password" type="password" value={newPassword} onChange={setNewPassword} placeholder="Enter new password" />
            <Input label="Confirm New Password" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Confirm new password" />
            {error && <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</div>}
            <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Resetting...</> : 'Reset Password'}
            </button>
            <button type="button" onClick={() => { setMode('login'); setError(''); }} className="w-full text-center text-xs text-white/30 hover:text-blue-400 transition-colors mt-2">
              Back to sign in
            </button>
          </form>
        )}

        {mode === 'reset-done' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-green-400" />
            </div>
            <p className="text-white/60 text-sm mb-6">Your password has been reset. You can now sign in with your new password.</p>
            <button onClick={() => { setMode('login'); setPassword(''); setError(''); }} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm">
              Back to Sign In
            </button>
          </div>
        )}
      </Glass>
    </div>
  );
}

// ═══════════════════════════════════════
// CRUD TABLE COMPONENT
// ═══════════════════════════════════════
function CrudManager({ title, endpoint, fields, renderItem }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await api(endpoint)); } catch {}
    setLoading(false);
  }, [endpoint]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    try {
      if (editing.id) await api(endpoint, { method: 'PUT', body: JSON.stringify(editing) });
      else await api(endpoint, { method: 'POST', body: JSON.stringify(editing) });
      setEditing(null);
      await load();
      setToast('Saved successfully!');
    } catch { setToast('Error saving'); }
    setSaving(false);
  };

  const remove = async (id) => {
    if (!confirm('Delete this item?')) return;
    try { await api(`${endpoint}?id=${id}`, { method: 'DELETE' }); await load(); setToast('Deleted'); } catch {}
  };

  const newItem = () => {
    const blank = {};
    fields.forEach(f => { blank[f.key] = f.default ?? ''; });
    setEditing(blank);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ fontFamily: 'Syne, system-ui' }}>{title}</h2>
        <Btn primary onClick={newItem}><Plus size={14} /> Add New</Btn>
      </div>

      {/* Edit Form */}
      {editing && (
        <Glass className="p-6 mb-6 border-blue-500/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-blue-400">{editing.id ? 'Edit' : 'Create New'}</h3>
            <button onClick={() => setEditing(null)} className="text-white/30 hover:text-white/60"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(f => {
              if (f.type === 'array') {
                return (
                  <Input key={f.key} label={`${f.label} (comma-separated)`} value={(editing[f.key] || []).join(', ')} onChange={v => setEditing(e => ({ ...e, [f.key]: v.split(',').map(s => s.trim()).filter(Boolean) }))} className={f.full ? 'md:col-span-2' : ''} />
                );
              }
              if (f.type === 'boolean') {
                return (
                  <div key={f.key} className="flex items-center gap-3">
                    <label className="text-xs text-white/40 uppercase tracking-wider">{f.label}</label>
                    <button onClick={() => setEditing(e => ({ ...e, [f.key]: !e[f.key] }))} className={`w-10 h-6 rounded-full transition-all ${editing[f.key] ? 'bg-blue-600' : 'bg-white/10'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${editing[f.key] ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                );
              }
              return <Input key={f.key} label={f.label} value={editing[f.key] || ''} onChange={v => setEditing(e => ({ ...e, [f.key]: v }))} multiline={f.type === 'textarea'} placeholder={f.placeholder} className={f.full ? 'md:col-span-2' : ''} />;
            })}
          </div>
          <div className="flex gap-3 mt-5">
            <Btn primary onClick={save} disabled={saving}>{saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Save</Btn>
            <Btn onClick={() => setEditing(null)}>Cancel</Btn>
          </div>
        </Glass>
      )}

      {/* Items List */}
      {loading ? (
        <div className="text-center py-12 text-white/30"><Loader2 size={20} className="animate-spin mx-auto" /></div>
      ) : items.length === 0 ? (
        <Glass className="p-10 text-center text-white/30 text-sm">No items yet. Click "Add New" to create one.</Glass>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <Glass key={item.id} className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.05] transition-all group">
              <div className="flex-1 min-w-0">
                {renderItem ? renderItem(item) : (
                  <div>
                    <div className="font-semibold text-sm truncate">{item.title || item.name}</div>
                    <div className="text-xs text-white/30 truncate mt-0.5">{item.description || item.role || item.category || ''}</div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                {item.published === false && <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Draft</span>}
                <Btn small onClick={() => setEditing({ ...item })}><Pencil size={12} /></Btn>
                <Btn small danger onClick={() => remove(item.id)}><Trash2 size={12} /></Btn>
              </div>
            </Glass>
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  );
}

// ═══════════════════════════════════════
// DASHBOARD / ANALYTICS VIEW
// ═══════════════════════════════════════
function DashboardView() {
  const [analytics, setAnalytics] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [a, m] = await Promise.all([api('/api/analytics'), api('/api/contact')]);
        setAnalytics(a);
        setMessages(m);
      } catch {}
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-white/30" /></div>;

  const stats = analytics ? [
    { label: 'Total Visits', value: analytics.totalVisits || 0, icon: Globe, color: 'from-blue-500/20 to-blue-600/5' },
    { label: 'Last 30 Days', value: analytics.last30Days || 0, icon: TrendingUp, color: 'from-green-500/20 to-green-600/5' },
    { label: 'Last 7 Days', value: analytics.last7Days || 0, icon: BarChart3, color: 'from-purple-500/20 to-purple-600/5' },
    { label: 'Today', value: analytics.today || 0, icon: MousePointerClick, color: 'from-cyan-500/20 to-cyan-600/5' },
  ] : [];

  return (
    <div>
      <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Syne, system-ui' }}>Dashboard Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <Glass key={i} className="p-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={18} className="text-white/70" />
            </div>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Syne, system-ui' }}>{s.value.toLocaleString()}</div>
            <div className="text-xs text-white/30 mt-1">{s.label}</div>
          </Glass>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Glass className="p-6">
          <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">Top Pages</h3>
          {analytics?.topPages?.length > 0 ? (
            <div className="space-y-2">
              {analytics.topPages.map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <span className="text-sm text-white/60 font-mono">{p.page}</span>
                  <span className="text-sm font-semibold text-blue-400">{p.count}</span>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-white/20">No visit data yet</p>}
        </Glass>

        {/* Demo Clicks */}
        <Glass className="p-6">
          <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">Demo Clicks</h3>
          {analytics?.demoClicks?.length > 0 ? (
            <div className="space-y-2">
              {analytics.demoClicks.map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <span className="text-sm text-white/60">{d.projectTitle}</span>
                  <span className="text-sm font-semibold text-cyan-400">{d.clicks} clicks</span>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-white/20">No demo clicks yet</p>}
        </Glass>
      </div>

      {/* Recent Messages */}
      <Glass className="p-6 mt-6">
        <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">Recent Messages ({messages.length})</h3>
        {messages.length > 0 ? (
          <div className="space-y-3">
            {messages.slice(0, 10).map(m => (
              <div key={m.id} className="flex items-start gap-4 py-3 border-b border-white/[0.04] last:border-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{m.name}</span>
                    <span className="text-xs text-white/20">{m.email}</span>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                  </div>
                  {m.subject && <div className="text-xs text-white/40 mt-0.5">{m.subject}</div>}
                  <p className="text-xs text-white/30 mt-1 line-clamp-2">{m.message}</p>
                  <span className="text-[10px] text-white/15 mt-1 block">{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-white/20">No messages yet</p>}
      </Glass>
    </div>
  );
}

// ═══════════════════════════════════════
// SETTINGS VIEW
// ═══════════════════════════════════════
function SettingsView() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    (async () => {
      try { setSettings(await api('/api/settings')); } catch {}
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    try { await api('/api/settings', { method: 'PUT', body: JSON.stringify(settings) }); setToast('Settings saved!'); } catch { setToast('Error saving'); }
    setSaving(false);
  };

  const update = (key) => (val) => setSettings(s => ({ ...s, [key]: val }));

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-white/30" /></div>;
  if (!settings) return <Glass className="p-10 text-center text-white/30">Could not load settings</Glass>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Syne, system-ui' }}>Site Settings</h2>
      <Glass className="p-6 mb-6">
        <h3 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-4">General</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Company Name" value={settings.companyName || ''} onChange={update('companyName')} />
          <Input label="Tagline" value={settings.tagline || ''} onChange={update('tagline')} />
          <Input label="Email" value={settings.email || ''} onChange={update('email')} />
          <Input label="Phone" value={settings.phone || ''} onChange={update('phone')} />
          <Input label="Address" value={settings.address || ''} onChange={update('address')} className="md:col-span-2" />
        </div>
      </Glass>

      <Glass className="p-6 mb-6">
        <h3 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-4">Mission & Vision</h3>
        <Input label="Mission" value={settings.mission || ''} onChange={update('mission')} multiline className="mb-4" />
        <Input label="Vision" value={settings.vision || ''} onChange={update('vision')} multiline className="mb-4" />
        <Input label="Values (comma-separated)" value={(settings.values || []).join(', ')} onChange={v => update('values')(v.split(',').map(s => s.trim()).filter(Boolean))} />
      </Glass>

      <Glass className="p-6 mb-6">
        <h3 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="LinkedIn" value={settings.linkedin || ''} onChange={update('linkedin')} placeholder="https://linkedin.com/..." />
          <Input label="Twitter / X" value={settings.twitter || ''} onChange={update('twitter')} placeholder="https://twitter.com/..." />
          <Input label="GitHub" value={settings.github || ''} onChange={update('github')} placeholder="https://github.com/..." />
          <Input label="YouTube" value={settings.youtube || ''} onChange={update('youtube')} placeholder="https://youtube.com/..." />
        </div>
      </Glass>

      <Btn primary onClick={save} disabled={saving}>{saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Save Settings</Btn>
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN ADMIN COMPONENT
// ═══════════════════════════════════════
export default function AdminPage() {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    (async () => {
      try {
        const res = await api('/api/auth/check');
        if (res.authenticated) setAdmin(res.admin);
      } catch {}
      setChecking(false);
    })();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setAdmin(null);
  };

  if (checking) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#04040c' }}>
      <Loader2 size={28} className="animate-spin text-white/30" />
    </div>
  );

  if (!admin) return <LoginScreen onLogin={setAdmin} />;

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'projects', label: 'Projects', icon: FolderOpen },
    { key: 'services', label: 'Services', icon: Settings },
    { key: 'careers', label: 'Careers', icon: Briefcase },
    { key: 'team', label: 'Team', icon: Users },
    { key: 'partners', label: 'Partners', icon: Handshake },
    { key: 'testimonials', label: 'Testimonials', icon: Star },
    { key: 'messages', label: 'Messages', icon: MessageSquare },
    { key: 'admins', label: 'Admins', icon: UserPlus },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#04040c', fontFamily: 'Outfit, system-ui' }}>
      {/* ─── Sidebar ─── */}
      <aside className="w-64 border-r border-white/[0.04] bg-white/[0.01] flex flex-col fixed inset-y-0 left-0 z-50 backdrop-blur-xl">
        <div className="p-6 border-b border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-extrabold text-sm" style={{ fontFamily: 'Syne, system-ui' }}>N</span>
            </div>
            <div>
              <div className="text-sm font-bold" style={{ fontFamily: 'Syne, system-ui' }}>Novokraft</div>
              <div className="text-[10px] text-white/25 uppercase tracking-wider">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
              activeTab === tab.key ? 'bg-blue-600/15 text-blue-400 font-medium' : 'text-white/40 hover:text-white/60 hover:bg-white/[0.04]'
            }`}>
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold">
              {admin.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">{admin.name || 'Admin'}</div>
              <div className="text-[10px] text-white/25 truncate">{admin.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={14} /> Sign Out
          </button>
          <a href="/" target="_blank" className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/30 hover:text-white/50 hover:bg-white/[0.04] transition-all mt-1">
            <ArrowUpRight size={14} /> View Site
          </a>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'dashboard' && <DashboardView />}

          {activeTab === 'projects' && (
            <CrudManager title="Projects" endpoint="/api/projects" fields={[
              { key: 'title', label: 'Title', placeholder: 'Project Name' },
              { key: 'category', label: 'Category', placeholder: 'e.g. Fintech' },
              { key: 'description', label: 'Description', type: 'textarea', full: true },
              { key: 'longDesc', label: 'Long Description', type: 'textarea', full: true },
              { key: 'image', label: 'Image URL', placeholder: 'https://...' },
              { key: 'demoUrl', label: 'Demo URL', placeholder: 'https://demo...' },
              { key: 'videoUrl', label: 'Video URL', placeholder: 'https://youtube.com/...' },
              { key: 'techStack', label: 'Tech Stack', type: 'array', full: true },
              { key: 'featured', label: 'Featured', type: 'boolean' },
              { key: 'published', label: 'Published', type: 'boolean', default: true },
              { key: 'sortOrder', label: 'Sort Order', placeholder: '0' },
            ]} renderItem={item => (
              <div className="flex items-center gap-3">
                {item.image && <div className="w-12 h-8 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${item.image})` }} />}
                <div>
                  <div className="text-sm font-semibold">{item.title}</div>
                  <div className="text-xs text-white/30">{item.category} · {item._count?.demoClicks || 0} demo clicks</div>
                </div>
              </div>
            )} />
          )}

          {activeTab === 'services' && (
            <CrudManager title="Services" endpoint="/api/services" fields={[
              { key: 'title', label: 'Title', placeholder: 'Service Name' },
              { key: 'icon', label: 'Icon (Lucide name)', placeholder: 'e.g. CreditCard, Bot, Globe' },
              { key: 'description', label: 'Description', type: 'textarea', full: true },
              { key: 'features', label: 'Features', type: 'array', full: true },
              { key: 'published', label: 'Published', type: 'boolean', default: true },
              { key: 'sortOrder', label: 'Sort Order', placeholder: '0' },
            ]} />
          )}

          {activeTab === 'careers' && (
            <CrudManager title="Careers" endpoint="/api/careers" fields={[
              { key: 'title', label: 'Job Title', placeholder: 'Senior Engineer' },
              { key: 'department', label: 'Department', placeholder: 'Engineering' },
              { key: 'type', label: 'Type', placeholder: 'Full-time' },
              { key: 'location', label: 'Location', placeholder: 'Nairobi / Remote' },
              { key: 'description', label: 'Description', type: 'textarea', full: true },
              { key: 'requirements', label: 'Requirements', type: 'array', full: true },
              { key: 'salary', label: 'Salary Range', placeholder: 'Optional' },
              { key: 'published', label: 'Published', type: 'boolean', default: true },
            ]} />
          )}

          {activeTab === 'team' && (
            <CrudManager title="Team Members" endpoint="/api/team" fields={[
              { key: 'name', label: 'Name', placeholder: 'Full Name' },
              { key: 'role', label: 'Role / Title', placeholder: 'CEO, CTO, etc.' },
              { key: 'bio', label: 'Bio', type: 'textarea', full: true },
              { key: 'image', label: 'Profile Image URL', placeholder: 'https://...' },
              { key: 'linkedin', label: 'LinkedIn URL' },
              { key: 'twitter', label: 'Twitter URL' },
              { key: 'github', label: 'GitHub URL' },
              { key: 'sortOrder', label: 'Sort Order', placeholder: '0' },
              { key: 'published', label: 'Published', type: 'boolean', default: true },
            ]} renderItem={item => (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : <span className="text-xs font-bold">{item.name?.charAt(0)}</span>}
                </div>
                <div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-xs text-white/30">{item.role}</div>
                </div>
              </div>
            )} />
          )}

          {activeTab === 'partners' && (
            <CrudManager title="Partners" endpoint="/api/partners" fields={[
              { key: 'name', label: 'Partner Name', placeholder: 'Company Name' },
              { key: 'logo', label: 'Logo URL', placeholder: 'https://...' },
              { key: 'website', label: 'Website', placeholder: 'https://...' },
              { key: 'tier', label: 'Tier', placeholder: 'partner, gold, or platinum' },
              { key: 'sortOrder', label: 'Sort Order', placeholder: '0' },
              { key: 'published', label: 'Published', type: 'boolean', default: true },
            ]} />
          )}

          {activeTab === 'testimonials' && (
            <CrudManager title="Testimonials" endpoint="/api/testimonials" fields={[
              { key: 'name', label: 'Client Name', placeholder: 'Full Name' },
              { key: 'role', label: 'Role', placeholder: 'CEO, CFO, etc.' },
              { key: 'company', label: 'Company', placeholder: 'Company Name' },
              { key: 'text', label: 'Testimonial', type: 'textarea', full: true },
              { key: 'image', label: 'Photo URL', placeholder: 'https://...' },
              { key: 'rating', label: 'Rating (1-5)', placeholder: '5' },
              { key: 'sortOrder', label: 'Sort Order', placeholder: '0' },
              { key: 'published', label: 'Published', type: 'boolean', default: true },
            ]} />
          )}

          {activeTab === 'messages' && <MessagesView />}
          {activeTab === 'admins' && <AdminsManager currentAdmin={admin} />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

// Messages view component
function MessagesView() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try { setMessages(await api('/api/contact')); } catch {}
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-white/30" /></div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Syne, system-ui' }}>Contact Messages ({messages.length})</h2>

      {selected ? (
        <Glass className="p-8 mb-6">
          <button onClick={() => setSelected(null)} className="text-xs text-white/30 hover:text-white/50 mb-4 flex items-center gap-1"><ChevronRight size={12} className="rotate-180" /> Back to list</button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-lg font-bold">{selected.name.charAt(0)}</div>
            <div>
              <div className="font-semibold">{selected.name}</div>
              <div className="text-xs text-white/30">{selected.email} {selected.phone && `· ${selected.phone}`}</div>
              {selected.company && <div className="text-xs text-white/25">{selected.company}</div>}
            </div>
          </div>
          {selected.subject && <div className="text-sm font-medium text-blue-400 mb-2">{selected.subject}</div>}
          <p className="text-sm text-white/55 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
          <div className="text-xs text-white/15 mt-4">{new Date(selected.createdAt).toLocaleString()}</div>
        </Glass>
      ) : messages.length === 0 ? (
        <Glass className="p-10 text-center text-white/30 text-sm">No contact messages yet.</Glass>
      ) : (
        <div className="space-y-2">
          {messages.map(m => (
            <Glass key={m.id} className="px-5 py-4 cursor-pointer hover:bg-white/[0.05] transition-all" onClick={() => setSelected(m)}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">{m.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{m.name}</span>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                    <span className="text-[10px] text-white/15 ml-auto">{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                  {m.subject && <div className="text-xs text-white/40 truncate">{m.subject}</div>}
                  <p className="text-xs text-white/25 truncate mt-0.5">{m.message}</p>
                </div>
                <ChevronRight size={14} className="text-white/15" />
              </div>
            </Glass>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// ADMINS MANAGER
// ═══════════════════════════════════════
function AdminsManager({ currentAdmin }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { setAdmins(await api('/api/admins')); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    try {
      if (editing.id) {
        await api('/api/admins', { method: 'PUT', body: JSON.stringify(editing) });
      } else {
        if (!editing.email || !editing.password) { setToast('Email and password required'); setSaving(false); return; }
        await api('/api/admins', { method: 'POST', body: JSON.stringify(editing) });
      }
      setEditing(null);
      await load();
      setToast('Admin saved!');
    } catch (err) { setToast('Error: ' + err.message); }
    setSaving(false);
  };

  const remove = async (id) => {
    if (id === currentAdmin?.id) { setToast('Cannot delete yourself'); return; }
    if (!confirm('Delete this admin?')) return;
    try { await api('/api/admins?id=' + id, { method: 'DELETE' }); await load(); setToast('Admin deleted'); } catch (err) { setToast('Error: ' + err.message); }
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    if (passwordData.newPassword.length < 6) { setPasswordError('Password must be at least 6 characters'); return; }
    if (passwordData.newPassword !== passwordData.confirmPassword) { setPasswordError('Passwords do not match'); return; }
    setPasswordSaving(true);
    try {
      await api('/api/auth/reset', { method: 'PUT', body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }) });
      setShowChangePassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setToast('Password changed successfully!');
    } catch (err) { setPasswordError(err.message || 'Failed to change password'); }
    setPasswordSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ fontFamily: 'Syne, system-ui' }}>Admin Users</h2>
        <div className="flex gap-2">
          <Btn onClick={() => setShowChangePassword(!showChangePassword)}><KeyRound size={14} /> Change My Password</Btn>
          <Btn primary onClick={() => setEditing({ email: '', password: '', name: '', avatar: '' })}><Plus size={14} /> Add Admin</Btn>
        </div>
      </div>

      {showChangePassword && (
        <Glass className="p-6 mb-6 border-amber-500/20">
          <h3 className="text-sm font-semibold text-amber-400 mb-4">Change Your Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Current Password" type="password" value={passwordData.currentPassword} onChange={v => setPasswordData(p => ({ ...p, currentPassword: v }))} placeholder="Current password" />
            <Input label="New Password" type="password" value={passwordData.newPassword} onChange={v => setPasswordData(p => ({ ...p, newPassword: v }))} placeholder="New password" />
            <Input label="Confirm Password" type="password" value={passwordData.confirmPassword} onChange={v => setPasswordData(p => ({ ...p, confirmPassword: v }))} placeholder="Confirm" />
          </div>
          {passwordError && <div className="text-red-400 text-xs mt-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{passwordError}</div>}
          <div className="flex gap-3 mt-4">
            <Btn primary onClick={handleChangePassword} disabled={passwordSaving}>{passwordSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Update Password</Btn>
            <Btn onClick={() => { setShowChangePassword(false); setPasswordError(''); }}>Cancel</Btn>
          </div>
        </Glass>
      )}

      {editing && (
        <Glass className="p-6 mb-6 border-blue-500/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-blue-400">{editing.id ? 'Edit Admin' : 'Create New Admin'}</h3>
            <button onClick={() => setEditing(null)} className="text-white/30 hover:text-white/60"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Name" value={editing.name || ''} onChange={v => setEditing(e => ({ ...e, name: v }))} placeholder="Admin Name" />
            <Input label="Email" type="email" value={editing.email || ''} onChange={v => setEditing(e => ({ ...e, email: v }))} placeholder="admin@novokraft.com" />
            {!editing.id && <Input label="Password" type="password" value={editing.password || ''} onChange={v => setEditing(e => ({ ...e, password: v }))} placeholder="Set a strong password" />}
            <Input label="Avatar URL" value={editing.avatar || ''} onChange={v => setEditing(e => ({ ...e, avatar: v }))} placeholder="https://... (optional)" />
          </div>
          <div className="flex gap-3 mt-5">
            <Btn primary onClick={save} disabled={saving}>{saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Save</Btn>
            <Btn onClick={() => setEditing(null)}>Cancel</Btn>
          </div>
        </Glass>
      )}

      {loading ? (
        <div className="text-center py-12 text-white/30"><Loader2 size={20} className="animate-spin mx-auto" /></div>
      ) : admins.length === 0 ? (
        <Glass className="p-10 text-center text-white/30 text-sm">No admins found.</Glass>
      ) : (
        <div className="space-y-3">
          {admins.map(a => (
            <Glass key={a.id} className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.05] transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {a.avatar ? <img src={a.avatar} alt="" className="w-full h-full object-cover" /> : <span className="text-sm font-bold">{a.name?.charAt(0) || 'A'}</span>}
                </div>
                <div>
                  <div className="text-sm font-semibold flex items-center gap-2">
                    {a.name || 'Admin'}
                    {a.id === currentAdmin?.id && <span className="text-[10px] text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">You</span>}
                  </div>
                  <div className="text-xs text-white/30">{a.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <Btn small onClick={() => setEditing({ ...a })}><Pencil size={12} /></Btn>
                {a.id !== currentAdmin?.id && <Btn small danger onClick={() => remove(a.id)}><Trash2 size={12} /></Btn>}
              </div>
            </Glass>
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  );
}
