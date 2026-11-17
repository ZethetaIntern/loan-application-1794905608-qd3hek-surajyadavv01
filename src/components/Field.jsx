import { AlertCircle } from 'lucide-react';

export default function Field({ label, name, value, onChange, error, hint, required = true, as = 'input', options = [], sanitize, className = '', prefix, ...rest }) {
  const id = `f-${name}`;
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  const handle = (e) => onChange(name, sanitize ? sanitize(e.target.value) : e.target.value);
  const common = { id, name, value: value ?? '', onChange: handle, 'aria-invalid': !!error, 'aria-describedby': describedBy, 'aria-required': required || undefined, ...rest };

  let control;
  if (as === 'select') {
    control = (
      <select {...common}>
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  } else if (as === 'textarea') {
    control = <textarea rows={3} {...common} />;
  } else {
    control = <input {...common} />;
  }

  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={id}>{label}{required && <span className="req" aria-hidden="true"> *</span>}</label>
      {prefix ? <div className="with-prefix"><span className="prefix" aria-hidden="true">{prefix}</span>{control}</div> : control}
      {error ? (
        <p id={`${id}-err`} className="err" role="alert"><AlertCircle size={14} aria-hidden="true" />{error}</p>
      ) : hint ? <p id={`${id}-hint`} className="hint">{hint}</p> : null}
    </div>
  );
}

export function Segmented({ label, name, value, onChange, options, error, className = '' }) {
  return (
    <fieldset className={`field segmented ${error ? 'has-error' : ''} ${className}`} aria-invalid={!!error} aria-describedby={error ? `${name}-err` : undefined}>
      <legend>{label}<span className="req" aria-hidden="true"> *</span></legend>
      <div className="seg-row">
        {options.map((o) => (
          <label key={o} className={`seg ${value === o ? 'on' : ''}`}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(name, o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {error && <p id={`${name}-err`} className="err" role="alert"><AlertCircle size={14} aria-hidden="true" />{error}</p>}
    </fieldset>
  );
}
