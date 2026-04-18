import React, { useState } from 'react';
import { Dumbbell, Flame, Calendar, Plus, Trash2 } from 'lucide-react';
import THEME from '../../lib/theme';
import { todayISO, formatDate, last7Days, calculateStreak, uid } from '../../lib/helpers';
import { WORKOUT_TYPES } from '../../lib/constants';
import { StatCard, Input, Select, Textarea, Button } from '../../components/ui';

export default function GymTab({ gym, saveGym }) {
  const [form, setForm] = useState({
    date: todayISO(), type: 'Chest & Triceps', duration: 60, notes: ''
  });

  const add = () => {
    saveGym([{ id: uid(), ...form }, ...gym]);
    setForm({ ...form, notes: '', duration: 60 });
  };

  const remove = (id) => {
    if (confirm('Delete this workout?')) saveGym(gym.filter(e => e.id !== id));
  };

  const streak = calculateStreak(gym);
  const days = last7Days();
  const thisWeek = gym.filter(e => days.includes(e.date)).length;

  const streakDots = days.map(d => ({
    date: d,
    done: gym.some(e => e.date === d),
    isToday: d === todayISO(),
    type: gym.find(e => e.date === d)?.type || '',
  }));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl font-semibold" style={{ color: THEME.text }}>Gym Tracker</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Streak" value={`${streak}d`} icon={Flame} accent={streak > 0 ? '#F97316' : null} />
        <StatCard label="This Week" value={thisWeek} icon={Calendar} accent={THEME.tier15} />
        <StatCard label="Total Workouts" value={gym.length} icon={Dumbbell} accent={THEME.accent} />
      </div>

      {/* Last 7 days */}
      <div className="p-5 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="text-xs uppercase tracking-widest font-mono mb-3 font-medium" style={{ color: THEME.textMuted, letterSpacing: '0.15em' }}>Last 7 days</div>
        <div className="flex gap-2">
          {streakDots.map(d => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
              <div
                title={d.type || formatDate(d.date)}
                className="w-full aspect-square rounded-xl flex items-center justify-center text-xs font-mono font-semibold"
                style={{
                  background: d.done ? `linear-gradient(135deg, ${THEME.gradient1}, ${THEME.gradient2})` : THEME.surfaceHi,
                  color: d.done ? '#fff' : THEME.textMuted,
                  outline: d.isToday ? `2px solid ${THEME.accent}` : 'none',
                  outlineOffset: '2px',
                  maxWidth: '52px',
                }}
              >
                {d.done ? '✓' : new Date(d.date).getDate()}
              </div>
              {d.done && <div className="text-[10px] font-mono text-center truncate w-full" style={{ color: THEME.textDim }}>{d.type.split(' ')[0]}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Log workout */}
      <div className="p-6 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="text-xs uppercase tracking-widest font-mono mb-4 font-medium" style={{ color: THEME.textMuted, letterSpacing: '0.15em' }}>Log workout</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Select label="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} options={WORKOUT_TYPES} />
          <Input label="Duration (min)" type="number" value={form.duration} onChange={e => setForm({ ...form, duration: parseInt(e.target.value) || 0 })} />
          <Input label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          <div className="flex items-end">
            <Button onClick={add}><Plus size={16} /> Log</Button>
          </div>
        </div>
        <div className="mt-3">
          <Textarea label="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Exercises, sets, PRs..." />
        </div>
      </div>

      {/* History */}
      <div className="flex flex-col gap-2">
        {gym.length === 0 && (
          <div className="p-10 rounded-2xl text-center" style={{ background: THEME.surface, border: `1.5px dashed ${THEME.border}`, color: THEME.textMuted }}>
            <Dumbbell size={32} style={{ color: THEME.accent, margin: '0 auto 12px' }} />
            <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>No workouts logged yet. Hit the gym today!</div>
          </div>
        )}
        {gym.map(e => (
          <div key={e.id} className="p-4 rounded-xl flex items-center gap-3" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, borderLeftWidth: '4px', borderLeftColor: THEME.accent, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold" style={{ color: THEME.text }}>{e.type}</span>
                <span className="text-xs font-mono" style={{ color: THEME.textMuted }}>{e.duration}min</span>
              </div>
              <div className="text-xs font-mono mt-1" style={{ color: THEME.textMuted }}>{formatDate(e.date)}</div>
              {e.notes && <div className="text-xs mt-1" style={{ color: THEME.textDim, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>{e.notes}</div>}
            </div>
            <button onClick={() => remove(e.id)} className="p-2 rounded-lg hover-lift" style={{ color: THEME.textMuted }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
