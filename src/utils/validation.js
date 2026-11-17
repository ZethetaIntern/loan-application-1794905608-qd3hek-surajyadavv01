import { LOAN_LIMITS } from './constants.js';
import { fileSize, inr } from './format.js';

export const FILE_RULES = { maxBytes: 1024 * 1024, types: ['application/pdf', 'image/jpeg', 'image/png'], label: 'PDF, JPG or PNG, up to 1 MB' };

export function checkFile(f) {
  if (!FILE_RULES.types.includes(f.type)) return 'Unsupported format. Upload a PDF, JPG or PNG.';
  if (f.size === 0) return 'This file is empty. Choose another file.';
  if (f.size > FILE_RULES.maxBytes) return `File is too large (${fileSize(f.size)}). Maximum size is 1 MB.`;
  return null;
}

const blank = (v) => v == null || String(v).trim() === '';
const num = (v) => Number(String(v).replace(/,/g, ''));
const ageOf = (dob) => {
  const d = new Date(dob), t = new Date();
  let a = t.getFullYear() - d.getFullYear();
  if (t.getMonth() < d.getMonth() || (t.getMonth() === d.getMonth() && t.getDate() < d.getDate())) a--;
  return a;
};

const personal = (d) => {
  const e = {};
  if (blank(d.fullName)) e.fullName = 'Enter your full name.';
  else if (!/^[A-Za-z][A-Za-z .'-]{2,59}$/.test(d.fullName.trim())) e.fullName = 'Use letters only, between 3 and 60 characters.';
  if (blank(d.dob)) e.dob = 'Select your date of birth.';
  else if (Number.isNaN(new Date(d.dob).getTime())) e.dob = 'Enter a valid date.';
  else if (ageOf(d.dob) < 18) e.dob = 'You must be at least 18 years old to apply.';
  else if (ageOf(d.dob) > 65) e.dob = 'Applicants must be 65 or younger.';
  if (blank(d.email)) e.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = 'Enter a valid email, like name@example.com.';
  if (blank(d.mobile)) e.mobile = 'Enter your mobile number.';
  else if (!/^[6-9]\d{9}$/.test(d.mobile)) e.mobile = 'Enter a 10-digit mobile number starting with 6, 7, 8 or 9.';
  if (!d.gender) e.gender = 'Select a gender.';
  if (blank(d.address)) e.address = 'Enter your residential address.';
  else if (d.address.trim().length < 10) e.address = 'Address looks too short. Add house, street and area.';
  if (blank(d.city)) e.city = 'Enter your city.';
  else if (!/^[A-Za-z][A-Za-z .'-]+$/.test(d.city.trim())) e.city = 'City can contain letters only.';
  if (!d.state) e.state = 'Select your state.';
  if (blank(d.pin)) e.pin = 'Enter your PIN code.';
  else if (!/^[1-9]\d{5}$/.test(d.pin)) e.pin = 'PIN code must be 6 digits and cannot start with 0.';
  return e;
};

const employment = (d) => {
  const e = {};
  const biz = d.empType === 'Self Employed';
  if (!d.empType) e.empType = 'Select an employment type.';
  if (blank(d.orgName)) e.orgName = biz ? 'Enter your business name.' : 'Enter your company name.';
  else if (d.orgName.trim().length < 2) e.orgName = 'Name is too short.';
  if (blank(d.designation)) e.designation = biz ? 'Enter your role, for example Owner or Partner.' : 'Enter your job designation.';
  if (blank(d.income)) e.income = 'Enter your monthly income.';
  else if (!/^\d+(\.\d{1,2})?$/.test(String(d.income))) e.income = 'Income must be a number.';
  else if (num(d.income) < 5000) e.income = 'Monthly income must be at least ₹5,000.';
  else if (num(d.income) > 100000000) e.income = 'Enter a realistic monthly income.';
  if (blank(d.experience)) e.experience = 'Enter your experience in years.';
  else if (!/^\d+(\.\d)?$/.test(String(d.experience)) || num(d.experience) > 50) e.experience = 'Enter years between 0 and 50.';
  if (blank(d.empAddress)) e.empAddress = biz ? 'Enter your business address.' : 'Enter your office address.';
  else if (d.empAddress.trim().length < 10) e.empAddress = 'Address looks too short.';
  return e;
};

const loan = (d) => {
  const e = {};
  const { minAmount, maxAmount, minTenure, maxTenure } = LOAN_LIMITS;
  if (!d.loanType) e.loanType = 'Select a loan type.';
  if (blank(d.amount)) e.amount = 'Enter the loan amount you need.';
  else if (!/^\d+$/.test(String(d.amount))) e.amount = 'Amount must be a whole number.';
  else if (num(d.amount) < minAmount) e.amount = `Minimum loan amount is ${inr(minAmount)}.`;
  else if (num(d.amount) > maxAmount) e.amount = `Maximum loan amount is ${inr(maxAmount)}.`;
  const t = Number(d.tenure);
  if (!Number.isInteger(t) || t < minTenure || t > maxTenure) e.tenure = `Tenure must be between ${minTenure} and ${maxTenure} months.`;
  const r = Number(d.rate);
  if (blank(d.rate) || Number.isNaN(r) || r < 1 || r > 36) e.rate = 'Illustrative rate must be between 1% and 36%.';
  if (blank(d.purpose)) e.purpose = 'Tell us briefly what the loan is for.';
  else if (d.purpose.trim().length < 10) e.purpose = 'Add a little more detail (at least 10 characters).';
  return e;
};

const documents = (d) => {
  const e = {};
  if (blank(d.pan)) e.pan = 'Enter your PAN.';
  else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(d.pan)) e.pan = 'PAN format is 5 letters, 4 digits, 1 letter (ABCDE1234F).';
  const a = String(d.aadhaar || '').replace(/\s/g, '');
  if (!a) e.aadhaar = 'Enter your Aadhaar number.';
  else if (!/^[2-9]\d{11}$/.test(a)) e.aadhaar = 'Enter 12 digits, starting with 2–9. Use demo data only.';
  if (!d.idProof) e.idProof = 'Upload an identity proof.';
  if (!d.addressProof) e.addressProof = 'Upload an address proof.';
  if (!d.incomeProof) e.incomeProof = 'Upload an income proof.';
  return e;
};

const review = (d) => (d.terms ? {} : { terms: 'Accept the Terms & Conditions to submit.' });

const validators = { 1: personal, 2: employment, 3: loan, 4: documents, 5: review };
export const validateStep = (step, data) => validators[step](data);
