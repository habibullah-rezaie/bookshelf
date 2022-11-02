import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { BestsellerType } from "src/database/tables/BestsellerBook";
import ListHeading from "../ListHeader";

function BestsellerListHeader({
	bestsellerType,
}: {
	bestsellerType: BestsellerType;
}) {
	const bestsellerTypeText =
		bestsellerType === "FICTION" ? "Fiction" : "Non-Fiction";
	return (
		<ListHeading className="flex flex-row items-center justify-between">
			<div>
				<h1>
					Best Sellers{" "}
					<span className="text-[#453C3C] text-xs">{bestsellerTypeText}</span>
				</h1>
			</div>
			<div className="">
				<Link
					to={"/"}
					className="flex flex-row items-center text-sm text-[#065D94] visited:text-[#065D94]"
				>
					<div>See All</div>
					<div>
						<MdKeyboardArrowRight />
					</div>
				</Link>
			</div>
		</ListHeading>
	);
}

export default BestsellerListHeader;