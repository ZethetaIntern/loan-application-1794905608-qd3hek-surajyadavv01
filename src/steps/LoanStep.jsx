import Field from '../components/Field.jsx';
import EmiCard from '../components/EmiCard.jsx';
import { LOAN_TYPES, LOAN_LIMITS } from '../utils/constants.js';
import { inr, tenureLabel } from '../utils/format.js';

export default function LoanStep({ data, errors, set }) {
  const p = { onChange: set };
  const pickType = (t) => { set('loanType', t); set('rate', LOAN_TYPES[t].rate); };
  return (
    <div className="loan-layout">
      <div className="grid">
        <fieldset className="field span2 types" aria-describedby={errors.loanType ? 'loanType-err' : undefined}>
          <legend>Loan type<span className="req" aria-hidden="true"> *</span></legend>
          <div className="type-grid">
            {Object.entries(LOAN_TYPES).map(([t, m]) => (
              <label key={t} className={`type ${data.loanType === t ? 'on' : ''}`}>
                <input type="radio" name="loanType" value={t} checked={data.loanType === t} onChange={() => pickType(t)} />
                <b>{t}</b><small>{m.hint}</small>
              </label>
            ))}
          </div>
          {errors.loanType && <p id="loanType-err" className="err" role="alert">{errors.loanType}</p>}
        </fieldset>
        <Field {...p} label="Requested loan amount" name="amount" inputMode="numeric" prefix="₹" sanitize={(v) => v.replace(/\D/g, '').slice(0, 8)} value={data.amount} error={errors.amount} hint={`Between ${inr(LOAN_LIMITS.minAmount)} and ${inr(LOAN_LIMITS.maxAmount)}.`} />
        <Field {...p} label="Interest rate (% p.a., illustrative)" name="rate" type="number" step="0.1" min="1" max="36" value={data.rate} error={errors.rate} hint="Sample rate for estimation only. Not an offer." />
        <div className="field span2">
          <label htmlFor="f-tenure">Loan tenure: <b>{tenureLabel(Number(data.tenure))}</b> ({data.tenure} months)</label>
          <input id="f-tenure" name="tenure" type="range" min={LOAN_LIMITS.minTenure} max={LOAN_LIMITS.maxTenure} step="6" value={data.tenure} onChange={(e) => set('tenure', Number(e.target.value))} aria-valuetext={tenureLabel(Number(data.tenure))} />
          <div className="range-ends"><span>6 months</span><span>30 years</span></div>
          {errors.tenure && <p className="err" role="alert">{errors.tenure}</p>}
        </div>
        <Field {...p} as="textarea" label="Loan purpose" name="purpose" value={data.purpose} error={errors.purpose} className="span2" placeholder="What will you use this loan for?" />
      </div>
      <EmiCard amount={data.amount} rate={data.rate} tenure={data.tenure} />
    </div>
  );
}
