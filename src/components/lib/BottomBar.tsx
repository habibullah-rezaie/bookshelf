import React from "react";

// type props = React.PropsWithRef<{ children: React.ReactNode }>;
type props = React.PropsWithChildren<{ className?: string }>;

function BottomBar({ children, className = "" }: props) {
	return (
		<div
			className={`fixed bottom-0 z-10 left-0 w-full bg-[#F2F2F2] shadow-xl ${className}`}
		>
			{children}
		</div>
	);
}

export default BottomBar;
