import Field, { Segmented } from '../components/Field.jsx';

const money = (v) => v.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1').slice(0, 12);

export default function EmploymentStep({ data, errors, set }) {
  const p = { onChange: set };
  const biz = data.empType === 'Self Employed';
  return (
    <div className="grid">
      <Segmented {...p} label="Employment type" name="empType" options={['Salaried', 'Self Employed']} value={data.empType} error={errors.empType} className="span2" />
      <Field {...p} label={biz ? 'Business name' : 'Company name'} name="orgName" value={data.orgName} error={errors.orgName} autoComplete="organization" />
      <Field {...p} label={biz ? 'Your role in the business' : 'Job designation'} name="designation" value={data.designation} error={errors.designation} placeholder={biz ? 'Owner, Partner, Director' : 'Software Engineer'} />
      <Field {...p} label={biz ? 'Average monthly income' : 'Monthly income (take-home)'} name="income" inputMode="decimal" prefix="₹" sanitize={money} value={data.income} error={errors.income} hint={biz ? 'Average of the last 12 months.' : 'After tax and deductions.'} />
      <Field {...p} label={biz ? 'Years in business' : 'Total work experience (years)'} name="experience" inputMode="decimal" sanitize={(v) => v.replace(/[^\d.]/g, '').slice(0, 4)} value={data.experience} error={errors.experience} />
      <Field {...p} as="textarea" label={biz ? 'Business address' : 'Office address'} name="empAddress" value={data.empAddress} error={errors.empAddress} className="span2" />
    </div>
  );
}
