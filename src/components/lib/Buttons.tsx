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
  className,
}: ButtonProps) {
  const variantStyles = {
    primary: `text-baseColor hover:ring-indigo bg-indigo`,
    secondary: `text-gray80 hover:ring-gray bg-gray`,
    danger: ``,
  };

  return (
    <button
      className={`px-5 py-2 rounded-sm hover:ring-3 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
