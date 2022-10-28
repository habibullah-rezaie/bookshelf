import { FiBell } from "react-icons/fi";

interface Props {
	bellClassName?: string;
	wrapperClassName?: string;
	hasNotifications?: boolean;
}

function NotificationBell({
	bellClassName = "",
	wrapperClassName = "",
	hasNotifications = false,
}: Props) {
	return (
		<button
			className={`relative w-6 h-6 border-[1px] border-[#E1E1E1] rounded-[50%]  ${wrapperClassName}`}
		>
			{hasNotifications && (
				<div className="absolute top-1 left-3.5 rounded-full w-1.5 h-1.5 bg-[#065D94]"></div>
			)}
			<FiBell className={`my-auto mx-auto ${bellClassName}`} />
		</button>
	);
}

export default NotificationBell;
