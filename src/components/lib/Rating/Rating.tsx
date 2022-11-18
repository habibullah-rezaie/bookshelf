import * as React from "react";
import HalfStar from "../HalfStar";
import "./Rating.css";

function Rating({
	id,
	rating = 0,
	setRating,
	emptyColor,
	fullColor,
	disabled = false,
	starWidthClass,
}: {
	id: string;
	rating?: number;
	setRating: (rating: number) => void;
	emptyColor?: string;
	fullColor?: string;
	disabled: boolean;
	starWidthClass: string;
}) {
	const inputName = `rating-${id}`;
	return (
		<div
			className={`rating-wrapper grid grid-flow-col ${disabled && "disabled"}`}
		>
			{Array.from({ length: 10 }).map((_, i) => {
				const ratingVal = (i + 1) / 2;
				const ratingId = `${inputName}-${ratingVal}`;
				return (
					<React.Fragment key={ratingId}>
						<input
							className="sr-only"
							type="radio"
							name={inputName}
							value={ratingVal}
							id={ratingId}
							checked={rating === ratingVal}
							onChange={(ev) => setRating(Number(ev.target.value))}
						/>
						<label
							htmlFor={ratingId}
							className={`w-fit`}
							// reset the color when rating is less than .5
							style={{ color: rating < 0.5 ? emptyColor : undefined }}
							onClick={() => {
								// Clean the rating on second time
								if (rating === ratingVal) setRating(0);
							}}
						>
							<span className="sr-only">
								{i === 0
									? "Half star"
									: i === 1
									? "1 star"
									: `${ratingVal} stars`}
							</span>
							<HalfStar
								className={`${starWidthClass} ${
									i % 2 !== 0 ? "-scale-x-100 -translate-x-[.5px]" : ""
								}`}
							/>
						</label>
					</React.Fragment>
				);
			})}
		</div>
	);
}

export default Rating;
