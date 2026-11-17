const nf = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export const inr = (n) => nf.format(Math.round(Number(n) || 0));
export const maskAadhaar = (v) => (v ? `XXXX XXXX ${v.replace(/\s/g, '').slice(-4)}` : '—');
export const fileSize = (b) => (b < 1048576 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1048576).toFixed(2)} MB`);
export const tenureLabel = (m) => {
  const y = Math.floor(m / 12), r = m % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, r && `${r} mo`].filter(Boolean).join(' ') || '0 mo';
};
export const formatAadhaar = (v) => v.replace(/\D/g, '').slice(0, 12).replace(/(\d{4})(?=\d)/g, '$1 ');
export const makeRefId = () => {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `LW-${stamp}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
};
export const prettyDate = (iso) => (iso ? new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—');
