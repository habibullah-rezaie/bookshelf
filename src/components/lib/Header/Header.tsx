import React from "react";

type Props = React.ComponentProps<"header"> & { sticky?: boolean };

const Header = React.forwardRef(function Header(
	{ children, className = "", sticky = false }: Props,
	ref?: React.ForwardedRef<HTMLDivElement>
) {
	return (
		<header
			className={`z-50 w-full h-fit max-h-20 px-7 pt-10 flex flex-row items-center justify-between ${
				sticky === true ? `fixed top-0 left-0` : ""
			} ${className}`}
			ref={ref}
		>
			{children}
		</header>
	);
});

export default Header;
