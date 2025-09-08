// A robust RFC-5322-ish regex to validate email addresses
const EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

/**
 * Validates an email address against a standard regex.
 * @param email The email string to validate.
 * @returns `true` if the email is valid, `false` otherwise.
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  return EMAIL_REGEX.test(String(email).toLowerCase());
};