import { useScrollIntoView } from "src/components/lib/Buttons/ScroolToTop";
import ListBox from "src/components/lib/Lists/ListBox";
import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import {
	BestsellerFilters,
	BestsellerType,
} from "src/database/tables/BestsellerBook";
import { useSearchBestsellerByParam } from "src/hooks/search";
import ListHeading from "../HomePage/ListHeader";
import BooksListWithLoadMore from "../other/BooksListWithLoadMore";
import SearchBox from "../other/SearchBox";
import SortByNewestOrRank from "../other/SortByRankOrNewest";

const bestsellerTypeOptions = {
	ALL: "All",
	FICTION: "Fiction",
	NON_FICTION: "Non-Fiction",
};

function BestsellersScreenMain() {
	const { parentRef, ScrollIntoViewBtn } = useScrollIntoView();
	const {
		filters,
		parseError,
		query,
		queryEnabled,
		setQueryEnabled,
		search,
		queryObj: {
			data: searchResult,
			isError,
			isLoading,
			isFetchingNextPage,
			hasNextPage,
			fetchNextPage,
		},
	} = useSearchBestsellerByParam();

	const books =
		searchResult == null
			? []
			: searchResult.pages.flatMap((page) =>
					page.data && page.data instanceof Array ? page.data : []
			  );

	return (
		<div>
			<main className="mt-16 px-7" ref={parentRef}>
				<SectionWithLoaderAndErrorBoundary
					className="pt-7"
					header={<ListHeading className="">Bestsellers</ListHeading>}
				>
					<div className="mt-9 mb-6">
						<SearchBox<BestsellerFilters>
							filters={filters}
							isError={isError}
							isLoading={isLoading}
							isQueried={queryEnabled}
							onSearch={search}
							query={query}
							shouldSearch={shouldSearch}
						/>
					</div>
					<div className="w-full flex flex-row justify-between">
						<div className="text-xs">
							<ListBox<BestsellerType | "ALL">
								allOptions={Object.entries(bestsellerTypeOptions).map(
									(entry) => ({
										value: entry[0] as BestsellerType | "ALL",
										displayValue: entry[1],
									})
								)}
								onChange={(bestsellerType) =>
									search(query, {
										...filters,
										type: bestsellerType === "ALL" ? undefined : bestsellerType,
									})
								}
								selectedOption={{
									value: filters.type ?? "ALL",
									displayValue: filters.type
										? bestsellerTypeOptions[filters.type]
										: "All",
								}}
								optionsPosition={"left-aligned"}
							/>
						</div>
						<SortByNewestOrRank
							onChange={(sortBy) => search(query, { ...filters, sortBy })}
							selectedSorting={filters.sortBy}
						/>
					</div>
					<BooksListWithLoadMore
						books={books}
						isFetchingNextPage={isFetchingNextPage}
						hasNextPage={hasNextPage}
						fetchNextPage={fetchNextPage}
						isLoading={isLoading}
					/>

					{books.length > 3 ? (
						<ScrollIntoViewBtn bottom={"bottom-[3.85rem]"} />
					) : null}
				</SectionWithLoaderAndErrorBoundary>
			</main>
		</div>
	);
}

export default BestsellersScreenMain;

function shouldSearch(
	newFilters: BestsellerFilters,
	prevFilters: BestsellerFilters
) {
	if (newFilters.type !== prevFilters.type) return true;
	return false;
}
