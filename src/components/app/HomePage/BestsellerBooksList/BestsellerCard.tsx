import { BriefBook } from "src/types/types";
import pluralize from "pluralize";
import { getAuthorsSummary } from "src/utils/book";
import { trimTextWithElepsis } from "src/utils/utils";
import config from "src/appConfig";

type BookProp = BriefBook & { weeksOnList: number };
type BestsellerBookProps = { book: BookProp; className?: string };

function BestsellerBookCard({
	book: { title, authors, weeksOnList, bookImage },
	className = "",
}: BestsellerBookProps) {
	const titleText = trimTextWithElepsis(title, 15);
	const authorFullText = getAuthorsSummary(authors);
	const authorText = trimTextWithElepsis(
		authorFullText.replace(" and ", " & "),
		20
	);
	const weeksOnListText = pluralize("week", weeksOnList, true).toUpperCase();
	return (
		<section
			className={`w-36 h-[calc(100% - 1px)] font-poppins flex flex-col rounded-md drop-shadow-lg shadow-md border-[1px] border-t-none ${className}`}
		>
			<div className="h-[13.68rem] overflow-y-hidden">
				<img
					className="rounded-md w-full h-auto"
					src={bookImage || config.DEFUALT_BOOK_IMG}
					alt={`${title}'s cover`}
				/>
			</div>
			<div className="px-2 pt-4 pb-2 rounded-md">
				<div className="space-y-1">
					<h1
						className="text-xs text-[#453C3C] font-semibold"
						// Did it to avoid String not assinable to string
						title={`${titleText} || "Unknown Name"`}
					>
						{titleText}
					</h1>
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
