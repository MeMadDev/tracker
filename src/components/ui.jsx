import React from 'react';
import THEME from '../lib/theme';

export function StatCard({ label, value, sub, icon: Icon, accent }) {
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

export function Chip({ label, color, onClick, active }) {
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

export function Input({ label, ...props }) {
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

export function Select({ label, options, value, onChange }) {
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

export function Textarea({ label, ...props }) {
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

export function Button({ children, onClick, variant = 'primary', ...props }) {
  const styles = {
    primary: {
      background: THEME.accent,
      color: '#fff',
      border: 'none',
      boxShadow: '0 2px 8px rgba(91, 141, 239, 0.2)',
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
