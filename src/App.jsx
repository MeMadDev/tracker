import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Briefcase, Code2, MessageSquare, BookOpen, Building2, Rocket, Dumbbell, Wallet, NotebookPen, Zap, Heart } from 'lucide-react';
import THEME from './lib/theme';
import { useStoredArray, useStoredObject } from './lib/hooks';
import { DEFAULT_SYSTEM_DESIGN_CHAPTERS, DEFAULT_TARGET_COMPANIES, DEFAULT_AROGYACARE_TASKS } from './lib/constants';

import Dashboard from './sections/jobswitch/Dashboard';
import ApplicationsTab from './sections/jobswitch/ApplicationsTab';
import DsaTab from './sections/jobswitch/DsaTab';
import QuestionsTab from './sections/jobswitch/QuestionsTab';
import SystemDesignTab from './sections/jobswitch/SystemDesignTab';
import TargetCompaniesTab from './sections/jobswitch/TargetCompaniesTab';
import ArogyaCareTab from './sections/jobswitch/ArogyaCareTab';
import GymTab from './sections/personal/GymTab';
import FinanceTab from './sections/personal/FinanceTab';
import NotesTab from './sections/notes/NotesTab';

const SECTIONS = [
  { key: 'jobswitch', label: 'Job Switch', icon: Zap },
  { key: 'personal', label: 'Personal Growth', icon: Heart },
  { key: 'notes', label: 'Notes', icon: NotebookPen },
];

const SECTION_TABS = {
  jobswitch: [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'applications', label: 'Apps', icon: Briefcase },
    { key: 'dsa', label: 'DSA', icon: Code2 },
    { key: 'questions', label: 'Interviews', icon: MessageSquare },
    { key: 'systemdesign', label: 'Sys Design', icon: BookOpen },
    { key: 'companies', label: 'Companies', icon: Building2 },
    { key: 'arogyacare', label: 'ArogyaCare', icon: Rocket },
  ],
  personal: [
    { key: 'gym', label: 'Gym', icon: Dumbbell },
    { key: 'finance', label: 'Finance', icon: Wallet },
  ],
  notes: [
    { key: 'notes', label: 'Notebooks', icon: NotebookPen },
  ],
};

const SECTION_DEFAULTS = { jobswitch: 'dashboard', personal: 'gym', notes: 'notes' };

export default function App() {
  const [section, setSection] = useState('jobswitch');
  const [tab, setTab] = useState('dashboard');

  // Job switch data
  const [applications, saveApplications, appsLoaded] = useStoredArray('tracker:applications');
  const [dsa, saveDsa, dsaLoaded] = useStoredArray('tracker:dsa');
  const [questions, saveQuestions, qLoaded] = useStoredArray('tracker:interview-questions');
  const [systemDesign, saveSystemDesign, sdLoaded] = useStoredArray('tracker:system-design');
  const [companies, saveCompanies, compLoaded] = useStoredArray('tracker:target-companies');
  const [arogyacare, saveArogyacare, acLoaded] = useStoredArray('tracker:arogyacare');

  // Personal data
  const [gym, saveGym, gymLoaded] = useStoredArray('tracker:gym');
  const [transactions, saveTransactions, txLoaded] = useStoredArray('tracker:finance-transactions');
  const [balances, saveBalances, balLoaded] = useStoredObject('tracker:finance-balances', {});

  // Notes data
  const [notebooks, saveNotebooks, nbLoaded] = useStoredArray('tracker:notebooks');

  // Pre-seed defaults + merge new fields into existing data
  useEffect(() => {
    if (!sdLoaded) return;
    if (systemDesign.length === 0) {
      saveSystemDesign(DEFAULT_SYSTEM_DESIGN_CHAPTERS);
    } else {
      // Merge new fields (videoUrl) into existing entries
      const defaults = Object.fromEntries(DEFAULT_SYSTEM_DESIGN_CHAPTERS.map(c => [c.id, c]));
      const needsUpdate = systemDesign.some(c => defaults[c.id] && !c.videoUrl && defaults[c.id].videoUrl);
      if (needsUpdate) {
        saveSystemDesign(systemDesign.map(c => defaults[c.id] ? { ...defaults[c.id], ...c, videoUrl: defaults[c.id].videoUrl } : c));
      }
    }
  }, [sdLoaded]);
  useEffect(() => {
    if (!compLoaded) return;
    if (companies.length === 0) {
      saveCompanies(DEFAULT_TARGET_COMPANIES);
    } else {
      // Merge new fields (careerUrl) into existing entries
      const defaults = Object.fromEntries(DEFAULT_TARGET_COMPANIES.map(c => [c.id, c]));
      const needsUpdate = companies.some(c => defaults[c.id] && !c.careerUrl && defaults[c.id].careerUrl);
      if (needsUpdate) {
        saveCompanies(companies.map(c => defaults[c.id] ? { ...c, careerUrl: defaults[c.id].careerUrl } : c));
      }
    }
  }, [compLoaded]);
  useEffect(() => {
    if (acLoaded && arogyacare.length === 0) saveArogyacare(DEFAULT_AROGYACARE_TASKS);
  }, [acLoaded]);

  // Section change resets tab
  useEffect(() => {
    setTab(SECTION_DEFAULTS[section]);
  }, [section]);

  const loaded = appsLoaded && dsaLoaded && qLoaded && sdLoaded && compLoaded && acLoaded && gymLoaded && txLoaded && balLoaded && nbLoaded;
  const currentTabs = SECTION_TABS[section] || [];

  return (
    <div style={{ background: THEME.bg, color: THEME.text, minHeight: '100vh', fontFamily: '"IBM Plex Sans", system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-variation-settings: 'opsz' 144; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .hover-lift { transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease; }
        .hover-lift:hover { transform: translateY(-1px); }
        input, select, textarea { font-family: 'IBM Plex Sans', system-ui, sans-serif; }
        input[type="date"] { color-scheme: light; }
        input[type="checkbox"] { accent-color: ${THEME.accent}; }
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${THEME.bg}; }
        ::-webkit-scrollbar-thumb { background: ${THEME.borderHi}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${THEME.textMuted}; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-10 border-b" style={{ background: `${THEME.bg}f0`, borderColor: THEME.border, backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Top row: branding + section nav */}
          <div className="py-3 flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="font-display text-xl font-semibold leading-none" style={{ color: THEME.text }}>
                Devansh <span style={{ color: THEME.accent, fontStyle: 'italic' }}>/ tracker</span>
              </div>
              <div className="text-xs font-mono mt-1 font-medium" style={{ color: THEME.textMuted, letterSpacing: '0.1em' }}>
                12-WEEK PLAN · WEEK {Math.max(1, Math.min(12, Math.ceil((new Date() - new Date('2026-04-18')) / (7 * 86400000)) || 1))} · DISCIPLINE MODE
              </div>
            </div>

            {/* Section nav */}
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: THEME.surfaceHi, border: `1.5px solid ${THEME.border}` }}>
              {SECTIONS.map(s => {
                const Icon = s.icon;
                const active = section === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => setSection(s.key)}
                    className="px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                    style={{
                      background: active ? THEME.accent : 'transparent',
                      color: active ? '#fff' : THEME.textDim,
                      boxShadow: active ? '0 2px 6px rgba(91, 141, 239, 0.15)' : 'none',
                    }}
                  >
                    <Icon size={13} />
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab nav */}
          {currentTabs.length > 1 && (
            <div className="pb-2 flex gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {currentTabs.map(t => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap flex-shrink-0"
                    style={{
                      background: active ? THEME.accentLight : 'transparent',
                      color: active ? THEME.accent : THEME.textMuted,
                      border: active ? `1px solid ${THEME.accent}25` : '1px solid transparent',
                    }}
                  >
                    <Icon size={12} />
                    {t.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        {!loaded ? (
          <div className="flex items-center justify-center py-20" style={{ color: THEME.textMuted }}>
            <div className="font-mono text-sm">Loading your data...</div>
          </div>
        ) : (
          <>
            {/* Job Switch */}
            {section === 'jobswitch' && tab === 'dashboard' && <Dashboard applications={applications} dsa={dsa} questions={questions} systemDesign={systemDesign} companies={companies} arogyacare={arogyacare} />}
            {section === 'jobswitch' && tab === 'applications' && <ApplicationsTab applications={applications} saveApplications={saveApplications} />}
            {section === 'jobswitch' && tab === 'dsa' && <DsaTab dsa={dsa} saveDsa={saveDsa} />}
            {section === 'jobswitch' && tab === 'questions' && <QuestionsTab questions={questions} saveQuestions={saveQuestions} />}
            {section === 'jobswitch' && tab === 'systemdesign' && <SystemDesignTab systemDesign={systemDesign} saveSystemDesign={saveSystemDesign} />}
            {section === 'jobswitch' && tab === 'companies' && <TargetCompaniesTab companies={companies} saveCompanies={saveCompanies} />}
            {section === 'jobswitch' && tab === 'arogyacare' && <ArogyaCareTab arogyacare={arogyacare} saveArogyacare={saveArogyacare} />}

            {/* Personal Growth */}
            {section === 'personal' && tab === 'gym' && <GymTab gym={gym} saveGym={saveGym} />}
            {section === 'personal' && tab === 'finance' && <FinanceTab transactions={transactions} saveTransactions={saveTransactions} balances={balances} saveBalances={saveBalances} />}

            {/* Notes */}
            {section === 'notes' && tab === 'notes' && <NotesTab notebooks={notebooks} saveNotebooks={saveNotebooks} />}
          </>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-8 py-10 text-center text-xs font-mono" style={{ color: THEME.textMuted }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: '14px', marginBottom: '8px', color: THEME.textDim }}>
          "Discipline is choosing between what you want now and what you want most."
        </div>
        <div>Data saved locally · survives refresh · yours alone</div>
      </footer>
    </div>
  );
}
