import React from "react";
import { Link } from "react-router-dom";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { generateSearchParams } from "src/utils/list";

function BookCategories({ categories }: { categories: string[] }) {
	const [showMore, setShowMore] = React.useState(false);

	const newCtgs = Array.from(
		new Set(
			categories.flatMap((ctg) => ctg.split("/").map((str) => str.trim()))
		)
	);

	const toShowCtgs =
		newCtgs.length > 7 && !showMore ? newCtgs.slice(0, 7) : newCtgs;
	return (
		<div className="mt-9">
			<ul className="flex flex-row space-x-2.5 flex-wrap font-poppins text-xs text-[#4C4F52]">
				<div className="">Genres: </div>
				{toShowCtgs.map((ctg) => {
					const ctgUrl = new URL("/search", window.location.origin);

					for (const param of generateSearchParams<SearchFilters>("", {
						category: ctg,
					})) {
						ctgUrl.searchParams.append(param[0], param[1]);
					}
					return (
						<li key={ctg}>
							<Link to={ctgUrl} className="underline">
								{ctg}
							</Link>
						</li>
					);
				})}
				{!showMore && newCtgs.length > 7 && (
					<button className="text-[#065D94]" onClick={() => setShowMore(true)}>
						show more
					</button>
				)}
			</ul>
		</div>
	);
}

export default BookCategories;
