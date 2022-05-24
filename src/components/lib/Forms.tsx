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
