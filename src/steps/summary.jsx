import { FileText } from 'lucide-react';
import { inr, maskAadhaar, prettyDate, tenureLabel, fileSize } from '../utils/format.js';
import { calcEmi } from '../utils/emi.js';

export function buildSections(d) {
  const e = calcEmi(d.amount, d.rate, d.tenure);
  const biz = d.empType === 'Self Employed';
  const file = (f) => (f ? <span className="file-chip"><FileText size={14} />{f.name} · {fileSize(f.size)}</span> : '—');
  return [
    { step: 1, title: 'Personal information', rows: [
      ['Full name', d.fullName], ['Date of birth', prettyDate(d.dob)], ['Email', d.email], ['Mobile', `+91 ${d.mobile}`], ['Gender', d.gender],
      ['Address', `${d.address}, ${d.city}, ${d.state} ${d.pin}`]] },
    { step: 2, title: 'Employment details', rows: [
      ['Employment type', d.empType], [biz ? 'Business' : 'Company', d.orgName], [biz ? 'Role' : 'Designation', d.designation],
      ['Monthly income', inr(d.income)], ['Experience', `${d.experience} years`], [biz ? 'Business address' : 'Office address', d.empAddress]] },
    { step: 3, title: 'Loan details', rows: [
      ['Loan type', d.loanType], ['Amount', inr(d.amount)], ['Tenure', `${tenureLabel(Number(d.tenure))} (${d.tenure} months)`],
      ['Illustrative rate', `${d.rate}% p.a.`], ['Purpose', d.purpose],
      ['Estimated EMI', e ? inr(e.emi) : '—'], ['Total interest', e ? inr(e.interest) : '—'], ['Total repayment', e ? inr(e.total) : '—']] },
    { step: 4, title: 'Documents', rows: [
      ['PAN', d.pan], ['Aadhaar', maskAadhaar(d.aadhaar)], ['Identity proof', file(d.idProof)], ['Address proof', file(d.addressProof)], ['Income proof', file(d.incomeProof)]] },
  ];
}

export function SummaryList({ sections, onEdit }) {
  return sections.map((s) => (
    <section className="sum" key={s.title}>
      <header>
        <h3>{s.title}</h3>
        {onEdit && <button type="button" className="link" onClick={() => onEdit(s.step)} aria-label={`Edit ${s.title}`}>Edit</button>}
      </header>
      <dl>{s.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v || '—'}</dd></div>)}</dl>
    </section>
  ));
}
