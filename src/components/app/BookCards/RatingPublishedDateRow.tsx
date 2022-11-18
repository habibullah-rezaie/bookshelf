import React from "react";
import AverageRating from "src/components/lib/Rating/AverageRating";

function RatingPublishedDateRow({ dateString = "", averageRating = 0 }) {
	return dateString || averageRating > 0 ? (
		<div className="flex flex-row justify-between text-xxs font-poppins text-baseBlack opacity-80">
			{dateString && <div>Published {dateString}</div>}
			{<AverageRating rating={averageRating} />}
		</div>
	) : null;
}

export default RatingPublishedDateRow;
