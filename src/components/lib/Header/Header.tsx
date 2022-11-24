import React from "react";

type Props = React.ComponentProps<"header">;

const Header = React.forwardRef(function Header(
	{ children, className = "" }: Props,
	ref?: React.ForwardedRef<HTMLDivElement>
) {
	return (
		<header
			className={`z-50 w-full h-fit max-h-20 px-7 pt-10 flex flex-row items-center justify-between ${className}`}
			ref={ref}
		>
			{children}
		</header>
	);
});

export default Header;
