import { useScrollIntoView } from "src/components/lib/Buttons/ScroolToTop";
import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import { BestsellerFilters } from "src/database/tables/BestsellerBook";
import { useSearchBestsellerByParam } from "src/hooks/search";
import ListHeading from "../HomePage/ListHeader";
import BooksListWithLoadMore from "../other/BooksListWithLoadMore";
import SearchBox from "../other/SearchBox";

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
