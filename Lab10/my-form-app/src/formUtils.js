export const INITIAL_FIELDS = { name: "", email: "", password: "" };

export function validate(fields) {
  const errors = {};

  if (!fields.name.trim()) {
    errors.name = "Name is required";
  } else if (fields.name.trim().length < 2) {
    errors.name = "At least 2 characters";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Invalid email format";
  }

  if (!fields.password) {
    errors.password = "Password is required";
  } else if (fields.password.length < 8) {
    errors.password = "Minimum 8 characters";
  }

  return errors;
}

export function getPasswordStrength(password) {
  if (!password) return { level: 0, label: "" };

  let score = 0;
  if (password.length >= 8)          score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "Weak" };
  if (score === 2) return { level: 2, label: "Fair" };
  if (score === 3) return { level: 3, label: "Good" };
  return { level: 4, label: "Strong" };
}

export function getSegmentClass(index, strengthLevel) {
  if (strengthLevel === 0 || index >= strengthLevel) return "strength-segment";
  if (strengthLevel === 1) return "strength-segment active-weak";
  if (strengthLevel <= 2)  return "strength-segment active-medium";
  return "strength-segment active-strong";
}

export function getInputClass(fieldName, touched, errors) {
  if (!touched[fieldName]) return "input";
  return errors[fieldName] ? "input has-error" : "input is-valid";
}
