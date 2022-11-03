import React, { PropsWithChildren } from "react";

type ContainerProps = React.PropsWithChildren<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;
export function Container({ children, className }: ContainerProps) {
	return <div className={`w-full h-full ${className}`}>{children}</div>;
}

export const Stack = React.forwardRef(function Stack(
	{
		gap = 1,
		direction = "horizontal",
		children,
		className = "",
	}: PropsWithChildren<{
		gap?: number;
		direction?: "horizontal" | "vertical";
		className?: string;
	}>,
	ref: React.ForwardedRef<any>
) {
	return (
		<div
			ref={ref}
			className={`grid grid-flow-${
				direction === "horizontal" ? "col" : "row"
			} gap-${gap} ${className}`}
		>
			{children}
		</div>
	);
});
