import * as React from "react";
import { FaSpinner } from "react-icons/fa";
type ButtonPrimaryVariant = "primary" | "secondary" | "danger" | "plain";
type ButtonVariant =
  | ButtonPrimaryVariant
  | ("primary-outline" | "danger-outline" | "secondary-outline");

type CustomButtonProps = {};

type ButtonProps = React.PropsWithChildren<
  CustomButtonProps &
    Omit<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      "ref"
    >
>;

export const Button = React.forwardRef(function Button(
  {
    variant = "primary",
    children,
    className = "",
    ...props
  }: ButtonProps & { variant?: ButtonVariant },
  ref: React.ForwardedRef<HTMLButtonElement> | undefined
) {
  const variantStyles = {
    primary: `text-white bg-indigo ring-indigoLighten80 hover:bg-indigoDarken10 `,
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
      ref={ref}
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
});

export const CloseButton = React.forwardRef(function CloseButton(
  { className, ...props }: Omit<ButtonProps, "children">,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <Button
      ref={ref}
      className="hover:ring-1 ring-offset-0 px-0 pt-0 pb-0 border-none"
      aria-label="close"
      variant="danger-outline"
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
});

export const OutlineButton = React.forwardRef(function OutlineButton(
  {
    children,
    variant = "primary",
    className = "",
    ...props
  }: ButtonProps & {
    variant?: "primary" | "secondary" | "danger";
  },
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <Button ref={ref} className={`${className}`} variant={`${variant}-outline`}>
      {children}
    </Button>
  );
});

export const CircleButton = React.forwardRef(
  (
    { children, className = "", ...props }: ButtonProps,
    ref?: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Button
        ref={ref}
        variant={"plain"}
        className={`rounded-full ${className}`}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export const ButtonWithSpinner = React.forwardRef(function ButtonWithSpinner(
  {
    children,
    className,
    loadingState,
    variant,
    ...props
  }: ButtonProps & {
    loadingState: boolean;
    variant?: ButtonVariant;
  },
  ref?: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <Button
      ref={ref}
      variant={variant}
      className={`${className} flex space-x-1 items-center justify-center`}
      {...props}
    >
      <div>{children}</div>
      {loadingState && (
        <div>
          <FaSpinner className={`animate-spin text-inheret`} />
        </div>
      )}
    </Button>
  );
});
