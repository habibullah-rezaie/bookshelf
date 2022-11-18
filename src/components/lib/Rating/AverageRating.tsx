import { BsStarFill } from "react-icons/bs";

function AverageRating({ rating }: { rating: number }) {
	return rating > 0 ? (
		<div
			className="flex flex-row space-x-0.5 items-center justify-center text-baseBlack text-xs"
			title={`${rating.toPrecision(2)} stars`}
		>
			<div>{rating.toPrecision(2)}</div>
			<div>
				<BsStarFill className="h-[4] w-auto text-[#FFC41F]" />
			</div>
		</div>
	) : null;
}

export default AverageRating;
