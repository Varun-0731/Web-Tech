import { useState } from "react";
import "./styles.css";
import {
  INITIAL_FIELDS,
  validate,
  getPasswordStrength,
  getSegmentClass,
  getInputClass,
} from "./formUtils.js";

export default function UserForm() {
  const [fields, setFields]   = useState(INITIAL_FIELDS);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const strength = getPasswordStrength(fields.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFields(INITIAL_FIELDS);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="wrapper">
        <div className="card">
          <div className="card-accent" />
          <div className="success-banner">
            <div className="success-icon">
              <svg width="16" height="16" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <div className="success-title">Account Created</div>
              <div className="success-sub">
                Welcome, {fields.name.split(" ")[0]}. Your information has been submitted successfully.
              </div>
              <button className="reset-btn" onClick={handleReset}>
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="card">
        <div className="card-accent" />

        <div className="header">
          <div className="eyebrow">Registration</div>
          <div className="title">Create your account</div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <div className="label">
              <span className="label-text">Full Name</span>
              {touched.name && errors.name && (
                <span className="error-text">{errors.name}</span>
              )}
            </div>
            <div className="input-wrap">
              <input
                className={getInputClass("name", touched, errors)}
                type="text"
                name="name"
                placeholder="John Doe"
                value={fields.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
              />
            </div>
          </div>

          <div className="field">
            <div className="label">
              <span className="label-text">Email Address</span>
              {touched.email && errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>
            <div className="input-wrap">
              <input
                className={getInputClass("email", touched, errors)}
                type="email"
                name="email"
                placeholder="you@example.com"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="field">
            <div className="label">
              <span className="label-text">Password</span>
              {touched.password && errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>
            <div className="input-wrap">
              <input
                className={getInputClass("password", touched, errors)}
                type="password"
                name="password"
                placeholder="Min. 8 characters"
                value={fields.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
              />
            </div>
            <div className="strength-bar">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={getSegmentClass(i, strength.level)} />
              ))}
            </div>
            <div className="strength-label">{strength.label}</div>
          </div>

          <div className="divider" />

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
