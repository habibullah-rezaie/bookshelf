import * as React from "react";
type ButtonPrimaryVariant = "primary" | "secondary" | "danger" | "plain";
type ButtonVariant =
  | ButtonPrimaryVariant
  | ("primary-outline" | "danger-outline" | "secondary-outline");

type CustomButtonProps = {};

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
}: ButtonProps & { variant?: ButtonVariant }) {
  const variantStyles = {
    primary: `text-baseColor bg-indigo ring-indigoDarken10`,
    secondary: `text-white ring-gray-300 bg-gray-400`,
    danger: `text-darkGray ring-red-400 bg-red-500 hover:bg-red-600`,
    "danger-outline": `bg-white text-red-500 border-1 border-red-500 hover:bg-red-500 ring-red-300 hover:text-white`,
    "secondary-outline":
      "bg-transparent text-gray-400 border-1 border-gray-400 ring-gray-300 hover:bg-gray-400 hover:text-white",
    "primary-outline": ``,
    plain: "hover:ring-0",
  };

  return (
    <button
      className={`outline-none focus:outline-none rounded-sm transition-all duration-200 ${
        variant !== "plain" && `hover:ring-4 ring-opacity-50 px-5 py-2`
      } ${variantStyles[variant]} ${
        variant.includes("outline")
          ? "hover:font-semibold border bg-transparent"
          : ""
      } ${className}`}
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
      className="hover:ring-1 ring-offset-0 px-0 pt-0 pb-0 border-none"
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
