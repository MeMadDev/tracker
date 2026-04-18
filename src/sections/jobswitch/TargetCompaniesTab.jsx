import React, { useState } from 'react';
import { Plus, X, Check, Trash2, Building2, ExternalLink } from 'lucide-react';
import THEME from '../../lib/theme';
import { todayISO, uid } from '../../lib/helpers';
import { TIERS } from '../../lib/constants';
import { Input, Select, Textarea, Button, Chip } from '../../components/ui';

const REFERRAL_STATUSES = [
  { value: 'none', label: 'No referral', color: THEME.textMuted },
  { value: 'seeking', label: 'Seeking', color: THEME.warning },
  { value: 'obtained', label: 'Obtained', color: THEME.success },
];

export default function TargetCompaniesTab({ companies, saveCompanies }) {
  const [adding, setAdding] = useState(false);
  const [filterTier, setFilterTier] = useState('all');
  const [form, setForm] = useState({
    company: '', role: '', tier: 'tier15', notes: '', careerUrl: ''
  });

  const addCompany = () => {
    if (!form.company.trim()) return;
    saveCompanies([...companies, { id: uid(), ...form, applied: false, referralStatus: 'none', referrerName: '', dateAdded: todayISO() }]);
    setForm({ company: '', role: '', tier: 'tier15', notes: '', careerUrl: '' });
    setAdding(false);
  };

  const toggleApplied = (id) => {
    saveCompanies(companies.map(c => c.id === id ? { ...c, applied: !c.applied } : c));
  };

  const updateReferral = (id, referralStatus) => {
    saveCompanies(companies.map(c => c.id === id ? { ...c, referralStatus } : c));
  };

  const updateReferrer = (id, referrerName) => {
    saveCompanies(companies.map(c => c.id === id ? { ...c, referrerName } : c));
  };

  const updateNotes = (id, notes) => {
    saveCompanies(companies.map(c => c.id === id ? { ...c, notes } : c));
  };

  const remove = (id) => {
    if (confirm('Remove this company?')) saveCompanies(companies.filter(c => c.id !== id));
  };

  const filtered = filterTier === 'all' ? companies : companies.filter(c => c.tier === filterTier);
  const appliedCount = companies.filter(c => c.applied).length;
  const referralCount = companies.filter(c => c.referralStatus === 'obtained').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold" style={{ color: THEME.text }}>Target Companies</h1>
          <div className="text-sm mt-1 font-mono" style={{ color: THEME.textDim }}>
            {appliedCount}/{companies.length} applied · {referralCount} referrals obtained
          </div>
        </div>
        <Button onClick={() => setAdding(!adding)}>
          {adding ? <X size={16} /> : <Plus size={16} />}
          {adding ? 'Cancel' : 'Add Company'}
        </Button>
      </div>

      {adding && (
        <div className="p-6 rounded-2xl" style={{ background: THEME.surface, border: `2px solid ${THEME.accent}40`, boxShadow: `0 4px 16px ${THEME.accentGlow}` }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name" autoFocus />
            <Input label="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="SWE II" />
            <Select label="Tier" value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value })} options={TIERS} />
            <Input label="Careers URL" value={form.careerUrl} onChange={e => setForm({ ...form, careerUrl: e.target.value })} placeholder="https://careers.company.com" />
            <div className="md:col-span-2">
              <Textarea label="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any notes..." />
            </div>
          </div>
          <div className="flex gap-3 mt-5 justify-end">
            <Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button>
            <Button onClick={addCompany}><Check size={16} /> Add</Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Chip label={`All (${companies.length})`} color={THEME.textDim} active={filterTier === 'all'} onClick={() => setFilterTier('all')} />
        {TIERS.map(t => {
          const count = companies.filter(c => c.tier === t.value).length;
          if (!count) return null;
          return <Chip key={t.value} label={`${t.label} (${count})`} color={t.color} active={filterTier === t.value} onClick={() => setFilterTier(t.value)} />;
        })}
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="p-10 rounded-2xl text-center" style={{ background: THEME.surface, border: `1.5px dashed ${THEME.border}`, color: THEME.textMuted }}>
            <Building2 size={32} style={{ color: THEME.accent, margin: '0 auto 12px' }} />
            <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>No companies in this filter.</div>
          </div>
        )}
        {filtered.map(c => {
          const tier = TIERS.find(t => t.value === c.tier);
          const refStatus = REFERRAL_STATUSES.find(r => r.value === c.referralStatus);
          return (
            <div key={c.id} className="p-4 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, borderLeftWidth: '4px', borderLeftColor: tier?.color, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={() => toggleApplied(c.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: c.applied ? THEME.success : 'transparent', border: `2px solid ${c.applied ? THEME.success : THEME.border}` }}
                  title={c.applied ? 'Applied' : 'Not applied yet'}
                >
                  {c.applied && <Check size={14} style={{ color: '#fff' }} />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display text-lg font-semibold" style={{ color: THEME.text }}>{c.company}</span>
                    {c.careerUrl && (
                      <a href={c.careerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-medium hover-lift" style={{ color: THEME.accent, background: THEME.accentLight, border: `1px solid ${THEME.accent}20` }} title="Careers page">
                        <ExternalLink size={10} /> Careers
                      </a>
                    )}
                    {tier && <span className="text-xs font-mono px-2 py-0.5 rounded-full font-medium" style={{ color: tier.color, background: `${tier.color}12`, border: `1px solid ${tier.color}30` }}>{tier.label}</span>}
                  </div>
                  {c.role && <div className="text-sm" style={{ color: THEME.textDim }}>{c.role}</div>}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={c.referralStatus}
                    onChange={e => updateReferral(c.id, e.target.value)}
                    className="px-2 py-1.5 rounded-lg text-xs font-mono font-medium"
                    style={{ background: THEME.surfaceHi, border: `1.5px solid ${refStatus?.color || THEME.border}30`, color: refStatus?.color }}
                  >
                    {REFERRAL_STATUSES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                  <button onClick={() => remove(c.id)} className="p-2 rounded-lg hover-lift" style={{ color: THEME.textMuted }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {c.referralStatus !== 'none' && (
                <div className="mt-2 ml-11">
                  <input
                    value={c.referrerName}
                    onChange={e => updateReferrer(c.id, e.target.value)}
                    placeholder="Referrer name..."
                    className="px-2 py-1 rounded-lg text-xs font-mono"
                    style={{ background: THEME.surfaceHi, border: `1px solid ${THEME.border}`, color: THEME.text, width: '200px' }}
                  />
                </div>
              )}
              {c.notes && <div className="text-xs mt-2 ml-11" style={{ color: THEME.textMuted, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>{c.notes}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
