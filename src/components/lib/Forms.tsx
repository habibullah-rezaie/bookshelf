import React, {
  DetailedHTMLProps,
  FormHTMLAttributes,
  PropsWithChildren,
} from "react";

type ReactFormProps = PropsWithChildren<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
>;

export function Form({ className = "", children, ...props }: ReactFormProps) {
  return (
    <form className={`grid grid-flow-row gap-3 ${className}`} {...props}>
      {children}
    </form>
  );
}

export function FormGroup({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`grid grid-flow-col gap-3 ${className}`}>{children}</div>
  );
}

type InputProps = PropsWithChildren<
  { ring?: boolean } & Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "ref"
  >
>;

export const Input = React.forwardRef(function Input(
  { className = "", ring = false, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      className={`bg-white p-1 outline-hidden outline-0 focus:outline-0 focus:outline-hidden rounded-sm ${
        ring ? `ring-1 ring-opacity-60 ring-baseGray focus:ring-2` : ""
      } ${className}`}
      {...props}
    />
  );
});
