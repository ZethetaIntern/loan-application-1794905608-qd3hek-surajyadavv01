import { Check } from 'lucide-react';
import { STEPS } from '../utils/constants.js';

export default function Stepper({ step, maxStep, onGo }) {
  const pct = ((step - 1) / (STEPS.length - 1)) * 100;
  return (
    <nav className="stepper" aria-label="Application progress">
      <p className="step-mobile">Step {step} of {STEPS.length} · <b>{STEPS[step - 1].label}</b></p>
      <div className="track" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>
      <ol>
        {STEPS.map((s, i) => {
          const n = i + 1;
          const state = n < step ? 'done' : n === step ? 'current' : 'todo';
          return (
            <li key={s.key} className={state}>
              <button type="button" onClick={() => onGo(n)} disabled={n > maxStep || n === step} aria-current={n === step ? 'step' : undefined}>
                <span className="dot">{state === 'done' ? <Check size={16} aria-hidden="true" /> : n}</span>
                <span className="name">{s.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
