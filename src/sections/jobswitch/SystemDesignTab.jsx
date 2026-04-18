import React, { useState } from 'react';
import { BookOpen, Check, ChevronDown, ChevronUp, Play, ExternalLink } from 'lucide-react';
import THEME from '../../lib/theme';
import { todayISO, formatDate } from '../../lib/helpers';
import { Textarea } from '../../components/ui';

export default function SystemDesignTab({ systemDesign, saveSystemDesign }) {
  const [expandedId, setExpandedId] = useState(null);
  const completed = systemDesign.filter(c => c.completed).length;
  const total = systemDesign.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const toggleCompleted = (id) => {
    saveSystemDesign(systemDesign.map(c =>
      c.id === id ? { ...c, completed: !c.completed, dateCompleted: !c.completed ? todayISO() : null } : c
    ));
  };

  const updateNotes = (id, notes) => {
    saveSystemDesign(systemDesign.map(c => c.id === id ? { ...c, notes } : c));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-semibold" style={{ color: THEME.text }}>System Design</h1>
        <div className="text-sm mt-1" style={{ color: THEME.textDim, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
          Alex Xu — System Design Interview Vol. 1
        </div>
      </div>

      {/* Progress */}
      <div className="p-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${THEME.gradient1}, ${THEME.gradient2})`, boxShadow: '0 4px 16px rgba(91, 141, 239, 0.12)' }}>
        <div className="flex items-baseline gap-3 mb-3">
          <span className="font-display text-5xl font-bold" style={{ color: '#fff' }}>{completed}</span>
          <span className="font-display text-xl" style={{ color: 'rgba(255,255,255,0.7)' }}>/ {total} chapters</span>
          <span className="font-mono text-sm ml-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>{pct}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'rgba(255,255,255,0.9)' }} />
        </div>
      </div>

      {/* Chapters */}
      <div className="flex flex-col gap-2">
        {systemDesign.map(ch => {
          const expanded = expandedId === ch.id;
          return (
            <div
              key={ch.id}
              className="rounded-2xl overflow-hidden"
              style={{
                background: THEME.surface,
                border: `1.5px solid ${ch.completed ? `${THEME.success}40` : THEME.border}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div className="p-4 flex items-center gap-4 cursor-pointer" onClick={() => setExpandedId(expanded ? null : ch.id)}>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleCompleted(ch.id); }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: ch.completed ? THEME.success : 'transparent',
                    border: `2px solid ${ch.completed ? THEME.success : THEME.border}`,
                  }}
                >
                  {ch.completed && <Check size={14} style={{ color: '#fff' }} />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded" style={{ background: THEME.surfaceHi, color: THEME.textMuted }}>Ch {ch.chapter}</span>
                    <span className="text-sm font-semibold" style={{ color: ch.completed ? THEME.textMuted : THEME.text, textDecoration: ch.completed ? 'line-through' : 'none' }}>
                      {ch.title}
                    </span>
                  </div>
                  {ch.completed && ch.dateCompleted && (
                    <div className="text-xs font-mono mt-1" style={{ color: THEME.success }}>Completed {formatDate(ch.dateCompleted)}</div>
                  )}
                </div>
                {ch.videoUrl && (
                  <a
                    href={ch.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all hover-lift flex-shrink-0"
                    style={{ background: '#FEF2F2', color: '#EF4444', border: '1px solid #EF444420' }}
                    title="Watch video"
                  >
                    <Play size={12} /> Video
                  </a>
                )}
                {expanded ? <ChevronUp size={16} style={{ color: THEME.textMuted }} /> : <ChevronDown size={16} style={{ color: THEME.textMuted }} />}
              </div>
              {expanded && (
                <div className="px-4 pb-4 pt-0 flex flex-col gap-3">
                  <Textarea
                    label="Notes"
                    value={ch.notes}
                    onChange={e => updateNotes(ch.id, e.target.value)}
                    placeholder="Key takeaways, tricky parts, links..."
                  />
                  {ch.videoUrl && (
                    <a
                      href={ch.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-mono hover-lift"
                      style={{ color: THEME.accent }}
                    >
                      <ExternalLink size={12} /> Open video lesson
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
