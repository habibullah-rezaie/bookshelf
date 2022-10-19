import { FaSpinner } from "react-icons/fa";

function Spinner({
	className = "",
	title = "Loading..",
}: {
	className?: string;
	title?: string;
}) {
	return (
		<FaSpinner
			className={`animate-spin text-inheret ${className}`}
			title={title}
		/>
	);
}

export default Spinner;
