import React, { useState, useMemo } from 'react';
import { Wallet, Plus, Trash2, TrendingUp, TrendingDown, CreditCard, ArrowUpDown } from 'lucide-react';
import THEME from '../../lib/theme';
import { todayISO, formatDate, last7Days, uid } from '../../lib/helpers';
import { FINANCE_ACCOUNTS } from '../../lib/constants';
import { StatCard, Input, Select, Button, Chip } from '../../components/ui';

export default function FinanceTab({ transactions, saveTransactions, balances, saveBalances }) {
  const [form, setForm] = useState({
    date: todayISO(), type: 'debit', amount: '', description: '', account: 'hdfc'
  });
  const [filterAccount, setFilterAccount] = useState('all');
  const [editingBalance, setEditingBalance] = useState(null);

  const addTransaction = () => {
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) return;
    saveTransactions([{ id: uid(), ...form, amount }, ...transactions]);
    setForm({ ...form, amount: '', description: '' });
  };

  const remove = (id) => {
    if (confirm('Delete this transaction?')) saveTransactions(transactions.filter(t => t.id !== id));
  };

  const accountBalances = useMemo(() => {
    const result = {};
    FINANCE_ACCOUNTS.forEach(acc => {
      const initial = balances[acc.key] || 0;
      const accTxns = transactions.filter(t => t.account === acc.key);
      const credits = accTxns.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
      const debits = accTxns.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);
      result[acc.key] = { initial, credits, debits, balance: initial + credits - debits };
    });
    return result;
  }, [transactions, balances]);

  const totalBalance = Object.values(accountBalances).reduce((s, a) => s + a.balance, 0);

  const days = last7Days();
  const dailySpending = days.map(d => ({
    date: d,
    amount: transactions.filter(t => t.date === d && t.type === 'debit').reduce((s, t) => s + t.amount, 0),
  }));
  const maxDaily = Math.max(...dailySpending.map(d => d.amount), 1);

  const filtered = filterAccount === 'all' ? transactions : transactions.filter(t => t.account === filterAccount);

  const setInitialBalance = (key, value) => {
    saveBalances({ ...balances, [key]: parseFloat(value) || 0 });
    setEditingBalance(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl font-semibold" style={{ color: THEME.text }}>Finance Tracker</h1>

      {/* Account cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FINANCE_ACCOUNTS.map(acc => {
          const data = accountBalances[acc.key];
          const isCredit = acc.key === 'pixel';
          return (
            <div key={acc.key} className="p-5 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 mb-3">
                {isCredit ? <CreditCard size={16} style={{ color: THEME.tier1 }} /> : <Wallet size={16} style={{ color: THEME.accent }} />}
                <span className="text-sm font-semibold" style={{ color: THEME.text }}>{acc.name}</span>
              </div>
              <div className="font-display text-3xl font-bold" style={{ color: data.balance >= 0 ? THEME.success : THEME.danger }}>
                {isCredit ? (data.balance < 0 ? '-' : '') : ''}₹{Math.abs(data.balance).toLocaleString('en-IN')}
              </div>
              <div className="flex gap-3 mt-2 text-xs font-mono" style={{ color: THEME.textMuted }}>
                <span style={{ color: THEME.success }}>+₹{data.credits.toLocaleString('en-IN')}</span>
                <span style={{ color: THEME.danger }}>-₹{data.debits.toLocaleString('en-IN')}</span>
              </div>
              {editingBalance === acc.key ? (
                <div className="mt-2 flex gap-2">
                  <input
                    type="number"
                    defaultValue={data.initial}
                    onKeyDown={e => { if (e.key === 'Enter') setInitialBalance(acc.key, e.target.value); }}
                    onBlur={e => setInitialBalance(acc.key, e.target.value)}
                    className="px-2 py-1 rounded-lg text-xs font-mono flex-1"
                    style={{ background: THEME.surfaceHi, border: `1px solid ${THEME.accent}`, color: THEME.text }}
                    autoFocus
                    placeholder="Initial balance"
                  />
                </div>
              ) : (
                <button onClick={() => setEditingBalance(acc.key)} className="text-xs font-mono mt-2 underline" style={{ color: THEME.textMuted }}>
                  Set opening balance
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="p-5 rounded-2xl" style={{ background: `linear-gradient(135deg, ${THEME.accentLight}, #FFF0F5)`, border: `1.5px solid ${THEME.accent}20` }}>
        <div className="text-xs uppercase tracking-widest font-mono mb-1" style={{ color: THEME.textMuted }}>Total Balance</div>
        <div className="font-display text-4xl font-bold" style={{ color: totalBalance >= 0 ? THEME.accent : THEME.danger }}>
          ₹{Math.abs(totalBalance).toLocaleString('en-IN')}
        </div>
      </div>

      {/* Daily spending */}
      <div className="p-5 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="text-xs uppercase tracking-widest font-mono mb-4 font-medium" style={{ color: THEME.textMuted, letterSpacing: '0.15em' }}>Daily spending (last 7 days)</div>
        <div className="flex gap-2 items-end" style={{ height: '80px' }}>
          {dailySpending.map(d => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <div className="text-[10px] font-mono font-semibold" style={{ color: d.amount > 0 ? THEME.danger : THEME.textMuted }}>
                {d.amount > 0 ? `₹${d.amount.toLocaleString('en-IN')}` : '—'}
              </div>
              <div
                className="w-full rounded-t-lg transition-all"
                style={{
                  height: d.amount > 0 ? `${Math.max(8, (d.amount / maxDaily) * 60)}px` : '4px',
                  background: d.amount > 0 ? `linear-gradient(180deg, ${THEME.gradient2}, ${THEME.gradient1})` : THEME.surfaceHi,
                }}
              />
              <div className="text-[10px] font-mono" style={{ color: THEME.textMuted }}>{new Date(d.date).getDate()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add transaction */}
      <div className="p-6 rounded-2xl" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="text-xs uppercase tracking-widest font-mono mb-4 font-medium" style={{ color: THEME.textMuted, letterSpacing: '0.15em' }}>Add transaction</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Select label="Account" value={form.account} onChange={e => setForm({ ...form, account: e.target.value })} options={FINANCE_ACCOUNTS.map(a => ({ value: a.key, label: a.name }))} />
          <Select label="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} options={[{ value: 'debit', label: 'Debit (spent)' }, { value: 'credit', label: 'Credit (received)' }]} />
          <Input label="Amount (₹)" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="500" />
          <Input label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Groceries" />
          <div className="flex items-end">
            <Button onClick={addTransaction}><Plus size={16} /> Add</Button>
          </div>
        </div>
        <div className="mt-3">
          <Input label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ maxWidth: '200px' }} />
        </div>
      </div>

      {/* Filter + transactions */}
      <div className="flex gap-2 flex-wrap">
        <Chip label={`All (${transactions.length})`} color={THEME.textDim} active={filterAccount === 'all'} onClick={() => setFilterAccount('all')} />
        {FINANCE_ACCOUNTS.map(a => {
          const count = transactions.filter(t => t.account === a.key).length;
          return <Chip key={a.key} label={`${a.name} (${count})`} color={THEME.accent} active={filterAccount === a.key} onClick={() => setFilterAccount(a.key)} />;
        })}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="p-10 rounded-2xl text-center" style={{ background: THEME.surface, border: `1.5px dashed ${THEME.border}`, color: THEME.textMuted }}>
            <Wallet size={32} style={{ color: THEME.accent, margin: '0 auto 12px' }} />
            <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>No transactions yet. Start tracking your spending!</div>
          </div>
        )}
        {filtered.map(t => {
          const acc = FINANCE_ACCOUNTS.find(a => a.key === t.account);
          const isDebit = t.type === 'debit';
          return (
            <div key={t.id} className="p-4 rounded-xl flex items-center gap-3" style={{ background: THEME.surface, border: `1.5px solid ${THEME.border}`, borderLeftWidth: '4px', borderLeftColor: isDebit ? THEME.danger : THEME.success, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: isDebit ? THEME.dangerLight : THEME.successLight }}>
                {isDebit ? <TrendingDown size={14} style={{ color: THEME.danger }} /> : <TrendingUp size={14} style={{ color: THEME.success }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold" style={{ color: THEME.text }}>{t.description || 'No description'}</div>
                <div className="text-xs font-mono mt-0.5" style={{ color: THEME.textMuted }}>{acc?.name} · {formatDate(t.date)}</div>
              </div>
              <div className="font-mono text-sm font-bold" style={{ color: isDebit ? THEME.danger : THEME.success }}>
                {isDebit ? '-' : '+'}₹{t.amount.toLocaleString('en-IN')}
              </div>
              <button onClick={() => remove(t.id)} className="p-2 rounded-lg hover-lift" style={{ color: THEME.textMuted }}>
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
