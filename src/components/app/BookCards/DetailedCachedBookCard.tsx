import appConfig from "src/appConfig";
import ImgWithLoader from "src/components/lib/Img/ImgWithLoader";
import SquareLoader from "src/components/lib/Loaders/SquareLoader";
import { BasicBookInfo } from "src/types/types";
import { getAuthorsSummary } from "src/utils/book";
import { getCardDateText } from "../HomePage/MostPopularBooksList/popularBookHelper";
import RatingPublishedDateRow from "./RatingPublishedDateRow";

function DetailedCachedBookCard({
	book: { bookImage, title, authors, publishedDate, averageRating },
}: {
	book: BasicBookInfo;
}) {
	const authorFullText = getAuthorsSummary(authors || "").replace(
		" and ",
		" & "
	);
	const dateString = getCardDateText(publishedDate || "");

	return (
		<section className="w-full h-fit flex flex-col">
			<ImgWithLoader
				className="rounded-md mb-4"
				src={bookImage || appConfig.DEFUALT_BOOK_IMG}
				style={{ height: "100%", maxWidth: "100%" }}
				height={"20.635rem"}
				aspectWidth={4}
				aspectHeight={5}
				alt={title ? `Cover of ${title}` : "Book Cover"}
				Loader={<SquareLoader className="rounded-md" />}
			/>

			<div className="flex flex-col text-baseBlack font-poppins">
				<h1 className="font-semibold text-2xl mb-2" aria-label="Book's Title">
					{title}
				</h1>
				<p className="text-sm opacity-80" aria-label="Authors">
					{authorFullText}
				</p>

				{/* In this section will go rating and published Date */}

				<RatingPublishedDateRow
					dateString={dateString}
					averageRating={averageRating}
				/>
			</div>

			{/*Loader  */}
			<div className="w-full h-min overflow-hidden mt-8">
				<div className="h-5 w-36 rounded-md overflow-hidden">
					<SquareLoader />
				</div>
				<div className="h-24 w-70 rounded-md overflow-hidden mt-2">
					<SquareLoader />
				</div>
			</div>
		</section>
	);
}

export default DetailedCachedBookCard;
