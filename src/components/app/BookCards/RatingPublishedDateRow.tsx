import { useParams } from "react-router-dom";
import { useRatingStats } from "src/api/hooks/userBook";
import { useReviewsOnBook } from "src/api/hooks/userReview";
import { formatNumberSuffix as getNumText } from "src/utils/utils";
import { RatingStars } from "../BookDetailsScreen/MyReview";
function RatingPublishedDateRow({ averageRating = 0 }) {
	const { bookId } = useParams();

	const { data: ratingStats } = useRatingStats(bookId || "");
	const ratingsCount =
		ratingStats && ratingStats.total != null ? ratingStats.total : 0;
	const { data: reviewsOnBook } = useReviewsOnBook(bookId || "");
	const reviewsCount = reviewsOnBook
		? reviewsOnBook.pages.length > 0
			? reviewsOnBook.pages[0].count ?? 0
			: 0
		: 0;

	return (
		<div className="flex flex-col font-poppins text-baseBlack opacity-80 mt-6">
			<div>
				<RatingStars rating={averageRating} className="text-2xl" />
				<div className="flex flex-row font-poppins text-baseBlack mt-9">
					<RatingsCount ratingsCount={ratingsCount} />
					<ReviewsCount reviewsCount={reviewsCount} />
				</div>
			</div>
		</div>
	);
}

export default RatingPublishedDateRow;
function ReviewsCount({ reviewsCount = 0 }: { reviewsCount: number }) {
	return (
		<div className="flex flex-col space-y-1 pl-9">
			<div className="font-extrabold text-2xl">{getNumText(reviewsCount)}</div>
			<div className="font-normal text-opacity-80 text-xs">Reviews</div>
		</div>
	);
}

function RatingsCount({ ratingsCount = 0 }: { ratingsCount: number }) {
	return (
		<div className="flex flex-col space-y-1 pr-9 border-r-[1px] border-baseColor border-opacity-80">
			<div className="font-extrabold text-2xl">{getNumText(ratingsCount)}</div>
			<div className="font-normal text-opacity-80 text-xs">Ratings</div>
		</div>
	);
}
