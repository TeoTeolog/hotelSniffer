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
    <div className="auth-background full-page">
      <div className="auth-panel rounded-panel">
        <span className="bold-text text-center">Simple Hotel Check</span>
        <TextField
          lable={"Логин"}
          name={"login"}
          error={emailError}
          errorClassName={"error-classname"}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <TextField
          lable={"Пароль"}
          name={"password"}
          type={"password"}
          error={passwordError}
          errorClassName={"error-classname"}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <button
          className="button"
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
