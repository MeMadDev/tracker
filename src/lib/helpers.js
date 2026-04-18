export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

export function daysAgo(iso) {
  if (!iso) return '—';
  const diff = Math.floor((new Date(todayISO()) - new Date(iso)) / 86400000);
  if (diff === 0) return 'today';
  if (diff === 1) return 'yesterday';
  if (diff < 7) return `${diff}d ago`;
  return `${Math.floor(diff / 7)}w ago`;
}

export function last7Days() {
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export function calculateStreak(entries) {
  if (!entries || !entries.length) return 0;
  const dates = new Set(entries.map(e => e.date));
  let streak = 0;
  const current = new Date();
  current.setHours(0, 0, 0, 0);
  let cursor = current.toISOString().slice(0, 10);
  if (!dates.has(cursor)) {
    current.setDate(current.getDate() - 1);
    cursor = current.toISOString().slice(0, 10);
  }
  while (dates.has(cursor)) {
    streak++;
    current.setDate(current.getDate() - 1);
    cursor = current.toISOString().slice(0, 10);
  }
  return streak;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
