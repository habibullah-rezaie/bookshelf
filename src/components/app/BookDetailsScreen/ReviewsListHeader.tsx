import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import ListHeading from "../HomePage/ListHeader";

function ReviewsListHeader({ bookId }: { bookId: string }) {
	return (
		<div className="w-full flex flex-row justify-between items-center">
			<ListHeading>Reviews</ListHeading>
			<div className="">
				<Link
					to={bookId ? "/review/book/" + bookId : "#"}
					className="flex flex-row items-center text-sm text-[#065D94] visited:text-[#065D94]"
				>
					<div>See All</div>
					<div>
						<MdKeyboardArrowRight />
					</div>
				</Link>
			</div>
		</div>
	);
}

export default ReviewsListHeader;
