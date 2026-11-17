import Field, { Segmented } from '../components/Field.jsx';
import { STATES } from '../utils/constants.js';

const digits = (n) => (v) => v.replace(/\D/g, '').slice(0, n);
const today = new Date().toISOString().slice(0, 10);

export default function PersonalStep({ data, errors, set }) {
  const p = { onChange: set };
  return (
    <div className="grid">
      <Field {...p} label="Full name" name="fullName" value={data.fullName} error={errors.fullName} autoComplete="name" placeholder="As per your ID" />
      <Field {...p} label="Date of birth" name="dob" type="date" max={today} value={data.dob} error={errors.dob} autoComplete="bday" hint="You must be 18 or older." />
      <Field {...p} label="Email address" name="email" type="email" value={data.email} error={errors.email} autoComplete="email" placeholder="name@example.com" />
      <Field {...p} label="Mobile number" name="mobile" type="tel" inputMode="numeric" prefix="+91" sanitize={digits(10)} value={data.mobile} error={errors.mobile} autoComplete="tel-national" placeholder="10-digit number" />
      <Segmented {...p} label="Gender" name="gender" options={['Male', 'Female', 'Other']} value={data.gender} error={errors.gender} className="span2" />
      <Field {...p} as="textarea" label="Residential address" name="address" value={data.address} error={errors.address} autoComplete="street-address" className="span2" placeholder="House no., street, area" />
      <Field {...p} label="City" name="city" value={data.city} error={errors.city} autoComplete="address-level2" />
      <Field {...p} as="select" label="State" name="state" options={STATES} value={data.state} error={errors.state} autoComplete="address-level1" />
      <Field {...p} label="PIN code" name="pin" inputMode="numeric" sanitize={digits(6)} value={data.pin} error={errors.pin} autoComplete="postal-code" placeholder="6 digits" />
    </div>
  );
}
