import React from "react";

function Button({ children, type = "submit", ...props }) {
  return (
    <button className="button" type="submit" {...props}>
      {children}
    </button>
  );
}

export default Button;
