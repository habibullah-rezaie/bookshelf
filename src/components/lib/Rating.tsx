import * as React from "react";
import HalfStar from "./HalfStar";
import "./Rating.css";

function Rating({
  id,
  rating,
  setRating,
}: {
  id: string;
  rating: number;
  setRating: (rating: number) => void;
}) {
  const inputName = `rating-${id}`;
  return (
    <div>
      <span>
        <span className="font-semibold">{rating}</span>star
      </span>
      <div className="rating-wrapper grid grid-flow-col hover:text-logoBlue">
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
                className={`w-2.5 ${
                  rating < 0 ? "text-logoGray" : "text-logoBlue"
                }`}
              >
                <span className="sr-only">
                  {i === 1
                    ? "Half star"
                    : i === 2
                    ? "1 star"
                    : `${ratingVal} stars`}
                </span>
                <HalfStar
                  className={`${
                    i % 2 !== 0 ? "-scale-x-100 -translate-x-[.5px]" : ""
                  }`}
                />
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Rating;
