import React from "react";

type Props = React.PropsWithChildren<{ className?: string }>;
function MobileNav({ children, className = "" }: Props) {
	return (
		<nav aria-labelledby="primary-navigation" className={`${className}`}>
			<ul
				id="primary-navigation"
				className="flex flex-row justify-between px-12 h-8"
			>
				{children}
			</ul>
		</nav>
	);
}

export default MobileNav;
