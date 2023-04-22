import React from "react";

import "../styles/textField.css";

export function TextField(props) {
  const {
    className,
    error,
    errorClassName,
    lableClassName,
    lableErrorClassName,
  } = props;

  const handleTextChange = (event) => {
    props.onChange(event);
  };

  console.log("lable:", props.lable);

  return (
    <div className="input-field-container">
      <label
        className={
          (!lableClassName && lableClassName) ||
          "input-field-label " +
            (!error && !lableErrorClassName && lableErrorClassName) ||
          (!error && "default-error-input-lable")
        }
      >
        {props.lable}
      </label>
      <input
        className={
          (!className && className) ||
          "input-field " + (!error && !errorClassName && errorClassName) ||
          (!error && "default-error-input")
        }
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={handleTextChange}
      />
      {error && <div className="input-field-error">{error}</div>}
    </div>
  );
}
