import { User, Briefcase, Banknote, FileText, ClipboardCheck } from 'lucide-react';

export const STEPS = [
  { key: 'personal', label: 'Personal', title: 'Personal information', desc: 'Tell us who you are. Use the details on your government ID.', icon: User },
  { key: 'employment', label: 'Employment', title: 'Employment details', desc: 'Your income helps us estimate what you can comfortably repay.', icon: Briefcase },
  { key: 'loan', label: 'Loan', title: 'Loan details', desc: 'Choose an amount and tenure. The EMI updates as you type.', icon: Banknote },
  { key: 'documents', label: 'Documents', title: 'Document information', desc: 'Demo identifiers and proofs. Do not use real ones.', icon: FileText },
  { key: 'review', label: 'Review', title: 'Review & confirmation', desc: 'Check everything once more before you submit.', icon: ClipboardCheck },
];

export const LOAN_TYPES = {
  Personal: { rate: 12, hint: 'Unsecured, for any personal need' },
  Home: { rate: 8.5, hint: 'Buy, build or renovate a home' },
  Education: { rate: 9.5, hint: 'Tuition and study-related costs' },
  Business: { rate: 14, hint: 'Working capital or expansion' },
};

export const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh','Chandigarh','Puducherry'];

export const LOAN_LIMITS = { minAmount: 50000, maxAmount: 10000000, minTenure: 6, maxTenure: 360 };

export const EMPTY_FORM = {
  fullName: '', dob: '', email: '', mobile: '', gender: '', address: '', city: '', state: '', pin: '',
  empType: 'Salaried', orgName: '', designation: '', income: '', experience: '', empAddress: '',
  loanType: 'Personal', amount: '', tenure: 60, rate: LOAN_TYPES.Personal.rate, purpose: '',
  pan: '', aadhaar: '', idProof: null, addressProof: null, incomeProof: null,
  terms: false,
};

export const DEMO_DATA = {
  fullName: 'Rohan Mehta', dob: '1996-04-12', email: 'rohan.demo@example.com', mobile: '9876543210', gender: 'Male',
  address: '12, Demo Residency, Sample Road', city: 'Lucknow', state: 'Uttar Pradesh', pin: '226001',
  empType: 'Salaried', orgName: 'Sample Tech Pvt Ltd', designation: 'Software Engineer', income: '85000', experience: '4',
  empAddress: '5th Floor, Demo Tower, Sector 62, Noida',
  loanType: 'Personal', amount: '500000', tenure: 36, rate: 12, purpose: 'Home renovation and consolidating small expenses.',
  pan: 'ABCDE1234F', aadhaar: '2345 6789 0123',
};
