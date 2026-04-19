import React, { useState, useMemo, useRef } from 'react';
import { Flame, Code2, Calendar, AlertCircle, Plus, Trash2, ExternalLink } from 'lucide-react';
import THEME from '../../lib/theme';
import { todayISO, formatDate, last7Days, calculateStreak, uid } from '../../lib/helpers';
import { PATTERNS, LEETCODE_PROBLEMS } from '../../lib/constants';
import { StatCard, Chip, Select, Button } from '../../components/ui';

export default function DsaTab({ dsa, saveDsa }) {
  const [form, setForm] = useState({
    date: todayISO(), problem: '', difficulty: 'Medium', pattern: 'Arrays',
    timeMinutes: 25, solved: true, needsRevisit: false, link: ''
  });
  const [filterPattern, setFilterPattern] = useState('all');
  const [showRevisitOnly, setShowRevisitOnly] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const handleProblemChange = (value) => {
    setForm({ ...form, problem: value });
    if (value.length >= 2) {
      const query = value.toLowerCase();
      const matches = LEETCODE_PROBLEMS.filter(p =>
        p.name.toLowerCase().includes(query)
      ).slice(0, 8);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (prob) => {
    setForm({
      ...form,
      problem: prob.name,
      difficulty: prob.difficulty,
      pattern: prob.pattern,
      link: prob.link,
    });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const add = () => {
    if (!form.problem.trim()) return;
    // If no link set and problem matches a known one, auto-attach
    let link = form.link;
    if (!link) {
      const match = LEETCODE_PROBLEMS.find(p => p.name.toLowerCase() === form.problem.toLowerCase());
      if (match) link = match.link;
    }
    saveDsa([{ id: uid(), ...form, link }, ...dsa]);
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
          {/* Problem input with autocomplete */}
          <div className="md:col-span-4 relative">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider font-mono font-medium" style={{ color: THEME.textMuted }}>Problem</label>
              <input
                ref={inputRef}
                value={form.problem}
                onChange={e => handleProblemChange(e.target.value)}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search or type problem name..."
                className="px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{ background: THEME.surfaceHi, border: `1.5px solid ${showSuggestions ? THEME.accent : THEME.border}`, color: THEME.text }}
              />
            </div>
            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div
                className="absolute z-20 left-0 right-0 mt-1 rounded-xl overflow-hidden"
                style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', maxHeight: '280px', overflowY: 'auto' }}
              >
                {suggestions.map((prob, i) => {
                  const diffColor = prob.difficulty === 'Easy' ? THEME.success : prob.difficulty === 'Medium' ? THEME.warning : THEME.danger;
                  return (
                    <button
                      key={i}
                      onMouseDown={() => selectSuggestion(prob)}
                      className="w-full px-3 py-2.5 text-left flex items-center gap-2 transition-all"
                      style={{ borderBottom: `1px solid ${THEME.border}` }}
                      onMouseEnter={e => e.target.style.background = THEME.surfaceHi}
                      onMouseLeave={e => e.target.style.background = 'transparent'}
                    >
                      <span className="text-sm font-medium flex-1" style={{ color: THEME.text }}>{prob.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full" style={{ color: diffColor, background: `${diffColor}12`, border: `1px solid ${diffColor}30` }}>{prob.difficulty}</span>
                      <span className="text-[10px] font-mono" style={{ color: THEME.textMuted }}>{prob.pattern}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {form.link && (
              <a href={form.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 mt-1 text-xs font-mono hover-lift" style={{ color: THEME.accent }}>
                <ExternalLink size={10} /> LeetCode
              </a>
            )}
          </div>
          <div className="md:col-span-2">
            <Select label="Difficulty" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} options={['Easy', 'Medium', 'Hard']} />
          </div>
          <div className="md:col-span-3">
            <Select label="Pattern" value={form.pattern} onChange={e => setForm({ ...form, pattern: e.target.value })} options={PATTERNS} />
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider font-mono font-medium" style={{ color: THEME.textMuted }}>Min</label>
              <input
                type="number"
                value={form.timeMinutes}
                onChange={e => setForm({ ...form, timeMinutes: parseInt(e.target.value) || 0 })}
                className="px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: THEME.surfaceHi, border: `1.5px solid ${THEME.border}`, color: THEME.text }}
              />
            </div>
          </div>
          <div className="md:col-span-1 flex items-end">
            <Button onClick={add}><Plus size={16} /></Button>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider font-mono font-medium" style={{ color: THEME.textMuted }}>Link (optional)</label>
            <input
              value={form.link}
              onChange={e => setForm({ ...form, link: e.target.value })}
              placeholder="https://leetcode.com/problems/..."
              className="px-3 py-2 rounded-xl text-sm outline-none transition-all"
              style={{ background: THEME.surfaceHi, border: `1.5px solid ${THEME.border}`, color: THEME.text }}
              onFocus={e => e.target.style.borderColor = THEME.accent}
              onBlur={e => e.target.style.borderColor = THEME.border}
            />
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
                  {e.link ? (
                    <a href={e.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover-lift flex items-center gap-1" style={{ color: THEME.accent }}>
                      {e.problem} <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span className="text-sm font-semibold" style={{ color: THEME.text }}>{e.problem}</span>
                  )}
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
