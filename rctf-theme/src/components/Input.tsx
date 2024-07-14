import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errors?: Record<string, string>;
};

export default function Input({errors, className, ...props}: InputProps) {
  const name = props.name;
  const error = name ? errors?.[name] : undefined;
  return (
    <>
      <input
        className={`${className} ${error !== undefined ? "!border-2 !border-red-500" : ""}`}
        {...props}
      />
      {error && <span className="text-red-500">{error}</span>}
    </>
  )
}