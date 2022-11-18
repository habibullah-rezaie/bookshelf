export default function SquareLoader({ className = "", title = "Loading..." }) {
	return (
		<div
			className={`w-full h-full bg-[#D9D9D9] animate-pulse flex items-center justify-center ${className}`}
			title={title}
		></div>
	);
}
