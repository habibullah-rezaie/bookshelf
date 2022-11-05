import { InfiniteData } from "@tanstack/react-query";
import ListSortByBar from "src/components/lib/Lists/ListSortByBar";
import { MostPopularBook } from "src/database/tables/MostPopularBook";
import HorizontalBookCard from "../BookCards/HorizontalBookCard";

function SearchResultsSection({
	onSortChange,
	selectedSorting,
	data,
	hasNextPage,
	fetchNextPage,
	isFetchingNextPage,
}: {
	fetchNextPage: () => any;
	isFetchingNextPage: boolean;
	selectedSorting: "relevance" | "newest";
	onSortChange: (sortBy: "relevance" | "newest") => void;
	hasNextPage: boolean | undefined;
	data: InfiniteData<{
		totalItems: number;
		items: BasicBookInfo[];
	}>;
}) {
	return (
		<div className="flex flex-col space-y-2">
			<ListSortByBar
				Heading={<span className="text-sm font-semibold">Sort By: </span>}
				onSortChange={onSortChange}
				selectedSorting={selectedSorting}
			/>
			<ul className={`flex flex-col space-y-4`}>
				{data?.items.map((book) => (
					<li key={book.id}>
						<HorizontalBookCard book={book} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default SearchResultsSection;
