import React from "react";

export function TextField(props) {
  const handleTextChange = (event) => {
    props.onChange(event);
  };

  return (
    <div>
      <label
        className={
          (!props.error && props.className) ||
          (!props.error && "default-input") ||
          props.errorClassName + "-lable" ||
          "default-error-input-lable"
        }
      >
        {props.label}
      </label>
      <input
        className={
          (!props.error && props.className) ||
          (!props.error && "default-input") ||
          props.errorClassName ||
          "default-error-input"
        }
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={handleTextChange}
      />
    </div>
  );
}
