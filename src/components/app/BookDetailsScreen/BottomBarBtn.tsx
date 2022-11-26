export function BottomBarBtn({
	Icon,
	text,
}: {
	Icon: (props: { className?: string }) => JSX.Element;
	text: string;
}) {
	return (
		<button className="h-full w-[3.6875rem] flex flex-col items-center justify-center py-1.5  fill-white hover:bg-baseBlack hover:text-white active:bg-baseBlack active:text-white rounded-md focus:outline-1 focus:outline-baseBlack">
			<Icon className="w-6 h-6" />
			<span className="">{text}</span>
		</button>
	);
}

export default BottomBarBtn;
