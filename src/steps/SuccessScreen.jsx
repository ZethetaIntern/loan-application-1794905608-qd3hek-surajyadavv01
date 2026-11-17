import { Copy, Plus } from 'lucide-react';
import { useState } from 'react';
import { buildSections, SummaryList } from './summary.jsx';

export default function SuccessScreen({ data, refId, submittedAt, onNew, headingRef }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(refId); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  };
  return (
    <main className="container narrow">
      <section className="card success">
        <svg className="tick" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l8 8 15-17" /></svg>
        <h1 tabIndex={-1} ref={headingRef}>Application submitted</h1>
        <p className="lead">Thanks, {data.fullName.split(' ')[0]}. This was a simulated submission, so nothing was sent to a bank.</p>
        <div className="ref">
          <span>Demo reference ID</span>
          <strong>{refId}</strong>
          <button type="button" className="btn ghost sm" onClick={copy}><Copy size={16} />{copied ? 'Copied' : 'Copy'}</button>
        </div>
        <p className="muted">Submitted on {new Date(submittedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
        <div className="sum-wrap"><SummaryList sections={buildSections(data)} /></div>
        <button type="button" className="btn primary" onClick={onNew}><Plus size={18} />Start new application</button>
      </section>
    </main>
  );
}
