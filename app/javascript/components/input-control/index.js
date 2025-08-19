// External dependencies
import clsx from "clsx";
import React, { useId } from "react";

export default function InputControl({
  label,
  hideLabelFromVision = false,
  type = "text",
  name,
  value = "",
  onChange = () => null,
  ...props
}) {
  const instanceId = useId();
  const htmlId = `input-control-${instanceId}`;

  const labelClassName = clsx({ "sr-only": hideLabelFromVision });

  return (
    <div className="form-field">
      <label className={labelClassName} htmlFor={htmlId}>
        {label}
      </label>
      <input
        type={type}
        id={htmlId}
        name={name}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        {...props}
      />
    </div>
  );
}
