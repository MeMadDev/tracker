import React, { useState } from 'react';
import { Plus, X, Check, Trash2, Rocket } from 'lucide-react';
import THEME from '../../lib/theme';
import { todayISO, formatDate, daysAgo, uid } from '../../lib/helpers';
import { STATUSES, TIERS } from '../../lib/constants';
import { Input, Select, Textarea, Button, Chip } from '../../components/ui';

export default function ApplicationsTab({ applications, saveApplications }) {
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

      <div className="flex gap-2 flex-wrap">
        <Chip label={`All (${applications.length})`} color={THEME.textDim} active={filter === 'all'} onClick={() => setFilter('all')} />
        {STATUSES.map(s => {
          const count = applications.filter(a => a.status === s.value).length;
          if (!count) return null;
          return <Chip key={s.value} label={`${s.label} (${count})`} color={s.color} active={filter === s.value} onClick={() => setFilter(s.value)} />;
        })}
      </div>

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
            <div key={a.id} className="p-4 rounded-2xl flex items-center gap-4 flex-wrap" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, borderLeftWidth: '4px', borderLeftColor: status?.color, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
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
                <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)} className="px-2 py-1.5 rounded-lg text-xs font-mono font-medium" style={{ background: THEME.surfaceHi, border: `1.5px solid ${status?.color || THEME.border}30`, color: status?.color || THEME.text }}>
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
