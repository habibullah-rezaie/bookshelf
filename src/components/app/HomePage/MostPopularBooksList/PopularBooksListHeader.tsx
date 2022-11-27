import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { BestsellerFilters } from "src/database/tables/BestsellerBook";
import {
	MostPopularFilters,
	PopularBookPeriod,
} from "src/database/tables/MostPopularBook";
import { generateSearchParams } from "src/utils/list";
import ListHeading from "../ListHeader";
import PopularBookPeriodsListBox from "./PopularBookPeriodsListBox";

interface ListProps {
	onPeriodChange: (period: PopularBookPeriod) => void;
	period: PopularBookPeriod;
}

function ListHeader({ onPeriodChange, period }: ListProps) {
	return (
		<ListHeading className="flex flex-row items-center justify-between">
			<div>
				<h1 className="flex flex-row items-center">
					<span>Popular Books</span>
					<span className="">
						<PopularBookPeriodsListBox
							onPeriodChange={onPeriodChange}
							period={period}
						/>
					</span>
				</h1>
			</div>
			<div className="">
				<Link
					to={
						"/populars?" +
						generateSearchParams<MostPopularFilters>("", {
							period: period,
						}).toString()
					}
					className="flex flex-row items-center text-xs text-[#065D94] visited:text-[#065D94]"
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

export default ListHeader;
