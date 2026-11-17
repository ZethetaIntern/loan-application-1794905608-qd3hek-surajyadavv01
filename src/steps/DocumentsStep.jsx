import { ShieldAlert } from 'lucide-react';
import Field from '../components/Field.jsx';
import FileUpload from '../components/FileUpload.jsx';
import { formatAadhaar } from '../utils/format.js';

export default function DocumentsStep({ data, errors, set }) {
  const p = { onChange: set };
  return (
    <>
      <p className="notice"><ShieldAlert size={18} aria-hidden="true" />Demo only. Use sample values such as PAN <b>ABCDE1234F</b> and Aadhaar <b>2345 6789 0123</b>. Files stay in your browser and are never uploaded.</p>
      <div className="grid">
        <Field {...p} label="PAN number" name="pan" sanitize={(v) => v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)} value={data.pan} error={errors.pan} placeholder="ABCDE1234F" autoCapitalize="characters" />
        <Field {...p} label="Aadhaar number (demo)" name="aadhaar" inputMode="numeric" sanitize={formatAadhaar} value={data.aadhaar} error={errors.aadhaar} placeholder="XXXX XXXX XXXX" />
        <FileUpload label="Identity proof" name="idProof" value={data.idProof} onChange={set} error={errors.idProof} hint="Passport, voter ID or driving licence" />
        <FileUpload label="Address proof" name="addressProof" value={data.addressProof} onChange={set} error={errors.addressProof} hint="Utility bill or rental agreement" />
        <FileUpload label="Income proof" name="incomeProof" value={data.incomeProof} onChange={set} error={errors.incomeProof} hint="Salary slip or bank statement" />
      </div>
    </>
  );
}
