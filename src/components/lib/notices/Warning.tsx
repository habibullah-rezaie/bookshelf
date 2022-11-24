import React from "react";
import { TiWarningOutline } from "react-icons/ti";

interface IWarningProps {
	children: React.ReactNode;
	role: React.AriaRole;
}

type WarningProps = IWarningProps &
	Omit<React.ComponentProps<"div">, keyof IWarningProps>;
function Warning({ children, role, className = "" }: WarningProps) {
	return (
		<div
			role={role}
			className={`flex flex-row space-x-2 items-center border-[1px]  border-[#FFC41F] bg-[#FFC41F] bg-opacity-[0.33] py-1 px-4 rounded-md ${className}`}
		>
			<TiWarningOutline className="w-6 h-6 justify-self-center text-baseBlack" />
			<div>{children}</div>
		</div>
	);
}

export default Warning;
