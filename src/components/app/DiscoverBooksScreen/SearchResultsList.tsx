import ListSortByBar from "src/components/lib/Lists/ListSortByBar";
import { MostPopularBook } from "src/database/tables/MostPopularBook";
import HorizontalBookCard from "../BookCards/HorizontalBookCard";

function SearchResultsSection({
	onSortChange,
	selectedSorting,
	data,
}: {
	onSortChange: (sortBy: "relevance" | "newest") => void;
	selectedSorting: "relevance" | "newest";
	data:
		| {
				totalItems: number;
				items: Omit<MostPopularBook, "rank">[];
		  }
		| undefined;
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
