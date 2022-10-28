import React from "react";

// type props = React.PropsWithRef<{ children: React.ReactNode }>;
type props = React.PropsWithChildren<{}>;

function BottomBar({ children }: props) {
	return (
		<div className="fixed bottom-0 z-10 left-0 w-full h-16 py-5 bg-bottomBarGray">
			{children}
		</div>
	);
}

export default BottomBar;
