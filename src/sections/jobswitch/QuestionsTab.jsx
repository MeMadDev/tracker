import React, { useState, useMemo } from 'react';
import { Plus, X, Check, Trash2, MessageSquare } from 'lucide-react';
import THEME from '../../lib/theme';
import { todayISO, formatDate, uid } from '../../lib/helpers';
import { ROUNDS, OUTCOMES } from '../../lib/constants';
import { Input, Select, Textarea, Button, Chip } from '../../components/ui';

export default function QuestionsTab({ questions, saveQuestions }) {
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
            <div key={q.id} className="p-5 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, borderLeftWidth: '4px', borderLeftColor: outcome?.color, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
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
