import config from "src/appConfig";
import { useScrollIntoView } from "src/components/lib/Buttons/ScroolToTop";
import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import { MostPopularFilters } from "src/database/tables/MostPopularBook";
import { useSearchPopularsByParam } from "src/hooks/search";
import ListHeading from "../HomePage/ListHeader";
import PopularBookPeriodsListBox from "../HomePage/MostPopularBooksList/PopularBookPeriodsListBox";
import BooksListWithLoadMore from "../other/BooksListWithLoadMore";
import SearchBox from "../other/SearchBox";
import SortByNewestOrRank from "../other/SortByRankOrNewest";

function PopularsScreenMain() {
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
	} = useSearchPopularsByParam();

	const { parentRef, ScrollIntoViewBtn } = useScrollIntoView();
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
					header={<ListHeading className="">Popular Books</ListHeading>}
				>
					<div className="mt-9 mb-6">
						<SearchBox<MostPopularFilters>
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
						<PopularBookPeriodsListBox
							onPeriodChange={(period) => search(query, { ...filters, period })}
							period={filters.period ?? config.DEFAULT_POPULAR_BOOKS_PERIOD}
						/>
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

export default PopularsScreenMain;

function shouldSearch(
	newFilters: MostPopularFilters,
	prevFilters: MostPopularFilters
) {
	if (newFilters.period !== prevFilters.period) return true;
	return false;
}
