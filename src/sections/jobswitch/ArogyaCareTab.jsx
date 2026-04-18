import React, { useState } from 'react';
import { Plus, X, Check, Trash2, Heart, Clock, CircleDot } from 'lucide-react';
import THEME from '../../lib/theme';
import { todayISO, formatDate, uid } from '../../lib/helpers';
import { Input, Textarea, Button } from '../../components/ui';

const TASK_STATUSES = [
  { value: 'todo', label: 'To Do', color: THEME.textMuted, bg: THEME.surfaceHi },
  { value: 'in-progress', label: 'In Progress', color: THEME.warning, bg: THEME.warningLight },
  { value: 'done', label: 'Done', color: THEME.success, bg: THEME.successLight },
];

export default function ArogyaCareTab({ arogyacare, saveArogyacare }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ task: '', notes: '' });

  const addTask = () => {
    if (!form.task.trim()) return;
    saveArogyacare([...arogyacare, { id: uid(), task: form.task, status: 'todo', notes: form.notes, dateAdded: todayISO(), dateCompleted: null }]);
    setForm({ task: '', notes: '' });
    setAdding(false);
  };

  const updateStatus = (id, status) => {
    saveArogyacare(arogyacare.map(t =>
      t.id === id ? { ...t, status, dateCompleted: status === 'done' ? todayISO() : null } : t
    ));
  };

  const updateNotes = (id, notes) => {
    saveArogyacare(arogyacare.map(t => t.id === id ? { ...t, notes } : t));
  };

  const remove = (id) => {
    if (confirm('Delete this task?')) saveArogyacare(arogyacare.filter(t => t.id !== id));
  };

  const doneCount = arogyacare.filter(t => t.status === 'done').length;
  const total = arogyacare.length;

  const grouped = {
    'todo': arogyacare.filter(t => t.status === 'todo'),
    'in-progress': arogyacare.filter(t => t.status === 'in-progress'),
    'done': arogyacare.filter(t => t.status === 'done'),
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold" style={{ color: THEME.text }}>ArogyaCare v2</h1>
          <div className="text-sm mt-1" style={{ color: THEME.textDim, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
            Ship by Week 6. This is your portfolio differentiator.
          </div>
        </div>
        <Button onClick={() => setAdding(!adding)}>
          {adding ? <X size={16} /> : <Plus size={16} />}
          {adding ? 'Cancel' : 'Add Task'}
        </Button>
      </div>

      {/* Progress */}
      <div className="p-5 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: THEME.text }}>Progress</span>
          <span className="font-mono text-sm font-semibold" style={{ color: doneCount === total && total > 0 ? THEME.success : THEME.textDim }}>
            {doneCount}/{total}
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: THEME.surfaceHi }}>
          <div className="h-full rounded-full transition-all" style={{ width: total ? `${(doneCount / total) * 100}%` : '0%', background: `linear-gradient(90deg, ${THEME.success}, #34D399)` }} />
        </div>
      </div>

      {adding && (
        <div className="p-6 rounded-2xl" style={{ background: THEME.surface, border: `2px solid ${THEME.accent}40`, boxShadow: `0 4px 16px ${THEME.accentGlow}` }}>
          <div className="flex flex-col gap-4">
            <Input label="Task" value={form.task} onChange={e => setForm({ ...form, task: e.target.value })} placeholder="What needs to be done?" autoFocus />
            <Textarea label="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Details, links, approach..." />
          </div>
          <div className="flex gap-3 mt-5 justify-end">
            <Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button>
            <Button onClick={addTask}><Check size={16} /> Add</Button>
          </div>
        </div>
      )}

      {/* Kanban-lite */}
      {TASK_STATUSES.map(status => {
        const tasks = grouped[status.value];
        if (!tasks.length && status.value !== 'todo') return null;
        return (
          <div key={status.value}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: status.color }} />
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: status.color }}>{status.label}</span>
              <span className="text-xs font-mono" style={{ color: THEME.textMuted }}>({tasks.length})</span>
            </div>
            <div className="flex flex-col gap-2">
              {tasks.length === 0 && (
                <div className="p-4 rounded-xl text-center text-xs" style={{ background: THEME.surfaceHi, color: THEME.textMuted, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
                  No tasks here yet.
                </div>
              )}
              {tasks.map(t => (
                <div key={t.id} className="p-4 rounded-xl" style={{ background: status.bg, border: `1.5px solid ${status.color}20`, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-semibold" style={{ color: THEME.text }}>{t.task}</div>
                      {t.dateCompleted && <div className="text-xs font-mono mt-1" style={{ color: THEME.success }}>Done {formatDate(t.dateCompleted)}</div>}
                      {t.notes && (
                        <div className="text-xs mt-2" style={{ color: THEME.textDim, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>{t.notes}</div>
                      )}
                      <textarea
                        value={t.notes}
                        onChange={e => updateNotes(t.id, e.target.value)}
                        placeholder="Add notes..."
                        className="w-full mt-2 px-2 py-1.5 rounded-lg text-xs resize-none outline-none"
                        style={{ background: 'rgba(255,255,255,0.5)', border: `1px solid ${THEME.border}`, color: THEME.text, minHeight: '40px', fontFamily: 'inherit' }}
                        rows={2}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <select
                        value={t.status}
                        onChange={e => updateStatus(t.id, e.target.value)}
                        className="px-2 py-1 rounded-lg text-xs font-mono font-medium"
                        style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, color: status.color }}
                      >
                        {TASK_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                      <button onClick={() => remove(t.id)} className="p-1.5 rounded-lg hover-lift self-end" style={{ color: THEME.textMuted }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
