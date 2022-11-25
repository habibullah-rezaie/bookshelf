import { RatingStars } from "../BookDetailsScreen/MyReview";

function RatingPublishedDateRow({ dateString = "", averageRating = 0 }) {
	return dateString || averageRating > 0 ? (
		<div className="flex flex-col text-xxs font-poppins text-baseBlack opacity-80 space-y-6">
			{dateString && <div>Published {dateString}</div>}
			<div>
				<RatingStars rating={averageRating} className="text-2xl" />
			</div>
		</div>
	) : null;
}

export default RatingPublishedDateRow;
