import { Link, LinkProps } from "react-router-dom";
import appConfig from "src/appConfig";
import ImgWithLoader from "src/components/lib/Img/ImgWithLoader";
import SquareLoader from "src/components/lib/Loaders/SquareLoader";
import AverageRating from "src/components/lib/Rating/AverageRating";
import { BasicBookInfo } from "src/types/types";
import { getAuthorsSummary } from "src/utils/book";
import { trimTextWithElepsis } from "src/utils/utils";
import { getCardDateText } from "../HomePage/MostPopularBooksList/popularBookHelper";

function HorizontalBookCard({
	book: {
		bookId: id,
		title,
		authors,
		bookImage,
		averageRating: ratingsAverage,
		primaryISBN13: isbn,
		publishedDate,
	},
	link,
}: {
	book: BasicBookInfo;
	link: LinkProps;
}) {
	const dateString = getCardDateText(publishedDate || "");
	const authorFullText = getAuthorsSummary(authors || "");
	const authorText = trimTextWithElepsis(
		authorFullText.replace(" and ", " & "),
		20
	);

	return (
		<section className="w-full h-28 max-h-28 font-poppins flex flex-row justify-between rounded-md border-[1px] drop-shadow-sm">
			<Link
				{...link}
				className="overflow-hidden h-28 w-[4.6rem] rounded-md flex items-center justify-center"
			>
				<ImgWithLoader
					className="overflow-hidden flex-1"
					src={bookImage || appConfig.DEFUALT_BOOK_IMG}
					fit="contain"
					style={{ height: "100%", maxWidth: "100%" }}
					height={"7rem"}
					aspectWidth={10}
					aspectHeight={15}
					alt={`${title}'s cover`}
					Loader={<SquareLoader className="rounded-md" />}
				/>
			</Link>
			<div className="flex-1 pt-4 pl-6 pr-4 rounded-md rounded-l-none">
				<div className="space-y-2">
					<Link {...link}>
						<h1 className="text-sm  font-semibold" title={title}>
							{trimTextWithElepsis(title, 30)}
						</h1>
					</Link>

					{/* Author & (publishdate + ratingsAverage) */}
					<div className="flex flex-col space-y-1 text-xs text-baseBlack text-opacity-80 font-poppins font-medium">
						<div className="" title={authorFullText}>
							{authorText}
						</div>

						<div className="flex flex-row justify-between text-xxs">
							{dateString && <div>Published {dateString}</div>}
							{<AverageRating rating={ratingsAverage} />}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HorizontalBookCard;
