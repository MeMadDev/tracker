import React from 'react';
import { Flame, Briefcase, Code2, MessageSquare, TrendingUp, Target, Zap, Rocket, BookOpen, Building2, Heart } from 'lucide-react';
import THEME from '../../lib/theme';
import { todayISO, formatDate, last7Days, calculateStreak } from '../../lib/helpers';
import { STATUSES } from '../../lib/constants';
import { StatCard } from '../../components/ui';

export default function Dashboard({ applications, dsa, questions, systemDesign, companies, arogyacare }) {
  const streak = calculateStreak(dsa);
  const days = last7Days();
  const dsaThisWeek = dsa.filter(e => days.includes(e.date)).length;
  const appsThisWeek = applications.filter(a => days.includes(a.appliedDate)).length;
  const totalApps = applications.length;
  const referralCount = applications.filter(a => a.source === 'referral').length;
  const activeLoops = applications.filter(a => ['screening', 'technical', 'final'].includes(a.status)).length;
  const offers = applications.filter(a => a.status === 'offer').length;
  const totalProblems = dsa.length;
  const questionsLogged = questions.length;

  const sdCompleted = systemDesign.filter(c => c.completed).length;
  const sdTotal = systemDesign.length;
  const companiesApplied = companies.filter(c => c.applied).length;
  const companiesTotal = companies.length;
  const acDone = arogyacare.filter(t => t.status === 'done').length;
  const acTotal = arogyacare.length;

  const streakDots = days.map(d => ({
    date: d,
    done: dsa.some(e => e.date === d),
    isToday: d === todayISO(),
  }));

  const statusCounts = STATUSES.map(s => ({
    ...s,
    count: applications.filter(a => a.status === s.value).length
  })).filter(s => s.count > 0);

  const targets = [
    { label: 'DSA problems this week', current: dsaThisWeek, target: 15, icon: Code2 },
    { label: 'Applications this week', current: appsThisWeek, target: 10, icon: Briefcase },
    { label: 'Referral-sourced apps', current: referralCount, target: Math.max(totalApps * 0.5, 10), icon: Target, sub: `${totalApps > 0 ? Math.round(referralCount / totalApps * 100) : 0}% of total` },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Hero: Streak */}
      <section
        className="p-8 rounded-3xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${THEME.gradient1}, ${THEME.gradient2}, ${THEME.gradient3})`,
          boxShadow: '0 4px 24px rgba(108, 99, 255, 0.2)',
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest font-mono mb-2" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.2em' }}>
              Current Streak
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-7xl font-bold leading-none" style={{ color: '#fff' }}>
                {streak}
              </span>
              <span className="font-display text-2xl italic" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {streak === 1 ? 'day' : 'days'}
              </span>
              {streak >= 7 && <Flame size={32} style={{ color: '#FFD700' }} />}
            </div>
            <div className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
              {streak === 0 && 'Log a problem today. Momentum starts with one.'}
              {streak >= 1 && streak < 7 && 'Building momentum. Every day counts.'}
              {streak >= 7 && streak < 21 && 'On fire! This is how champions are built.'}
              {streak >= 21 && 'Unstoppable. You ARE the discipline.'}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest font-mono mb-3" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.2em' }}>
              Last 7 days
            </div>
            <div className="flex gap-2">
              {streakDots.map(d => (
                <div
                  key={d.date}
                  title={formatDate(d.date)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-semibold"
                  style={{
                    background: d.done ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.15)',
                    color: d.done ? THEME.accent : 'rgba(255,255,255,0.6)',
                    outline: d.isToday ? '2px solid rgba(255,255,255,0.6)' : 'none',
                    outlineOffset: '2px',
                  }}
                >
                  {d.done ? '✓' : new Date(d.date).getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Apps Sent" value={totalApps} sub={`${appsThisWeek} this week`} icon={Briefcase} accent={THEME.accent} />
        <StatCard label="Active Loops" value={activeLoops} sub={`${offers} offer${offers === 1 ? '' : 's'}`} icon={TrendingUp} accent={activeLoops > 0 ? THEME.success : null} />
        <StatCard label="Problems" value={totalProblems} sub={`${dsaThisWeek} this week`} icon={Code2} accent={THEME.warning} />
        <StatCard label="Questions Logged" value={questionsLogged} sub="from real interviews" icon={MessageSquare} accent={THEME.tier1} />
      </section>

      {/* Progress overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} style={{ color: THEME.accent }} />
            <span className="text-sm font-semibold" style={{ color: THEME.text }}>System Design</span>
          </div>
          <div className="font-display text-2xl font-bold" style={{ color: THEME.accent }}>{sdCompleted}/{sdTotal}</div>
          <div className="h-2 rounded-full mt-2 overflow-hidden" style={{ background: THEME.surfaceHi }}>
            <div className="h-full rounded-full" style={{ width: sdTotal ? `${(sdCompleted / sdTotal) * 100}%` : '0%', background: `linear-gradient(90deg, ${THEME.gradient1}, ${THEME.gradient2})` }} />
          </div>
        </div>
        <div className="p-5 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={16} style={{ color: THEME.tier15 }} />
            <span className="text-sm font-semibold" style={{ color: THEME.text }}>Companies Applied</span>
          </div>
          <div className="font-display text-2xl font-bold" style={{ color: THEME.tier15 }}>{companiesApplied}/{companiesTotal}</div>
          <div className="h-2 rounded-full mt-2 overflow-hidden" style={{ background: THEME.surfaceHi }}>
            <div className="h-full rounded-full" style={{ width: companiesTotal ? `${(companiesApplied / companiesTotal) * 100}%` : '0%', background: THEME.tier15 }} />
          </div>
        </div>
        <div className="p-5 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Heart size={16} style={{ color: THEME.success }} />
            <span className="text-sm font-semibold" style={{ color: THEME.text }}>ArogyaCare</span>
          </div>
          <div className="font-display text-2xl font-bold" style={{ color: THEME.success }}>{acDone}/{acTotal}</div>
          <div className="h-2 rounded-full mt-2 overflow-hidden" style={{ background: THEME.surfaceHi }}>
            <div className="h-full rounded-full" style={{ width: acTotal ? `${(acDone / acTotal) * 100}%` : '0%', background: THEME.success }} />
          </div>
        </div>
      </section>

      {/* Weekly targets */}
      <section>
        <h2 className="font-display text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: THEME.text }}>
          <Rocket size={20} style={{ color: THEME.accent }} />
          This week's targets
        </h2>
        <div className="grid gap-3">
          {targets.map(t => {
            const pct = Math.min(100, Math.round((t.current / t.target) * 100));
            const completed = pct >= 100;
            return (
              <div
                key={t.label}
                className="p-4 rounded-2xl"
                style={{
                  background: completed ? THEME.successLight : THEME.surface,
                  border: `1.5px solid ${completed ? `${THEME.success}40` : THEME.border}`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium" style={{ color: THEME.text }}>{t.label}</div>
                  <div className="font-mono text-sm font-semibold" style={{ color: completed ? THEME.success : THEME.textDim }}>
                    {t.current} / {Math.round(t.target)}
                    {t.sub && <span className="ml-2 font-normal" style={{ color: THEME.textMuted }}>({t.sub})</span>}
                  </div>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: THEME.surfaceHi }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background: completed
                        ? `linear-gradient(90deg, ${THEME.success}, #34D399)`
                        : `linear-gradient(90deg, ${THEME.gradient1}, ${THEME.gradient2})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pipeline breakdown */}
      {statusCounts.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: THEME.text }}>Pipeline</h2>
          <div className="flex gap-3 flex-wrap">
            {statusCounts.map(s => (
              <div
                key={s.value}
                className="px-5 py-4 rounded-2xl flex items-center gap-3"
                style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                <div>
                  <div className="text-xs uppercase tracking-wide font-mono" style={{ color: THEME.textMuted }}>{s.label}</div>
                  <div className="font-display text-xl font-semibold" style={{ color: THEME.text }}>{s.count}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Motivational reminder */}
      <section className="p-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${THEME.accentLight}, #FFF0F5)`, border: `1.5px solid ${THEME.accent}20` }}>
        <div className="flex gap-3 items-start">
          <Zap size={20} style={{ color: THEME.accent, flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ color: THEME.text, fontWeight: 700, fontSize: '15px' }}>Remember:</strong>{' '}
            <span style={{ color: THEME.textDim, fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>
              Referrals before cold applies. Spend 30 min on LinkedIn outreach before 60 min on DSA. That's the whole edge.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
