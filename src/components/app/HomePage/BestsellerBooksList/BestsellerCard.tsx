import pluralize from "pluralize";
import { Link } from "react-router-dom";
import config from "src/appConfig";
import { BestsellerBook } from "src/database/tables/BestsellerBook";
import {
	createStateFromHomeBestseller,
	getAuthorsSummary,
	getBookDetailLink,
} from "src/utils/book";
import { trimTextWithElepsis } from "src/utils/utils";

type BookProp = BestsellerBook;
type BestsellerBookProps = { book: BookProp; className?: string };

function BestsellerBookCard({
	book: { title, authors, weeksOnList, bookImage, bookId, type },
	className = "",
}: BestsellerBookProps) {
	const titleText = trimTextWithElepsis(title, 15);
	const authorFullText = getAuthorsSummary(authors || []);
	const authorText = trimTextWithElepsis(
		authorFullText.replace(" and ", " & "),
		20
	);
	const weeksOnListText = pluralize("week", weeksOnList, true).toUpperCase();
	return (
		<section
			className={`w-36 h-[calc(100% - 1px)] font-poppins flex flex-col rounded-md drop-shadow-lg shadow-md border-[1px] border-t-none bg-white ${className}`}
		>
			<Link
				className="h-[13.68rem] overflow-y-hidden"
				to={getBookDetailLink(bookId)}
				state={createStateFromHomeBestseller(type, bookId)}
			>
				<img
					className="rounded-md w-full h-auto"
					src={bookImage || config.DEFUALT_BOOK_IMG}
					alt={`${title}'s cover`}
				/>
			</Link>
			<div className="px-2 pt-4 pb-2 rounded-md">
				<div className="space-y-1">
					<Link
						className="h-[13.68rem] overflow-y-hidden"
						to={getBookDetailLink(bookId)}
						state={createStateFromHomeBestseller(type, bookId)}
					>
						<h1
							className="text-xs text-[#453C3C] font-semibold"
							// Did it to avoid String not assinable to string
							title={`${titleText} || "Unknown Name"`}
						>
							{titleText}
						</h1>
					</Link>
					<div
						className="text-xxs text-[#565454] text-opacity-80 font-medium"
						title={authorFullText}
					>
						{authorText}
					</div>

					{/* CHILDREN */}
					<div className="text-xxs font-poppins">
						<span className="font-bold text-[#565454]">{weeksOnListText}</span>
						<span className=" text-[#565454] text-opacity-80  font-normal ">
							{" "}
							Best Seller
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
export default BestsellerBookCard;
