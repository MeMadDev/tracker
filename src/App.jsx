import React, { useState, useEffect, useMemo } from 'react';
import { Flame, Briefcase, Code2, MessageSquare, Plus, X, Trash2, TrendingUp, Calendar, Target, Award, AlertCircle, Check, Clock, Filter, LayoutDashboard, Rocket, Zap, Sun } from 'lucide-react';

// Bright, motivating theme — warm cream bg with vibrant accents
const THEME = {
  bg: '#FEFCF8',
  surface: '#FFFFFF',
  surfaceHi: '#F7F4EF',
  border: '#E8E2D9',
  borderHi: '#D4CEC5',
  text: '#1A1A2E',
  textDim: '#4A4A5A',
  textMuted: '#8A8A9A',
  accent: '#6C63FF',
  accentDim: '#5A52D5',
  accentGlow: 'rgba(108, 99, 255, 0.12)',
  accentLight: '#EEF0FF',
  success: '#10B981',
  successDim: '#059669',
  successLight: '#ECFDF5',
  danger: '#EF4444',
  dangerLight: '#FEF2F2',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  tier1: '#8B5CF6',
  tier15: '#3B82F6',
  tier2: '#64748B',
  gradient1: '#6C63FF',
  gradient2: '#FF6B9D',
  gradient3: '#FFA63E',
};

const PATTERNS = [
  'Arrays', 'Strings', 'Hashing', 'Two Pointers', 'Sliding Window',
  'Binary Search', 'Stacks', 'Queues', 'Recursion', 'Backtracking',
  'Linked Lists', 'Trees', 'BST', 'Graphs', 'Heaps',
  'DP', 'Greedy', 'Tries', 'Bit Manipulation', 'Math', 'Sorting'
];

const ROUNDS = [
  'Recruiter Screen', 'Online Assessment', 'Technical 1', 'Technical 2',
  'System Design', 'Behavioral', 'Final / Hiring Manager', 'Founder Round'
];

const STATUSES = [
  { value: 'applied', label: 'Applied', color: '#64748B' },
  { value: 'screening', label: 'Screening', color: '#3B82F6' },
  { value: 'technical', label: 'Technical', color: '#F59E0B' },
  { value: 'final', label: 'Final', color: '#8B5CF6' },
  { value: 'offer', label: 'Offer', color: '#10B981' },
  { value: 'rejected', label: 'Rejected', color: '#EF4444' },
  { value: 'ghosted', label: 'Ghosted', color: '#9CA3AF' },
];

const TIERS = [
  { value: 'tier1', label: 'Tier 1', color: THEME.tier1 },
  { value: 'tier15', label: 'Tier 1.5', color: THEME.tier15 },
  { value: 'tier2', label: 'Tier 2', color: THEME.tier2 },
];

const OUTCOMES = [
  { value: 'nailed', label: 'Nailed', color: THEME.success },
  { value: 'partial', label: 'Partial', color: THEME.warning },
  { value: 'struggled', label: 'Struggled', color: THEME.danger },
];

// --- Helpers ---

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

function daysAgo(iso) {
  if (!iso) return '—';
  const diff = Math.floor((new Date(todayISO()) - new Date(iso)) / 86400000);
  if (diff === 0) return 'today';
  if (diff === 1) return 'yesterday';
  if (diff < 7) return `${diff}d ago`;
  return `${Math.floor(diff / 7)}w ago`;
}

function last7Days() {
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function calculateStreak(dsaEntries) {
  if (!dsaEntries || !dsaEntries.length) return 0;
  const dates = new Set(dsaEntries.map(e => e.date));
  let streak = 0;
  const current = new Date();
  current.setHours(0, 0, 0, 0);
  let cursor = current.toISOString().slice(0, 10);
  if (!dates.has(cursor)) {
    current.setDate(current.getDate() - 1);
    cursor = current.toISOString().slice(0, 10);
  }
  while (dates.has(cursor)) {
    streak++;
    current.setDate(current.getDate() - 1);
    cursor = current.toISOString().slice(0, 10);
  }
  return streak;
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// --- Storage hook (localStorage) ---

function useStoredArray(key) {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        setData(JSON.parse(raw));
      }
    } catch {
      // key doesn't exist or bad data
    }
    setLoaded(true);
  }, [key]);

  const save = (newData) => {
    setData(newData);
    try {
      localStorage.setItem(key, JSON.stringify(newData));
    } catch (e) {
      console.error('storage save failed', e);
    }
  };

  return [data, save, loaded];
}

// --- Small UI pieces ---

function StatCard({ label, value, sub, icon: Icon, accent }) {
  return (
    <div
      className="p-5 rounded-2xl flex flex-col justify-between h-full"
      style={{
        background: THEME.surface,
        border: `1px solid ${THEME.border}`,
        minHeight: '120px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-widest font-mono" style={{ color: THEME.textMuted, letterSpacing: '0.15em' }}>
          {label}
        </div>
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accent ? `${accent}15` : THEME.surfaceHi }}>
            <Icon size={16} style={{ color: accent || THEME.textDim }} />
          </div>
        )}
      </div>
      <div>
        <div className="font-display text-4xl font-semibold leading-none" style={{ color: accent || THEME.text }}>
          {value}
        </div>
        {sub && <div className="text-xs mt-2 font-mono" style={{ color: THEME.textMuted }}>{sub}</div>}
      </div>
    </div>
  );
}

function Chip({ label, color, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-mono transition-all"
      style={{
        background: active ? color : `${color}10`,
        color: active ? '#fff' : color,
        border: `1.5px solid ${active ? color : `${color}30`}`,
        fontWeight: active ? 600 : 500,
      }}
    >
      {label}
    </button>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs uppercase tracking-wider font-mono font-medium" style={{ color: THEME.textMuted }}>
          {label}
        </label>
      )}
      <input
        {...props}
        className="px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{
          background: THEME.surfaceHi,
          border: `1.5px solid ${THEME.border}`,
          color: THEME.text,
          ...(props.style || {}),
        }}
        onFocus={(e) => e.target.style.borderColor = THEME.accent}
        onBlur={(e) => e.target.style.borderColor = THEME.border}
      />
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs uppercase tracking-wider font-mono font-medium" style={{ color: THEME.textMuted }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="px-3 py-2.5 rounded-xl text-sm outline-none"
        style={{
          background: THEME.surfaceHi,
          border: `1.5px solid ${THEME.border}`,
          color: THEME.text,
        }}
      >
        {options.map(opt => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs uppercase tracking-wider font-mono font-medium" style={{ color: THEME.textMuted }}>
          {label}
        </label>
      )}
      <textarea
        {...props}
        className="px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
        style={{
          background: THEME.surfaceHi,
          border: `1.5px solid ${THEME.border}`,
          color: THEME.text,
          minHeight: '80px',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );
}

function Button({ children, onClick, variant = 'primary', ...props }) {
  const styles = {
    primary: {
      background: `linear-gradient(135deg, ${THEME.gradient1}, ${THEME.gradient2})`,
      color: '#fff',
      border: 'none',
      boxShadow: '0 2px 8px rgba(108, 99, 255, 0.25)',
    },
    secondary: {
      background: THEME.surfaceHi,
      color: THEME.text,
      border: `1.5px solid ${THEME.border}`,
      boxShadow: 'none',
    },
    danger: {
      background: THEME.dangerLight,
      color: THEME.danger,
      border: `1.5px solid ${THEME.danger}30`,
      boxShadow: 'none',
    },
  };
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover-lift flex items-center gap-2"
      style={styles[variant]}
      {...props}
    >
      {children}
    </button>
  );
}

// --- Dashboard tab ---

function Dashboard({ applications, dsa, questions }) {
  const streak = calculateStreak(dsa);
  const days = last7Days();
  const dsaThisWeek = dsa.filter(e => days.includes(e.date)).length;
  const appsThisWeek = applications.filter(a => days.includes(a.appliedDate)).length;
  const totalApps = applications.length;
  const referralCount = applications.filter(a => a.source === 'referral').length;
  const activeLoops = applications.filter(a => ['screening', 'technical', 'final'].includes(a.status)).length;
  const offers = applications.filter(a => a.status === 'offer').length;
  const totalProblems = dsa.length;
  const questionsLogged = questions.length;

  const streakDots = days.map(d => ({
    date: d,
    done: dsa.some(e => e.date === d),
    isToday: d === todayISO(),
  }));

  const statusCounts = STATUSES.map(s => ({
    ...s,
    count: applications.filter(a => a.status === s.value).length
  })).filter(s => s.count > 0);

  const targets = [
    { label: 'DSA problems this week', current: dsaThisWeek, target: 15, icon: Code2 },
    { label: 'Applications this week', current: appsThisWeek, target: 10, icon: Briefcase },
    { label: 'Referral-sourced apps', current: referralCount, target: Math.max(totalApps * 0.5, 10), icon: Target, sub: `${totalApps > 0 ? Math.round(referralCount / totalApps * 100) : 0}% of total` },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Hero: Streak */}
      <section
        className="p-8 rounded-3xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${THEME.gradient1}, ${THEME.gradient2}, ${THEME.gradient3})`,
          boxShadow: '0 4px 24px rgba(108, 99, 255, 0.2)',
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest font-mono mb-2" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.2em' }}>
              Current Streak
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-7xl font-bold leading-none" style={{ color: '#fff' }}>
                {streak}
              </span>
              <span className="font-display text-2xl italic" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {streak === 1 ? 'day' : 'days'}
              </span>
              {streak >= 7 && <Flame size={32} style={{ color: '#FFD700' }} />}
            </div>
            <div className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
              {streak === 0 && 'Log a problem today. Momentum starts with one.'}
              {streak >= 1 && streak < 7 && 'Building momentum. Every day counts.'}
              {streak >= 7 && streak < 21 && 'On fire! This is how champions are built.'}
              {streak >= 21 && 'Unstoppable. You ARE the discipline.'}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest font-mono mb-3" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.2em' }}>
              Last 7 days
            </div>
            <div className="flex gap-2">
              {streakDots.map(d => (
                <div
                  key={d.date}
                  title={formatDate(d.date)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-semibold"
                  style={{
                    background: d.done ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.15)',
                    color: d.done ? THEME.accent : 'rgba(255,255,255,0.6)',
                    outline: d.isToday ? '2px solid rgba(255,255,255,0.6)' : 'none',
                    outlineOffset: '2px',
                  }}
                >
                  {d.done ? '✓' : new Date(d.date).getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Apps Sent" value={totalApps} sub={`${appsThisWeek} this week`} icon={Briefcase} accent={THEME.accent} />
        <StatCard label="Active Loops" value={activeLoops} sub={`${offers} offer${offers === 1 ? '' : 's'}`} icon={TrendingUp} accent={activeLoops > 0 ? THEME.success : null} />
        <StatCard label="Problems" value={totalProblems} sub={`${dsaThisWeek} this week`} icon={Code2} accent={THEME.warning} />
        <StatCard label="Questions Logged" value={questionsLogged} sub="from real interviews" icon={MessageSquare} accent={THEME.tier1} />
      </section>

      {/* Weekly targets */}
      <section>
        <h2 className="font-display text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: THEME.text }}>
          <Rocket size={20} style={{ color: THEME.accent }} />
          This week's targets
        </h2>
        <div className="grid gap-3">
          {targets.map(t => {
            const pct = Math.min(100, Math.round((t.current / t.target) * 100));
            const completed = pct >= 100;
            return (
              <div
                key={t.label}
                className="p-4 rounded-2xl"
                style={{
                  background: completed ? THEME.successLight : THEME.surface,
                  border: `1.5px solid ${completed ? `${THEME.success}40` : THEME.border}`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium" style={{ color: THEME.text }}>{t.label}</div>
                  <div className="font-mono text-sm font-semibold" style={{ color: completed ? THEME.success : THEME.textDim }}>
                    {t.current} / {Math.round(t.target)}
                    {t.sub && <span className="ml-2 font-normal" style={{ color: THEME.textMuted }}>({t.sub})</span>}
                  </div>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: THEME.surfaceHi }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background: completed
                        ? `linear-gradient(90deg, ${THEME.success}, #34D399)`
                        : `linear-gradient(90deg, ${THEME.gradient1}, ${THEME.gradient2})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pipeline breakdown */}
      {statusCounts.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: THEME.text }}>Pipeline</h2>
          <div className="flex gap-3 flex-wrap">
            {statusCounts.map(s => (
              <div
                key={s.value}
                className="px-5 py-4 rounded-2xl flex items-center gap-3"
                style={{
                  background: THEME.surface,
                  border: `1.5px solid ${THEME.border}`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                <div>
                  <div className="text-xs uppercase tracking-wide font-mono" style={{ color: THEME.textMuted }}>{s.label}</div>
                  <div className="font-display text-xl font-semibold" style={{ color: THEME.text }}>{s.count}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Motivational reminder */}
      <section
        className="p-6 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${THEME.accentLight}, #FFF0F5)`,
          border: `1.5px solid ${THEME.accent}20`,
        }}
      >
        <div className="flex gap-3 items-start">
          <Zap size={20} style={{ color: THEME.accent, flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ color: THEME.text, fontWeight: 700, fontSize: '15px' }}>Remember:</strong>{' '}
            <span style={{ color: THEME.textDim, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
              Referrals before cold applies. Spend 30 min on LinkedIn outreach before 60 min on DSA. That's the whole edge.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Applications tab ---

function ApplicationsTab({ applications, saveApplications }) {
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({
    company: '', role: '', appliedDate: todayISO(),
    source: 'cold', referrer: '', status: 'applied', tier: 'tier15', notes: ''
  });

  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter);

  const addApplication = () => {
    if (!form.company.trim()) return;
    saveApplications([{ id: uid(), ...form }, ...applications]);
    setForm({ ...form, company: '', role: '', referrer: '', notes: '' });
    setAdding(false);
  };

  const updateStatus = (id, status) => {
    saveApplications(applications.map(a => a.id === id ? { ...a, status } : a));
  };

  const remove = (id) => {
    if (confirm('Delete this application?')) {
      saveApplications(applications.filter(a => a.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-display text-3xl font-semibold" style={{ color: THEME.text }}>Applications</h1>
        <Button onClick={() => setAdding(!adding)}>
          {adding ? <X size={16} /> : <Plus size={16} />}
          {adding ? 'Cancel' : 'Log Application'}
        </Button>
      </div>

      {adding && (
        <div className="p-6 rounded-2xl" style={{ background: THEME.surface, border: `2px solid ${THEME.accent}40`, boxShadow: `0 4px 16px ${THEME.accentGlow}` }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Razorpay" autoFocus />
            <Input label="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Senior SWE" />
            <Input label="Applied on" type="date" value={form.appliedDate} onChange={e => setForm({ ...form, appliedDate: e.target.value })} />
            <Select label="Source" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} options={[{value: 'cold', label: 'Cold apply'}, {value: 'referral', label: 'Referral'}]} />
            {form.source === 'referral' && (
              <Input label="Referrer" value={form.referrer} onChange={e => setForm({ ...form, referrer: e.target.value })} placeholder="Who referred you?" />
            )}
            <Select label="Tier" value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value })} options={TIERS} />
            <Select label="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} options={STATUSES} />
            <div className="md:col-span-2">
              <Textarea label="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Anything you want to remember..." />
            </div>
          </div>
          <div className="flex gap-3 mt-5 justify-end">
            <Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button>
            <Button onClick={addApplication}><Check size={16} /> Save</Button>
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        <Chip label={`All (${applications.length})`} color={THEME.textDim} active={filter === 'all'} onClick={() => setFilter('all')} />
        {STATUSES.map(s => {
          const count = applications.filter(a => a.status === s.value).length;
          if (!count) return null;
          return <Chip key={s.value} label={`${s.label} (${count})`} color={s.color} active={filter === s.value} onClick={() => setFilter(s.value)} />;
        })}
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="p-10 rounded-2xl text-center" style={{ background: THEME.surface, border: `1.5px dashed ${THEME.border}`, color: THEME.textMuted }}>
            <Rocket size={32} style={{ color: THEME.accent, margin: '0 auto 12px' }} />
            <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>No applications yet. Start with your top 5 referrals.</div>
          </div>
        )}
        {filtered.map(a => {
          const status = STATUSES.find(s => s.value === a.status);
          const tier = TIERS.find(t => t.value === a.tier);
          return (
            <div
              key={a.id}
              className="p-4 rounded-2xl flex items-center gap-4 flex-wrap"
              style={{
                background: THEME.surface,
                border: `1.5px solid ${THEME.border}`,
                borderLeftWidth: '4px',
                borderLeftColor: status?.color,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-display text-lg font-semibold" style={{ color: THEME.text }}>{a.company}</span>
                  {tier && <span className="text-xs font-mono px-2 py-0.5 rounded-full font-medium" style={{ color: tier.color, background: `${tier.color}12`, border: `1px solid ${tier.color}30` }}>{tier.label}</span>}
                  {a.source === 'referral' && <span className="text-xs font-mono font-medium" style={{ color: THEME.success }}>via {a.referrer || 'referral'}</span>}
                </div>
                <div className="text-sm" style={{ color: THEME.textDim }}>
                  {a.role || '—'} · <span className="font-mono text-xs">{formatDate(a.appliedDate)} · {daysAgo(a.appliedDate)}</span>
                </div>
                {a.notes && <div className="text-xs mt-2" style={{ color: THEME.textMuted, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>{a.notes}</div>}
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={a.status}
                  onChange={e => updateStatus(a.id, e.target.value)}
                  className="px-2 py-1.5 rounded-lg text-xs font-mono font-medium"
                  style={{ background: THEME.surfaceHi, border: `1.5px solid ${status?.color || THEME.border}30`, color: status?.color || THEME.text }}
                >
                  {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <button onClick={() => remove(a.id)} className="p-2 rounded-lg hover-lift" style={{ color: THEME.textMuted }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- DSA tab ---

function DsaTab({ dsa, saveDsa }) {
  const [form, setForm] = useState({
    date: todayISO(), problem: '', difficulty: 'Medium', pattern: 'Arrays',
    timeMinutes: 25, solved: true, needsRevisit: false, link: ''
  });
  const [filterPattern, setFilterPattern] = useState('all');
  const [showRevisitOnly, setShowRevisitOnly] = useState(false);

  const add = () => {
    if (!form.problem.trim()) return;
    saveDsa([{ id: uid(), ...form }, ...dsa]);
    setForm({ ...form, problem: '', link: '', timeMinutes: 25, needsRevisit: false });
  };

  const toggleRevisit = (id) => {
    saveDsa(dsa.map(e => e.id === id ? { ...e, needsRevisit: !e.needsRevisit } : e));
  };

  const remove = (id) => {
    if (confirm('Delete this problem?')) saveDsa(dsa.filter(e => e.id !== id));
  };

  const filtered = dsa.filter(e => {
    if (showRevisitOnly && !e.needsRevisit) return false;
    if (filterPattern !== 'all' && e.pattern !== filterPattern) return false;
    return true;
  });

  const byPattern = useMemo(() => {
    const counts = {};
    dsa.forEach(e => { counts[e.pattern] = (counts[e.pattern] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [dsa]);

  const byDifficulty = {
    Easy: dsa.filter(e => e.difficulty === 'Easy').length,
    Medium: dsa.filter(e => e.difficulty === 'Medium').length,
    Hard: dsa.filter(e => e.difficulty === 'Hard').length,
  };

  const streak = calculateStreak(dsa);
  const revisitCount = dsa.filter(e => e.needsRevisit).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-display text-3xl font-semibold" style={{ color: THEME.text }}>DSA Tracker</h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Streak" value={`${streak}d`} icon={Flame} accent={streak > 0 ? '#F97316' : null} />
        <StatCard label="Total" value={dsa.length} sub={`E ${byDifficulty.Easy} · M ${byDifficulty.Medium} · H ${byDifficulty.Hard}`} icon={Code2} accent={THEME.accent} />
        <StatCard label="This Week" value={dsa.filter(e => last7Days().includes(e.date)).length} icon={Calendar} accent={THEME.tier15} />
        <StatCard label="To Revisit" value={revisitCount} icon={AlertCircle} accent={revisitCount > 0 ? THEME.warning : null} />
      </div>

      {/* Quick add */}
      <div
        className="p-6 rounded-2xl"
        style={{
          background: THEME.surface,
          border: `1.5px solid ${THEME.border}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div className="text-xs uppercase tracking-widest font-mono mb-4 font-medium" style={{ color: THEME.textMuted, letterSpacing: '0.15em' }}>
          Log today's problem
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4">
            <Input label="Problem" value={form.problem} onChange={e => setForm({ ...form, problem: e.target.value })} placeholder="Two Sum" />
          </div>
          <div className="md:col-span-2">
            <Select label="Difficulty" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} options={['Easy', 'Medium', 'Hard']} />
          </div>
          <div className="md:col-span-3">
            <Select label="Pattern" value={form.pattern} onChange={e => setForm({ ...form, pattern: e.target.value })} options={PATTERNS} />
          </div>
          <div className="md:col-span-2">
            <Input label="Min" type="number" value={form.timeMinutes} onChange={e => setForm({ ...form, timeMinutes: parseInt(e.target.value) || 0 })} />
          </div>
          <div className="md:col-span-1 flex items-end">
            <Button onClick={add}><Plus size={16} /></Button>
          </div>
        </div>
        <div className="flex gap-4 mt-4 text-xs font-mono" style={{ color: THEME.textDim }}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.solved} onChange={e => setForm({ ...form, solved: e.target.checked })} />
            Solved
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.needsRevisit} onChange={e => setForm({ ...form, needsRevisit: e.target.checked })} />
            Needs revisit
          </label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="px-2 py-1 rounded-lg ml-auto"
            style={{ background: THEME.surfaceHi, border: `1.5px solid ${THEME.border}`, color: THEME.text }}
          />
        </div>
      </div>

      {/* Pattern chart */}
      {byPattern.length > 0 && (
        <div className="p-6 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="text-xs uppercase tracking-widest font-mono mb-4 font-medium" style={{ color: THEME.textMuted, letterSpacing: '0.15em' }}>
            By pattern
          </div>
          <div className="flex flex-col gap-2.5">
            {byPattern.slice(0, 8).map(([pattern, count]) => {
              const max = byPattern[0][1];
              return (
                <div key={pattern} className="flex items-center gap-3">
                  <div className="text-xs font-mono w-24 flex-shrink-0 font-medium" style={{ color: THEME.textDim }}>{pattern}</div>
                  <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{ background: THEME.surfaceHi }}>
                    <div
                      className="h-full rounded-lg"
                      style={{
                        width: `${(count / max) * 100}%`,
                        background: `linear-gradient(90deg, ${THEME.gradient1}, ${THEME.gradient2})`,
                      }}
                    />
                  </div>
                  <div className="text-xs font-mono w-6 text-right font-semibold" style={{ color: THEME.text }}>{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap items-center">
        <Chip label="All" color={THEME.textDim} active={filterPattern === 'all' && !showRevisitOnly} onClick={() => { setFilterPattern('all'); setShowRevisitOnly(false); }} />
        <Chip label={`Revisit (${revisitCount})`} color={THEME.warning} active={showRevisitOnly} onClick={() => { setShowRevisitOnly(!showRevisitOnly); }} />
        <select
          value={filterPattern}
          onChange={e => setFilterPattern(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-xs font-mono"
          style={{ background: THEME.surfaceHi, border: `1.5px solid ${THEME.border}`, color: THEME.text }}
        >
          <option value="all">All patterns</option>
          {PATTERNS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="p-10 rounded-2xl text-center" style={{ background: THEME.surface, border: `1.5px dashed ${THEME.border}`, color: THEME.textMuted }}>
            <Code2 size={32} style={{ color: THEME.accent, margin: '0 auto 12px' }} />
            <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
              {dsa.length === 0 ? 'Solve one problem today. The streak begins.' : 'No problems match this filter.'}
            </div>
          </div>
        )}
        {filtered.map(e => {
          const diffColor = e.difficulty === 'Easy' ? THEME.success : e.difficulty === 'Medium' ? THEME.warning : THEME.danger;
          return (
            <div
              key={e.id}
              className="p-4 rounded-xl flex items-center gap-3"
              style={{
                background: THEME.surface,
                border: `1.5px solid ${THEME.border}`,
                borderLeftWidth: '4px',
                borderLeftColor: e.needsRevisit ? THEME.warning : diffColor,
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold" style={{ color: THEME.text }}>{e.problem}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full font-medium" style={{ color: diffColor, background: `${diffColor}12`, border: `1px solid ${diffColor}30` }}>{e.difficulty}</span>
                  <span className="text-xs font-mono" style={{ color: THEME.textMuted }}>{e.pattern}</span>
                </div>
                <div className="text-xs font-mono mt-1" style={{ color: THEME.textMuted }}>
                  {formatDate(e.date)} · {e.timeMinutes}min {e.solved ? '· ✓ solved' : '· unsolved'}
                </div>
              </div>
              <button
                onClick={() => toggleRevisit(e.id)}
                className="p-2 rounded-lg hover-lift"
                style={{ color: e.needsRevisit ? THEME.warning : THEME.textMuted }}
                title="Toggle revisit flag"
              >
                <AlertCircle size={14} />
              </button>
              <button onClick={() => remove(e.id)} className="p-2 rounded-lg hover-lift" style={{ color: THEME.textMuted }}>
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Interview Questions tab ---

function QuestionsTab({ questions, saveQuestions }) {
  const [adding, setAdding] = useState(false);
  const [filterCompany, setFilterCompany] = useState('all');
  const [form, setForm] = useState({
    date: todayISO(), company: '', round: 'Technical 1',
    question: '', approach: '', outcome: 'nailed', topic: ''
  });

  const add = () => {
    if (!form.question.trim()) return;
    saveQuestions([{ id: uid(), ...form }, ...questions]);
    setForm({ ...form, question: '', approach: '', topic: '' });
    setAdding(false);
  };

  const remove = (id) => {
    if (confirm('Delete this question?')) saveQuestions(questions.filter(q => q.id !== id));
  };

  const companies = useMemo(() => {
    return ['all', ...new Set(questions.map(q => q.company).filter(Boolean))];
  }, [questions]);

  const filtered = filterCompany === 'all' ? questions : questions.filter(q => q.company === filterCompany);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold" style={{ color: THEME.text }}>Interview Log</h1>
          <div className="text-sm mt-1" style={{ color: THEME.textDim, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
            Log every question within 15 minutes of the interview. Future you will thank present you.
          </div>
        </div>
        <Button onClick={() => setAdding(!adding)}>
          {adding ? <X size={16} /> : <Plus size={16} />}
          {adding ? 'Cancel' : 'Log Question'}
        </Button>
      </div>

      {adding && (
        <div className="p-6 rounded-2xl" style={{ background: THEME.surface, border: `2px solid ${THEME.accent}40`, boxShadow: `0 4px 16px ${THEME.accentGlow}` }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Razorpay" autoFocus />
            <Select label="Round" value={form.round} onChange={e => setForm({ ...form, round: e.target.value })} options={ROUNDS} />
            <Input label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <Input label="Topic / Tag" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="Graphs, caching, system design..." />
            <div className="md:col-span-2">
              <Textarea label="Question asked" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} placeholder="Write the full question as accurately as you can remember..." />
            </div>
            <div className="md:col-span-2">
              <Textarea label="Your approach / what you said" value={form.approach} onChange={e => setForm({ ...form, approach: e.target.value })} placeholder="What did you say? What would you do differently?" />
            </div>
            <Select label="How it went" value={form.outcome} onChange={e => setForm({ ...form, outcome: e.target.value })} options={OUTCOMES} />
          </div>
          <div className="flex gap-3 mt-5 justify-end">
            <Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button>
            <Button onClick={add}><Check size={16} /> Save</Button>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {companies.map(c => (
          <Chip key={c} label={c === 'all' ? `All (${questions.length})` : c} color={THEME.accent} active={filterCompany === c} onClick={() => setFilterCompany(c)} />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="p-10 rounded-2xl text-center" style={{ background: THEME.surface, border: `1.5px dashed ${THEME.border}`, color: THEME.textMuted }}>
            <MessageSquare size={32} style={{ color: THEME.accent, margin: '0 auto 12px' }} />
            <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
              No questions logged yet. The first real interview comes sooner than you think.
            </div>
          </div>
        )}
        {filtered.map(q => {
          const outcome = OUTCOMES.find(o => o.value === q.outcome);
          return (
            <div
              key={q.id}
              className="p-5 rounded-2xl"
              style={{
                background: THEME.surface,
                border: `1.5px solid ${THEME.border}`,
                borderLeftWidth: '4px',
                borderLeftColor: outcome?.color,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display text-lg font-semibold" style={{ color: THEME.text }}>{q.company || 'Unknown'}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full font-medium" style={{ color: THEME.accent, background: THEME.accentLight }}>{q.round}</span>
                  {q.topic && <span className="text-xs font-mono" style={{ color: THEME.textMuted }}>#{q.topic}</span>}
                  <span className="text-xs font-mono font-medium" style={{ color: outcome?.color }}>{outcome?.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono" style={{ color: THEME.textMuted }}>{formatDate(q.date)}</span>
                  <button onClick={() => remove(q.id)} className="p-1.5 rounded-lg hover-lift" style={{ color: THEME.textMuted }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="text-sm leading-relaxed" style={{ color: THEME.text }}>{q.question}</div>
              {q.approach && (
                <div className="mt-3 pt-3 text-sm" style={{ borderTop: `1px solid ${THEME.border}`, color: THEME.textDim, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
                  → {q.approach}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Main ---

export default function JobSwitchTracker() {
  const [tab, setTab] = useState('dashboard');
  const [applications, saveApplications, appsLoaded] = useStoredArray('tracker:applications');
  const [dsa, saveDsa, dsaLoaded] = useStoredArray('tracker:dsa');
  const [questions, saveQuestions, questionsLoaded] = useStoredArray('tracker:interview-questions');

  const loaded = appsLoaded && dsaLoaded && questionsLoaded;

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'applications', label: 'Applications', icon: Briefcase },
    { key: 'dsa', label: 'DSA', icon: Code2 },
    { key: 'questions', label: 'Interviews', icon: MessageSquare },
  ];

  return (
    <div style={{ background: THEME.bg, color: THEME.text, minHeight: '100vh', fontFamily: '"IBM Plex Sans", system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-variation-settings: 'opsz' 144; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .hover-lift { transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease; }
        .hover-lift:hover { transform: translateY(-1px); }
        input, select, textarea { font-family: 'IBM Plex Sans', system-ui, sans-serif; }
        input[type="date"] { color-scheme: light; }
        input[type="checkbox"] { accent-color: ${THEME.accent}; }
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${THEME.bg}; }
        ::-webkit-scrollbar-thumb { background: ${THEME.borderHi}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${THEME.textMuted}; }
      `}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b"
        style={{
          background: `${THEME.bg}f0`,
          borderColor: THEME.border,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="font-display text-xl font-semibold leading-none" style={{ color: THEME.text }}>
              Devansh <span style={{ background: `linear-gradient(135deg, ${THEME.gradient1}, ${THEME.gradient2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>/ switching</span>
            </div>
            <div className="text-xs font-mono mt-1 font-medium" style={{ color: THEME.textMuted, letterSpacing: '0.1em' }}>
              12-WEEK PLAN · WEEK {Math.max(1, Math.min(12, Math.ceil((new Date() - new Date('2026-04-18')) / (7 * 86400000)) || 1))} · INDIA TIER 1
            </div>
          </div>
          <nav className="flex gap-1 p-1 rounded-xl" style={{ background: THEME.surfaceHi, border: `1.5px solid ${THEME.border}` }}>
            {tabs.map(t => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
                  style={{
                    background: active ? `linear-gradient(135deg, ${THEME.gradient1}, ${THEME.gradient2})` : 'transparent',
                    color: active ? '#fff' : THEME.textDim,
                    boxShadow: active ? '0 2px 8px rgba(108, 99, 255, 0.25)' : 'none',
                  }}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        {!loaded ? (
          <div className="flex items-center justify-center py-20" style={{ color: THEME.textMuted }}>
            <div className="font-mono text-sm">Loading your data...</div>
          </div>
        ) : (
          <>
            {tab === 'dashboard' && <Dashboard applications={applications} dsa={dsa} questions={questions} />}
            {tab === 'applications' && <ApplicationsTab applications={applications} saveApplications={saveApplications} />}
            {tab === 'dsa' && <DsaTab dsa={dsa} saveDsa={saveDsa} />}
            {tab === 'questions' && <QuestionsTab questions={questions} saveQuestions={saveQuestions} />}
          </>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-8 py-10 text-center text-xs font-mono" style={{ color: THEME.textMuted }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: '14px', marginBottom: '8px', color: THEME.textDim }}>
          "You don't get ready first and interview second. You get ready BY interviewing."
        </div>
        <div>Data saved locally · survives refresh · yours alone</div>
      </footer>
    </div>
  );
}
