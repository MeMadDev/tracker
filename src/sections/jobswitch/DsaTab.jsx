import React, { useState, useMemo } from 'react';
import { Flame, Code2, Calendar, AlertCircle, Plus, Trash2 } from 'lucide-react';
import THEME from '../../lib/theme';
import { todayISO, formatDate, last7Days, calculateStreak, uid } from '../../lib/helpers';
import { PATTERNS } from '../../lib/constants';
import { StatCard, Chip, Input, Select, Button } from '../../components/ui';

export default function DsaTab({ dsa, saveDsa }) {
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
      <h1 className="font-display text-3xl font-semibold" style={{ color: THEME.text }}>DSA Tracker</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Streak" value={`${streak}d`} icon={Flame} accent={streak > 0 ? '#F97316' : null} />
        <StatCard label="Total" value={dsa.length} sub={`E ${byDifficulty.Easy} · M ${byDifficulty.Medium} · H ${byDifficulty.Hard}`} icon={Code2} accent={THEME.accent} />
        <StatCard label="This Week" value={dsa.filter(e => last7Days().includes(e.date)).length} icon={Calendar} accent={THEME.tier15} />
        <StatCard label="To Revisit" value={revisitCount} icon={AlertCircle} accent={revisitCount > 0 ? THEME.warning : null} />
      </div>

      <div className="p-6 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
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
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="px-2 py-1 rounded-lg ml-auto" style={{ background: THEME.surfaceHi, border: `1.5px solid ${THEME.border}`, color: THEME.text }} />
        </div>
      </div>

      {byPattern.length > 0 && (
        <div className="p-6 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="text-xs uppercase tracking-widest font-mono mb-4 font-medium" style={{ color: THEME.textMuted, letterSpacing: '0.15em' }}>By pattern</div>
          <div className="flex flex-col gap-2.5">
            {byPattern.slice(0, 8).map(([pattern, count]) => {
              const max = byPattern[0][1];
              return (
                <div key={pattern} className="flex items-center gap-3">
                  <div className="text-xs font-mono w-24 flex-shrink-0 font-medium" style={{ color: THEME.textDim }}>{pattern}</div>
                  <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{ background: THEME.surfaceHi }}>
                    <div className="h-full rounded-lg" style={{ width: `${(count / max) * 100}%`, background: THEME.accent }} />
                  </div>
                  <div className="text-xs font-mono w-6 text-right font-semibold" style={{ color: THEME.text }}>{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap items-center">
        <Chip label="All" color={THEME.textDim} active={filterPattern === 'all' && !showRevisitOnly} onClick={() => { setFilterPattern('all'); setShowRevisitOnly(false); }} />
        <Chip label={`Revisit (${revisitCount})`} color={THEME.warning} active={showRevisitOnly} onClick={() => { setShowRevisitOnly(!showRevisitOnly); }} />
        <select value={filterPattern} onChange={e => setFilterPattern(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs font-mono" style={{ background: THEME.surfaceHi, border: `1.5px solid ${THEME.border}`, color: THEME.text }}>
          <option value="all">All patterns</option>
          {PATTERNS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

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
            <div key={e.id} className="p-4 rounded-xl flex items-center gap-3" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, borderLeftWidth: '4px', borderLeftColor: e.needsRevisit ? THEME.warning : diffColor, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
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
              <button onClick={() => toggleRevisit(e.id)} className="p-2 rounded-lg hover-lift" style={{ color: e.needsRevisit ? THEME.warning : THEME.textMuted }} title="Toggle revisit flag">
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
