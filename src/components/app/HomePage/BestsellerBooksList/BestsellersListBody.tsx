import React from "react";
import { Resource } from "src/api/resource";
import ScrollNext from "src/components/lib/Buttons/ScrollNext";
import { BestsellerBook as BestsellerBookType } from "src/database/tables/BestsellerBook";
import BestsellerCard from "./BestsellerCard";

function BestsellersListBody({
	resource,
	className = "",
}: {
	resource: Resource<BestsellerBookType[]>;
	className?: string;
}) {
	const books = resource.read();

	const selfRef = React.useRef<null | HTMLUListElement>(null);

	const handleScrollLeft = () => {
		const bestsellersList = selfRef.current;

		if (!bestsellersList) {
			console.log("No REf");
			return;
		}

		bestsellersList.scroll(
			bestsellersList.scrollLeft - bestsellersList.offsetWidth,
			bestsellersList.scrollTop
		);
	};

	const handleScrollRight = () => {
		const bestsellersList = selfRef.current;

		if (!bestsellersList) {
			console.log("No REf");
			return;
		}

		bestsellersList.scroll(
			bestsellersList.scrollLeft + bestsellersList.offsetWidth,
			bestsellersList.scrollTop
		);
	};

	return (
		<ul
			ref={selfRef}
			className={`bestseller-list h-[20rem] px-7 full no-scrollbar scroll-smooth ${className}`}
		>
			<>
				{books.length > 0
					? books.map((book) => {
							return (
								<li className={`inline-block`} key={`${book.bookId}`}>
									<BestsellerCard
										book={{
											...book,
											authors: book.authors ?? [],
										}}
									/>
								</li>
							);
					  })
					: `We're all caught up now.`}
			</>
			<ScrollNext
				className={`absolute top-1/2 right-2 text-baseBlack`}
				direction="RIGHT"
				aria-label="Scroll Right"
				onClick={handleScrollRight}
			/>
			<ScrollNext
				className={`absolute top-1/2 left-2 text-baseBlack`}
				direction="LEFT"
				aria-label="Scroll Left"
				onClick={handleScrollLeft}
			/>
		</ul>
	);
}

export default BestsellersListBody;
