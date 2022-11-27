import React from "react";
import { useSearchParams } from "react-router-dom";
import { useBestsellerBooks } from "src/api/hooks/bestsellers";
import ScrollNext from "src/components/lib/Buttons/ScrollNext";
import { BestsellerType as BestsellerKind } from "src/database/tables/BestsellerBook";
import { getBookDetailLink } from "src/utils/book";
import BestsellerCard from "./BestsellerCard";

function BestsellersListBody({
	className = "",
	kind,
}: {
	className?: string;
	kind: BestsellerKind;
}) {
	const [isParamsUsed, setIsParamsUsed] = React.useState(false);
	const { data, isError, isLoading, error } = useBestsellerBooks(kind);
	const [params] = useSearchParams();

	const selfRef = React.useRef<null | HTMLUListElement>(null);
	React.useEffect(() => {
		if (!selfRef.current) return;
		if (isParamsUsed) return;

		try {
			const exactPosition = JSON.parse(
				decodeURIComponent(params.get("exactPosition") || "{}")
			);

			if (
				!exactPosition ||
				exactPosition.bestsellerType !== kind ||
				!exactPosition.bookId
			)
				return;

			const element = selfRef.current.querySelector(
				`a[href="${getBookDetailLink(exactPosition.bookId)}"]`
			);

			if (!element) return;
			else element.scrollIntoView({ inline: "center" });
			setIsParamsUsed(true);
		} catch (err) {}
	}, [isParamsUsed, kind, params]);

	if (isError) throw error;
	if (isLoading) return <div>Loading...</div>;

	const books =
		data?.pages instanceof Array && data.pages.length > 0
			? data.pages[0].data ?? []
			: [];

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
				{books && books.length > 0
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
