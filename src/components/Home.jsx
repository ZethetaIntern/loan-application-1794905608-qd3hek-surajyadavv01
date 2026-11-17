import { ArrowRight, FilePenLine, Clock, Calculator, Lock } from 'lucide-react';
import EmiCard from './EmiCard.jsx';

export default function Home({ hasDraft, submitted, onStart, onResume }) {
  return (
    <main className="container home">
      <section className="hero">
        <div>
          <h1 ref={(el) => el && el.focus()} tabIndex={-1}>A loan application that takes about five minutes.</h1>
          <p className="lead">Five short steps, a live EMI estimate, and a review screen before anything is submitted. Your progress is saved on this device as you go.</p>
          <div className="hero-cta">
            {hasDraft ? (
              <>
                <button className="btn primary" onClick={onResume}>{submitted ? 'View confirmation' : 'Resume application'}<ArrowRight size={18} /></button>
                <button className="btn ghost" onClick={onStart}>Start a new one</button>
              </>
            ) : (
              <button className="btn primary" onClick={onStart}>Start application<ArrowRight size={18} /></button>
            )}
          </div>
          {!hasDraft && <p className="empty-note">No saved application yet. Your draft will appear here once you begin.</p>}
          <ul className="points">
            <li><Clock size={18} />Auto-saves every change</li>
            <li><Calculator size={18} />Reducing-balance EMI</li>
            <li><Lock size={18} />Demo data only, no uploads leave your browser</li>
          </ul>
        </div>
        <div className="hero-card">
          <p className="sample-tag"><FilePenLine size={14} />Sample: ₹5,00,000 over 3 years</p>
          <EmiCard amount={500000} rate={11.5} tenure={36} compact />
        </div>
      </section>
    </main>
  );
}
