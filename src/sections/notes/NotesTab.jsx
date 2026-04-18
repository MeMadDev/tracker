import React, { useState, useEffect, useRef } from 'react';
import { NotebookPen, Plus, Trash2, FileText } from 'lucide-react';
import THEME from '../../lib/theme';
import { uid } from '../../lib/helpers';
import { Input, Button } from '../../components/ui';

export default function NotesTab({ notebooks, saveNotebooks }) {
  const [selectedId, setSelectedId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const timerRef = useRef(null);

  const selected = notebooks.find(n => n.id === selectedId);

  useEffect(() => {
    if (notebooks.length > 0 && !selectedId) {
      setSelectedId(notebooks[0].id);
    }
  }, [notebooks, selectedId]);

  const addNotebook = () => {
    if (!newName.trim()) return;
    const nb = { id: uid(), name: newName.trim(), content: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    saveNotebooks([...notebooks, nb]);
    setSelectedId(nb.id);
    setNewName('');
    setAdding(false);
  };

  const updateContent = (content) => {
    const updated = notebooks.map(n => n.id === selectedId ? { ...n, content, updatedAt: new Date().toISOString() } : n);
    // Debounced save
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => saveNotebooks(updated), 500);
    // Immediate state update for responsiveness
    saveNotebooks(updated);
  };

  const removeNotebook = (id) => {
    if (!confirm('Delete this notebook?')) return;
    const updated = notebooks.filter(n => n.id !== id);
    saveNotebooks(updated);
    if (selectedId === id) {
      setSelectedId(updated.length > 0 ? updated[0].id : null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-display text-3xl font-semibold" style={{ color: THEME.text }}>Notebooks</h1>
        <Button onClick={() => setAdding(!adding)}>
          <Plus size={16} /> New Notebook
        </Button>
      </div>

      {adding && (
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Input label="Notebook Name" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Passwords, Env Docs, Ideas..." autoFocus onKeyDown={e => { if (e.key === 'Enter') addNotebook(); }} />
          </div>
          <Button onClick={addNotebook}>Create</Button>
          <Button variant="secondary" onClick={() => { setAdding(false); setNewName(''); }}>Cancel</Button>
        </div>
      )}

      <div className="flex gap-4" style={{ minHeight: '400px' }}>
        {/* Sidebar */}
        <div className="flex flex-col gap-1.5 w-48 flex-shrink-0">
          {notebooks.length === 0 && (
            <div className="p-4 rounded-xl text-center" style={{ background: THEME.surfaceHi, color: THEME.textMuted }}>
              <NotebookPen size={24} style={{ color: THEME.accent, margin: '0 auto 8px' }} />
              <div className="text-xs" style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>Create your first notebook</div>
            </div>
          )}
          {notebooks.map(nb => (
            <div
              key={nb.id}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
              style={{
                background: selectedId === nb.id ? THEME.accentLight : 'transparent',
                border: `1.5px solid ${selectedId === nb.id ? `${THEME.accent}30` : 'transparent'}`,
              }}
              onClick={() => setSelectedId(nb.id)}
            >
              <FileText size={14} style={{ color: selectedId === nb.id ? THEME.accent : THEME.textMuted, flexShrink: 0 }} />
              <span className="text-sm font-medium flex-1 truncate" style={{ color: selectedId === nb.id ? THEME.accent : THEME.text }}>
                {nb.name}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); removeNotebook(nb.id); }}
                className="p-1 rounded hover-lift opacity-0 group-hover:opacity-100"
                style={{ color: THEME.textMuted }}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 rounded-2xl overflow-hidden" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          {selected ? (
            <div className="flex flex-col h-full">
              <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${THEME.border}` }}>
                <span className="font-display text-lg font-semibold" style={{ color: THEME.text }}>{selected.name}</span>
                <span className="text-xs font-mono" style={{ color: THEME.textMuted }}>{selected.content.length} chars</span>
              </div>
              <textarea
                value={selected.content}
                onChange={e => updateContent(e.target.value)}
                className="flex-1 p-5 text-sm outline-none resize-none"
                style={{
                  background: 'transparent',
                  color: THEME.text,
                  fontFamily: '"JetBrains Mono", monospace',
                  lineHeight: 1.7,
                  minHeight: '350px',
                }}
                placeholder="Start typing..."
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-10" style={{ color: THEME.textMuted }}>
              <div className="text-center">
                <NotebookPen size={40} style={{ color: THEME.accent, margin: '0 auto 12px' }} />
                <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>Select or create a notebook to start writing</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
