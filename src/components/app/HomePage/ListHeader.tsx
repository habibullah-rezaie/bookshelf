import React, { PropsWithChildren } from "react";

function ListHeading({
	children,
	className = "",
}: PropsWithChildren<{ className?: string }>) {
	return (
		<h2 className={`text-2xl font-poppins font-semibold ${className}`}>
			{children}
		</h2>
	);
}

export default ListHeading;
