import { Info } from 'lucide-react';
import { calcEmi } from '../utils/emi.js';
import { inr } from '../utils/format.js';

export default function EmiCard({ amount, rate, tenure, compact = false }) {
  const r = calcEmi(amount, rate, tenure);
  const principalPct = r ? Math.round((Number(amount) / r.total) * 100) : 0;
  return (
    <aside className={`emi ${compact ? 'compact' : ''}`} aria-live="polite" aria-label="Illustrative EMI estimate">
      <p className="emi-label">Estimated monthly EMI</p>
      {r ? (
        <>
          <p className="emi-value">{inr(r.emi)}<span>/month</span></p>
          <div className="split" role="img" aria-label={`Principal ${principalPct}%, interest ${100 - principalPct}%`}>
            <i style={{ width: `${principalPct}%` }} />
          </div>
          <dl className="emi-rows">
            <div><dt><b className="dot p" />Principal</dt><dd>{inr(amount)}</dd></div>
            <div><dt><b className="dot i" />Total interest</dt><dd>{inr(r.interest)}</dd></div>
            <div className="total"><dt>Total repayment</dt><dd>{inr(r.total)}</dd></div>
          </dl>
        </>
      ) : (
        <p className="empty">Enter a loan amount and tenure to see your EMI, total interest and total repayment.</p>
      )}
      <p className="disclaimer"><Info size={14} aria-hidden="true" />Illustrative estimate at {Number(rate) || 0}% p.a. on a reducing balance. This is not a bank offer.</p>
    </aside>
  );
}
