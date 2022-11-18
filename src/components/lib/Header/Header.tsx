import React from "react";

type Props = React.ComponentProps<"header">;

const Header = React.forwardRef(function Header(
	{ children, className = "" }: Props,
	ref?: React.ForwardedRef<HTMLDivElement>
) {
	return (
		<header
			className={`z-50 w-full h-10 max-h-10 px-7 mt-10 bg-white flex items-center justify-between ${className}`}
			ref={ref}
		>
			{children}
		</header>
	);
});

export default Header;
