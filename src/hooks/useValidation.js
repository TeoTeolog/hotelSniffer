import { useState } from "react";

export const useValidation = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email is required.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid.");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required.");
      return false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      setPasswordError(
        "The password can only contain characters of the Latin alphabet and numbers."
      );
      return false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const validateAll = (email, password) => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    return isEmailValid && isPasswordValid;
  };

  return {
    emailError,
    passwordError,
    validateEmail,
    validatePassword,
    validateAll,
  };
};
