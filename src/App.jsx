import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles, TriangleAlert } from 'lucide-react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Stepper from './components/Stepper.jsx';
import PersonalStep from './steps/PersonalStep.jsx';
import EmploymentStep from './steps/EmploymentStep.jsx';
import LoanStep from './steps/LoanStep.jsx';
import DocumentsStep from './steps/DocumentsStep.jsx';
import ReviewStep from './steps/ReviewStep.jsx';
import SuccessScreen from './steps/SuccessScreen.jsx';
import { DEMO_DATA, EMPTY_FORM, STEPS } from './utils/constants.js';
import { validateStep } from './utils/validation.js';
import { loadDraft, saveDraft, clearDraft } from './utils/storage.js';
import { makeRefId } from './utils/format.js';

const LAST = STEPS.length; // 5 = review; 6 = success screen

export default function App() {
  const init = useRef(loadDraft()).current;
  const [view, setView] = useState('home');
  const [step, setStep] = useState(init?.step ?? 1);
  const [maxStep, setMaxStep] = useState(init?.maxStep ?? 1);
  const [data, setData] = useState({ ...EMPTY_FORM, ...(init?.data || {}) });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [refId, setRefId] = useState(init?.refId || null);
  const [submittedAt, setSubmittedAt] = useState(init?.submittedAt || null);
  const headingRef = useRef(null);

  const isDirty = step > 1 || maxStep > 1 || JSON.stringify(data) !== JSON.stringify(EMPTY_FORM);

  useEffect(() => { saveDraft({ step, maxStep, data, refId, submittedAt }); }, [step, maxStep, data, refId, submittedAt]);
  useEffect(() => { window.scrollTo({ top: 0 }); if (view === 'form') headingRef.current?.focus(); }, [step, view]);

  const set = (name, value) => {
    setData((d) => ({ ...d, [name]: value }));
    setErrors((e) => { if (!e[name]) return e; const { [name]: _drop, ...rest } = e; return rest; });
  };

  // Validate a field when the user leaves it (blur bubbles up from inputs).
  const onBlur = (e) => {
    const name = e.target.name;
    if (!name || step > 5 || e.target.type === 'file' || e.target.type === 'radio') return;
    const msg = validateStep(step, data)[name];
    setErrors((prev) => (msg ? { ...prev, [name]: msg } : (() => { const { [name]: _d, ...r } = prev; return r; })()));
  };

  const focusFirstError = () => requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());

  const goTo = (n) => { if (n <= maxStep) { setErrors({}); setStep(n); } };

  const next = () => {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length) { setErrors(errs); focusFirstError(); return; }
    setErrors({});
    setStep(step + 1);
    setMaxStep((m) => Math.max(m, step + 1));
  };

  const backToReview = () => {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length) { setErrors(errs); focusFirstError(); return; }
    setErrors({}); setStep(LAST);
  };

  const submit = () => {
    for (let s = 1; s <= LAST; s++) {
      const errs = validateStep(s, data);
      if (Object.keys(errs).length) { setStep(s); setErrors(errs); focusFirstError(); return; }
    }
    setSubmitting(true);
    setTimeout(() => {
      setRefId(makeRefId());
      setSubmittedAt(new Date().toISOString());
      setSubmitting(false);
      setStep(LAST + 1);
      setMaxStep(LAST + 1);
    }, 1800);
  };

  const wipe = () => {
    clearDraft();
    setData({ ...EMPTY_FORM }); setStep(1); setMaxStep(1); setErrors({}); setRefId(null); setSubmittedAt(null);
  };
  const reset = () => { if (window.confirm('Clear all entered data and start over?')) { wipe(); setView('home'); } };
  const startNew = () => { wipe(); setView('form'); };
  const loadDemo = () => { setData((d) => ({ ...d, ...DEMO_DATA })); setErrors({}); };

  const header = <Header view={view} onHome={() => setView('home')} onApply={() => setView('form')} onReset={reset} canReset={isDirty} />;

  if (view === 'home') {
    return (<>{header}<Home hasDraft={isDirty} submitted={!!refId} onStart={startNew} onResume={() => setView('form')} /></>);
  }

  if (step > LAST) {
    return (<>{header}<SuccessScreen data={data} refId={refId} submittedAt={submittedAt} onNew={startNew} headingRef={headingRef} /></>);
  }

  const meta = STEPS[step - 1];
  const Icon = meta.icon;
  const body = {
    1: <PersonalStep data={data} errors={errors} set={set} />,
    2: <EmploymentStep data={data} errors={errors} set={set} />,
    3: <LoanStep data={data} errors={errors} set={set} />,
    4: <DocumentsStep data={data} errors={errors} set={set} />,
    5: <ReviewStep data={data} errors={errors} set={set} onEdit={goTo} />,
  }[step];
  const errCount = Object.keys(errors).length;

  return (
    <>
      {header}
      <main className="container narrow">
        <Stepper step={step} maxStep={maxStep} onGo={goTo} />
        <section className="card">
          <header className="card-head">
            <span className="head-ico"><Icon size={22} aria-hidden="true" /></span>
            <div>
              <h1 tabIndex={-1} ref={headingRef}>{meta.title}</h1>
              <p>{meta.desc}</p>
            </div>
          </header>
          <div className="demo-bar">
            <span><TriangleAlert size={16} aria-hidden="true" />Educational demo. Please do not enter real personal or financial data.</span>
            <button type="button" className="link" onClick={loadDemo}><Sparkles size={14} aria-hidden="true" />Fill sample data</button>
          </div>
          {errCount > 0 && <p className="summary-err" role="alert">Please fix {errCount} {errCount === 1 ? 'field' : 'fields'} below to continue.</p>}
          <form noValidate onSubmit={(e) => { e.preventDefault(); step === LAST ? submit() : next(); }} onBlur={onBlur}>
            {body}
            <footer className="actions">
              <button type="button" className="btn ghost" onClick={() => goTo(step - 1)} disabled={step === 1 || submitting}><ArrowLeft size={18} />Previous</button>
              <span className="saved"><Check size={14} aria-hidden="true" />Draft saved</span>
              {step < LAST && maxStep >= LAST && <button type="button" className="btn soft" onClick={backToReview}>Save &amp; return to review</button>}
              {step < LAST
                ? <button type="submit" className="btn primary">Next<ArrowRight size={18} /></button>
                : <button type="submit" className="btn primary" disabled={submitting}>{submitting ? <><Loader2 size={18} className="spin" />Submitting…</> : 'Submit application'}</button>}
            </footer>
          </form>
        </section>
      </main>
    </>
  );
}
