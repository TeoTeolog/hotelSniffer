import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/user";
import { TextField } from "../components/TextField";
import { useValidation } from "../hooks/useValidation";

export function AuthPage() {
  const dispatch = useDispatch();
  const { emailError, passwordError, validateAll } = useValidation();

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="auth-background">
      <div className="rounded-panel">
        <TextField
          className={"input-name"}
          name={"login"}
          error={emailError}
          errorClassName={"error-classname"}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        {emailError && <span className="error">{emailError}</span>}
        <TextField
          className={"input-name"}
          name={"password"}
          type={"password"}
          error={passwordError}
          errorClassName={"error-classname"}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        {passwordError && <span className="error">{passwordError}</span>}
        <button
          aria-label="Sign-in"
          onClick={() => {
            if (validateAll(form.login, form.password)) {
              dispatch(logIn(form.login));
            }
          }}
        >
          Sign-in
        </button>
      </div>
    </div>
  );
}
