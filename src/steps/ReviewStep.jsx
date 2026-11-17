import { AlertCircle } from 'lucide-react';
import { buildSections, SummaryList } from './summary.jsx';

export default function ReviewStep({ data, errors, set, onEdit }) {
  return (
    <>
      <SummaryList sections={buildSections(data)} onEdit={onEdit} />
      <div className={`terms ${errors.terms ? 'has-error' : ''}`}>
        <label>
          <input type="checkbox" name="terms" checked={data.terms} onChange={(e) => set('terms', e.target.checked)} aria-invalid={!!errors.terms} aria-describedby={errors.terms ? 'terms-err' : undefined} />
          <span>I confirm the details above are correct and I accept the <b>Terms &amp; Conditions</b>. I understand this is an educational demo, EMI figures are illustrative, and no real loan will be processed.</span>
        </label>
        {errors.terms && <p id="terms-err" className="err" role="alert"><AlertCircle size={14} />{errors.terms}</p>}
      </div>
    </>
  );
}
