import { useState } from 'react';
import { Landmark, Menu, X, Home, FilePenLine, RotateCcw, ShieldCheck } from 'lucide-react';

export default function Header({ view, onHome, onApply, onReset, canReset }) {
  const [open, setOpen] = useState(false);
  const run = (fn) => () => { setOpen(false); fn(); };
  return (
    <header className="topbar">
      <div className="topbar-in">
        <button type="button" className="brand" onClick={run(onHome)} aria-label="Lendwise, go to home">
          <span className="logo"><Landmark size={20} aria-hidden="true" /></span>
          <span>Lendwise<small>Loan desk</small></span>
        </button>
        <span className="secure"><ShieldCheck size={16} aria-hidden="true" />Demo mode · nothing is sent anywhere</span>
        <button type="button" className="menu-btn" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="main-nav" className={`nav ${open ? 'open' : ''}`} aria-label="Main">
          <button type="button" className={view === 'home' ? 'active' : ''} onClick={run(onHome)}><Home size={16} />Home</button>
          <button type="button" className={view === 'form' ? 'active' : ''} onClick={run(onApply)}><FilePenLine size={16} />Application</button>
          <button type="button" onClick={run(onReset)} disabled={!canReset}><RotateCcw size={16} />Reset</button>
        </nav>
      </div>
    </header>
  );
}
