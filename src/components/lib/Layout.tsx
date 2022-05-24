import React from "react";

type ContainerProps = React.PropsWithChildren<{ className?: string }>;
export function Container({ children, className }: ContainerProps) {
  return <div className={`w-full h-full ${className}`}>{children}</div>;
}
