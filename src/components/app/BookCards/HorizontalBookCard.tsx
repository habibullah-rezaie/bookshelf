import { BsStarFill } from "react-icons/bs";
import { VscBookmark } from "react-icons/vsc";
import appConfig from "src/appConfig";
import { BasicBookInfo } from "src/types/types";
import { getAuthorsSummary } from "src/utils/book";
import { trimTextWithElepsis } from "src/utils/utils";
import { getCardDateText } from "../HomePage/MostPopularBooksList/popularBookHelper";

function HorizontalBookCard({
	book: {
		id,
		title,
		authors,
		bookImage,
		averageRating: ratingsAverage,
		primaryISBN13: isbn,
		publishedDate,
	},
}: {
	book: BasicBookInfo;
}) {
	const dateString = getCardDateText(publishedDate || "");
	const authorFullText = getAuthorsSummary(authors || "");
	const authorText = trimTextWithElepsis(
		authorFullText.replace(" and ", " & "),
		20
	);

	return (
		<section className="w-full h-28 max-h-28 font-poppins flex flex-row justify-between rounded-md border-[1px] border-x-0 drop-shadow-sm">
			<div className="h-full w-max">
				<img
					className="rounded-md h-28 w-auto"
					src={bookImage || appConfig.DEFUALT_BOOK_IMG}
					alt={`${title}'s cover`}
				/>
			</div>
			<div className="flex-1 pt-4 pl-6 pr-4 rounded-md rounded-l-none">
				<div className="space-y-2">
					<h1 className="text-sm  font-semibold" title={title}>
						{trimTextWithElepsis(title, 30)}
					</h1>

					{/* Author & (publishdate + ratingsAverage) */}
					<div className="flex flex-col space-y-1 text-xs text-[#565454] text-opacity-80 font-poppins font-medium">
						<div className="" title={authorFullText}>
							{authorText}
						</div>

						<div className="flex flex-row justify-between text-xxs">
							{dateString && <div>Published {dateString}</div>}
							{ratingsAverage > 0 && (
								<div
									className="flex flex-row space-x-1"
									title={`${ratingsAverage.toPrecision(3)} stars`}
								>
									<div>{ratingsAverage.toPrecision(3)}</div>
									<BsStarFill className="text-[#FFC41F]" />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Bookmark button */}
			<div className="ml-4 my-auto text-[#565454]">
				<VscBookmark className="w-5 h-10" title="Add to favorite books" />
			</div>
		</section>
	);
}

export default HorizontalBookCard;
