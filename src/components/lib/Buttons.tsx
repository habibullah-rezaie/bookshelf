import * as React from "react";
type ButtonVariants = "primary" | "secondary" | "danger" | "danger-outline";

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
    danger: ``,
    secondary: `text-slate-800 ring-slate-600 bg-gray`,
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

export function CloseButton({
  className,
  ...props
}: Omit<ButtonProps, "children">) {
  return (
    <Button
      aria-label="close"
      variant="danger-outline"
      className="px-0 py-0 hover:ring-1 ring-offset-0"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 512 512"
      >
        <title>Close</title>
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M368 368L144 144M368 144L144 368"
        />
      </svg>
    </Button>
  );
}
