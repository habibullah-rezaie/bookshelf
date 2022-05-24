import React, { PropsWithChildren } from "react";

type ContainerProps = React.PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;
export function Container({ children, className }: ContainerProps) {
  return <div className={`w-full h-full ${className}`}>{children}</div>;
}
