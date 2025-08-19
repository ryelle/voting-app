// External dependencies
import React from "react";

export default function RadioInputControl({
  label,
  name,
  value = "",
  onChange = () => null,
  ...props
}) {
  return (
    <div className="row">
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          {...props}
        />
        <span>{label}</span>
      </label>
    </div>
  );
}
