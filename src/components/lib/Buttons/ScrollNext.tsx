import React from "react";
import ScrollDirection, { ScrollDirectionType } from "../Icons/ScrollDirection";

interface Props {
	direction: ScrollDirectionType;
	iconClassName?: string;
}

type ScrollNextProps = Props &
	Omit<React.ComponentPropsWithRef<"button">, keyof Props>;
function ScrollNext({
	direction,
	className = "",
	iconClassName = "",
	...props
}: ScrollNextProps) {
	return (
		<button
			className={`h-15 w-15 rounded-[50%] bg-white ${className} flex items-center`}
			{...props}
		>
			<ScrollDirection
				direction={direction}
				className={`w-12 h-12 ${iconClassName}`}
			/>
		</button>
	);
}

export default ScrollNext;
