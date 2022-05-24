import React, { HTMLAttributes } from "react";

type ButtonVariants = "primary" | "secondary" | "danger";

interface CustomButtonProps {
  variant?: ButtonVariants;
}

type ButtonProps = React.PropsWithChildren<
  CustomButtonProps &
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
>;

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: `text-baseColor bg-indigo ring-indigoDarken10`,
    secondary: `text-gray80 ring-gray20 bg-gray`,
    danger: ``,
  };

  return (
    <button
      className={`px-5 py-2 rounded-sm hover:ring-2 ring-offset-1 ring-opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
