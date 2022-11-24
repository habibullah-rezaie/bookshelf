export function WhiteShadowedContiainer({
	className = "",
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={`rounded-md shadow-sm bg-white border-[1px] border-baseBlack border-opacity-20 focus:border-opacity-50 ${className}`}
		>
			{children}
		</div>
	);
}
