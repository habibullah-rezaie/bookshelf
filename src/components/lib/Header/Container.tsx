export function WhiteShadowedContiainer({
	className = "",
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={`rounded-md shadow-sm bg-white border-[1px] border-baseBlackBorder hover:border-baseBlack hover:border-opacity-30 ${className}`}
		>
			{children}
		</div>
	);
}
